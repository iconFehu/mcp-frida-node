import frida from "frida"; // <<< Import frida
import path from "path"; // <<< Import path
import fs from "fs/promises"; // <<< Import fs
import { fileURLToPath } from "url"; // <<< Import fileURLToPath
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { FridaClient } from "./frida-client.js"; // Assuming a client exists or will be created
import express from "express";
import http from "http";
import cors from "cors"; // Added for potential browser client access
import { z, ZodError, } from "zod"; // Import Zod and necessary types
import { logger } from "./utils/logger.js"; // <<< Import logger
// Import AgentRpc type and related interfaces
import { // The core RPC interface type
createAgentInterface, // Function to create the typed RPC proxy
 } from "./agent-interface.js";
// Derive __dirname for ES Modules if needed within the class, or pass agent path
const __filename_server = fileURLToPath(import.meta.url);
const __dirname_server = path.dirname(__filename_server);
const AGENT_SCRIPT_NAME = "_agent.js"; // Consider moving to config
const AGENT_SCRIPT_PATH = path.resolve(__dirname_server, "..", AGENT_SCRIPT_NAME);
export class McpFridaServer {
    server;
    fridaClient;
    httpServer;
    app;
    sseTransport;
    currentConfig;
    // --- Frida State Management ---
    agentRpc = null;
    fridaSession = null;
    fridaDevice = null;
    currentTarget = null;
    isAttaching = false; // Prevent concurrent attach attempts
    // --- End Frida State Management ---
    constructor() {
        this.server = new McpServer({
            name: "mcp-frida-server",
            version: "0.1.0", // Match package.json
            capabilities: {
                // <<< Add capabilities configuration >>>
                tools: {}, // Indicate this server provides tools
            },
        });
        // Initialize FridaClient - or remove if using frida directly
        this.fridaClient = new FridaClient();
        this.setupEventBridge();
        this._registerAllTools(); // <<< Call the new registration method
    }
    setupEventBridge() {
        this.fridaClient.on("agentMessage", (payload, _data) => {
            if (this.currentConfig?.transport === "sse" && this.sseTransport) {
                logger.info(`Forwarding agent event via send():`, JSON.stringify(payload).substring(0, 200) + "...");
                try {
                    // Construct the JSON-RPC Notification object
                    const notification = {
                        jsonrpc: "2.0",
                        method: "frida:event", // Notification method name
                        params: payload, // Agent payload as parameters
                    };
                    // Use the send() method of the transport
                    this.sseTransport.send(notification);
                }
                catch (error) {
                    logger.error(`Error sending notification via send():`, error);
                }
            }
            else {
                logger.debug("[Agent Message - No SSE client]", "FridaClientBridge"); // Use debug for non-SSE
            }
        });
    }
    // +++ NEW: Method to handle Frida detachment +++
    onDetached(reason, crash) {
        const pid = this.fridaSession?.pid; // Capture PID before nulling session
        logger.warn(`Session detached from PID ${pid ?? "unknown"}. Reason: ${reason}`, "Detach");
        if (crash) {
            logger.error(`Target crashed: ${JSON.stringify(crash)}`, "Detach");
        }
        this.agentRpc = null;
        this.fridaSession = null;
        this.fridaDevice = null;
        this.currentTarget = null;
        this.isAttaching = false;
        // Optionally, notify connected AI clients about detachment via SSE?
        if (this.currentConfig?.transport === "sse" && this.sseTransport) {
            const notification = {
                jsonrpc: "2.0",
                method: "frida:detached",
                params: { reason, pid },
            };
            this.sseTransport
                .send(notification)
                .catch((err) => logger.error(`Error sending detachment notification: ${err}`, "Detach"));
        }
    }
    // +++ NEW: Method to check agent script +++
    async checkAgentScript() {
        try {
            await fs.access(AGENT_SCRIPT_PATH);
            logger.info(`Found agent script: ${AGENT_SCRIPT_PATH}`, "Attach");
            return await fs.readFile(AGENT_SCRIPT_PATH, "utf-8");
        }
        catch (error) {
            logger.error(`Agent script not found or unreadable at: ${AGENT_SCRIPT_PATH}`, "Attach");
            logger.error(`Please build the agent first (e.g., using 'pnpm run agent:build').`, "Attach");
            throw new Error(`Agent script not found at ${AGENT_SCRIPT_PATH}`);
        }
    }
    // +++ NEW: Core logic to attach to a process +++
    async attachToProcess(target) {
        if (this.isAttaching) {
            return { success: false, message: "Attach already in progress." };
        }
        if (this.fridaSession && !this.fridaSession.isDetached) {
            if (this.currentTarget === target || this.fridaSession.pid === target) {
                logger.info(`Already attached to target: ${target} (PID: ${this.fridaSession.pid}).`, "Attach");
                return {
                    success: true,
                    message: `Already attached to target: ${target} (PID: ${this.fridaSession.pid})`,
                    pid: this.fridaSession.pid,
                    alreadyAttached: true,
                };
            }
            else {
                logger.warn(`Already attached to a different process (PID: ${this.fridaSession.pid}). Detaching before attaching to ${target}.`, "Attach");
                await this.detachFromProcess(); // Detach from the old process first
            }
        }
        this.isAttaching = true;
        logger.info(`Attempting to attach to target: ${target}...`, "Attach");
        try {
            const agentScriptContent = await this.checkAgentScript();
            logger.info(`Connecting to Frida device...`, "Attach");
            this.fridaDevice = await frida.getLocalDevice();
            logger.info(`Attaching to target process/PID: ${target}...`, "Attach");
            this.fridaSession = await this.fridaDevice.attach(target);
            this.currentTarget = target;
            logger.info(`Attached successfully to PID: ${this.fridaSession.pid}`, "Attach");
            this.fridaSession.detached.connect((reason, crash) => this.onDetached(reason, crash));
            logger.info(`Detached handler registered for PID: ${this.fridaSession.pid}`, "Attach");
            logger.info(`Compiling and loading agent script...`, "Attach");
            const script = await this.fridaSession.createScript(agentScriptContent, {
                name: "mcp-agent",
                runtime: frida.ScriptRuntime.Default,
            });
            script.message.connect((message, data) => {
                logger.trace(`[Agent Message]: ${JSON.stringify(message)} ${data ? data.toString() : ""}`, "FridaClientBridge");
                this.fridaClient.emit("agentMessage", message, data);
            });
            await script.load();
            logger.info(`Agent script loaded.`, "Attach");
            if (!script.exports) {
                throw new Error("Script exports are not available after loading.");
            }
            this.agentRpc = createAgentInterface(script.exports);
            logger.info("Agent RPC interface created.", "Attach");
            this.isAttaching = false;
            return {
                success: true,
                message: `Successfully attached to PID: ${this.fridaSession.pid}`,
                pid: this.fridaSession.pid,
            };
        }
        catch (error) {
            logger.error(`Failed during attach/inject to ${target}: ${error.message || error}`, "Attach");
            if (this.fridaSession && !this.fridaSession.isDetached) {
                try {
                    await this.fridaSession.detach();
                }
                catch (detachErr) {
                    /* Ignore */
                }
            }
            this.fridaSession = null;
            this.agentRpc = null;
            this.currentTarget = null;
            this.fridaDevice = null;
            this.isAttaching = false;
            return {
                success: false,
                message: `Failed to attach: ${error.message || error}`,
            };
        }
    }
    // +++ NEW: Method to detach explicitly +++
    async detachFromProcess() {
        if (this.fridaSession && !this.fridaSession.isDetached) {
            const pid = this.fridaSession.pid;
            logger.info(`Detaching from session (PID: ${pid})...`, "Detach");
            try {
                await this.fridaSession.detach();
                logger.info(`Detached successfully from PID: ${pid}.`, "Detach");
                // onDetached handler should clean up the rest of the state
                return { success: true, message: `Detached from PID: ${pid}` };
            }
            catch (err) {
                logger.error(`Error detaching from PID ${pid}: ${err.message || err}`, "Detach");
                this.agentRpc = null;
                this.fridaSession = null;
                this.fridaDevice = null;
                this.currentTarget = null;
                this.isAttaching = false;
                return {
                    success: false,
                    message: `Error detaching from PID ${pid}: ${err.message || err}`,
                };
            }
        }
        else {
            logger.info("No active session to detach from.", "Detach");
            return { success: true, message: "No active session to detach from." };
        }
    }
    // +++ NEW: Method to get current session info +++
    getCurrentSessionInfo() {
        if (this.fridaSession && !this.fridaSession.isDetached) {
            return {
                attached: true,
                pid: this.fridaSession.pid,
                target: this.currentTarget ?? this.fridaSession.pid,
            };
        }
        else {
            return { attached: false };
        }
    }
    // --- NEW Tool Registration Method ---
    _registerAllTools() {
        logger.info("Registering MCP tools...", "Server");
        // Helper function for implementation boilerplate
        const createAgentToolImplementation = (name, implementationLogic) => {
            // Return type should match McpServer.tool callback expectation
            return async (params) => {
                logger.info(`Executing tool: ${name} with params: ${JSON.stringify(params)}`, "Tool");
                if (!this.agentRpc ||
                    !this.fridaSession ||
                    this.fridaSession.isDetached) {
                    logger.error(`Attempted to call agent tool '${name}' while detached.`, "Tool");
                    // Return error result in expected format
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Execution failed for ${name}: Not attached to any process or session detached. Please use 'system.attachProcess' first.`,
                            },
                        ],
                        isError: true,
                    };
                }
                try {
                    const result = await implementationLogic(params, this.agentRpc);
                    // Wrap successful result in expected format
                    const resultString = typeof result === "object"
                        ? JSON.stringify(result, null, 2)
                        : String(result);
                    return { content: [{ type: "text", text: resultString }] };
                }
                catch (error) {
                    logger.error(`Tool Error - ${name}, Params: ${JSON.stringify(params)}, Error: ${error}`, "Tool");
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    // Return error result in expected format
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Execution failed for ${name}: ${errorMessage}`,
                            },
                        ],
                        isError: true,
                    };
                }
            };
        };
        // --- System Tools ---
        logger.debug("Registering System tools...", "Server");
        this.server.tool("system_attachProcess", "附加到进程。可通过进程名称或进程ID进行附加。", {
            processName: z
                .string()
                .optional()
                .describe("目标进程的名称 (例如 'PlantsVsZombies.exe')。与pid二选一。"),
            pid: z
                .number()
                .int()
                .positive()
                .optional()
                .describe("目标进程的 PID (例如 1234)。与processName二选一。"),
        }, async (params) => {
            logger.info(`Executing tool: system_attachProcess with params: ${JSON.stringify(params)}`, "Tool");
            // 验证参数：必须提供processName或pid中的一个，但不能同时提供两个
            if (!params.processName && !params.pid) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "错误：必须提供processName或pid参数中的至少一个。",
                        },
                    ],
                    isError: true,
                };
            }
            if (params.processName && params.pid) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "错误：不能同时提供processName和pid参数，请只使用其中一个。",
                        },
                    ],
                    isError: true,
                };
            }
            try {
                // 根据提供的参数类型决定使用哪个目标
                const target = params.pid !== undefined ? params.pid : params.processName;
                const result = await this.attachToProcess(target);
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }
            catch (error) {
                logger.error(`Tool Error - system_attachProcess, Params: ${JSON.stringify(params)}, Error: ${error}`, "Tool");
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [{ type: "text", text: `附加进程失败: ${errorMessage}` }],
                    isError: true,
                };
            }
        });
        this.server.tool("system_listAttachedSession", "获取当前 MCP 服务器附加的 Frida 会话信息。", {}, // No parameters
        async () => {
            // Needs to return CallToolResult
            logger.info("Executing tool: system_listAttachedSession", "Tool");
            try {
                const result = this.getCurrentSessionInfo();
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }
            catch (error) {
                // Should not happen for this simple call, but good practice
                logger.error(`Tool Error - system_listAttachedSession, Error: ${error}`, "Tool");
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Execution failed for system_listAttachedSession: ${errorMessage}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
        // --- Native Pointer Tools ---
        logger.debug("Registering Native Pointer tools...", "Server");
        // --- Remove Split Tools Start ---
        // (This section is now empty after the previous step)
        // --- Remove Split Tools End ---
        // +++ Add Consolidated native_read +++
        const consolidatedNativeReadParams = {
            address: z.string().describe("要读取数据的内存地址。"),
            dataType: z
                .enum([
                "pointer",
                "s8",
                "u8",
                "s16",
                "u16",
                "s32",
                "u32",
                "s64",
                "u64",
                "short",
                "ushort",
                "int",
                "uint",
                "long",
                "ulong",
                "float",
                "double",
                "bytearray",
                "cstring",
                "utf8",
                "utf16",
                "ansi",
            ])
                .describe("要读取的数据类型。"),
            length: z
                .number()
                .int()
                .positive()
                .optional()
                .describe("读取 'bytearray' 时必需的字节数。"),
            maxLength: z
                .number()
                .int()
                .positive()
                .optional()
                .describe("读取字符串 ('cstring', 'utf8', 'utf16', 'ansi') 时必需的最大长度/字节数。"),
            // volatile: z.boolean().optional().describe("是否执行 volatile 读取 (主要用于 'bytearray')。")
        };
        this.server.tool("native_read", "从指定地址读取指定类型的数据。根据 dataType 不同，可能需要 length 或 maxLength 参数。", consolidatedNativeReadParams, createAgentToolImplementation("native_read", async (params, agentRpc) => {
            const { address, dataType, length, maxLength } = params;
            let resultPromise;
            switch (dataType) {
                case "pointer":
                    resultPromise = agentRpc.nativePointerReadPointer(address);
                    break;
                case "s8":
                    resultPromise = agentRpc.nativePointerReadS8(address);
                    break;
                case "u8":
                    resultPromise = agentRpc.nativePointerReadU8(address);
                    break;
                case "s16":
                    resultPromise = agentRpc.nativePointerReadS16(address);
                    break;
                case "u16":
                    resultPromise = agentRpc.nativePointerReadU16(address);
                    break;
                case "s32":
                    resultPromise = agentRpc.nativePointerReadS32(address);
                    break;
                case "u32":
                    resultPromise = agentRpc.nativePointerReadU32(address);
                    break;
                case "s64":
                    resultPromise = agentRpc.nativePointerReadS64(address);
                    break;
                case "u64":
                    resultPromise = agentRpc.nativePointerReadU64(address);
                    break;
                case "short":
                    resultPromise = agentRpc.nativePointerReadShort(address);
                    break;
                case "ushort":
                    resultPromise = agentRpc.nativePointerReadUShort(address);
                    break;
                case "int":
                    resultPromise = agentRpc.nativePointerReadInt(address);
                    break;
                case "uint":
                    resultPromise = agentRpc.nativePointerReadUInt(address);
                    break;
                case "long":
                    resultPromise = agentRpc.nativePointerReadLong(address);
                    break;
                case "ulong":
                    resultPromise = agentRpc.nativePointerReadULong(address);
                    break;
                case "float":
                    resultPromise = agentRpc.nativePointerReadFloat(address);
                    break;
                case "double":
                    resultPromise = agentRpc.nativePointerReadDouble(address);
                    break;
                case "bytearray":
                    if (length === undefined)
                        throw new Error("`length` is required when dataType is 'bytearray'");
                    resultPromise = agentRpc.nativePointerReadByteArray(address, length);
                    break;
                case "cstring":
                    if (maxLength === undefined)
                        throw new Error("`maxLength` is required for 'cstring'");
                    resultPromise = agentRpc.nativePointerReadCString(address, maxLength);
                    break;
                case "utf8":
                    if (maxLength === undefined)
                        throw new Error("`maxLength` is required for 'utf8'");
                    resultPromise = agentRpc.nativePointerReadUtf8String(address, maxLength);
                    break;
                case "utf16":
                    if (maxLength === undefined)
                        throw new Error("`maxLength` is required for 'utf16'");
                    resultPromise = agentRpc.nativePointerReadUtf16String(address, maxLength);
                    break;
                case "ansi":
                    if (maxLength === undefined)
                        throw new Error("`maxLength` is required for 'ansi'");
                    resultPromise = agentRpc.nativePointerReadAnsiString(address, maxLength);
                    break;
                default: throw new Error(`Internal error: Unsupported native read data type encountered: ${dataType}`);
            }
            return await resultPromise;
        }));
        // +++ Add Consolidated native_write +++
        const consolidatedNativeWriteParams = {
            address: z.string().describe("要写入数据的内存地址。"),
            dataType: z
                .enum([
                "pointer",
                "s8",
                "u8",
                "s16",
                "u16",
                "s32",
                "u32",
                "s64",
                "u64",
                "short",
                "ushort",
                "int",
                "uint",
                "long",
                "ulong",
                "float",
                "double",
                "bytearray",
                "utf8",
                "utf16",
                "ansi",
            ])
                .describe("要写入的数据类型。"),
            value: z
                .any()
                .describe("要写入的值。类型应匹配 dataType (s64/u64/long/ulong 推荐字符串, bytearray 需数字数组)。"),
            // volatile: z.boolean().optional().describe("是否执行 volatile 写入 (主要用于 'bytearray')。")
        };
        this.server.tool("native_write", "向指定地址写入指定类型的数据。value 的类型需匹配 dataType。", consolidatedNativeWriteParams, createAgentToolImplementation("native_write", async (params, agentRpc) => {
            const { address, dataType, value } = params;
            // ... (类型验证)
            let resultPromise;
            switch (dataType) {
                case "pointer":
                    resultPromise = agentRpc.nativePointerWritePointer(address, value);
                    break;
                case "s8":
                    resultPromise = agentRpc.nativePointerWriteS8(address, value);
                    break;
                case "u8":
                    resultPromise = agentRpc.nativePointerWriteU8(address, value);
                    break;
                case "s16":
                    resultPromise = agentRpc.nativePointerWriteS16(address, value);
                    break;
                case "u16":
                    resultPromise = agentRpc.nativePointerWriteU16(address, value);
                    break;
                case "s32":
                    resultPromise = agentRpc.nativePointerWriteS32(address, value);
                    break;
                case "u32":
                    resultPromise = agentRpc.nativePointerWriteU32(address, value);
                    break;
                case "s64":
                    resultPromise = agentRpc.nativePointerWriteS64(address, value);
                    break;
                case "u64":
                    resultPromise = agentRpc.nativePointerWriteU64(address, value);
                    break;
                case "short":
                    resultPromise = agentRpc.nativePointerWriteShort(address, value);
                    break;
                case "ushort":
                    resultPromise = agentRpc.nativePointerWriteUShort(address, value);
                    break;
                case "int":
                    resultPromise = agentRpc.nativePointerWriteInt(address, value);
                    break;
                case "uint":
                    resultPromise = agentRpc.nativePointerWriteUInt(address, value);
                    break;
                case "long":
                    resultPromise = agentRpc.nativePointerWriteLong(address, value);
                    break;
                case "ulong":
                    resultPromise = agentRpc.nativePointerWriteULong(address, value);
                    break;
                case "float":
                    resultPromise = agentRpc.nativePointerWriteFloat(address, value);
                    break;
                case "double":
                    resultPromise = agentRpc.nativePointerWriteDouble(address, value);
                    break;
                case "bytearray":
                    resultPromise = agentRpc.nativePointerWriteByteArray(address, value);
                    break;
                case "utf8":
                    resultPromise = agentRpc.nativePointerWriteUtf8String(address, value);
                    break;
                case "utf16":
                    resultPromise = agentRpc.nativePointerWriteUtf16String(address, value);
                    break;
                case "ansi":
                    resultPromise = agentRpc.nativePointerWriteAnsiString(address, value);
                    break;
                default: throw new Error(`Internal error: Unsupported native write data type encountered: ${dataType}`);
            }
            return await resultPromise;
        }));
        // +++ Add Consolidated native_operate +++
        const consolidatedNativeOperateParams = {
            operation: z
                .enum([
                "add",
                "sub",
                "and",
                "or",
                "xor",
                "shl",
                "shr",
                "not",
                "compare",
                "equals",
                "isNull",
                "toInt32",
                "toUint32",
                "toString",
                "toMatchPattern",
                "sign",
                "strip",
                "blend",
            ])
                .describe("要执行的操作类型。"),
            address: z.string().describe("主要操作的指针地址。"),
            operand: z
                .string()
                .optional()
                .describe("第二个操作数 (用于 add, sub, and, or, xor, shl, shr, compare, equals, blend)，通常为字符串表示。"),
            radix: z
                .number()
                .int()
                .optional()
                .describe("'toString' 操作时必需的基数 (例如 10 或 16)。"),
            authConfig: z
                .object({
                key: z.enum(["ia", "ib", "da", "db"]).describe("认证密钥类型。"),
                data: z
                    .string()
                    .optional()
                    .describe("用于签名的可选额外数据指针地址。"),
            })
                .optional()
                .describe("'sign' 操作时必需的认证配置。data 可选。"),
            authKey: z
                .enum(["ia", "ib", "da", "db"])
                .optional()
                .describe("'strip' 操作时必需的认证密钥类型。"),
            blendOperand: z
                .number()
                .int()
                .optional()
                .describe("'blend' 操作时必需的第二个操作数 (small integer)。"),
        };
        this.server.tool("native_operate", "对指针地址执行算术、位运算、比较、转换或认证操作。根据 operation 不同，可能需要 operand, radix, authConfig, authKey 或 blendOperand 参数。", consolidatedNativeOperateParams, createAgentToolImplementation("native_operate", async (params, agentRpc) => {
            const { operation, address, operand, radix, authConfig, authKey, blendOperand } = params;
            let resultPromise;
            switch (operation) {
                case "add":
                case "sub":
                case "shl":
                case "shr":
                case "compare":
                    if (operand === undefined)
                        throw new Error(`\`operand\` is required for operation '${operation}'`);
                    let opValueNum = operand;
                    if (!isNaN(Number(operand))) {
                        opValueNum = Number(operand);
                    }
                    if (operation === "add")
                        resultPromise = agentRpc.nativePointerAdd(address, opValueNum);
                    else if (operation === "sub")
                        resultPromise = agentRpc.nativePointerSub(address, opValueNum);
                    else if (operation === "shl")
                        resultPromise = agentRpc.nativePointerShl(address, opValueNum);
                    else if (operation === "shr")
                        resultPromise = agentRpc.nativePointerShr(address, opValueNum);
                    else
                        resultPromise = agentRpc.nativePointerCompare(address, opValueNum);
                    break;
                case "and":
                case "or":
                case "xor":
                case "equals":
                    if (operand === undefined)
                        throw new Error(`\`operand\` is required for operation '${operation}'`);
                    if (operation === "and")
                        resultPromise = agentRpc.nativePointerAnd(address, operand);
                    else if (operation === "or")
                        resultPromise = agentRpc.nativePointerOr(address, operand);
                    else if (operation === "xor")
                        resultPromise = agentRpc.nativePointerXor(address, operand);
                    else
                        resultPromise = agentRpc.nativePointerEquals(address, operand);
                    break;
                case "blend":
                    if (blendOperand === undefined)
                        throw new Error("`blendOperand` is required for operation 'blend'");
                    resultPromise = agentRpc.nativePointerBlend(address, blendOperand);
                    break;
                case "not":
                    resultPromise = agentRpc.nativePointerNot(address);
                    break;
                case "isNull":
                    resultPromise = agentRpc.nativePointerIsNull(address);
                    break;
                case "toInt32":
                    resultPromise = agentRpc.nativePointerToInt32(address);
                    break;
                case "toUint32":
                    resultPromise = agentRpc.nativePointerToUInt32(address);
                    break;
                case "toMatchPattern":
                    resultPromise = agentRpc.nativePointerToMatchPattern(address);
                    break;
                case "toString":
                    if (radix === undefined)
                        throw new Error("`radix` is required for operation 'toString'");
                    resultPromise = agentRpc.nativePointerToString(address, radix);
                    break;
                case "sign":
                    if (authConfig === undefined)
                        throw new Error("`authConfig` is required for operation 'sign'");
                    resultPromise = agentRpc.nativePointerSign(address, authConfig);
                    break;
                case "strip":
                    if (authKey === undefined)
                        throw new Error("`authKey` is required for operation 'strip'");
                    resultPromise = agentRpc.nativePointerStrip(address, authKey);
                    break;
                default: throw new Error(`Internal error: Unsupported native operation type encountered: ${operation}`);
            }
            return await resultPromise;
        }));
        // +++ Add Consolidated native_createPointer +++
        const consolidatedNativeCreateParams = {
            addressValue: z
                .string()
                .describe("要创建指针的地址字符串 (例如 '0x1234ABCD')。"),
        };
        this.server.tool("native_createPointer", "根据给定的地址字符串创建一个指针表示。", consolidatedNativeCreateParams, createAgentToolImplementation("native_createPointer", async (params, agentRpc) => {
            return await agentRpc.nativePointerCreate(params.addressValue);
        }));
        // +++ Add Consolidated native_batchOperate +++
        const consolidatedNativeBatchParams = {
            operations: z
                .array(z.enum(["add", "sub", "and", "or", "xor", "shl", "shr"]))
                .describe("要执行的操作类型数组。"),
            addresses: z.array(z.string()).describe("对应的基础指针地址数组。"),
            operands: z.array(z.string()).describe("对应的操作数数组 (字符串表示)。"),
        };
        this.server.tool("native_batchOperate", "(高级) 在一次 RPC 调用中执行多个指针操作 (Add, Subtract, And, Or, Xor, Shl, Shr)。", consolidatedNativeBatchParams, createAgentToolImplementation("native_batchOperate", async (params, agentRpc) => {
            // Assuming agent expects a single object
            const request = {
                operations: params.operations,
                addresses: params.addresses,
                operands: params.operands,
            };
            // Agent side needs to handle parsing string operands if necessary
            return await agentRpc.nativePointerBatchOperate(request);
        }));
        // --- Memory Tools ---
        logger.debug("Registering Memory tools...", "Server");
        // memory_scan - 扫描内存区域查找特定模式
        const memoryScanParams = {
            baseAddress: z.string().describe("扫描的起始内存地址。"),
            size: z.number().int().positive().describe("扫描的内存大小 (字节数)。"),
            pattern: z
                .string()
                .describe("要扫描的内存模式 (例如 '01 ?? cd ef' 或 Frida 模式字符串)。"),
            sync: z
                .boolean()
                .optional()
                .default(false)
                .describe("是否同步执行扫描 (默认: false，即异步执行)。"),
            options: z
                .object({
                limit: z
                    .number()
                    .int()
                    .positive()
                    .optional()
                    .describe("最大匹配数量限制 (可选)。"),
            })
                .optional()
                .describe("扫描选项配置。"),
        };
        this.server.tool("memory_scan", "在指定内存区域扫描特定模式。可选择同步或异步执行。", memoryScanParams, createAgentToolImplementation("memory_scan", async (params, agentRpc) => {
            // 构建符合 MemoryScanOptions 接口的选项对象
            const options = {};
            if (params.options?.limit !== undefined) {
                options.limit = params.options.limit;
            }
            // 如果设置了sync=true，则使用同步扫描
            if (params.sync) {
                logger.info(`执行同步内存扫描，地址: ${params.baseAddress}, 大小: ${params.size}`, "Tool");
                return await agentRpc.memoryScanSync(params.baseAddress, params.size, params.pattern, options);
            }
            else {
                // 否则，使用异步扫描
                logger.info(`执行异步内存扫描，地址: ${params.baseAddress}, 大小: ${params.size}`, "Tool");
                return await agentRpc.memoryScan(params.baseAddress, params.size, params.pattern, options);
            }
        }));
        // 移除 memory_scanSync (已合并到 memory_scan)
        // 合并内存分配相关工具
        const memoryAllocParams = {
            // 核心参数
            size: z.number().int().positive().describe("要分配的内存大小 (字节数)"),
            // 字符串类型参数
            stringType: z
                .enum(["none", "utf8", "utf16", "ansi"])
                .optional()
                .default("none")
                .describe("字符串类型，none表示不是字符串"),
            text: z
                .string()
                .optional()
                .describe("要写入内存的字符串，当stringType不为none时必需"),
            // 内存分配选项
            options: z
                .object({
                near: z.string().optional().describe("尝试在指定地址附近分配内存"),
                maxDistance: z.number().optional().describe("与near地址的最大距离"),
                protection: z
                    .string()
                    .optional()
                    .describe("内存保护属性 (例如 'rwx')"),
            })
                .optional()
                .describe("内存分配的高级选项"),
        };
        this.server.tool("memory_alloc", "智能内存分配：可分配原始内存块、字符串或字节数组。", memoryAllocParams, createAgentToolImplementation("memory_alloc", async (params, agentRpc) => {
            // 根据字符串类型参数决定分配方式
            if (params.stringType !== "none") {
                // 字符串分配模式
                if (!params.text) {
                    throw new Error(`参数'text'在stringType='${params.stringType}'时是必需的`);
                }
                // 根据字符串类型调用不同的分配方法
                switch (params.stringType) {
                    case "utf8":
                        return await agentRpc.memoryAllocUtf8String(params.text);
                    case "utf16":
                        return await agentRpc.memoryAllocUtf16String(params.text);
                    case "ansi":
                        return await agentRpc.memoryAllocAnsiString(params.text);
                }
            }
            else {
                // 原始内存分配模式
                // 构建内存分配选项
                const allocOptions = {};
                if (params.options) {
                    if (params.options.near)
                        allocOptions.near = params.options.near;
                    if (params.options.maxDistance)
                        allocOptions.maxDistance = params.options.maxDistance;
                    if (params.options.protection)
                        allocOptions.protection = params.options
                            .protection;
                }
                // 分配内存
                logger.info(`分配内存: ${params.size} 字节`, "Tool");
                return await agentRpc.memoryAlloc(params.size, allocOptions);
            }
        }));
        // memory_copy
        const memoryCopyParams = {
            destination: z.string().describe("目标内存地址。"),
            source: z.string().describe("源内存地址。"),
            size: z.number().int().positive().describe("要复制的字节数。"),
        };
        this.server.tool("memory_copy", "从一个内存地址复制数据到另一个地址。", memoryCopyParams, createAgentToolImplementation("memory_copy", async (params, agentRpc) => {
            return await agentRpc.memoryCopy(params.destination, params.source, params.size);
        }));
        // memory_dup (Duplicate memory region)
        const memoryDupParams = {
            address: z.string().describe("要复制的内存区域的起始地址。"),
            size: z.number().int().positive().describe("要复制的内存区域的大小 (字节数)。"),
        };
        this.server.tool("memory_dup", "复制指定的内存区域并返回新分配区域的地址。", memoryDupParams, createAgentToolImplementation("memory_dup", async (params, agentRpc) => {
            return await agentRpc.memoryDup(params.address, params.size);
        }));
        // memory_protect
        const memoryProtectParams = {
            address: z.string().describe("要修改保护属性的内存区域的起始地址。"),
            size: z.number().int().positive().describe("内存区域的大小 (字节数)。"),
            protection: z
                .string()
                .regex(/^[r-][w-][x-]$/)
                .describe("新的内存保护属性 (格式: 'rwx', 'rw-', 'r-x', 'r--', '-wx', '-w-', '--x', '---')。"),
        };
        this.server.tool("memory_protect", "修改指定内存区域的保护属性。", memoryProtectParams, createAgentToolImplementation("memory_protect", async (params, agentRpc) => {
            // Cast protection to PageProtection if the agent expects it
            return await agentRpc.memoryProtect(params.address, params.size, params.protection);
        }));
        // memory_queryProtection
        const memoryQueryProtectionParams = {
            address: z.string().describe("要查询保护属性的内存地址。"),
        };
        this.server.tool("memory_queryProtection", "查询指定内存地址的保护属性。", memoryQueryProtectionParams, createAgentToolImplementation("memory_queryProtection", async (params, agentRpc) => {
            return await agentRpc.memoryQueryProtection(params.address);
        }));
        // memory_patchCode
        const memoryPatchCodeParams = {
            address: z.string().describe("要应用补丁的内存地址。"),
            patchBytes: z
                .array(z.number().int().min(0).max(255))
                .describe("要写入的补丁字节数组。"),
            apply: z
                .boolean()
                .optional()
                .default(true)
                .describe("是否立即应用补丁，默认为 true。"), // Assuming agent might support reverting
        };
        this.server.tool("memory_patchCode", "向指定内存地址写入字节码补丁。", memoryPatchCodeParams, createAgentToolImplementation("memory_patchCode", async (params, agentRpc) => {
            // Assuming agent method name matches and handles the 'apply' flag if needed
            return await agentRpc.memoryPatchCode(params.address, params.patchBytes /*, params.apply */);
        }));
        // --- Process Tools ---
        logger.debug("Registering Process tools...", "Server");
        // process_getInfo
        this.server.tool("process_getInfo", "获取目标进程的基本信息 (例如架构、平台、页面大小)。", {}, // No parameters
        createAgentToolImplementation("process_getInfo", async (_params, agentRpc) => {
            return await agentRpc.processGetInfo();
        }));
        // process_getDirs
        this.server.tool("process_getDirs", "获取与进程相关的常见目录路径 (当前、主目录、临时目录)。", {}, // No parameters
        createAgentToolImplementation("process_getDirs", async (_params, agentRpc) => {
            return await agentRpc.processGetDirs();
        }));
        // process_isDebuggerAttached
        this.server.tool("process_isDebuggerAttached", "检查是否有调试器附加到当前进程。", {}, // No parameters
        createAgentToolImplementation("process_isDebuggerAttached", async (_params, agentRpc) => {
            return await agentRpc.processIsDebuggerAttached();
        }));
        // process_getCurrentThreadId
        this.server.tool("process_getCurrentThreadId", "获取当前执行 Frida Agent 代码的线程 ID。", {}, // No parameters
        createAgentToolImplementation("process_getCurrentThreadId", async (_params, agentRpc) => {
            return await agentRpc.processGetCurrentThreadId();
        }));
        // process_enumerateThreads
        this.server.tool("process_enumerateThreads", "枚举目标进程中的所有线程及其详细信息。", {}, // No parameters
        createAgentToolImplementation("process_enumerateThreads", async (_params, agentRpc) => {
            return await agentRpc.processEnumerateThreads();
        }));
        // +++ 合并后的 process_findModule +++
        const processFindModuleParams = {
            address: z.string().optional().describe("要查找其所属模块的内存地址 (与 name 二选一)。"),
            name: z.string().optional().describe("要查找的模块的名称 (与 address 二选一)。"),
        };
        this.server.tool("process_findModule", "查找模块。可以通过内存地址或模块名称进行查找 (二选一)。", processFindModuleParams, createAgentToolImplementation("process_findModule", async (params, agentRpc) => {
            const { address, name } = params;
            if ((!address && !name) || (address && name)) {
                throw new Error("必须且只能提供 'address' 或 'name' 参数中的一个。");
            }
            if (address) {
                return await agentRpc.processFindModuleByAddress(address);
            }
            else { // name 必须存在 (由上面的检查保证)
                return await agentRpc.processFindModuleByName(name);
            }
        }));
        // process_findRangeByAddress
        const processFindRangeByAddressParams = {
            address: z.string().describe("要查找其所属内存范围的地址。"),
        };
        this.server.tool("process_findRangeByAddress", "根据内存地址查找包含该地址的内存范围。", processFindRangeByAddressParams, createAgentToolImplementation("process_findRangeByAddress", async (params, agentRpc) => {
            return await agentRpc.processFindRangeByAddress(params.address);
        }));
        // +++ 合并后的 process_enumerate +++
        // 先定义基础的 ZodObject
        const baseProcessEnumerateParams = z.object({
            type: z.enum(["modules", "ranges", "mallocRanges"]).describe("要枚举的对象类型。"),
            specifier: z.string().regex(/^[r-][w-][x-]$|^all$/).optional().describe("当 type 为 'ranges' 时必需，指定内存保护属性 (例如 'rwx', 'r-x') 或 'all'。"),
            // coalesce: z.boolean().optional().default(false).describe("当 type 为 'ranges' 时可选，是否合并相邻范围 (默认: false)。") // 暂不实现，Agent RPC 可能不支持
        });
        // 再应用 refine 来创建最终验证器
        const refinedProcessEnumerateParams = baseProcessEnumerateParams.refine(data => !(data.type === 'ranges' && data.specifier === undefined), {
            message: "当 type 为 'ranges' 时，必须提供 'specifier' 参数。",
            path: ["specifier"], // 指向错误的字段
        });
        // 传递基础对象的 shape 给 server.tool
        this.server.tool("process_enumerate", "枚举进程中的对象，例如模块、内存范围或 malloc 分配的范围。", baseProcessEnumerateParams.shape, // <<< 使用基础对象的 shape
        createAgentToolImplementation(// 类型推断也使用基础对象的 shape
        "process_enumerate", async (params, agentRpc) => {
            // 在实现内部，我们仍然依赖 refine 过的验证器来保证数据有效性
            // Zod 在处理请求时会使用 refinedProcessEnumerateParams 进行验证
            // 因此这里的 params 类型实际上是 z.infer<typeof refinedProcessEnumerateParams>
            // （尽管 createAgentToolImplementation 的泛型是基于 base shape）
            // 手动进行一次验证（理论上 MCP SDK 会先做，但为了保险）
            try {
                refinedProcessEnumerateParams.parse(params);
            }
            catch (e) {
                // 如果验证失败，抛出错误，createAgentToolImplementation 的 catch 会处理
                throw new Error(`内部参数验证失败: ${e instanceof ZodError ? e.errors.map(err => err.message).join(', ') : e}`);
            }
            switch (params.type) {
                case "modules":
                    return await agentRpc.processEnumerateModules();
                case "ranges":
                    // refine 保证了 specifier 存在
                    const spec = {};
                    if (params.specifier !== 'all') {
                        spec.protection = params.specifier; // 使用非空断言
                    }
                    // spec.coalesce = params.coalesce ?? false; // 如果实现 coalesce
                    // 传递 spec 对象给 agentRpc
                    return await agentRpc.processEnumerateRanges(spec);
                case "mallocRanges":
                    return await agentRpc.processEnumerateMallocRanges();
                default:
                    //理论上不会到这里，因为有 enum 和 refine 验证
                    const exhaustiveCheck = params.type; // 用于编译时检查
                    throw new Error(`Unsupported enumeration type: ${exhaustiveCheck}`);
            }
        }));
        // --- 移除 process_enumerateModules ---
        // --- 移除 process_enumerateRanges ---
        // --- 移除 process_enumerateMallocRanges ---
        // --- Stalker Tools ---
        logger.debug("Registering Stalker tools...", "Server");
        // +++ 合并后的 stalker_setFollow +++
        const stalkerSetFollowParams = {
            threadId: z.number().int().describe("要开始或停止跟踪的目标线程 ID。"),
            options: z.object({
                events: z.object({
                    call: z.boolean().optional().default(true).describe("跟踪函数调用事件 (默认: true)。"),
                    ret: z.boolean().optional().default(true).describe("跟踪函数返回事件 (默认: true)。"),
                    exec: z.boolean().optional().default(true).describe("跟踪每条指令执行事件 (可能产生大量数据) (默认: true)。"),
                    block: z.boolean().optional().default(true).describe("跟踪基本块执行事件 (默认: true)。"),
                    compile: z.boolean().optional().default(false).describe("跟踪代码块编译事件 (默认: false)。"),
                }).optional().describe("要跟踪的事件类型配置。"),
            }).optional().describe("Stalker 跟踪选项。如果提供此参数，则开始跟踪；否则停止跟踪。"),
        };
        this.server.tool("stalker_setFollow", "开始或停止 Stalker 跟踪指定线程。提供 options 参数以开始跟踪，不提供则停止跟踪。", stalkerSetFollowParams, createAgentToolImplementation("stalker_setFollow", async (params, agentRpc) => {
            if (params.options) {
                // 开始跟踪
                const followOptions = {
                    events: params.options.events // 直接传递 Zod 解析后的对象
                };
                logger.info(`Starting Stalker follow on thread ${params.threadId}`, "Tool");
                return await agentRpc.stalkerFollow(params.threadId, followOptions);
            }
            else {
                // 停止跟踪
                logger.info(`Stopping Stalker follow on thread ${params.threadId}`, "Tool");
                return await agentRpc.stalkerUnfollow(params.threadId);
            }
        }));
        // stalker_excludeRange (保持不变)
        const stalkerExcludeRangeParams = {
            baseAddress: z.string().describe("要从 Stalker 检测中排除的内存范围的起始地址。"),
            size: z.number().int().positive().describe("要排除的内存范围的大小 (字节数)。"),
        };
        this.server.tool("stalker_excludeRange", "将指定的内存范围从 Stalker 检测中排除。", stalkerExcludeRangeParams, createAgentToolImplementation("stalker_excludeRange", async (params, agentRpc) => {
            const range = {
                base: params.baseAddress,
                size: params.size,
            };
            return await agentRpc.stalkerExclude(range);
        }));
        // +++ 合并后的 stalker_manageEvents +++
        const stalkerManageEventsParams = {
            threadId: z.number().int().describe("目标线程 ID。"),
            action: z.enum(["get", "clear"]).describe("要执行的操作: 'get' 获取事件, 'clear' 清除事件。"),
        };
        this.server.tool("stalker_manageEvents", "获取或清除指定线程累积的 Stalker 事件。", stalkerManageEventsParams, createAgentToolImplementation("stalker_manageEvents", async (params, agentRpc) => {
            if (params.action === "get") {
                logger.info(`Getting Stalker events for thread ${params.threadId}`, "Tool");
                return await agentRpc.stalkerGetThreadEvents(params.threadId);
            }
            else { // action === "clear"
                logger.info(`Clearing Stalker events for thread ${params.threadId}`, "Tool");
                return await agentRpc.stalkerClearThreadEvents(params.threadId);
            }
        }));
        // stalker_flush (保持不变)
        this.server.tool("stalker_flush", "刷新当前执行 Agent RPC 的线程的 Stalker 事件队列 (注意: 作用于 Agent 内部线程)。", {}, // No parameters
        createAgentToolImplementation("stalker_flush", async (_params, agentRpc) => {
            return await agentRpc.stalkerFlush();
        }));
        // stalker_garbageCollect (保持不变)
        this.server.tool("stalker_garbageCollect", "触发 Stalker 的内部垃圾回收机制。", {}, // No parameters
        createAgentToolImplementation("stalker_garbageCollect", async (_params, agentRpc) => {
            return await agentRpc.stalkerGarbageCollect();
        }));
        // +++ 合并后的 stalker_manageConfig +++
        const stalkerManageConfigParams = {
            config: z.object({
                trustThreshold: z.number().int().optional().describe("Stalker 信任阈值。"),
                queueCapacity: z.number().int().positive().optional().describe("事件队列容量。"),
                queueDrainInterval: z.number().int().positive().optional().describe("事件队列排空间隔 (毫秒)。"),
            }).optional().describe("要设置的 Stalker 配置参数。如果省略此参数，则获取当前配置。"),
        };
        this.server.tool("stalker_manageConfig", "获取或设置 Stalker 的配置参数。提供 config 参数以设置，省略则获取。", stalkerManageConfigParams, createAgentToolImplementation("stalker_manageConfig", async (params, agentRpc) => {
            if (params.config) {
                // 设置配置
                const newConfig = {};
                if (params.config.trustThreshold !== undefined)
                    newConfig.trustThreshold = params.config.trustThreshold;
                if (params.config.queueCapacity !== undefined)
                    newConfig.queueCapacity = params.config.queueCapacity;
                if (params.config.queueDrainInterval !== undefined)
                    newConfig.queueDrainInterval = params.config.queueDrainInterval;
                if (Object.keys(newConfig).length === 0) {
                    throw new Error("设置配置时，config 对象必须至少包含一个有效参数 (trustThreshold, queueCapacity, queueDrainInterval)。");
                }
                logger.info(`Setting Stalker config: ${JSON.stringify(newConfig)}`, "Tool");
                return await agentRpc.stalkerSetConfig(newConfig);
            }
            else {
                // 获取配置
                logger.info("Getting Stalker config", "Tool");
                return await agentRpc.stalkerGetConfig();
            }
        }));
        // --- Kernel Tools ---
        logger.debug("Registering Kernel tools...", "Server");
        // kernel_getInfo
        this.server.tool("kernel_getInfo", "获取内核接口的基本信息 (是否可用, 基地址, 页面大小)。", {}, // No parameters
        createAgentToolImplementation("kernel_getInfo", async (_params, agentRpc) => {
            logger.info("Getting kernel info", "Tool");
            // Check availability first? Agent RPC might do this.
            return await agentRpc.kernelGetInfo();
        }));
        // +++ 合并后的 kernel_enumerate +++
        const baseKernelEnumerateParams = z.object({
            type: z.enum(["modules", "ranges", "moduleRanges"]).describe("要枚举的对象类型。"),
            protection: z.string().regex(/^[r-][w-][x-]$/).optional().describe("当 type 为 'ranges' 或 'moduleRanges' 时必需，指定内存保护属性 (例如 'rwx', 'r-x')。"),
            moduleName: z.string().optional().describe("当 type 为 'moduleRanges' 时可选，指定内核模块名称 (省略则枚举所有模块)。"),
        });
        // 使用 refine 进行条件验证
        const refinedKernelEnumerateParams = baseKernelEnumerateParams.refine(data => {
            // 如果类型是 ranges 或 moduleRanges，则 protection 必须提供
            if ((data.type === "ranges" || data.type === "moduleRanges") && data.protection === undefined) {
                return false;
            }
            // 如果类型不是 moduleRanges，则 moduleName 不应提供 (避免混淆)
            if (data.type !== "moduleRanges" && data.moduleName !== undefined) {
                // 或者可以忽略多余的 moduleName，这里选择严格验证
                return false; // 返回 false 表示验证失败
            }
            return true; // 所有检查通过
        }, {
            // 自定义错误消息可以更具体，但这里用一个通用的
            message: "参数组合无效：'ranges' 或 'moduleRanges' 需要 'protection'；'moduleName' 仅用于 'moduleRanges'。",
            // 可以指定 path 来定位错误，但对于复杂条件可能不直观
            // path: ["protection", "moduleName"],
        });
        this.server.tool("kernel_enumerate", "枚举内核对象：模块、内存范围或特定模块的内存范围。根据 type 不同，可能需要 protection 和 moduleName 参数。", baseKernelEnumerateParams.shape, // 使用基础 shape
        createAgentToolImplementation("kernel_enumerate", async (params, agentRpc) => {
            // 内部依赖 refine 过的验证器保证数据有效性
            try {
                refinedKernelEnumerateParams.parse(params);
            }
            catch (e) {
                throw new Error(`内部参数验证失败: ${e instanceof ZodError ? e.errors.map(err => err.message).join(', ') : e}`);
            }
            switch (params.type) {
                case "modules":
                    logger.info("Enumerating kernel modules", "Tool");
                    return await agentRpc.kernelEnumerateModules();
                case "ranges":
                    // refine 保证了 protection 存在
                    logger.info(`Enumerating kernel ranges with protection ${params.protection}`, "Tool");
                    return await agentRpc.kernelEnumerateRanges(params.protection);
                case "moduleRanges":
                    // refine 保证了 protection 存在
                    logger.info(`Enumerating ranges for kernel module ${params.moduleName ?? 'all'} with protection ${params.protection}`, "Tool");
                    return await agentRpc.kernelEnumerateModuleRanges(params.moduleName ?? null, params.protection);
                default:
                    const exhaustiveCheck = params.type;
                    throw new Error(`Unsupported enumeration type: ${exhaustiveCheck}`);
            }
        }));
        // kernel_alloc
        const kernelAllocParams = {
            size: z.number().int().positive().describe("要在内核空间分配的内存大小 (字节数)。"),
        };
        this.server.tool("kernel_alloc", "在内核空间分配内存。", kernelAllocParams, createAgentToolImplementation("kernel_alloc", async (params, agentRpc) => {
            logger.info(`Allocating ${params.size} bytes in kernel space`, "Tool");
            return await agentRpc.kernelAlloc(params.size);
        }));
        // kernel_protect
        const kernelProtectParams = {
            address: z.string().describe("要修改保护属性的内核内存地址。"),
            size: z.number().int().positive().describe("内存区域的大小 (字节数)。"),
            protection: z.string().regex(/^[r-][w-][x-]$/).describe("新的内存保护属性 (格式: 'rwx', 'rw-', 'r-x', 等)。"),
        };
        this.server.tool("kernel_protect", "修改内核内存区域的保护属性。", kernelProtectParams, createAgentToolImplementation("kernel_protect", async (params, agentRpc) => {
            logger.info(`Setting kernel protection for ${params.address} (${params.size} bytes) to ${params.protection}`, "Tool");
            return await agentRpc.kernelProtect(params.address, params.size, params.protection);
        }));
        // kernel_scan
        const kernelScanParams = {
            baseAddress: z.string().describe("扫描的起始内核内存地址。"),
            size: z.number().int().positive().describe("扫描的内存大小 (字节数)。"),
            pattern: z.string().describe("要扫描的内存模式 (例如 '01 ?? cd ef')。"),
            sync: z.boolean().optional().default(false).describe("是否同步执行扫描 (默认: false，即异步执行)。"),
            // 注意：异步扫描的回调（onMatch, onComplete, onError）目前未通过此接口暴露。
            // 如果需要异步回调功能，需要修改 AgentRpc 接口和此工具的实现。
            // limit 参数当前也未支持。
        };
        this.server.tool("kernel_scan", "在指定的内核内存区域扫描特定模式。可选择同步或异步执行。", kernelScanParams, createAgentToolImplementation("kernel_scan", async (params, agentRpc) => {
            // 当前 agentRpc.kernelScan 和 kernelScanSync 的签名预期只有 3 个参数。
            // 异步回调和 limit 参数当前未传递。
            if (params.sync) {
                logger.info(`扫描内核内存(同步)，地址: ${params.baseAddress}, 大小: ${params.size}, 模式: ${params.pattern}`, "Tool");
                // 调用 agentRpc 时不传递 options 或 limit (根据当前推断的签名)
                return await agentRpc.kernelScanSync(params.baseAddress, params.size, params.pattern);
            }
            else {
                logger.info(`扫描内核内存(异步)，地址: ${params.baseAddress}, 大小: ${params.size}, 模式: ${params.pattern}`, "Tool");
                // 调用 agentRpc 时不传递 options 或 limit (根据当前推断的签名)
                // 注意：真正的异步扫描可能需要不同的处理方式（例如使用回调），
                // 但当前实现只是调用了一个返回 Promise 的异步函数，并未处理回调。
                return await agentRpc.kernelScan(params.baseAddress, params.size, params.pattern, {});
            }
        }));
        // +++ 合并后的 kernel_read +++
        const kernelReadParams = {
            address: z.string().describe("要读取数据的内核内存地址。"),
            dataType: z.enum([
                "s8", "u8", "s16", "u16", "s32", "u32",
                "float", "double", "bytearray", "cstring", "utf8", "utf16"
            ]).describe("要读取的数据类型。"),
            lengthOrSize: z.number().int().positive().optional().describe("读取 'bytearray', 'cstring', 'utf8', 'utf16' 时必需的长度或大小。"),
        };
        this.server.tool("kernel_read", "从指定的内核内存地址读取指定类型的数据。", kernelReadParams, createAgentToolImplementation("kernel_read", async (params, agentRpc) => {
            const { address, dataType, lengthOrSize } = params;
            let resultPromise;
            switch (dataType) {
                case "s8":
                    resultPromise = agentRpc.kernelReadS8(address);
                    break;
                case "u8":
                    resultPromise = agentRpc.kernelReadU8(address);
                    break;
                case "s16":
                    resultPromise = agentRpc.kernelReadS16(address);
                    break;
                case "u16":
                    resultPromise = agentRpc.kernelReadU16(address);
                    break;
                case "s32":
                    resultPromise = agentRpc.kernelReadS32(address);
                    break;
                case "u32":
                    resultPromise = agentRpc.kernelReadU32(address);
                    break;
                case "float":
                    resultPromise = agentRpc.kernelReadFloat(address);
                    break;
                case "double":
                    resultPromise = agentRpc.kernelReadDouble(address);
                    break;
                case "bytearray":
                    if (lengthOrSize === undefined)
                        throw new Error("`lengthOrSize` is required for 'bytearray'");
                    resultPromise = agentRpc.kernelReadByteArray(address, lengthOrSize);
                    break;
                case "cstring":
                    if (lengthOrSize === undefined)
                        throw new Error("`lengthOrSize` is required for 'cstring'");
                    resultPromise = agentRpc.kernelReadCString(address, lengthOrSize);
                    break;
                case "utf8":
                    if (lengthOrSize === undefined)
                        throw new Error("`lengthOrSize` is required for 'utf8'");
                    resultPromise = agentRpc.kernelReadUtf8String(address, lengthOrSize);
                    break;
                case "utf16":
                    if (lengthOrSize === undefined)
                        throw new Error("`lengthOrSize` is required for 'utf16'");
                    resultPromise = agentRpc.kernelReadUtf16String(address, lengthOrSize);
                    break;
                default: throw new Error(`Internal error: Unsupported kernel read data type encountered: ${dataType}`);
            }
            return await resultPromise;
        }));
        // +++ 合并后的 kernel_write +++
        const kernelWriteParams = {
            address: z.string().describe("要写入数据的内核内存地址。"),
            dataType: z.enum([
                "s8", "u8", "s16", "u16", "s32", "u32",
                "float", "double", "bytearray", "utf8", "utf16"
            ]).describe("要写入的数据类型。"),
            value: z.any().describe("要写入的值 (bytearray 需数字数组)。"),
        };
        this.server.tool("kernel_write", "向指定的内核内存地址写入指定类型的数据。", kernelWriteParams, createAgentToolImplementation("kernel_write", async (params, agentRpc) => {
            const { address, dataType, value } = params;
            // ... (类型验证)
            let resultPromise;
            switch (dataType) {
                case "s8":
                    resultPromise = agentRpc.kernelWriteS8(address, value);
                    break;
                case "u8":
                    resultPromise = agentRpc.kernelWriteU8(address, value);
                    break;
                case "s16":
                    resultPromise = agentRpc.kernelWriteS16(address, value);
                    break;
                case "u16":
                    resultPromise = agentRpc.kernelWriteU16(address, value);
                    break;
                case "s32":
                    resultPromise = agentRpc.kernelWriteS32(address, value);
                    break;
                case "u32":
                    resultPromise = agentRpc.kernelWriteU32(address, value);
                    break;
                case "float":
                    resultPromise = agentRpc.kernelWriteFloat(address, value);
                    break;
                case "double":
                    resultPromise = agentRpc.kernelWriteDouble(address, value);
                    break;
                case "bytearray":
                    resultPromise = agentRpc.kernelWriteByteArray(address, value);
                    break;
                case "utf8":
                    resultPromise = agentRpc.kernelWriteUtf8String(address, value);
                    break;
                case "utf16":
                    resultPromise = agentRpc.kernelWriteUtf16String(address, value);
                    break;
                default: throw new Error(`Internal error: Unsupported kernel write data type encountered: ${dataType}`);
            }
            return await resultPromise;
        }));
        // --- Socket Tools ---
        // ... (To be implemented)
        // --- Interceptor Tools ---
        // ... (To be implemented)
        logger.info("MCP tool registration complete.", "Server");
    }
    // --- End NEW Tool Registration Method ---
    async startSSEServer(port, endpoint) {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        // Enable CORS for potential browser clients
        this.app.use(cors());
        // SSE Connection Endpoint
        this.app.get(endpoint, async (req, res) => {
            logger.info(`Client connected from ${req.ip}`, "SSE");
            // Clean up previous transport if any
            if (this.sseTransport) {
                logger.warn("Closing previous SSE transport due to new connection.", "SSE");
                await this.sseTransport
                    .close()
                    .catch((err) => logger.error(`Error closing previous SSE transport: ${err}`, "SSE"));
            }
            this.sseTransport = new SSEServerTransport(endpoint, res);
            req.on("close", async () => {
                logger.info(`Client disconnected ${req.ip}`, "SSE");
                if (this.sseTransport) {
                    try {
                        await this.sseTransport.close();
                        logger.info("Transport closed on client disconnect.", "SSE");
                    }
                    catch (err) {
                        logger.error(`Error closing transport on disconnect: ${err}`, "SSE");
                    }
                    this.sseTransport = undefined;
                }
            });
            try {
                await this.server.connect(this.sseTransport);
                logger.info("MCP Server connected via SSE transport.", "SSE");
            }
            catch (err) {
                logger.error(`Error connecting MCP server to SSE transport: ${err}`, "SSE");
                if (!res.headersSent) {
                    res.status(500).end("Failed to establish SSE connection with server");
                }
                this.sseTransport = undefined;
            }
        });
        // POST Message Endpoint
        this.app.post(endpoint, express.json({ limit: "50mb" }), async (req, res) => {
            if (this.sseTransport) {
                try {
                    await this.sseTransport.handlePostMessage(req, res, req.body);
                }
                catch (err) {
                    logger.error(`Error handling POST message: ${err}`, "SSE");
                    if (!res.headersSent) {
                        res.status(500).json({ error: "Error processing request" });
                    }
                }
            }
            else {
                logger.warn("Received POST message but no active SSE transport.", "SSE");
                res
                    .status(400)
                    .json({ error: "SSE connection not established or closed" });
            }
        });
        // Start Listening
        await new Promise((resolve, reject) => {
            this.httpServer?.listen(port, () => {
                logger.info(`HTTP Server Listening on port ${port}`, "Server");
                logger.info(`SSE Endpoint Ready at http://localhost:${port}${endpoint}`, "SSE");
                resolve();
            });
        });
    }
    // Modify start method
    async start(config) {
        this.currentConfig = config;
        logger.info(`Starting MCP Server with transport: ${config.transport}`, "Server");
        await this.stop();
        try {
            if (config.transport === "sse") {
                const port = config.port ?? 3000;
                const endpoint = config.endpoint ?? "/mcp";
                await this.startSSEServer(port, endpoint);
            }
            else {
                const transport = new StdioServerTransport();
                await this.server.connect(transport);
                logger.info("MCP Server connected via stdio transport.", "Server");
            }
        }
        catch (error) {
            logger.error(`Failed to start server: ${error}`, "Server");
            await this.stop();
            throw error;
        }
    }
    // Modify stop method
    async stop() {
        logger.info("Attempting to stop server and detach Frida session...", "Server");
        let hadError = false;
        try {
            await this.detachFromProcess();
        }
        catch (detachErr) {
            hadError = true;
        }
        try {
            if (this.server.isConnected()) {
                await this.server.close();
                logger.info("MCP server connections closed.", "Server");
            }
        }
        catch (err) {
            logger.error(`Error closing MCP server connections: ${err}`, "Server");
            hadError = true;
        }
        if (this.httpServer) {
            try {
                await new Promise((resolve, reject) => {
                    this.httpServer?.close((err) => {
                        if (err)
                            return reject(err);
                        resolve();
                    });
                });
                logger.info("HTTP server closed.", "Server");
            }
            catch (err) {
                logger.error(`Error closing HTTP server: ${err}`, "Server");
                hadError = true;
            }
            this.httpServer = undefined;
            this.app = undefined;
            this.sseTransport = undefined;
        }
        this.currentConfig = undefined;
        if (!hadError) {
            logger.info("Server stopped successfully.", "Server");
        }
        else {
            logger.warn("Server stopped with errors during cleanup.", "Server");
        }
    }
}
//# sourceMappingURL=server.js.map
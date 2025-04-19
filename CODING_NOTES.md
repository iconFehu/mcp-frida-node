# mcp-frida 编码注意事项与最佳实践

本文档总结了在开发 `mcp-frida` 服务器时遇到的一些关键点和潜在问题，旨在为后续开发和维护提供参考。

## 1. `McpServer` 初始化与配置

*   **启用工具能力**: 在创建 `McpServer` 实例时，必须在构造函数的第一个参数（`serverInfo`）中包含 `capabilities: { tools: {} }` 配置项。这会告知 SDK 该服务器实例将提供工具功能，并使 `tool` 方法可用。

    ```typescript
    this.server = new McpServer({
        name: "mcp-frida-server",
        version: "0.1.0",
        capabilities: { // <<< 必须包含这个
             tools: {}
        }
    });
    ```

## 2. 工具注册 (`McpServer.tool`)

*   **直接注册**: 工具现在直接在 `src/server.ts` 的 `_registerAllTools` 方法中使用 `this.server.tool(...)` 进行注册，不再需要 `tool-provider.ts`。
*   **参数签名**: 该方法接受以下参数：
    1.  `name` (string): AI 调用的工具名称 (推荐使用 `category.action` 格式，例如 `"native.readPointer"` 或 `"system.attachProcess"`)。
    2.  `description` (string): 工具功能的自然语言描述。
    3.  `paramsSchema` (`ZodRawShape`): **使用 `zod` 库定义的参数 schema**。注意，这里传递的是 Zod 属性对象本身 (`{ key: ZodTypeAny }` 形式)，**不是** `z.object(...)`。
    4.  `implementation` (function): 一个 `async` 回调函数，当 AI 调用此工具时执行。
*   **Zod Schema 定义**: 每个工具的 Zod 参数 schema 直接在其 `this.server.tool` 调用之前定义。记得使用 `.optional()` 处理非必需参数，并使用 `.describe()` 添加描述。

    ```typescript
    // server.ts 内的 _registerAllTools 方法
    const myToolParams: ZodRawShape = {
        param1: z.string().describe("第一个参数"),
        param2: z.number().optional().describe("第二个可选参数")
    };
    const myToolImpl = async (params: { param1: string; param2?: number }): Promise<CallToolResult> => {
        // ... 实现逻辑 ...
        const result = await someAsyncTask(params.param1);
        return { content: [{ type: 'text', text: JSON.stringify(result) }] };
    };

    this.server.tool("myCategory.myAction", "工具描述", myToolParams, myToolImpl);
    ```

## 3. 工具实现回调 (`implementation` 函数)

*   **返回值**: 回调函数必须返回一个 `Promise<CallToolResult>`。`CallToolResult` 是一个对象，通常包含一个 `content` 数组（其中每个元素是 `{ type: 'text', text: '...' }` 或其他类型）和可选的 `isError: true` 标志。

    ```typescript
    // 成功返回
    return { content: [{ type: 'text', text: JSON.stringify(someResultObject) }] };
    // 失败返回
    return { content: [{ type: 'text', text: `错误信息: ${errorMessage}` }], isError: true };
    ```
*   **错误处理**: 在实现函数内部使用 `try...catch` 来捕获错误，并将错误包装成 `CallToolResult` 返回。确保返回有意义的错误信息。
*   **检查注入状态**: 对于需要与 Frida Agent 交互的工具 (例如 `native.*`, `memory.*` 等)，必须在实现函数的开头检查 `this.agentRpc` 是否存在且会话是否已连接。如果未连接，应抛出错误或返回错误 `CallToolResult`，提示用户需要先调用 `system.attachProcess`。
*   **Agent RPC 调用**: 
    *   现在每个工具的实现函数负责调用正确的 `this.agentRpc` 方法。
    *   需要注意 Agent 端 RPC 方法期望的参数签名（是接收一个包含所有参数的对象，还是接收多个独立的参数）。根据 Linter 提示或 Agent 实现进行调整。
    *   对于"聚合"工具（例如 `native.read` 根据 `dataType` 调用不同的底层 RPC），分发逻辑现在位于各自工具的实现函数内部。

## 4. 服务器端工具

*   像 `system.attachProcess` 和 `system.listAttachedSession` 这样操作服务器本身状态的工具，它们的实现函数直接调用 `McpFridaServer` 类的相应方法（如 `this.attachToProcess()` 或 `this.getCurrentSessionInfo()`）。它们不需要检查 `this.agentRpc`。

## 5. Frida 状态管理与解耦

*   Frida 的连接状态 (`fridaSession`, `agentRpc`, `currentTarget`) 现在由 `McpFridaServer` 类内部管理。
*   服务器启动时不再自动附加进程。附加操作由 `system.attachProcess` 工具触发。
*   `onDetached`
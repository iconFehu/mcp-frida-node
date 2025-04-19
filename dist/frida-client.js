import frida from 'frida';
import { EventEmitter } from 'events';
import fs from 'fs/promises'; // Use promises for async file reading
import path from 'path';
import { logger } from './utils/logger.js'; // <<< Import logger
export class FridaClient extends EventEmitter {
    device;
    session;
    script;
    agentRpc;
    isAttached = false;
    reconnectTimer;
    targetProcess;
    agentScriptContent;
    constructor() {
        super();
        // Use async getLocalDevice, but don't await in constructor
        // Consider moving device initialization to an async init() method
        frida.getLocalDevice().then(device => {
            this.device = device;
            // Add null check before accessing properties
            if (this.device) {
                // console.log(`[FridaClient] Using device: ${this.device.name} (${this.device.id})`);
                logger.info(`Using device: ${this.device.name} (${this.device.id})`, 'FridaClient');
            }
            else {
                // console.error("[FridaClient] Could not get local device.");
                logger.error("Could not get local device.", 'FridaClient');
            }
        }).catch(error => {
            // console.error("[FridaClient] Error getting local device:", error);
            logger.error(`Error getting local device: ${error}`, 'FridaClient');
        });
    }
    getIsAttached() {
        return this.isAttached;
    }
    async loadAgentScript() {
        // Prioritize compiled script
        const compiledPath = path.join(process.cwd(), '_agent.js'); // Assuming build steps place it here
        try {
            await fs.access(compiledPath); // Check if file exists and is accessible
            this.agentScriptContent = await fs.readFile(compiledPath, 'utf8');
            // console.log(`[FridaClient] Loaded compiled agent script: ${compiledPath} (${this.agentScriptContent.length} bytes)`);
            logger.info(`Loaded compiled agent script: ${compiledPath} (${this.agentScriptContent.length} bytes)`, 'FridaClient');
            return this.agentScriptContent;
        }
        catch (compileErr) {
            // console.warn(`[FridaClient] Compiled agent script not found or readable at ${compiledPath}. Falling back...`, compileErr);
            logger.warn(`Compiled agent script not found or readable at ${compiledPath}. Falling back... Error: ${compileErr}`, 'FridaClient');
            // Fallback: Load from mcp-frida-agent project's dist (adjust path as needed)
            // This path assumes mcp-frida and mcp-frida-agent are sibling directories
            const fallbackPath = path.resolve(process.cwd(), '../mcp-frida-agent/dist/_agent.js');
            try {
                await fs.access(fallbackPath);
                this.agentScriptContent = await fs.readFile(fallbackPath, 'utf8');
                // console.log(`[FridaClient] Loaded agent script from fallback path: ${fallbackPath} (${this.agentScriptContent.length} bytes)`);
                logger.info(`Loaded agent script from fallback path: ${fallbackPath} (${this.agentScriptContent.length} bytes)`, 'FridaClient');
                return this.agentScriptContent;
            }
            catch (fallbackErr) {
                // console.error(`[FridaClient] Failed to load agent script from both paths!`, fallbackErr);
                logger.error(`Failed to load agent script from both paths! Error: ${fallbackErr}`, 'FridaClient');
                throw new Error(`Frida agent script not found at ${compiledPath} or ${fallbackPath}`);
            }
        }
    }
    async attach(target) {
        if (!this.device) {
            throw new Error("Frida device not initialized. Cannot attach.");
        }
        if (this.isAttached) {
            // console.warn(`[FridaClient] Already attached to process ${this.targetProcess}. Detaching first.`);
            logger.warn(`Already attached to process ${this.targetProcess}. Detaching first.`, 'Attach');
            await this.detach();
        }
        this.targetProcess = target;
        // console.log(`[FridaClient] Attaching to target: ${target}...`);
        logger.info(`Attaching to target: ${target}...`, 'Attach');
        try {
            this.session = await this.device.attach(target);
            // console.log(`[FridaClient] Attached to session: ${this.session?.pid}`);
            logger.info(`Attached to session: ${this.session?.pid}`, 'Attach');
            this.isAttached = true;
            // Setup message handling and detachment listeners
            this.session?.detached.connect(this.onDetached);
            // Load or reload the agent script
            const scriptContent = await this.loadAgentScript();
            this.script = await this.session?.createScript(scriptContent);
            if (!this.script) {
                throw new Error("Failed to create script object.");
            }
            this.script.message.connect(this.onMessage);
            await this.script.load();
            // console.log('[FridaClient] Agent script loaded successfully.');
            logger.info('Agent script loaded successfully.', 'Attach');
            // Store RPC exports
            this.agentRpc = this.script.exports;
            // console.log('[FridaClient] Agent RPC exports ready.');
            logger.info('Agent RPC exports ready.', 'Attach');
            // Emit attached event if needed
            this.emit('attached');
        }
        catch (error) {
            // console.error(`[FridaClient] Failed to attach or load script:`, error);
            logger.error(`Failed to attach or load script: ${error}`, 'Attach');
            this.isAttached = false;
            this.session = undefined;
            this.script = undefined;
            this.agentRpc = undefined;
            throw error; // Re-throw the error
        }
    }
    onDetached = (reason, crash) => {
        // console.warn(`[FridaClient] Session detached. Reason: ${reason}. Crash: ${crash?.report ?? 'No crash info'}`);
        logger.warn(`Session detached. Reason: ${reason}. Crash: ${crash?.report ?? 'No crash info'}`, 'Detach');
        this.isAttached = false;
        this.session = undefined;
        this.script = undefined;
        this.agentRpc = undefined;
        this.emit('detached', reason);
        // Optional: Implement automatic reconnection logic
        // if (reason !== 'application-requested') { ... }
    };
    onMessage = (message, data) => {
        // Add a basic check and use type assertion as a last resort
        const msg = message; // Assert type to any
        if (msg && typeof msg === 'object' && 'type' in msg) {
            if (msg.type === 'send') {
                this.emit('agentMessage', msg.payload, data);
            }
            else if (msg.type === 'error') {
                // console.error('[FridaClient] Agent Error:', msg.stack || msg.description);
                logger.error(`Agent Error: ${msg.stack || msg.description}`, 'Agent');
                this.emit('agentError', msg.stack || msg.description);
            }
            else {
                // console.log('[FridaClient] Received unknown message type:', msg.type, msg);
                logger.warn(`Received unknown message type: ${msg.type}`, 'Agent');
            }
        }
        else {
            // console.warn('[FridaClient] Received unexpected message format:', msg);
            logger.warn(`Received unexpected message format: ${JSON.stringify(msg)}`, 'Agent');
        }
    };
    async detach() {
        // console.log('[FridaClient] Detaching...');
        logger.info('Detaching...', 'Detach');
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = undefined;
        }
        if (this.script) {
            try {
                // Disconnect handler first to prevent race conditions on unload
                this.script.message.disconnect(this.onMessage);
                await this.script.unload();
                // console.log('[FridaClient] Script unloaded.');
                logger.info('Script unloaded.', 'Detach');
            }
            catch (err) {
                // console.error('[FridaClient] Error unloading script:', err.message);
                logger.error(`Error unloading script: ${err.message}`, 'Detach');
            }
            this.script = undefined;
            this.agentRpc = undefined;
        }
        if (this.session) {
            try {
                // Disconnect handler before detaching
                this.session.detached.disconnect(this.onDetached);
                await this.session.detach();
                // console.log('[FridaClient] Session detached.');
                logger.info('Session detached.', 'Detach');
            }
            catch (err) {
                // console.error('[FridaClient] Error detaching session:', err.message);
                logger.error(`Error detaching session: ${err.message}`, 'Detach');
                // Session might already be detached
            }
            this.session = undefined;
        }
        this.isAttached = false;
        this.targetProcess = undefined;
        // console.log('[FridaClient] Detached successfully.');
        logger.info('Detached successfully.', 'Detach');
    }
    async callRpc(method, args) {
        if (!this.isAttached || !this.agentRpc || typeof this.agentRpc[method] !== 'function') {
            throw new Error(`Cannot call RPC method '${method}'. Not attached or method not available.`);
        }
        try {
            // console.log(`[FridaClient] Calling RPC: ${method}`, args);
            logger.debug(`Calling RPC: ${method} with args: ${JSON.stringify(args)}`, 'RPC');
            const result = await this.agentRpc[method](...args);
            // console.log(`[FridaClient] RPC Result (${method}):`, result);
            logger.debug(`RPC Result (${method}): ${JSON.stringify(result)}`, 'RPC');
            return result;
        }
        catch (error) {
            // console.error(`[FridaClient] RPC call '${method}' failed:`, error);
            logger.error(`RPC call '${method}' failed: ${error}`, 'RPC');
            throw error; // Re-throw error for server to handle
        }
    }
}
//# sourceMappingURL=frida-client.js.map
// import { inject, attach } from 'frida-inject'; // Removed
import path from 'path';
import { fileURLToPath } from 'url';
// import { createAgentInterface, AgentRpc } from './agent-interface.js'; // No longer needed here
// import { toolProvider, AiToolSchema } from './tool-provider.js'; // No longer directly needed here
import { McpFridaServer } from './server.js'; // Import McpFridaServer and ServerConfig
import { logger, LogLevel } from './utils/logger.js'; // <<< Import logger and LogLevel
import yargs from 'yargs'; // <<< Import yargs
import { hideBin } from 'yargs/helpers'; // <<< Import helper
// Derive __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Configuration ---
// TODO: Load from a config file (e.g., config.json or .env)
const TARGET_PROCESS = 'PlantsVsZombies.exe'; // Or PID, or device UID for mobile
const AGENT_SCRIPT_NAME = '_agent.js';
const AGENT_SCRIPT_PATH = path.resolve(__dirname, '..', AGENT_SCRIPT_NAME); // Correct path relative to src/index.js
const ATTACH_TIMEOUT_MS = 10000; // 10 seconds timeout for attaching
// --- End Configuration ---
let mcpServer = null;
async function main() {
    // <<< Temporarily log initialization start at INFO level before config >>>
    logger.info('[MCP-Frida] Initializing...', 'Core');
    // <<< Configure and parse arguments >>>
    const argv = await yargs(hideBin(process.argv))
        .option('transport', {
        alias: 't',
        type: 'string',
        description: 'MCP transport mode',
        choices: ['stdio', 'sse'],
        default: 'stdio',
    })
        .option('port', {
        alias: 'p',
        type: 'number',
        description: 'Port for SSE transport',
        default: 3000,
    })
        .option('endpoint', {
        type: 'string',
        description: 'Endpoint path for SSE transport',
        default: '/mcp',
    })
        // <<< Add logging options >>>
        .option('log-level', {
        alias: 'l',
        type: 'string',
        description: 'Set the logging level',
        choices: Object.keys(LogLevel).filter(k => isNaN(Number(k))).map(k => k.toLowerCase()), // Get string keys
        default: 'error', // Default is now ERROR
    })
        .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Enable verbose (debug) logging. Overrides --log-level.',
        default: false,
    })
        .option('log-category', {
        alias: 'c',
        type: 'array',
        string: true, // Ensure values are treated as strings
        description: 'Enable specific debug categories (repeatable). E.g., -c Core -c ToolProvider',
        default: [],
    })
        // .demandOption('port', (argv) => argv.transport === 'sse') // Conditional demand not working as expected
        .help()
        .alias('help', 'h')
        .parseAsync();
    // <<< Configure logger based on arguments >>>
    let logLevel = LogLevel[argv.logLevel.toUpperCase()] ?? LogLevel.ERROR;
    if (argv.verbose) {
        logLevel = LogLevel.DEBUG;
    }
    logger.configure({
        level: logLevel,
        debugCategories: argv.logCategory // Directly use the parsed array
    });
    logger.debug(`Effective log level set to: ${LogLevel[logLevel]}`, 'Core');
    if (argv.logCategory.length > 0) {
        logger.debug(`Enabled log categories: ${argv.logCategory.join(', ')}`, 'Core');
    }
    try {
        // Create the McpFridaServer instance
        mcpServer = new McpFridaServer();
        // <<< Build server config from arguments >>>
        const serverConfig = {
            transport: argv.transport,
        };
        if (serverConfig.transport === 'sse') {
            // <<< Manually check if port is valid for SSE >>>
            if (typeof argv.port !== 'number' || argv.port <= 0 || argv.port > 65535) {
                throw new Error(`Invalid port number specified for SSE transport: ${argv.port}. Port must be between 1 and 65535.`);
            }
            serverConfig.port = argv.port;
            serverConfig.endpoint = argv.endpoint;
        }
        // Start the server with the configured transport
        await mcpServer.start(serverConfig);
        // console.log(`[MCP-Frida] Setup complete. MCP server running via ${serverConfig.transport}.`);
        logger.info(`Setup complete. MCP server running via ${serverConfig.transport}.`, 'Core');
        if (serverConfig.transport === 'sse') {
            logger.info(`SSE listening on port ${serverConfig.port}, endpoint ${serverConfig.endpoint}`, 'Core');
        }
        // console.log(`[MCP-Frida] Use tool 'system_attachProcess' to attach.`); // Replaced by logger
        logger.info(`Use tool 'system_attachProcess' to attach.`, 'Core');
    }
    catch (error) {
        // console.error(`[MCP-Frida] Initialization or start failed:`, error.message || error); // Replaced by logger
        logger.error(`Initialization or start failed: ${error.message || error}`, 'Core');
        if (mcpServer) { // Attempt graceful shutdown even on start error
            await mcpServer.stop().catch(stopErr => logger.error(`Error during shutdown after failed start: ${stopErr}`, 'Core'));
        }
        process.exit(1);
    }
}
// --- Graceful Shutdown ---
async function shutdown() {
    // console.log('\n[MCP-Frida] Shutting down...'); // Replaced by logger
    logger.info('\nShutting down...', 'Core');
    if (mcpServer) {
        try {
            // console.log('[MCP-Frida] Stopping MCP server...'); // Replaced by logger
            logger.info('Stopping MCP server...', 'Core');
            await mcpServer.stop(); // McpFridaServer.stop() now handles detachment
            // console.log('[MCP-Frida] MCP server stopped.'); // Replaced by logger
            logger.info('MCP server stopped.', 'Core');
        }
        catch (serverStopErr) {
            // console.error('[MCP-Frida] Error stopping MCP server:', serverStopErr.message || serverStopErr); // Replaced by logger
            logger.error(`Error stopping MCP server: ${serverStopErr.message || serverStopErr}`, 'Core');
        }
    }
    mcpServer = null;
    // Remove redundant cleanup logic now handled by McpFridaServer.stop()
    // console.log('[MCP-Frida] Exited.'); // Replaced by logger
    logger.info('Exited.', 'Core');
    process.exit(0);
}
process.on('SIGINT', shutdown); // Ctrl+C
process.on('SIGTERM', shutdown); // Termination signal
main().catch(err => {
    // console.error("[MCP-Frida] Unhandled error in main:", err); // Replaced by logger
    logger.error(`Unhandled error in main: ${err}`, 'Core');
    process.exit(1);
});
//# sourceMappingURL=index.js.map
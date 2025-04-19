export var PointerOperation;
(function (PointerOperation) {
    PointerOperation["Add"] = "add";
    PointerOperation["Subtract"] = "sub";
    PointerOperation["And"] = "and";
    PointerOperation["Or"] = "or";
    PointerOperation["Xor"] = "xor";
    PointerOperation["ShiftLeft"] = "shl";
    PointerOperation["ShiftRight"] = "shr";
})(PointerOperation || (PointerOperation = {}));
export var StalkerEventType;
(function (StalkerEventType) {
    StalkerEventType["CALL"] = "call";
    StalkerEventType["RET"] = "ret";
    StalkerEventType["EXEC"] = "exec";
    StalkerEventType["BLOCK"] = "block";
    StalkerEventType["COMPILE"] = "compile";
})(StalkerEventType || (StalkerEventType = {}));
export var ReplacementMode;
(function (ReplacementMode) {
    ReplacementMode["Normal"] = "normal";
    ReplacementMode["Fast"] = "fast"; // Interceptor.replaceFast (might be less stable)
})(ReplacementMode || (ReplacementMode = {}));
// Structure of messages received via script.message.connect
export var InterceptorEventType;
(function (InterceptorEventType) {
    InterceptorEventType["Enter"] = "interceptor:onEnter";
    InterceptorEventType["Leave"] = "interceptor:onLeave";
    InterceptorEventType["Error"] = "interceptor:onError";
})(InterceptorEventType || (InterceptorEventType = {}));
/**
 * Creates a typed RPC proxy object to interact with the Frida agent.
 * @param scriptExports The Frida script exports object.
 * @returns A typed AgentRpc object.
 */
export function createAgentInterface(scriptExports) {
    if (!scriptExports || typeof scriptExports !== 'object') {
        throw new Error("Invalid Frida script exports provided for RPC interface creation.");
    }
    // Directly cast the exports to the AgentRpc interface
    return scriptExports; // Use unknown first for safer casting
}
//# sourceMappingURL=agent-interface.js.map
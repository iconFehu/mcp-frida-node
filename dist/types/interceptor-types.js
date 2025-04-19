/**
 * Interceptor API的类型定义
 */
// 回调类型
export var InterceptorCallbackType;
(function (InterceptorCallbackType) {
    InterceptorCallbackType["OnEnter"] = "onEnter";
    InterceptorCallbackType["OnLeave"] = "onLeave";
})(InterceptorCallbackType || (InterceptorCallbackType = {}));
// 替换函数模式
export var ReplacementMode;
(function (ReplacementMode) {
    ReplacementMode["Normal"] = "normal";
    ReplacementMode["Fast"] = "fast";
})(ReplacementMode || (ReplacementMode = {}));
// 拦截器事件类型
export var InterceptorEventType;
(function (InterceptorEventType) {
    InterceptorEventType["Enter"] = "interceptor:onEnter";
    InterceptorEventType["Leave"] = "interceptor:onLeave";
    InterceptorEventType["Error"] = "interceptor:onError";
})(InterceptorEventType || (InterceptorEventType = {}));
//# sourceMappingURL=interceptor-types.js.map
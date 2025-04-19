/**
 * Kernel API的类型定义
 */
// 页面保护枚举
export var PageProtection;
(function (PageProtection) {
    PageProtection["NoAccess"] = "---";
    PageProtection["Read"] = "r--";
    PageProtection["Write"] = "-w-";
    PageProtection["Execute"] = "--x";
    PageProtection["ReadWrite"] = "rw-";
    PageProtection["ReadExecute"] = "r-x";
    PageProtection["ReadWriteExecute"] = "rwx";
})(PageProtection || (PageProtection = {}));
//# sourceMappingURL=kernel-types.js.map
/**
 * 指针相关类型定义
 */
// 指针比较结果
export var PointerCompareResult;
(function (PointerCompareResult) {
    PointerCompareResult[PointerCompareResult["LessThan"] = -1] = "LessThan";
    PointerCompareResult[PointerCompareResult["Equal"] = 0] = "Equal";
    PointerCompareResult[PointerCompareResult["GreaterThan"] = 1] = "GreaterThan";
})(PointerCompareResult || (PointerCompareResult = {}));
// 指针数学运算类型
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
// 指针读取数据类型
export var PointerReadType;
(function (PointerReadType) {
    PointerReadType["Pointer"] = "pointer";
    PointerReadType["S8"] = "s8";
    PointerReadType["U8"] = "u8";
    PointerReadType["S16"] = "s16";
    PointerReadType["U16"] = "u16";
    PointerReadType["S32"] = "s32";
    PointerReadType["U32"] = "u32";
    PointerReadType["S64"] = "s64";
    PointerReadType["U64"] = "u64";
    PointerReadType["Short"] = "short";
    PointerReadType["UShort"] = "ushort";
    PointerReadType["Int"] = "int";
    PointerReadType["UInt"] = "uint";
    PointerReadType["Long"] = "long";
    PointerReadType["ULong"] = "ulong";
    PointerReadType["Float"] = "float";
    PointerReadType["Double"] = "double";
    PointerReadType["ByteArray"] = "byteArray";
    PointerReadType["CString"] = "cstring";
    PointerReadType["Utf8String"] = "utf8string";
    PointerReadType["Utf16String"] = "utf16string";
    PointerReadType["AnsiString"] = "ansistring";
})(PointerReadType || (PointerReadType = {}));
// 指针写入数据类型
export var PointerWriteType;
(function (PointerWriteType) {
    PointerWriteType["Pointer"] = "pointer";
    PointerWriteType["S8"] = "s8";
    PointerWriteType["U8"] = "u8";
    PointerWriteType["S16"] = "s16";
    PointerWriteType["U16"] = "u16";
    PointerWriteType["S32"] = "s32";
    PointerWriteType["U32"] = "u32";
    PointerWriteType["S64"] = "s64";
    PointerWriteType["U64"] = "u64";
    PointerWriteType["Short"] = "short";
    PointerWriteType["UShort"] = "ushort";
    PointerWriteType["Int"] = "int";
    PointerWriteType["UInt"] = "uint";
    PointerWriteType["Long"] = "long";
    PointerWriteType["ULong"] = "ulong";
    PointerWriteType["Float"] = "float";
    PointerWriteType["Double"] = "double";
    PointerWriteType["ByteArray"] = "byteArray";
    PointerWriteType["Utf8String"] = "utf8string";
    PointerWriteType["Utf16String"] = "utf16string";
    PointerWriteType["AnsiString"] = "ansistring";
})(PointerWriteType || (PointerWriteType = {}));
//# sourceMappingURL=nativepointer-types.js.map
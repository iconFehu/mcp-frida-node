📦
8031 /src/index.js.map
5435 /src/index.js
1128 /src/core/interceptor-rpc.d.ts
4163 /src/core/interceptor-rpc.js.map
2919 /src/core/interceptor-rpc.js
3125 /src/core/kernel-rpc.d.ts
7469 /src/core/kernel-rpc.js.map
7088 /src/core/kernel-rpc.js
1861 /src/core/memory-rpc.d.ts
3178 /src/core/memory-rpc.js.map
2402 /src/core/memory-rpc.js
6646 /src/core/nativepointer-rpc.d.ts
11959 /src/core/nativepointer-rpc.js.map
8560 /src/core/nativepointer-rpc.js
1503 /src/core/process-rpc.d.ts
3501 /src/core/process-rpc.js.map
2901 /src/core/process-rpc.js
1357 /src/core/socket-rpc.d.ts
2918 /src/core/socket-rpc.js.map
2180 /src/core/socket-rpc.js
1794 /src/core/stalker-rpc.d.ts
3837 /src/core/stalker-rpc.js.map
3128 /src/core/stalker-rpc.js
97 /src/index.d.ts
1662 /src/types/interceptor-types.d.ts
471 /src/types/interceptor-types.js.map
441 /src/types/interceptor-types.js
1099 /src/types/kernel-types.d.ts
312 /src/types/kernel-types.js.map
200 /src/types/kernel-types.js
534 /src/types/memory-types.d.ts
154 /src/types/memory-types.js.map
9 /src/types/memory-types.js
2231 /src/types/nativepointer-types.d.ts
1056 /src/types/nativepointer-types.js.map
1223 /src/types/nativepointer-types.js
780 /src/types/process-types.d.ts
155 /src/types/process-types.js.map
9 /src/types/process-types.js
892 /src/types/socket-types.d.ts
154 /src/types/socket-types.js.map
9 /src/types/socket-types.js
1650 /src/types/stalker-types.d.ts
292 /src/types/stalker-types.js.map
159 /src/types/stalker-types.js
✄
{"version":3,"file":"index.js","names":["MemoryRPC","ProcessRPC","SocketRPC","StalkerRPC","NativePointerRPC","kernelGetInfo","kernelEnumerateModules","kernelEnumerateRanges","kernelEnumerateModuleRanges","kernelAlloc","kernelProtect","kernelScan","kernelScanSync","kernelReadS8","kernelReadU8","kernelReadS16","kernelReadU16","kernelReadS32","kernelReadU32","kernelReadFloat","kernelReadDouble","kernelReadByteArray","kernelReadCString","kernelReadUtf8String","kernelReadUtf16String","kernelWriteS8","kernelWriteU8","kernelWriteS16","kernelWriteU16","kernelWriteS32","kernelWriteU32","kernelWriteFloat","kernelWriteDouble","kernelWriteByteArray","kernelWriteUtf8String","kernelWriteUtf16String","interceptorAttach","interceptorDetach","interceptorDetachAll","interceptorReplace","interceptorRevert","interceptorFlush","interceptorGetBreakpointKind","interceptorSetBreakpointKind","rpc","exports","nativePointerCreate","create","nativePointerIsNull","isNull","nativePointerOperate","operate","nativePointerAdd","add","nativePointerSub","sub","nativePointerAnd","and","nativePointerOr","or","nativePointerXor","xor","nativePointerShl","shl","nativePointerShr","shr","nativePointerNot","not","nativePointerSign","sign","nativePointerStrip","strip","nativePointerBlend","blend","nativePointerCompare","compare","nativePointerEquals","equals","nativePointerToInt32","toInt32","nativePointerToUInt32","toUInt32","nativePointerToString","toString","nativePointerToMatchPattern","toMatchPattern","nativePointerReadPointer","readPointer","nativePointerReadS8","readS8","nativePointerReadU8","readU8","nativePointerReadS16","readS16","nativePointerReadU16","readU16","nativePointerReadS32","readS32","nativePointerReadU32","readU32","nativePointerReadS64","readS64","nativePointerReadU64","readU64","nativePointerReadShort","readShort","nativePointerReadUShort","readUShort","nativePointerReadInt","readInt","nativePointerReadUInt","readUInt","nativePointerReadLong","readLong","nativePointerReadULong","readULong","nativePointerReadFloat","readFloat","nativePointerReadDouble","readDouble","nativePointerReadByteArray","readByteArray","nativePointerReadCString","readCString","nativePointerReadUtf8String","readUtf8String","nativePointerReadUtf16String","readUtf16String","nativePointerReadAnsiString","readAnsiString","nativePointerWritePointer","writePointer","nativePointerWriteS8","writeS8","nativePointerWriteU8","writeU8","nativePointerWriteS16","writeS16","nativePointerWriteU16","writeU16","nativePointerWriteS32","writeS32","nativePointerWriteU32","writeU32","nativePointerWriteS64","writeS64","nativePointerWriteU64","writeU64","nativePointerWriteShort","writeShort","nativePointerWriteUShort","writeUShort","nativePointerWriteInt","writeInt","nativePointerWriteUInt","writeUInt","nativePointerWriteLong","writeLong","nativePointerWriteULong","writeULong","nativePointerWriteFloat","writeFloat","nativePointerWriteDouble","writeDouble","nativePointerWriteByteArray","writeByteArray","nativePointerWriteUtf8String","writeUtf8String","nativePointerWriteUtf16String","writeUtf16String","nativePointerWriteAnsiString","writeAnsiString","nativePointerBatchOperate","batchOperate","memoryScan","scan","memoryScanSync","scanSync","memoryAlloc","alloc","memoryAllocUtf8String","allocUtf8String","memoryAllocUtf16String","allocUtf16String","memoryAllocAnsiString","allocAnsiString","memoryCopy","copy","memoryDup","dup","memoryProtect","protect","memoryQueryProtection","queryProtection","memoryPatchCode","patchCode","processGetInfo","getProcessInfo","processGetDirs","getProcessDirs","processIsDebuggerAttached","isDebuggerAttached","processGetCurrentThreadId","getCurrentThreadId","processEnumerateThreads","enumerateThreads","processFindModuleByAddress","findModuleByAddress","processFindModuleByName","findModuleByName","processEnumerateModules","enumerateModules","processFindRangeByAddress","findRangeByAddress","processEnumerateRanges","enumerateRanges","processEnumerateMallocRanges","enumerateMallocRanges","socketListen","listen","socketConnect","connect","socketGetType","getSocketType","socketGetLocalAddress","getLocalAddress","socketGetPeerAddress","getPeerAddress","socketCloseConnection","closeConnection","socketCloseListener","closeListener","socketSend","send","socketReceive","receive","stalkerFollow","follow","stalkerUnfollow","unfollow","stalkerExclude","exclude","stalkerParse","parse","stalkerFlush","flush","stalkerGarbageCollect","garbageCollect","stalkerInvalidate","invalidate","stalkerAddCallProbe","addCallProbe","stalkerRemoveCallProbe","removeCallProbe","stalkerGetThreadEvents","getThreadEvents","stalkerClearThreadEvents","clearThreadEvents","stalkerSetConfig","setConfig","stalkerGetConfig","getConfig","console","log"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/","sources":["index.ts"],"mappings":"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","ignoreList":[]}
✄
import*as e from"./core/memory-rpc.js";import*as t from"./core/process-rpc.js";import*as r from"./core/socket-rpc.js";import*as n from"./core/stalker-rpc.js";import*as a from"./core/nativepointer-rpc.js";import{getInfo as i,enumerateModules as o,enumerateRanges as s,enumerateModuleRanges as l,alloc as d,protect as c,scan as P,scanSync as S,readS8 as v,readU8 as g,readS16 as U,readU16 as p,readS32 as k,readU32 as m,readFloat as u,readDouble as R,readByteArray as y,readCString as f,readUtf8String as h,readUtf16String as w,writeS8 as A,writeU8 as W,writeS16 as C,writeU16 as I,writeS32 as b,writeU32 as B,writeFloat as D,writeDouble as F,writeByteArray as M,writeUtf8String as T,writeUtf16String as E}from"./core/kernel-rpc.js";import{attach as L,detach as G,detachAll as j,replace as N,revert as x,flush as K,getBreakpointKind as O,setBreakpointKind as q}from"./core/interceptor-rpc.js";rpc.exports={nativePointerCreate:a.create,nativePointerIsNull:a.isNull,nativePointerOperate:a.operate,nativePointerAdd:a.add,nativePointerSub:a.sub,nativePointerAnd:a.and,nativePointerOr:a.or,nativePointerXor:a.xor,nativePointerShl:a.shl,nativePointerShr:a.shr,nativePointerNot:a.not,nativePointerSign:a.sign,nativePointerStrip:a.strip,nativePointerBlend:a.blend,nativePointerCompare:a.compare,nativePointerEquals:a.equals,nativePointerToInt32:a.toInt32,nativePointerToUInt32:a.toUInt32,nativePointerToString:a.toString,nativePointerToMatchPattern:a.toMatchPattern,nativePointerReadPointer:a.readPointer,nativePointerReadS8:a.readS8,nativePointerReadU8:a.readU8,nativePointerReadS16:a.readS16,nativePointerReadU16:a.readU16,nativePointerReadS32:a.readS32,nativePointerReadU32:a.readU32,nativePointerReadS64:a.readS64,nativePointerReadU64:a.readU64,nativePointerReadShort:a.readShort,nativePointerReadUShort:a.readUShort,nativePointerReadInt:a.readInt,nativePointerReadUInt:a.readUInt,nativePointerReadLong:a.readLong,nativePointerReadULong:a.readULong,nativePointerReadFloat:a.readFloat,nativePointerReadDouble:a.readDouble,nativePointerReadByteArray:a.readByteArray,nativePointerReadCString:a.readCString,nativePointerReadUtf8String:a.readUtf8String,nativePointerReadUtf16String:a.readUtf16String,nativePointerReadAnsiString:a.readAnsiString,nativePointerWritePointer:a.writePointer,nativePointerWriteS8:a.writeS8,nativePointerWriteU8:a.writeU8,nativePointerWriteS16:a.writeS16,nativePointerWriteU16:a.writeU16,nativePointerWriteS32:a.writeS32,nativePointerWriteU32:a.writeU32,nativePointerWriteS64:a.writeS64,nativePointerWriteU64:a.writeU64,nativePointerWriteShort:a.writeShort,nativePointerWriteUShort:a.writeUShort,nativePointerWriteInt:a.writeInt,nativePointerWriteUInt:a.writeUInt,nativePointerWriteLong:a.writeLong,nativePointerWriteULong:a.writeULong,nativePointerWriteFloat:a.writeFloat,nativePointerWriteDouble:a.writeDouble,nativePointerWriteByteArray:a.writeByteArray,nativePointerWriteUtf8String:a.writeUtf8String,nativePointerWriteUtf16String:a.writeUtf16String,nativePointerWriteAnsiString:a.writeAnsiString,nativePointerBatchOperate:a.batchOperate,memoryScan:e.scan,memoryScanSync:e.scanSync,memoryAlloc:e.alloc,memoryAllocUtf8String:e.allocUtf8String,memoryAllocUtf16String:e.allocUtf16String,memoryAllocAnsiString:e.allocAnsiString,memoryCopy:e.copy,memoryDup:e.dup,memoryProtect:e.protect,memoryQueryProtection:e.queryProtection,memoryPatchCode:e.patchCode,processGetInfo:t.getProcessInfo,processGetDirs:t.getProcessDirs,processIsDebuggerAttached:t.isDebuggerAttached,processGetCurrentThreadId:t.getCurrentThreadId,processEnumerateThreads:t.enumerateThreads,processFindModuleByAddress:t.findModuleByAddress,processFindModuleByName:t.findModuleByName,processEnumerateModules:t.enumerateModules,processFindRangeByAddress:t.findRangeByAddress,processEnumerateRanges:t.enumerateRanges,processEnumerateMallocRanges:t.enumerateMallocRanges,socketListen:r.listen,socketConnect:r.connect,socketGetType:r.getSocketType,socketGetLocalAddress:r.getLocalAddress,socketGetPeerAddress:r.getPeerAddress,socketCloseConnection:r.closeConnection,socketCloseListener:r.closeListener,socketSend:r.send,socketReceive:r.receive,stalkerFollow:n.follow,stalkerUnfollow:n.unfollow,stalkerExclude:n.exclude,stalkerParse:n.parse,stalkerFlush:n.flush,stalkerGarbageCollect:n.garbageCollect,stalkerInvalidate:n.invalidate,stalkerAddCallProbe:n.addCallProbe,stalkerRemoveCallProbe:n.removeCallProbe,stalkerGetThreadEvents:n.getThreadEvents,stalkerClearThreadEvents:n.clearThreadEvents,stalkerSetConfig:n.setConfig,stalkerGetConfig:n.getConfig,kernelGetInfo:i,kernelEnumerateModules:o,kernelEnumerateRanges:s,kernelEnumerateModuleRanges:l,kernelAlloc:d,kernelProtect:c,kernelScan:P,kernelScanSync:S,kernelReadS8:v,kernelReadU8:g,kernelReadS16:U,kernelReadU16:p,kernelReadS32:k,kernelReadU32:m,kernelReadFloat:u,kernelReadDouble:R,kernelReadByteArray:y,kernelReadCString:f,kernelReadUtf8String:h,kernelReadUtf16String:w,kernelWriteS8:A,kernelWriteU8:W,kernelWriteS16:C,kernelWriteU16:I,kernelWriteS32:b,kernelWriteU32:B,kernelWriteFloat:D,kernelWriteDouble:F,kernelWriteByteArray:M,kernelWriteUtf8String:T,kernelWriteUtf16String:E,interceptorAttach:L,interceptorDetach:G,interceptorDetachAll:j,interceptorReplace:N,interceptorRevert:x,interceptorFlush:K,interceptorGetBreakpointKind:O,interceptorSetBreakpointKind:q},console.log("[MCP-Frida-Agent] 代理已加载，提供指针操作、内存管理、进程操作、网络通信和执行跟踪RPC能力");
✄
/**
 * Interceptor API的RPC导出包装器
 */
import { InterceptorOperationResult, BreakpointKind, InterceptorAttachConfig, ReplacementConfig } from '../types/interceptor-types.js';
/**
 * 附加拦截器
 */
export declare function attach(targetAddress: string, config: InterceptorAttachConfig): InterceptorOperationResult;
/**
 * 分离拦截器
 */
export declare function detach(listenerId: string): InterceptorOperationResult;
/**
 * 分离所有拦截器
 */
export declare function detachAll(): InterceptorOperationResult;
/**
 * 替换函数
 */
export declare function replace(targetAddress: string, replacementAddress: string, config: ReplacementConfig): InterceptorOperationResult;
/**
 * 恢复替换的函数
 */
export declare function revert(targetAddress: string): InterceptorOperationResult;
/**
 * 刷新内存变更
 */
export declare function flush(): InterceptorOperationResult;
/**
 * 获取断点类型
 */
export declare function getBreakpointKind(): InterceptorOperationResult;
/**
 * 设置断点类型
 */
export declare function setBreakpointKind(kind: BreakpointKind): InterceptorOperationResult;

✄
{"version":3,"file":"interceptor-rpc.js","names":["ReplacementMode","InterceptorEventType","activeListeners","Map","replacedTargets","fastReplacedTargets","createEventData","type","targetId","context","error","timestamp","Date","now","attach","targetAddress","config","id","toString","Math","random","substr","target","ptr","callbacks","onEnter","args","collectContext","returnAddress","this","threadId","depth","argCount","count","result","i","length","arg","push","value","asInt","toInt32","asFloat","NativePointer","parseFloat","asPointer","collectArguments","eventData","Enter","send","errorData","Error","onLeave","retval","collectReturnValue","returnValue","Leave","listener","Interceptor","set","success","data","detach","listenerId","get","delete","detachAll","clear","replace","replacementAddress","replacement","mode","Fast","original","replaceFast","saveOriginal","originalAddress","revert","flush","getBreakpointKind","kind","breakpointKind","setBreakpointKind"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["interceptor-rpc.ts"],"mappings":"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","ignoreList":[]}
✄
import{ReplacementMode as t,InterceptorEventType as r}from"../types/interceptor-types.js";const e=new Map,n=new Map,c=new Map;new Map;function s(t,r,e,n){return{type:t,targetId:r,context:e,error:n,timestamp:Date.now()}}export function attach(t,n){try{const c=Date.now().toString(36)+Math.random().toString(36).substr(2,5),o=ptr(t),a={};n.onEnter&&(a.onEnter=function(t){try{const e={};n.collectContext&&(e.returnAddress=this.returnAddress.toString(),e.threadId=this.threadId,e.depth=this.depth,e.context=this.context),0!==n.argCount&&(e.args=function(t,r=8){const e=[];for(let n=0;n<r&&n<t.length;n++){const r=t[n];e.push({value:r.toString(),asInt:r.toInt32(),asFloat:r instanceof NativePointer?null:parseFloat(r.toString()),asPointer:r instanceof NativePointer?r.toString():null})}return e}(t,n.argCount));const o=s(r.Enter,c,e);send(o)}catch(t){const e=s(r.Error,c,{},t.toString());send(e)}}),n.onLeave&&(a.onLeave=function(t){try{const e={};n.collectReturnValue&&(e.returnValue=function(t){return{value:t.toString(),asInt:t.toInt32(),asFloat:t instanceof NativePointer?null:parseFloat(t.toString()),asPointer:t instanceof NativePointer?t.toString():null}}(t));const o=s(r.Leave,c,e);return send(o),t}catch(e){const n=s(r.Error,c,{},e.toString());return send(n),t}});const u=Interceptor.attach(o,a);return e.set(c,u),{success:!0,data:{id:c}}}catch(t){return{success:!1,error:`附加拦截器失败: ${t}`}}}export function detach(t){try{const r=e.get(t);return r?(r.detach(),e.delete(t),{success:!0}):{success:!1,error:`未找到ID为 ${t} 的监听器`}}catch(t){return{success:!1,error:`分离拦截器失败: ${t}`}}}export function detachAll(){try{return Interceptor.detachAll(),e.clear(),{success:!0}}catch(t){return{success:!1,error:`分离所有拦截器失败: ${t}`}}}export function replace(r,e,s){try{const o=ptr(r),a=ptr(e);if(s.mode===t.Fast){const t=Interceptor.replaceFast(o,a);return s.saveOriginal&&c.set(r,t),{success:!0,data:{originalAddress:t.toString()}}}return Interceptor.replace(o,a,s.data),s.saveOriginal&&n.set(r,o),{success:!0}}catch(t){return{success:!1,error:`替换函数失败: ${t}`}}}export function revert(t){try{const r=ptr(t);return Interceptor.revert(r),n.delete(t),c.delete(t),{success:!0}}catch(t){return{success:!1,error:`恢复函数失败: ${t}`}}}export function flush(){try{return Interceptor.flush(),{success:!0}}catch(t){return{success:!1,error:`刷新失败: ${t}`}}}export function getBreakpointKind(){try{return"breakpointKind"in Interceptor?{success:!0,data:{kind:Interceptor.breakpointKind}}:{success:!1,error:"断点类型只在裸机后端可用"}}catch(t){return{success:!1,error:`获取断点类型失败: ${t}`}}}export function setBreakpointKind(t){try{return"breakpointKind"in Interceptor?(Interceptor.breakpointKind=t,{success:!0}):{success:!1,error:"断点类型只在裸机后端可用"}}catch(t){return{success:!1,error:`设置断点类型失败: ${t}`}}}
✄
/**
 * Kernel API的RPC导出包装器
 */
import { KernelOperationResult, KernelScanOptions } from '../types/kernel-types.js';
/**
 * 获取内核API可用性和基本信息
 */
export declare function getInfo(): KernelOperationResult;
/**
 * 枚举内核模块
 */
export declare function enumerateModules(): KernelOperationResult;
/**
 * 枚举内核内存范围
 */
export declare function enumerateRanges(protection: string): KernelOperationResult;
/**
 * 枚举模块内存范围
 */
export declare function enumerateModuleRanges(name: string | null, protection: string): KernelOperationResult;
/**
 * 分配内核内存
 */
export declare function alloc(size: number): KernelOperationResult;
/**
 * 修改内核内存保护
 */
export declare function protect(address: string, size: number, protection: string): KernelOperationResult;
/**
 * 扫描内核内存
 */
export declare function scan(address: string, size: number, pattern: string, options: KernelScanOptions): KernelOperationResult;
/**
 * 同步扫描内核内存
 */
export declare function scanSync(address: string, size: number, pattern: string): KernelOperationResult;
export declare function readS8(address: string): KernelOperationResult;
export declare function readU8(address: string): KernelOperationResult;
export declare function readS16(address: string): KernelOperationResult;
export declare function readU16(address: string): KernelOperationResult;
export declare function readS32(address: string): KernelOperationResult;
export declare function readU32(address: string): KernelOperationResult;
export declare function readFloat(address: string): KernelOperationResult;
export declare function readDouble(address: string): KernelOperationResult;
export declare function readByteArray(address: string, length: number): KernelOperationResult;
export declare function readCString(address: string, size: number): KernelOperationResult;
export declare function readUtf8String(address: string, size: number): KernelOperationResult;
export declare function readUtf16String(address: string, length: number): KernelOperationResult;
export declare function writeS8(address: string, value: number): KernelOperationResult;
export declare function writeU8(address: string, value: number): KernelOperationResult;
export declare function writeS16(address: string, value: number): KernelOperationResult;
export declare function writeU16(address: string, value: number): KernelOperationResult;
export declare function writeS32(address: string, value: number): KernelOperationResult;
export declare function writeU32(address: string, value: number): KernelOperationResult;
export declare function writeFloat(address: string, value: number): KernelOperationResult;
export declare function writeDouble(address: string, value: number): KernelOperationResult;
export declare function writeByteArray(address: string, value: ArrayBuffer | number[]): KernelOperationResult;
export declare function writeUtf8String(address: string, value: string): KernelOperationResult;
export declare function writeUtf16String(address: string, value: string): KernelOperationResult;

✄
{"version":3,"file":"kernel-rpc.js","names":["getInfo","success","data","available","Kernel","base","toString","pageSize","error","enumerateModules","modules","map","module","name","size","enumerateRanges","protection","ranges","range","enumerateModuleRanges","path","alloc","address","protect","UInt64","undefined","scan","pattern","options","callbacks","onMatch","onComplete","onError","scanSync","matches","match","readS8","value","readU8","readS16","readU16","readS32","readU32","readFloat","readDouble","readByteArray","length","readCString","readUtf8String","readUtf16String","writeS8","writeU8","writeS16","writeU16","writeS32","writeU32","writeFloat","writeDouble","writeByteArray","writeUtf8String","writeUtf16String"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["kernel-rpc.ts"],"mappings":"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","ignoreList":[]}
✄
export function getInfo(){try{return{success:!0,data:{available:Kernel.available,base:Kernel.base.toString(),pageSize:Kernel.pageSize}}}catch(e){return{success:!1,error:`获取内核信息失败: ${e}`}}}export function enumerateModules(){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{modules:Kernel.enumerateModules().map((e=>({name:e.name,base:e.base.toString(),size:e.size})))}}}catch(e){return{success:!1,error:`枚举内核模块失败: ${e}`}}}export function enumerateRanges(e){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{ranges:Kernel.enumerateRanges(e).map((e=>({base:e.base.toString(),size:e.size,protection:e.protection})))}}}catch(e){return{success:!1,error:`枚举内存范围失败: ${e}`}}}export function enumerateModuleRanges(e,r){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{ranges:Kernel.enumerateModuleRanges(e,r).map((e=>({name:e.name,base:e.base.toString(),size:e.size,protection:e.protection,path:e.path})))}}}catch(e){return{success:!1,error:`枚举模块范围失败: ${e}`}}}export function alloc(e){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{address:Kernel.alloc(e).toString()}}}catch(e){return{success:!1,error:`分配内核内存失败: ${e}`}}}export function protect(e,r,t){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};const s=Kernel.protect(new UInt64(e),r,t);return{success:s,error:s?void 0:"修改内存保护失败"}}catch(e){return{success:!1,error:`修改内存保护失败: ${e}`}}}export function scan(e,r,t,s){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};const n={onMatch:e=>s.onMatch?.(e),onComplete:()=>s.onComplete?.(),onError:e=>s.onError?.(e)};return Kernel.scan(new UInt64(e),r,t,n),{success:!0}}catch(e){return{success:!1,error:`扫描内核内存失败: ${e}`}}}export function scanSync(e,r,t){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{matches:Kernel.scanSync(new UInt64(e),r,t).map((e=>({address:e.address.toString()})))}}}catch(e){return{success:!1,error:`同步扫描内核内存失败: ${e}`}}}export function readS8(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readS8(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readU8(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readU8(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readS16(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readS16(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readU16(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readU16(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readS32(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readS32(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readU32(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readU32(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readFloat(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readFloat(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readDouble(e){try{return Kernel.available?{success:!0,data:{value:Kernel.readDouble(new UInt64(e))}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readByteArray(e,r){try{if(!Kernel.available)return{success:!1,error:"内核API不可用"};return{success:!0,data:{value:Kernel.readByteArray(new UInt64(e),r)}}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readCString(e,r){try{return Kernel.available?{success:!0,data:{value:Kernel.readCString(new UInt64(e),r)}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readUtf8String(e,r){try{return Kernel.available?{success:!0,data:{value:Kernel.readUtf8String(new UInt64(e),r)}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function readUtf16String(e,r){try{return Kernel.available?{success:!0,data:{value:Kernel.readUtf16String(new UInt64(e),r)}}:{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`读取失败: ${e}`}}}export function writeS8(e,r){try{return Kernel.available?(Kernel.writeS8(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeU8(e,r){try{return Kernel.available?(Kernel.writeU8(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeS16(e,r){try{return Kernel.available?(Kernel.writeS16(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeU16(e,r){try{return Kernel.available?(Kernel.writeU16(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeS32(e,r){try{return Kernel.available?(Kernel.writeS32(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeU32(e,r){try{return Kernel.available?(Kernel.writeU32(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeFloat(e,r){try{return Kernel.available?(Kernel.writeFloat(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeDouble(e,r){try{return Kernel.available?(Kernel.writeDouble(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeByteArray(e,r){try{return Kernel.available?(Kernel.writeByteArray(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeUtf8String(e,r){try{return Kernel.available?(Kernel.writeUtf8String(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}export function writeUtf16String(e,r){try{return Kernel.available?(Kernel.writeUtf16String(new UInt64(e),r),{success:!0}):{success:!1,error:"内核API不可用"}}catch(e){return{success:!1,error:`写入失败: ${e}`}}}
✄
/**
 * Memory API的RPC导出包装器
 *
 * 该模块封装了Frida的Memory API并通过RPC导出，
 * 使得可以在Node.js端直接操作目标进程的内存。
 */
import { MemoryOperationResult, PageProtection, MemoryAllocOptions, MemoryScanOptions } from '../types/memory-types.js';
/**
 * 扫描内存中的特定模式
 */
export declare function scan(baseAddress: string, size: number, pattern: string, options?: MemoryScanOptions): Promise<MemoryOperationResult>;
/**
 * 同步扫描内存中的特定模式
 */
export declare function scanSync(baseAddress: string, size: number, pattern: string, options?: MemoryScanOptions): MemoryOperationResult;
/**
 * 分配内存
 */
export declare function alloc(size: number, options?: MemoryAllocOptions): MemoryOperationResult;
/**
 * 分配UTF8字符串
 */
export declare function allocUtf8String(text: string): MemoryOperationResult;
/**
 * 分配UTF16字符串
 */
export declare function allocUtf16String(text: string): MemoryOperationResult;
/**
 * 分配ANSI字符串
 */
export declare function allocAnsiString(text: string): MemoryOperationResult;
/**
 * 复制内存
 */
export declare function copy(dstAddress: string, srcAddress: string, size: number): MemoryOperationResult;
/**
 * 复制内存区域
 */
export declare function dup(address: string, size: number): MemoryOperationResult;
/**
 * 修改内存页保护属性
 */
export declare function protect(address: string, size: number, protection: PageProtection): MemoryOperationResult;
/**
 * 查询内存页保护属性
 */
export declare function queryProtection(address: string): MemoryOperationResult;
/**
 * 安全修改代码内存
 * 注意：由于回调函数无法通过RPC传递，此函数需要接收要写入的字节数组
 */
export declare function patchCode(address: string, bytes: number[]): MemoryOperationResult;

✄
{"version":3,"file":"memory-rpc.js","names":["async","scan","baseAddress","size","pattern","options","base","NativePointer","matches","limit","matchCount","Memory","onMatch","address","push","toString","onError","reason","Error","onComplete","success","data","error","scanSync","rawMatches","slice","map","match","alloc","allocOptions","near","maxDistance","protection","allocUtf8String","text","allocUtf16String","allocAnsiString","copy","dstAddress","srcAddress","dst","src","dup","protect","ptr","result","protected","queryProtection","patchCode","bytes","length","code","i","add","writeU8"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["memory-rpc.ts"],"mappings":"OAkCOA,eAAeC,KAAKC,EAAqBC,EAAcC,EAAiBC,GAC7E,IACE,MAAMC,EAAO,IAAIC,cAAcL,GACzBM,EAA6B,GAG7BC,EAAQJ,GAASI,OAAS,IAChC,IAAIC,EAAa,EAmBjB,aAjBMC,OAAOV,KAAKK,EAAMH,EAAMC,EAAS,CACrCQ,QAAQC,GACFH,EAAaD,IACfD,EAAQM,KAAK,CACXD,QAASA,EAAQE,aAEnBL,IAEJ,EACAM,QAAQC,GACN,MAAM,IAAIC,MAAM,SAASD,IAC3B,EACAE,aAEA,IAGK,CACLC,SAAS,EACTC,KAAMb,E,CAER,MAAOc,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,WAAWA,I,CAGxB,QAKM,SAAUC,SAASrB,EAAqBC,EAAcC,EAAiBC,GAC3E,IACE,MAAMC,EAAO,IAAIC,cAAcL,GACzBsB,EAAab,OAAOY,SAASjB,EAAMH,EAAMC,GAGzCK,EAAQJ,GAASI,OAAS,IAKhC,MAAO,CACLW,SAAS,EACTC,KANcG,EAAWC,MAAM,EAAGhB,GAAOiB,KAAIC,IAAS,CACtDd,QAASc,EAAMd,QAAQE,e,CAOzB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,aAAaA,I,CAG1B,QAKM,SAAUM,MAAMzB,EAAcE,GAClC,IAEE,MAAMwB,EAAoB,GAEtBxB,GAASyB,OACXD,EAAaC,KAAO,IAAIvB,cAAcF,EAAQyB,OAG5CzB,GAAS0B,cACXF,EAAaE,YAAc1B,EAAQ0B,aAGjC1B,GAAS2B,aACXH,EAAaG,WAAa3B,EAAQ2B,YAKpC,MAAO,CACLZ,SAAS,EACTP,QAJcF,OAAOiB,MAAMzB,EAAM0B,GAIhBd,W,CAEnB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,WAAWA,I,CAGxB,QAKM,SAAUW,gBAAgBC,GAC9B,IAGE,MAAO,CACLd,SAAS,EACTP,QAJcF,OAAOsB,gBAAgBC,GAIpBnB,W,CAEnB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,gBAAgBA,I,CAG7B,QAKM,SAAUa,iBAAiBD,GAC/B,IAGE,MAAO,CACLd,SAAS,EACTP,QAJcF,OAAOwB,iBAAiBD,GAIrBnB,W,CAEnB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,iBAAiBA,I,CAG9B,QAKM,SAAUc,gBAAgBF,GAC9B,IAGE,MAAO,CACLd,SAAS,EACTP,QAJcF,OAAOyB,gBAAgBF,GAIpBnB,W,CAEnB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,gBAAgBA,I,CAG7B,QAKM,SAAUe,KAAKC,EAAoBC,EAAoBpC,GAC3D,IACE,MAAMqC,EAAM,IAAIjC,cAAc+B,GACxBG,EAAM,IAAIlC,cAAcgC,GAI9B,OAFA5B,OAAO0B,KAAKG,EAAKC,EAAKtC,GAEf,CACLiB,SAAS,E,CAEX,MAAOE,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,WAAWA,I,CAGxB,QAKM,SAAUoB,IAAI7B,EAAiBV,GACnC,IACE,MAAMsC,EAAM,IAAIlC,cAAcM,GAG9B,MAAO,CACLO,SAAS,EACTP,QAJaF,OAAO+B,IAAID,EAAKtC,GAIbY,W,CAElB,MAAOO,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,WAAWA,I,CAGxB,QAKM,SAAUqB,QAAQ9B,EAAiBV,EAAc6B,GACrD,IACE,MAAMY,EAAM,IAAIrC,cAAcM,GACxBgC,EAASlC,OAAOgC,QAAQC,EAAKzC,EAAM6B,GAEzC,MAAO,CACLZ,QAASyB,EACTxB,KAAM,CACJyB,UAAWD,G,CAGf,MAAOvB,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,eAAeA,I,CAG5B,QAKM,SAAUyB,gBAAgBlC,GAC9B,IACE,MAAM+B,EAAM,IAAIrC,cAAcM,GAG9B,MAAO,CACLO,SAAS,EACTC,KAAM,CACJW,WALerB,OAAOoC,gBAAgBH,I,CAQ1C,MAAOtB,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,eAAeA,I,CAG5B,QAMM,SAAU0B,UAAUnC,EAAiBoC,GACzC,IACE,MAAML,EAAM,IAAIrC,cAAcM,GAQ9B,OANAF,OAAOqC,UAAUJ,EAAKK,EAAMC,QAASC,IACnC,IAAK,IAAIC,EAAI,EAAGA,EAAIH,EAAMC,OAAQE,IAChCD,EAAKE,IAAID,GAAGE,QAAQL,EAAMG,G,IAIvB,CACLhC,SAAS,E,CAEX,MAAOE,GACP,MAAO,CACLF,SAAS,EACTE,MAAO,aAAaA,I,CAG1B","ignoreList":[]}
✄
export async function scan(r,t,e,c){try{const n=new NativePointer(r),o=[],s=c?.limit||1e3;let a=0;return await Memory.scan(n,t,e,{onMatch(r){a<s&&(o.push({address:r.toString()}),a++)},onError(r){throw new Error(`扫描错误: ${r}`)},onComplete(){}}),{success:!0,data:o}}catch(r){return{success:!1,error:`内存扫描失败: ${r}`}}}export function scanSync(r,t,e,c){try{const n=new NativePointer(r),o=Memory.scanSync(n,t,e),s=c?.limit||1e3;return{success:!0,data:o.slice(0,s).map((r=>({address:r.address.toString()})))}}catch(r){return{success:!1,error:`同步内存扫描失败: ${r}`}}}export function alloc(r,t){try{const e={};t?.near&&(e.near=new NativePointer(t.near)),t?.maxDistance&&(e.maxDistance=t.maxDistance),t?.protection&&(e.protection=t.protection);return{success:!0,address:Memory.alloc(r,e).toString()}}catch(r){return{success:!1,error:`内存分配失败: ${r}`}}}export function allocUtf8String(r){try{return{success:!0,address:Memory.allocUtf8String(r).toString()}}catch(r){return{success:!1,error:`UTF8字符串分配失败: ${r}`}}}export function allocUtf16String(r){try{return{success:!0,address:Memory.allocUtf16String(r).toString()}}catch(r){return{success:!1,error:`UTF16字符串分配失败: ${r}`}}}export function allocAnsiString(r){try{return{success:!0,address:Memory.allocAnsiString(r).toString()}}catch(r){return{success:!1,error:`ANSI字符串分配失败: ${r}`}}}export function copy(r,t,e){try{const c=new NativePointer(r),n=new NativePointer(t);return Memory.copy(c,n,e),{success:!0}}catch(r){return{success:!1,error:`内存复制失败: ${r}`}}}export function dup(r,t){try{const e=new NativePointer(r);return{success:!0,address:Memory.dup(e,t).toString()}}catch(r){return{success:!1,error:`内存复制失败: ${r}`}}}export function protect(r,t,e){try{const c=new NativePointer(r),n=Memory.protect(c,t,e);return{success:n,data:{protected:n}}}catch(r){return{success:!1,error:`修改内存保护属性失败: ${r}`}}}export function queryProtection(r){try{const t=new NativePointer(r);return{success:!0,data:{protection:Memory.queryProtection(t)}}}catch(r){return{success:!1,error:`查询内存保护属性失败: ${r}`}}}export function patchCode(r,t){try{const e=new NativePointer(r);return Memory.patchCode(e,t.length,(r=>{for(let e=0;e<t.length;e++)r.add(e).writeU8(t[e])})),{success:!0}}catch(r){return{success:!1,error:`代码内存修改失败: ${r}`}}}
✄
/**
 * NativePointer API的RPC导出包装器
 */
import { PointerOperationResult, PointerAuthKey, PointerAuthConfig, PointerOperation, BatchOperationRequest } from '../types/nativepointer-types.js';
/**
 * 创建一个NativePointer
 */
export declare function create(address: string | number): PointerOperationResult;
/**
 * 检查指针是否为null
 */
export declare function isNull(address: string): PointerOperationResult;
/**
 * 执行指针运算
 */
export declare function operate(operation: PointerOperation, address: string, operand: string | number): PointerOperationResult;
/**
 * 指针加法
 */
export declare function add(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针减法
 */
export declare function sub(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针按位与
 */
export declare function and(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针按位或
 */
export declare function or(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针按位异或
 */
export declare function xor(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针左移
 */
export declare function shl(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针右移
 */
export declare function shr(address: string, operand: string | number): PointerOperationResult;
/**
 * 指针按位非
 */
export declare function not(address: string): PointerOperationResult;
/**
 * 签名指针（指针认证）
 */
export declare function sign(address: string, config: PointerAuthConfig): PointerOperationResult;
/**
 * 去除指针签名（指针认证）
 */
export declare function strip(address: string, key: PointerAuthKey): PointerOperationResult;
/**
 * 混合指针（指针认证）
 */
export declare function blend(address: string, smallInteger: number): PointerOperationResult;
/**
 * 比较两个指针
 */
export declare function compare(address: string, otherAddress: string | number): PointerOperationResult;
/**
 * 检查两个指针是否相等
 */
export declare function equals(address: string, otherAddress: string | number): PointerOperationResult;
/**
 * 转换指针为32位有符号整数
 */
export declare function toInt32(address: string): PointerOperationResult;
/**
 * 转换指针为32位无符号整数
 */
export declare function toUInt32(address: string): PointerOperationResult;
/**
 * 转换指针为字符串
 */
export declare function toString(address: string, radix?: number): PointerOperationResult;
/**
 * 转换指针为匹配模式
 */
export declare function toMatchPattern(address: string): PointerOperationResult;
export declare function readPointer(address: string): PointerOperationResult;
export declare function readS8(address: string): PointerOperationResult;
export declare function readU8(address: string): PointerOperationResult;
export declare function readS16(address: string): PointerOperationResult;
export declare function readU16(address: string): PointerOperationResult;
export declare function readS32(address: string): PointerOperationResult;
export declare function readU32(address: string): PointerOperationResult;
export declare function readS64(address: string): PointerOperationResult;
export declare function readU64(address: string): PointerOperationResult;
export declare function readShort(address: string): PointerOperationResult;
export declare function readUShort(address: string): PointerOperationResult;
export declare function readInt(address: string): PointerOperationResult;
export declare function readUInt(address: string): PointerOperationResult;
export declare function readLong(address: string): PointerOperationResult;
export declare function readULong(address: string): PointerOperationResult;
export declare function readFloat(address: string): PointerOperationResult;
export declare function readDouble(address: string): PointerOperationResult;
export declare function readByteArray(address: string, length: number, volatile?: boolean): PointerOperationResult;
export declare function readCString(address: string, maxLength?: number): PointerOperationResult;
export declare function readUtf8String(address: string, maxLength?: number): PointerOperationResult;
export declare function readUtf16String(address: string, maxLength?: number): PointerOperationResult;
export declare function readAnsiString(address: string, maxLength?: number): PointerOperationResult;
export declare function writePointer(address: string, value: string): PointerOperationResult;
export declare function writeS8(address: string, value: number): PointerOperationResult;
export declare function writeU8(address: string, value: number): PointerOperationResult;
export declare function writeS16(address: string, value: number): PointerOperationResult;
export declare function writeU16(address: string, value: number): PointerOperationResult;
export declare function writeS32(address: string, value: number): PointerOperationResult;
export declare function writeU32(address: string, value: number): PointerOperationResult;
export declare function writeS64(address: string, value: string | number): PointerOperationResult;
export declare function writeU64(address: string, value: string | number): PointerOperationResult;
export declare function writeShort(address: string, value: number): PointerOperationResult;
export declare function writeUShort(address: string, value: number): PointerOperationResult;
export declare function writeInt(address: string, value: number): PointerOperationResult;
export declare function writeUInt(address: string, value: number): PointerOperationResult;
export declare function writeLong(address: string, value: string | number): PointerOperationResult;
export declare function writeULong(address: string, value: string | number): PointerOperationResult;
export declare function writeFloat(address: string, value: number): PointerOperationResult;
export declare function writeDouble(address: string, value: number): PointerOperationResult;
export declare function writeByteArray(address: string, value: number[] | ArrayBuffer, volatile?: boolean): PointerOperationResult;
export declare function writeUtf8String(address: string, value: string): PointerOperationResult;
export declare function writeUtf16String(address: string, value: string): PointerOperationResult;
export declare function writeAnsiString(address: string, value: string): PointerOperationResult;
/**
 * 批量指针操作
 */
export declare function batchOperate(request: BatchOperationRequest): PointerOperationResult;

✄
{"version":3,"file":"nativepointer-rpc.js","names":["PointerOperation","PointerReadType","PointerWriteType","create","address","success","data","ptr","toString","error","message","isNull","pointer","operate","operation","operand","result","Add","add","Subtract","sub","And","and","Or","or","Xor","xor","ShiftLeft","shl","ShiftRight","shr","not","sign","config","key","strip","blend","smallInteger","compare","otherAddress","otherPointer","equals","toInt32","value","toUInt32","radix","toMatchPattern","pattern","readMemory","type","options","Pointer","readPointer","S8","readS8","U8","readU8","S16","readS16","U16","readU16","S32","readS32","U32","readU32","S64","readS64","U64","readU64","Short","readShort","UShort","readUShort","Int","readInt","UInt","readUInt","Long","readLong","Int64","ULong","readULong","UInt64","Float","readFloat","Double","readDouble","ByteArray","undefined","length","arrayBuffer","volatile","readVolatile","readByteArray","uint8Array","Uint8Array","Array","from","CString","readCString","maxLength","Utf8String","readUtf8String","Utf16String","readUtf16String","AnsiString","readAnsiString","writeMemory","writePointer","writeS8","writeU8","writeS16","writeU16","writeS32","writeU32","writeS64","writeU64","writeShort","writeUShort","writeInt","writeUInt","writeLong","writeULong","writeFloat","writeDouble","writeVolatile","writeByteArray","writeUtf8String","writeUtf16String","writeAnsiString","batchOperate","request","operations","addresses","results","i","push","finalAddress","steps"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["nativepointer-rpc.ts"],"mappings":"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","ignoreList":[]}
✄
import{PointerOperation as r,PointerReadType as t,PointerWriteType as e}from"../types/nativepointer-types.js";export function create(r){try{return{success:!0,data:{address:ptr(r.toString()).toString()}}}catch(r){return{success:!1,error:`创建指针失败: ${r.message||r}`}}}export function isNull(r){try{const t=ptr(r);return{success:!0,data:{isNull:t.isNull()}}}catch(r){return{success:!1,error:`检查指针失败: ${r.message||r}`}}}export function operate(t,e,n){try{const a=ptr(e);let s;switch(t){case r.Add:s=a.add(n);break;case r.Subtract:s=a.sub(n);break;case r.And:s=a.and(n);break;case r.Or:s=a.or(n);break;case r.Xor:s=a.xor(n);break;case r.ShiftLeft:s=a.shl(n);break;case r.ShiftRight:s=a.shr(n);break;default:return{success:!1,error:`不支持的操作: ${t}`}}return{success:!0,data:{address:s.toString()}}}catch(r){return{success:!1,error:`指针运算失败: ${r.message||r}`}}}export function add(t,e){return operate(r.Add,t,e)}export function sub(t,e){return operate(r.Subtract,t,e)}export function and(t,e){return operate(r.And,t,e)}export function or(t,e){return operate(r.Or,t,e)}export function xor(t,e){return operate(r.Xor,t,e)}export function shl(t,e){return operate(r.ShiftLeft,t,e)}export function shr(t,e){return operate(r.ShiftRight,t,e)}export function not(r){try{const t=ptr(r);return{success:!0,data:{address:t.not().toString()}}}catch(r){return{success:!1,error:`指针按位非操作失败: ${r.message||r}`}}}export function sign(r,t){try{const e=ptr(r),{key:n,data:a}=t;return{success:!0,data:{address:(a?e.sign(n,ptr(a)):e.sign(n)).toString()}}}catch(r){return{success:!1,error:`指针签名失败: ${r.message||r}`}}}export function strip(r,t){try{const e=ptr(r);return{success:!0,data:{address:e.strip(t).toString()}}}catch(r){return{success:!1,error:`去除指针签名失败: ${r.message||r}`}}}export function blend(r,t){try{const e=ptr(r);return{success:!0,data:{address:e.blend(t).toString()}}}catch(r){return{success:!1,error:`混合指针失败: ${r.message||r}`}}}export function compare(r,t){try{const e=ptr(r),n=ptr(t.toString());return{success:!0,data:{result:e.compare(n)}}}catch(r){return{success:!1,error:`比较指针失败: ${r.message||r}`}}}export function equals(r,t){try{const e=ptr(r),n=ptr(t.toString());return{success:!0,data:{equals:e.equals(n)}}}catch(r){return{success:!1,error:`比较指针相等性失败: ${r.message||r}`}}}export function toInt32(r){try{const t=ptr(r);return{success:!0,data:{value:t.toInt32()}}}catch(r){return{success:!1,error:`转换指针为Int32失败: ${r.message||r}`}}}export function toUInt32(r){try{const t=ptr(r);return{success:!0,data:{value:t.toUInt32()}}}catch(r){return{success:!1,error:`转换指针为UInt32失败: ${r.message||r}`}}}export function toString(r,t=16){try{const e=ptr(r);return{success:!0,data:{value:e.toString(t)}}}catch(r){return{success:!1,error:`转换指针为字符串失败: ${r.message||r}`}}}export function toMatchPattern(r){try{const t=ptr(r);return{success:!0,data:{pattern:t.toMatchPattern()}}}catch(r){return{success:!1,error:`转换指针为匹配模式失败: ${r.message||r}`}}}function n(r,e,n){try{const a=ptr(r);let s;switch(e){case t.Pointer:s=a.readPointer(),s={address:s.toString()};break;case t.S8:s=a.readS8();break;case t.U8:s=a.readU8();break;case t.S16:s=a.readS16();break;case t.U16:s=a.readU16();break;case t.S32:s=a.readS32();break;case t.U32:s=a.readU32();break;case t.S64:s=a.readS64(),s=s.toString();break;case t.U64:s=a.readU64(),s=s.toString();break;case t.Short:s=a.readShort();break;case t.UShort:s=a.readUShort();break;case t.Int:s=a.readInt();break;case t.UInt:s=a.readUInt();break;case t.Long:s=a.readLong(),s instanceof Int64&&(s=s.toString());break;case t.ULong:s=a.readULong(),s instanceof UInt64&&(s=s.toString());break;case t.Float:s=a.readFloat();break;case t.Double:s=a.readDouble();break;case t.ByteArray:if(void 0===n?.length)return{success:!1,error:"读取ByteArray时必须指定长度"};const r=n.volatile?a.readVolatile(n.length):a.readByteArray(n.length);if(null===r)s=null;else{const t=new Uint8Array(r);s=Array.from(t)}break;case t.CString:s=a.readCString(n?.maxLength);break;case t.Utf8String:s=a.readUtf8String(n?.maxLength);break;case t.Utf16String:s=a.readUtf16String(n?.maxLength);break;case t.AnsiString:s=a.readAnsiString(n?.maxLength);break;default:return{success:!1,error:`不支持的读取类型: ${e}`}}return{success:!0,data:{value:s}}}catch(r){return{success:!1,error:`读取内存失败 (${e}): ${r.message||r}`}}}function a(r,t,n,a){try{const s=ptr(r);switch(t){case e.Pointer:s.writePointer(ptr(n));break;case e.S8:s.writeS8(n);break;case e.U8:s.writeU8(n);break;case e.S16:s.writeS16(n);break;case e.U16:s.writeU16(n);break;case e.S32:s.writeS32(n);break;case e.U32:s.writeU32(n);break;case e.S64:s.writeS64(n);break;case e.U64:s.writeU64(n);break;case e.Short:s.writeShort(n);break;case e.UShort:s.writeUShort(n);break;case e.Int:s.writeInt(n);break;case e.UInt:s.writeUInt(n);break;case e.Long:s.writeLong(n);break;case e.ULong:s.writeULong(n);break;case e.Float:s.writeFloat(n);break;case e.Double:s.writeDouble(n);break;case e.ByteArray:a?.volatile?s.writeVolatile(n):s.writeByteArray(n);break;case e.Utf8String:s.writeUtf8String(n);break;case e.Utf16String:s.writeUtf16String(n);break;case e.AnsiString:s.writeAnsiString(n);break;default:return{success:!1,error:`不支持的写入类型: ${t}`}}return{success:!0,data:{address:s.toString()}}}catch(r){return{success:!1,error:`写入内存失败 (${t}): ${r.message||r}`}}}export function readPointer(r){return n(r,t.Pointer)}export function readS8(r){return n(r,t.S8)}export function readU8(r){return n(r,t.U8)}export function readS16(r){return n(r,t.S16)}export function readU16(r){return n(r,t.U16)}export function readS32(r){return n(r,t.S32)}export function readU32(r){return n(r,t.U32)}export function readS64(r){return n(r,t.S64)}export function readU64(r){return n(r,t.U64)}export function readShort(r){return n(r,t.Short)}export function readUShort(r){return n(r,t.UShort)}export function readInt(r){return n(r,t.Int)}export function readUInt(r){return n(r,t.UInt)}export function readLong(r){return n(r,t.Long)}export function readULong(r){return n(r,t.ULong)}export function readFloat(r){return n(r,t.Float)}export function readDouble(r){return n(r,t.Double)}export function readByteArray(r,e,a){return n(r,t.ByteArray,{length:e,volatile:a})}export function readCString(r,e){return n(r,t.CString,{maxLength:e})}export function readUtf8String(r,e){return n(r,t.Utf8String,{maxLength:e})}export function readUtf16String(r,e){return n(r,t.Utf16String,{maxLength:e})}export function readAnsiString(r,e){return n(r,t.AnsiString,{maxLength:e})}export function writePointer(r,t){return a(r,e.Pointer,t)}export function writeS8(r,t){return a(r,e.S8,t)}export function writeU8(r,t){return a(r,e.U8,t)}export function writeS16(r,t){return a(r,e.S16,t)}export function writeU16(r,t){return a(r,e.U16,t)}export function writeS32(r,t){return a(r,e.S32,t)}export function writeU32(r,t){return a(r,e.U32,t)}export function writeS64(r,t){return a(r,e.S64,t)}export function writeU64(r,t){return a(r,e.U64,t)}export function writeShort(r,t){return a(r,e.Short,t)}export function writeUShort(r,t){return a(r,e.UShort,t)}export function writeInt(r,t){return a(r,e.Int,t)}export function writeUInt(r,t){return a(r,e.UInt,t)}export function writeLong(r,t){return a(r,e.Long,t)}export function writeULong(r,t){return a(r,e.ULong,t)}export function writeFloat(r,t){return a(r,e.Float,t)}export function writeDouble(r,t){return a(r,e.Double,t)}export function writeByteArray(r,t,n){return a(r,e.ByteArray,t,{volatile:n})}export function writeUtf8String(r,t){return a(r,e.Utf8String,t)}export function writeUtf16String(r,t){return a(r,e.Utf16String,t)}export function writeAnsiString(r,t){return a(r,e.AnsiString,t)}export function batchOperate(t){try{const{operations:e,addresses:n}=t;if(e.length!==n.length-1)return{success:!1,error:"操作数量必须比地址数量少1"};let a=ptr(n[0]);const s=[];for(let t=0;t<e.length;t++){const o=e[t],c=n[t+1];switch(o){case r.Add:a=a.add(c);break;case r.Subtract:a=a.sub(c);break;case r.And:a=a.and(c);break;case r.Or:a=a.or(c);break;case r.Xor:a=a.xor(c);break;case r.ShiftLeft:a=a.shl(c);break;case r.ShiftRight:a=a.shr(c);break;default:return{success:!1,error:`不支持的操作: ${o}`}}s.push({success:!0,data:{address:a.toString()}})}return{success:!0,data:{finalAddress:a.toString(),steps:s}}}catch(r){return{success:!1,error:`批量指针操作失败: ${r.message||r}`}}}
✄
/**
 * Process API的RPC导出包装器
 *
 * 该模块封装了Frida的Process API并通过RPC导出，
 * 使得可以在Node.js端直接获取和操作目标进程的信息。
 */
import { EnumerateRangesSpecifier, ProcessOperationResult } from '../types/process-types.js';
/**
 * 获取进程基本信息
 */
export declare function getProcessInfo(): ProcessOperationResult;
/**
 * 获取进程目录信息
 */
export declare function getProcessDirs(): ProcessOperationResult;
/**
 * 获取调试器状态
 */
export declare function isDebuggerAttached(): ProcessOperationResult;
/**
 * 获取当前线程ID
 */
export declare function getCurrentThreadId(): ProcessOperationResult;
/**
 * 枚举所有线程
 */
export declare function enumerateThreads(): ProcessOperationResult;
/**
 * 通过地址查找模块
 */
export declare function findModuleByAddress(address: string): ProcessOperationResult;
/**
 * 通过名称查找模块
 */
export declare function findModuleByName(name: string): ProcessOperationResult;
/**
 * 枚举所有已加载模块
 */
export declare function enumerateModules(): ProcessOperationResult;
/**
 * 通过地址查找内存范围
 */
export declare function findRangeByAddress(address: string): ProcessOperationResult;
/**
 * 枚举内存范围
 */
export declare function enumerateRanges(specifier: string | EnumerateRangesSpecifier): ProcessOperationResult;
/**
 * 枚举堆内存范围
 */
export declare function enumerateMallocRanges(): ProcessOperationResult;

✄
{"version":3,"file":"process-rpc.js","names":["getProcessInfo","success","data","id","Process","arch","platform","pageSize","pointerSize","codeSigningPolicy","error","getProcessDirs","current","getCurrentDir","home","getHomeDir","temp","getTmpDir","isDebuggerAttached","attached","getCurrentThreadId","threadId","enumerateThreads","map","thread","state","context","findModuleByAddress","address","ptr","NativePointer","module","name","base","toString","size","path","findModuleByName","enumerateModules","findRangeByAddress","range","rangeDetails","protection","file","offset","enumerateRanges","specifier","enumerateMallocRanges"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["process-rpc.ts"],"mappings":"OA6CM,SAAUA,iBACd,IAUE,MAAO,CACLC,SAAS,EACTC,KAXwB,CACxBC,GAAIC,QAAQD,GACZE,KAAMD,QAAQC,KACdC,SAAUF,QAAQE,SAClBC,SAAUH,QAAQG,SAClBC,YAAaJ,QAAQI,YACrBC,kBAAmBL,QAAQK,mB,CAO7B,MAAOC,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,aAAaA,I,CAG1B,QAKM,SAAUC,iBACd,IAOE,MAAO,CACLV,SAAS,EACTC,KARW,CACXU,QAASR,QAAQS,gBACjBC,KAAMV,QAAQW,aACdC,KAAMZ,QAAQa,a,CAOhB,MAAOP,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,eAAeA,I,CAG5B,QAKM,SAAUQ,qBACd,IAGE,MAAO,CACLjB,SAAS,EACTC,KAAM,CACJiB,SALaf,QAAQc,sB,CAQzB,MAAOR,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,cAAcA,I,CAG3B,QAKM,SAAUU,qBACd,IAGE,MAAO,CACLnB,SAAS,EACTC,KAAM,CACJmB,SALajB,QAAQgB,sB,CAQzB,MAAOV,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,aAAaA,I,CAG1B,QAKM,SAAUY,mBACd,IAOE,MAAO,CACLrB,SAAS,EACTC,KARcE,QAAQkB,mBAAmBC,KAAIC,IAAU,CACvDrB,GAAIqB,EAAOrB,GACXsB,MAAOD,EAAOC,MACdC,QAASF,EAAOE,Y,CAOlB,MAAOhB,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,WAAWA,I,CAGxB,QAKM,SAAUiB,oBAAoBC,GAClC,IACE,MAAMC,EAAM,IAAIC,cAAcF,GACxBG,EAAS3B,QAAQuB,oBAAoBE,GAE3C,IAAKE,EACH,MAAO,CACL9B,SAAS,EACTC,KAAM,MAWV,MAAO,CACLD,SAAS,EACTC,KATmC,CACnC8B,KAAMD,EAAOC,KACbC,KAAMF,EAAOE,KAAKC,WAClBC,KAAMJ,EAAOI,KACbC,KAAML,EAAOK,M,CAOf,MAAO1B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,eAAeA,I,CAG5B,QAKM,SAAU2B,iBAAiBL,GAC/B,IACE,MAAMD,EAAS3B,QAAQiC,iBAAiBL,GAExC,IAAKD,EACH,MAAO,CACL9B,SAAS,EACTC,KAAM,MAWV,MAAO,CACLD,SAAS,EACTC,KATmC,CACnC8B,KAAMD,EAAOC,KACbC,KAAMF,EAAOE,KAAKC,WAClBC,KAAMJ,EAAOI,KACbC,KAAML,EAAOK,M,CAOf,MAAO1B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,eAAeA,I,CAG5B,QAKM,SAAU4B,mBACd,IAQE,MAAO,CACLrC,SAAS,EACTC,KATcE,QAAQkC,mBAAmBf,KAAIQ,IAAU,CACvDC,KAAMD,EAAOC,KACbC,KAAMF,EAAOE,KAAKC,WAClBC,KAAMJ,EAAOI,KACbC,KAAML,EAAOK,S,CAOf,MAAO1B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,WAAWA,I,CAGxB,QAKM,SAAU6B,mBAAmBX,GACjC,IACE,MAAMC,EAAM,IAAIC,cAAcF,GACxBY,EAAQpC,QAAQmC,mBAAmBV,GAEzC,IAAKW,EACH,MAAO,CACLvC,SAAS,EACTC,KAAM,MAIV,MAAMuC,EAA6B,CACjCR,KAAMO,EAAMP,KAAKC,WACjBC,KAAMK,EAAML,KACZO,WAAYF,EAAME,YAWpB,OARIF,EAAMG,OACRF,EAAaE,KAAO,CAClBP,KAAMI,EAAMG,KAAKP,KACjBQ,OAAQJ,EAAMG,KAAKC,OACnBT,KAAMK,EAAMG,KAAKR,OAId,CACLlC,SAAS,EACTC,KAAMuC,E,CAER,MAAO/B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,iBAAiBA,I,CAG9B,QAKM,SAAUmC,gBAAgBC,GAC9B,IAmBE,MAAO,CACL7C,SAAS,EACTC,KApBaE,QAAQyC,gBAAgBC,GAAWvB,KAAIiB,IACpD,MAAMC,EAA6B,CACjCR,KAAMO,EAAMP,KAAKC,WACjBC,KAAMK,EAAML,KACZO,WAAYF,EAAME,YAWpB,OARIF,EAAMG,OACRF,EAAaE,KAAO,CAClBP,KAAMI,EAAMG,KAAKP,KACjBQ,OAAQJ,EAAMG,KAAKC,OACnBT,KAAMK,EAAMG,KAAKR,OAIdM,CAAY,I,CAOrB,MAAO/B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,aAAaA,I,CAG1B,QAKM,SAAUqC,wBACd,IAmBE,MAAO,CACL9C,SAAS,EACTC,KApBaE,QAAQ2C,wBAAwBxB,KAAIiB,IACjD,MAAMC,EAA6B,CACjCR,KAAMO,EAAMP,KAAKC,WACjBC,KAAMK,EAAML,KACZO,WAAYF,EAAME,YAWpB,OARIF,EAAMG,OACRF,EAAaE,KAAO,CAClBP,KAAMI,EAAMG,KAAKP,KACjBQ,OAAQJ,EAAMG,KAAKC,OACnBT,KAAMK,EAAMG,KAAKR,OAIdM,CAAY,I,CAOrB,MAAO/B,GACP,MAAO,CACLT,SAAS,EACTS,MAAO,cAAcA,I,CAG3B","ignoreList":[]}
✄
export function getProcessInfo(){try{return{success:!0,data:{id:Process.id,arch:Process.arch,platform:Process.platform,pageSize:Process.pageSize,pointerSize:Process.pointerSize,codeSigningPolicy:Process.codeSigningPolicy}}}catch(e){return{success:!1,error:`获取进程信息失败: ${e}`}}}export function getProcessDirs(){try{return{success:!0,data:{current:Process.getCurrentDir(),home:Process.getHomeDir(),temp:Process.getTmpDir()}}}catch(e){return{success:!1,error:`获取进程目录信息失败: ${e}`}}}export function isDebuggerAttached(){try{return{success:!0,data:{attached:Process.isDebuggerAttached()}}}catch(e){return{success:!1,error:`获取调试器状态失败: ${e}`}}}export function getCurrentThreadId(){try{return{success:!0,data:{threadId:Process.getCurrentThreadId()}}}catch(e){return{success:!1,error:`获取线程ID失败: ${e}`}}}export function enumerateThreads(){try{return{success:!0,data:Process.enumerateThreads().map((e=>({id:e.id,state:e.state,context:e.context})))}}catch(e){return{success:!1,error:`枚举线程失败: ${e}`}}}export function findModuleByAddress(e){try{const r=new NativePointer(e),s=Process.findModuleByAddress(r);if(!s)return{success:!0,data:null};return{success:!0,data:{name:s.name,base:s.base.toString(),size:s.size,path:s.path}}}catch(e){return{success:!1,error:`通过地址查找模块失败: ${e}`}}}export function findModuleByName(e){try{const r=Process.findModuleByName(e);if(!r)return{success:!0,data:null};return{success:!0,data:{name:r.name,base:r.base.toString(),size:r.size,path:r.path}}}catch(e){return{success:!1,error:`通过名称查找模块失败: ${e}`}}}export function enumerateModules(){try{return{success:!0,data:Process.enumerateModules().map((e=>({name:e.name,base:e.base.toString(),size:e.size,path:e.path})))}}catch(e){return{success:!1,error:`枚举模块失败: ${e}`}}}export function findRangeByAddress(e){try{const r=new NativePointer(e),s=Process.findRangeByAddress(r);if(!s)return{success:!0,data:null};const t={base:s.base.toString(),size:s.size,protection:s.protection};return s.file&&(t.file={path:s.file.path,offset:s.file.offset,size:s.file.size}),{success:!0,data:t}}catch(e){return{success:!1,error:`通过地址查找内存范围失败: ${e}`}}}export function enumerateRanges(e){try{return{success:!0,data:Process.enumerateRanges(e).map((e=>{const r={base:e.base.toString(),size:e.size,protection:e.protection};return e.file&&(r.file={path:e.file.path,offset:e.file.offset,size:e.file.size}),r}))}}catch(e){return{success:!1,error:`枚举内存范围失败: ${e}`}}}export function enumerateMallocRanges(){try{return{success:!0,data:Process.enumerateMallocRanges().map((e=>{const r={base:e.base.toString(),size:e.size,protection:e.protection};return e.file&&(r.file={path:e.file.path,offset:e.file.offset,size:e.file.size}),r}))}}catch(e){return{success:!1,error:`枚举堆内存范围失败: ${e}`}}}
✄
/**
 * Socket API的RPC导出包装器
 *
 * 该模块封装了Frida的Socket API并通过RPC导出，
 * 使得可以在Node.js端直接操作目标进程的网络连接。
 */
import { SocketListenOptions, SocketConnectOptions, SocketOperationResult } from '../types/socket-types.js';
/**
 * 创建Socket监听器
 */
export declare function listen(options: SocketListenOptions): Promise<SocketOperationResult>;
/**
 * 连接到Socket服务器
 */
export declare function connect(options: SocketConnectOptions): Promise<SocketOperationResult>;
/**
 * 获取Socket类型
 */
export declare function getSocketType(handle: number): SocketOperationResult;
/**
 * 获取Socket本地地址
 */
export declare function getLocalAddress(handle: number): SocketOperationResult;
/**
 * 获取Socket对端地址
 */
export declare function getPeerAddress(handle: number): SocketOperationResult;
/**
 * 关闭Socket连接
 */
export declare function closeConnection(id: string): Promise<SocketOperationResult>;
/**
 * 关闭Socket监听器
 */
export declare function closeListener(id: string): Promise<SocketOperationResult>;
/**
 * 发送数据
 */
export declare function send(id: string, data: string | ArrayBuffer): Promise<SocketOperationResult>;
/**
 * 接收数据
 */
export declare function receive(id: string, size: number): Promise<SocketOperationResult>;

✄
{"version":3,"file":"socket-rpc.js","names":["activeConnections","Map","activeListeners","async","listen","options","listener","Socket","id","generateId","address","convertAddress","set","success","data","type","error","connect","connection","localAddress","peerAddress","getSocketType","handle","getLocalAddress","getPeerAddress","closeConnection","get","close","delete","closeListener","send","output","write","receive","size","input","read","Math","random","toString","substring","Date","now","result","ip","port","path","family"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["socket-rpc.ts"],"mappings":"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","ignoreList":[]}
✄
const t=new Map,e=new Map;export async function listen(t){try{const s=await Socket.listen(t),n=r(),o=c(await s.address);e.set(n,s);return{success:!0,data:{id:n,type:t.type||"tcp",address:o}}}catch(t){return{success:!1,error:`创建Socket监听器失败: ${t}`}}}export async function connect(e){try{const s=await Socket.connect(e),n=r(),o=c(await s.localAddress),a=c(await s.peerAddress);t.set(n,s);return{success:!0,data:{id:n,type:e.type||"tcp",localAddress:o,peerAddress:a}}}catch(t){return{success:!1,error:`连接Socket服务器失败: ${t}`}}}export function getSocketType(t){try{return{success:!0,data:{type:Socket.type(t)}}}catch(t){return{success:!1,error:`获取Socket类型失败: ${t}`}}}export function getLocalAddress(t){try{const e=Socket.localAddress(t);return e?{success:!0,data:c(e)}:{success:!0,data:null}}catch(t){return{success:!1,error:`获取Socket本地地址失败: ${t}`}}}export function getPeerAddress(t){try{const e=Socket.peerAddress(t);return e?{success:!0,data:c(e)}:{success:!0,data:null}}catch(t){return{success:!1,error:`获取Socket对端地址失败: ${t}`}}}export async function closeConnection(e){try{const r=t.get(e);return r?(await r.close(),t.delete(e),{success:!0}):{success:!1,error:"连接不存在"}}catch(t){return{success:!1,error:`关闭Socket连接失败: ${t}`}}}export async function closeListener(t){try{const r=e.get(t);return r?(await r.close(),e.delete(t),{success:!0}):{success:!1,error:"监听器不存在"}}catch(t){return{success:!1,error:`关闭Socket监听器失败: ${t}`}}}export async function send(e,r){try{const c=t.get(e);return c?(await c.output.write(r),{success:!0}):{success:!1,error:"连接不存在"}}catch(t){return{success:!1,error:`发送数据失败: ${t}`}}}export async function receive(e,r){try{const c=t.get(e);if(!c)return{success:!1,error:"连接不存在"};return{success:!0,data:await c.input.read(r)}}catch(t){return{success:!1,error:`接收数据失败: ${t}`}}}function r(){return Math.random().toString(36).substring(2)+Date.now().toString(36)}function c(t){if(!t)return{};const e={};return t.ip&&(e.ip=t.ip),t.port&&(e.port=t.port),t.path&&(e.path=t.path),t.family&&(e.family=t.family),e}
✄
/**
 * Stalker API的RPC导出包装器
 *
 * 该模块封装了Frida的Stalker API并通过RPC导出，
 * 使得可以在Node.js端直接操作目标进程的执行跟踪。
 */
import { StalkerOptions, StalkerOperationResult, StalkerMemoryRange, StalkerConfig, StalkerCallProbeCallback } from '../types/stalker-types.js';
/**
 * 开始跟踪线程执行
 */
export declare function follow(threadId: number, options: StalkerOptions): StalkerOperationResult;
/**
 * 停止跟踪线程执行
 */
export declare function unfollow(threadId: number): StalkerOperationResult;
/**
 * 排除内存范围
 */
export declare function exclude(range: StalkerMemoryRange): StalkerOperationResult;
/**
 * 解析事件数据
 */
export declare function parse(events: ArrayBuffer): StalkerOperationResult;
/**
 * 刷新事件缓冲区
 */
export declare function flush(): StalkerOperationResult;
/**
 * 执行垃圾回收
 */
export declare function garbageCollect(): StalkerOperationResult;
/**
 * 使代码缓存失效
 */
export declare function invalidate(threadId: number, address: string): StalkerOperationResult;
/**
 * 添加调用探针
 */
export declare function addCallProbe(address: string, callback: StalkerCallProbeCallback): StalkerOperationResult;
/**
 * 移除调用探针
 */
export declare function removeCallProbe(probeId: string): StalkerOperationResult;
/**
 * 获取线程事件
 */
export declare function getThreadEvents(threadId: number): StalkerOperationResult;
/**
 * 清空线程事件
 */
export declare function clearThreadEvents(threadId: number): StalkerOperationResult;
/**
 * 设置配置
 */
export declare function setConfig(newConfig: Partial<StalkerConfig>): StalkerOperationResult;
/**
 * 获取配置
 */
export declare function getConfig(): StalkerOperationResult;

✄
{"version":3,"file":"stalker-rpc.js","names":["StalkerEventType","activeThreads","Map","probes","config","trustThreshold","queueCapacity","queueDrainInterval","follow","threadId","options","events","wrappedOptions","onEvent","onReceive","buffer","stalkerEvents","Stalker","parse","annotate","map","event","type","CALL","location","toString","undefined","target","depth","data","push","forEach","e","error","console","set","success","unfollow","delete","exclude","range","base","ptr","size","flush","garbageCollect","invalidate","address","addCallProbe","callback","nativeCallback","NativeCallback","args","probeInfo","id","probeId","removeCallProbe","get","parseInt","getThreadEvents","state","clearThreadEvents","setConfig","newConfig","getConfig"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/core/","sources":["stalker-rpc.ts"],"mappings":"2BAQEA,MASK,4BAmBP,MAAMC,EAAgB,IAAIC,IAGpBC,EAAS,IAAID,IAGnB,IAAIE,EAAwB,CAC1BC,eAAgB,EAChBC,cAAe,MACfC,mBAAoB,YAMhB,SAAUC,OAAOC,EAAkBC,GACvC,IAEE,MAAMC,EAAyB,GAGzBC,EAAsB,IAAKF,GA8CjC,cA3COE,EAAeC,QAGtBD,EAAeE,UAAaC,IAC1B,IACE,MAGMC,EAHeC,QAAQC,MAAMH,EAAQ,CAAEI,UAAU,IAGpBC,KAAKC,IAEH,CACjCC,KAAOD,EAAMC,MAA6BtB,EAAiBuB,KAC3DC,SAAUH,EAAMG,SAAWH,EAAMG,SAASC,gBAAaC,EACvDC,OAAQN,EAAMM,OAASN,EAAMM,OAAOF,gBAAaC,EACjDE,MAAOP,EAAMO,OAAS,EACtBC,KAAMR,EAAMQ,MAAQ,OAMxBlB,EAAOmB,QAAQd,GAGXN,EAAQG,SACVG,EAAce,SAAQC,GAAKtB,EAAQG,UAAUmB,I,CAE/C,MAAOC,GACPC,QAAQD,MAAM,aAAaA,I,GAK/BhB,QAAQT,OAAOC,EAAUG,GAGzBX,EAAckC,IAAI1B,EAAU,CAC1BA,WACAC,QAASE,EACTD,SACAR,OAAQ,IAAID,MAGP,CACLkC,SAAS,EACTP,KAAM,CAAEpB,Y,CAEV,MAAOwB,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB,QAKM,SAAUI,SAAS5B,GACvB,IAOE,OALAQ,QAAQoB,SAAS5B,GAGjBR,EAAcqC,OAAO7B,GAEd,CACL2B,SAAS,E,CAEX,MAAOH,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB,QAKM,SAAUM,QAAQC,GACtB,IAME,OALAvB,QAAQsB,QAAQ,CACdE,KAAMC,IAAIF,EAAMC,MAChBE,KAAMH,EAAMG,OAGP,CACLP,SAAS,E,CAEX,MAAOH,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,aAAaA,I,CAG1B,QAKM,SAAUf,MAAMP,GACpB,IAGE,MAAO,CACLyB,SAAS,EACTP,KAJaZ,QAAQC,MAAMP,G,CAM7B,MAAOsB,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB,QAKM,SAAUW,QACd,IAGE,OAFA3B,QAAQ2B,QAED,CACLR,SAAS,E,CAEX,MAAOH,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,YAAYA,I,CAGzB,QAKM,SAAUY,iBACd,IAGE,OAFA5B,QAAQ4B,iBAED,CACLT,SAAS,E,CAEX,MAAOH,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB,QAKM,SAAUa,WAAWrC,EAAkBsC,GAC3C,IAGE,OAFA9B,QAAQ6B,WAAWrC,EAAUiC,IAAIK,IAE1B,CACLX,SAAS,E,CAEX,MAAOH,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,cAAcA,I,CAG3B,QAKM,SAAUe,aAAaD,EAAiBE,GAC5C,IAEE,MAAMC,EAAiB,IAAIC,gBAAgBC,IACzC,IAE0B,mBAAbH,GACTA,EAASG,E,CAEX,MAAOnB,GACPC,QAAQD,MAAM,aAAaA,I,IAE5B,OAAQ,CAAC,YAINoB,EAA8B,CAClCC,GAFcrC,QAAQ+B,aAAaN,IAAIK,GAAUG,GAErCzB,WACZsB,UACAE,SAAUC,GAIZ,OAFA/C,EAAOgC,IAAIkB,EAAUC,GAAID,GAElB,CACLjB,SAAS,EACTP,KAAM,CAAE0B,QAASF,EAAUC,I,CAE7B,MAAOrB,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,aAAaA,I,CAG1B,QAKM,SAAUuB,gBAAgBD,GAC9B,IAEE,OADcpD,EAAOsD,IAAIF,IAQzBtC,QAAQuC,gBAAgBE,SAASH,IACjCpD,EAAOmC,OAAOiB,GAEP,CACLnB,SAAS,IAVF,CACLA,SAAS,EACTH,MAAO,Q,CAUX,MAAOA,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,aAAaA,I,CAG1B,QAKM,SAAU0B,gBAAgBlD,GAC9B,IACE,MAAMmD,EAAQ3D,EAAcwD,IAAIhD,GAChC,OAAKmD,EAOE,CACLxB,SAAS,EACTP,KAAM,CACJlB,OAAQiD,EAAMjD,SATT,CACLyB,SAAS,EACTH,MAAO,S,CAUX,MAAOA,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,aAAaA,I,CAG1B,QAKM,SAAU4B,kBAAkBpD,GAChC,IACE,MAAMmD,EAAQ3D,EAAcwD,IAAIhD,GAChC,OAAKmD,GAOLA,EAAMjD,OAAS,GAER,CACLyB,SAAS,IATF,CACLA,SAAS,EACTH,MAAO,S,CASX,MAAOA,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,aAAaA,I,CAG1B,QAKM,SAAU6B,UAAUC,GACxB,IAgBE,OAfA3D,EAAS,IACJA,KACA2D,GAGmC,iBAA7BA,EAAU1D,iBACnBY,QAAQZ,eAAiB0D,EAAU1D,gBAEE,iBAA5B0D,EAAUzD,gBACnBW,QAAQX,cAAgByD,EAAUzD,eAEQ,iBAAjCyD,EAAUxD,qBACnBU,QAAQV,mBAAqBwD,EAAUxD,oBAGlC,CACL6B,SAAS,EACTP,KAAM,CAAEzB,U,CAEV,MAAO6B,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB,QAKM,SAAU+B,YACd,IACE,MAAO,CACL5B,SAAS,EACTP,KAAM,CAAEzB,U,CAEV,MAAO6B,GACP,MAAO,CACLG,SAAS,EACTH,MAAO,WAAWA,I,CAGxB","ignoreList":[]}
✄
import{StalkerEventType as e}from"../types/stalker-types.js";const r=new Map,t=new Map;let s={trustThreshold:1,queueCapacity:16384,queueDrainInterval:250};export function follow(t,s){try{const c=[],n={...s};return delete n.onEvent,n.onReceive=r=>{try{const t=Stalker.parse(r,{annotate:!0}).map((r=>({type:r.type||e.CALL,location:r.location?r.location.toString():void 0,target:r.target?r.target.toString():void 0,depth:r.depth||0,data:r.data||{}})));c.push(...t),s.onEvent&&t.forEach((e=>s.onEvent?.(e)))}catch(e){console.error(`解析事件数据失败: ${e}`)}},Stalker.follow(t,n),r.set(t,{threadId:t,options:n,events:c,probes:new Map}),{success:!0,data:{threadId:t}}}catch(e){return{success:!1,error:`跟踪线程失败: ${e}`}}}export function unfollow(e){try{return Stalker.unfollow(e),r.delete(e),{success:!0}}catch(e){return{success:!1,error:`停止跟踪失败: ${e}`}}}export function exclude(e){try{return Stalker.exclude({base:ptr(e.base),size:e.size}),{success:!0}}catch(e){return{success:!1,error:`排除内存范围失败: ${e}`}}}export function parse(e){try{return{success:!0,data:Stalker.parse(e)}}catch(e){return{success:!1,error:`解析事件失败: ${e}`}}}export function flush(){try{return Stalker.flush(),{success:!0}}catch(e){return{success:!1,error:`刷新缓冲区失败: ${e}`}}}export function garbageCollect(){try{return Stalker.garbageCollect(),{success:!0}}catch(e){return{success:!1,error:`垃圾回收失败: ${e}`}}}export function invalidate(e,r){try{return Stalker.invalidate(e,ptr(r)),{success:!0}}catch(e){return{success:!1,error:`使代码缓存失效失败: ${e}`}}}export function addCallProbe(e,r){try{const s=new NativeCallback((e=>{try{"function"==typeof r&&r(e)}catch(e){console.error(`调用探针回调出错: ${e}`)}}),"void",["pointer"]),c={id:Stalker.addCallProbe(ptr(e),s).toString(),address:e,callback:s};return t.set(c.id,c),{success:!0,data:{probeId:c.id}}}catch(e){return{success:!1,error:`添加调用探针失败: ${e}`}}}export function removeCallProbe(e){try{return t.get(e)?(Stalker.removeCallProbe(parseInt(e)),t.delete(e),{success:!0}):{success:!1,error:"探针不存在"}}catch(e){return{success:!1,error:`移除调用探针失败: ${e}`}}}export function getThreadEvents(e){try{const t=r.get(e);return t?{success:!0,data:{events:t.events}}:{success:!1,error:"线程未被跟踪"}}catch(e){return{success:!1,error:`获取线程事件失败: ${e}`}}}export function clearThreadEvents(e){try{const t=r.get(e);return t?(t.events=[],{success:!0}):{success:!1,error:"线程未被跟踪"}}catch(e){return{success:!1,error:`清空线程事件失败: ${e}`}}}export function setConfig(e){try{return s={...s,...e},"number"==typeof e.trustThreshold&&(Stalker.trustThreshold=e.trustThreshold),"number"==typeof e.queueCapacity&&(Stalker.queueCapacity=e.queueCapacity),"number"==typeof e.queueDrainInterval&&(Stalker.queueDrainInterval=e.queueDrainInterval),{success:!0,data:{config:s}}}catch(e){return{success:!1,error:`设置配置失败: ${e}`}}}export function getConfig(){try{return{success:!0,data:{config:s}}}catch(e){return{success:!1,error:`获取配置失败: ${e}`}}}
✄
/**
 * MCP-Frida-Agent 主入口
 * 提供高级内存分析和指针操作能力
 */
export {};

✄
/**
 * Interceptor API的类型定义
 */
/// <reference types="frida-gum" />
export interface InterceptorOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}
export interface InterceptorListenerId {
    id: string;
}
export declare enum InterceptorCallbackType {
    OnEnter = "onEnter",
    OnLeave = "onLeave"
}
export interface InterceptorCallbackContext {
    returnAddress?: string;
    threadId?: number;
    depth?: number;
    context?: any;
    args?: Array<{
        value: string;
        asInt?: number;
        asFloat?: number;
        asPointer?: string;
    }>;
    returnValue?: {
        value: string;
        asInt?: number;
        asFloat?: number;
        asPointer?: string;
    };
}
export interface InterceptorCallbackParams {
    type: InterceptorCallbackType;
    registerId: string;
    context: InterceptorCallbackContext;
}
export declare enum ReplacementMode {
    Normal = "normal",
    Fast = "fast"
}
export interface InterceptorAttachConfig {
    onEnter?: boolean;
    onLeave?: boolean;
    synchronous?: boolean;
    collectContext?: boolean;
    argCount?: number;
    collectReturnValue?: boolean;
}
export type BreakpointKind = 'soft' | 'hard';
export interface ReplacementConfig {
    mode: ReplacementMode;
    saveOriginal?: boolean;
    data?: NativePointer;
}
export declare enum InterceptorEventType {
    Enter = "interceptor:onEnter",
    Leave = "interceptor:onLeave",
    Error = "interceptor:onError"
}
export interface InterceptorEventData {
    type: InterceptorEventType;
    targetId: string;
    context: InterceptorCallbackContext;
    error?: string;
    timestamp: number;
}

✄
{"version":3,"file":"interceptor-types.js","names":["InterceptorCallbackType","ReplacementMode","InterceptorEventType"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":["interceptor-types.ts"],"mappings":"OAiBA,IAAYA,yBAAZ,SAAYA,GACVA,EAAA,kBACAA,EAAA,iBACD,CAHD,CAAYA,kDAAuB,YAiCnC,IAAYC,iBAAZ,SAAYA,GACVA,EAAA,gBACAA,EAAA,WACD,CAHD,CAAYA,kCAAe,YA+B3B,IAAYC,sBAAZ,SAAYA,GACVA,EAAA,4BACAA,EAAA,4BACAA,EAAA,2BACD,CAJD,CAAYA,4CAAoB","ignoreList":[]}
✄
export var InterceptorCallbackType;!function(e){e.OnEnter="onEnter",e.OnLeave="onLeave"}(InterceptorCallbackType||(InterceptorCallbackType={}));export var ReplacementMode;!function(e){e.Normal="normal",e.Fast="fast"}(ReplacementMode||(ReplacementMode={}));export var InterceptorEventType;!function(e){e.Enter="interceptor:onEnter",e.Leave="interceptor:onLeave",e.Error="interceptor:onError"}(InterceptorEventType||(InterceptorEventType={}));
✄
/**
 * Kernel API的类型定义
 */
export interface KernelOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}
export interface KernelModuleDetails {
    name: string;
    base: string;
    size: number;
}
export interface KernelRangeDetails {
    base: string;
    size: number;
    protection: string;
}
export interface KernelModuleRangeDetails extends KernelRangeDetails {
    name: string;
    path?: string;
}
export interface KernelMemoryScanMatch {
    address: string;
}
export interface KernelMemoryScanCallbacks {
    onMatch: (address: string) => void;
    onComplete: () => void;
    onError?: (error: Error) => void;
}
export declare enum PageProtection {
    NoAccess = "---",
    Read = "r--",
    Write = "-w-",
    Execute = "--x",
    ReadWrite = "rw-",
    ReadExecute = "r-x",
    ReadWriteExecute = "rwx"
}
export interface KernelScanOptions {
    onMatch?: (address: string) => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
}
export interface KernelInfo {
    available: boolean;
    base: string;
    pageSize: number;
}

✄
{"version":3,"file":"kernel-types.js","names":["PageProtection"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":["kernel-types.ts"],"mappings":"OA4CA,IAAYA,gBAAZ,SAAYA,GACVA,EAAA,eACAA,EAAA,WACAA,EAAA,YACAA,EAAA,cACAA,EAAA,gBACAA,EAAA,kBACAA,EAAA,sBACD,CARD,CAAYA,gCAAc","ignoreList":[]}
✄
export var PageProtection;!function(e){e.NoAccess="---",e.Read="r--",e.Write="-w-",e.Execute="--x",e.ReadWrite="rw-",e.ReadExecute="r-x",e.ReadWriteExecute="rwx"}(PageProtection||(PageProtection={}));
✄
/**
 * Memory操作相关类型定义
 */
export interface MemoryOperationResult {
    success: boolean;
    error?: string;
    address?: string;
    data?: any;
}
export interface MemoryScanMatch {
    address: string;
    size?: number;
}
export type PageProtection = '---' | 'r--' | '-w-' | '--x' | 'r-x' | 'rw-' | '-wx' | 'rwx';
export interface MemoryAllocOptions {
    near?: string;
    maxDistance?: number;
    protection?: PageProtection;
}
export interface MemoryScanOptions {
    limit?: number;
    encoding?: string;
}

✄
{"version":3,"file":"memory-types.js","names":[],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":[],"mappings":"","ignoreList":[]}
✄
export{};
✄
/**
 * 指针相关类型定义
 */
export interface PointerOperationResult {
    success: boolean;
    error?: string;
    pointer?: string;
    data?: any;
}
/**
 * NativePointer API的类型定义
 */
export interface PointerValue {
    address: string;
}
export declare enum PointerCompareResult {
    LessThan = -1,
    Equal = 0,
    GreaterThan = 1
}
export interface PointerValidityResult {
    isValid: boolean;
    isNull: boolean;
}
export interface PointerReadOptions {
    volatile?: boolean;
    length?: number;
    maxLength?: number;
}
export interface PointerWriteOptions {
    volatile?: boolean;
}
export type PointerAuthKey = 'ia' | 'ib' | 'da' | 'db';
export interface PointerAuthConfig {
    key: PointerAuthKey;
    data?: string;
}
export declare enum PointerOperation {
    Add = "add",
    Subtract = "sub",
    And = "and",
    Or = "or",
    Xor = "xor",
    ShiftLeft = "shl",
    ShiftRight = "shr"
}
export declare enum PointerReadType {
    Pointer = "pointer",
    S8 = "s8",
    U8 = "u8",
    S16 = "s16",
    U16 = "u16",
    S32 = "s32",
    U32 = "u32",
    S64 = "s64",
    U64 = "u64",
    Short = "short",
    UShort = "ushort",
    Int = "int",
    UInt = "uint",
    Long = "long",
    ULong = "ulong",
    Float = "float",
    Double = "double",
    ByteArray = "byteArray",
    CString = "cstring",
    Utf8String = "utf8string",
    Utf16String = "utf16string",
    AnsiString = "ansistring"
}
export declare enum PointerWriteType {
    Pointer = "pointer",
    S8 = "s8",
    U8 = "u8",
    S16 = "s16",
    U16 = "u16",
    S32 = "s32",
    U32 = "u32",
    S64 = "s64",
    U64 = "u64",
    Short = "short",
    UShort = "ushort",
    Int = "int",
    UInt = "uint",
    Long = "long",
    ULong = "ulong",
    Float = "float",
    Double = "double",
    ByteArray = "byteArray",
    Utf8String = "utf8string",
    Utf16String = "utf16string",
    AnsiString = "ansistring"
}
export interface NumberConversionResult {
    int32Value?: number;
    uint32Value?: number;
    stringValue: string;
}
export interface BatchOperationRequest {
    operations: PointerOperation[];
    addresses: string[];
}
export interface BatchOperationResult {
    results: PointerOperationResult[];
}

✄
{"version":3,"file":"nativepointer-types.js","names":["PointerCompareResult","PointerOperation","PointerReadType","PointerWriteType"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":["nativepointer-types.ts"],"mappings":"OAsBA,IAAYA,sBAAZ,SAAYA,GACVA,IAAA,wBACAA,IAAA,iBACAA,IAAA,4BACD,CAJD,CAAYA,4CAAoB,YAsChC,IAAYC,kBAAZ,SAAYA,GACVA,EAAA,UACAA,EAAA,eACAA,EAAA,UACAA,EAAA,QACAA,EAAA,UACAA,EAAA,gBACAA,EAAA,gBACD,CARD,CAAYA,oCAAgB,YAW5B,IAAYC,iBAAZ,SAAYA,GACVA,EAAA,kBACAA,EAAA,QACAA,EAAA,QACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,cACAA,EAAA,gBACAA,EAAA,UACAA,EAAA,YACAA,EAAA,YACAA,EAAA,cACAA,EAAA,cACAA,EAAA,gBACAA,EAAA,sBACAA,EAAA,kBACAA,EAAA,wBACAA,EAAA,0BACAA,EAAA,uBACD,CAvBD,CAAYA,kCAAe,YA0B3B,IAAYC,kBAAZ,SAAYA,GACVA,EAAA,kBACAA,EAAA,QACAA,EAAA,QACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,UACAA,EAAA,cACAA,EAAA,gBACAA,EAAA,UACAA,EAAA,YACAA,EAAA,YACAA,EAAA,cACAA,EAAA,cACAA,EAAA,gBACAA,EAAA,sBACAA,EAAA,wBACAA,EAAA,0BACAA,EAAA,uBACD,CAtBD,CAAYA,oCAAgB","ignoreList":[]}
✄
export var PointerCompareResult;!function(t){t[t.LessThan=-1]="LessThan",t[t.Equal=0]="Equal",t[t.GreaterThan=1]="GreaterThan"}(PointerCompareResult||(PointerCompareResult={}));export var PointerOperation;!function(t){t.Add="add",t.Subtract="sub",t.And="and",t.Or="or",t.Xor="xor",t.ShiftLeft="shl",t.ShiftRight="shr"}(PointerOperation||(PointerOperation={}));export var PointerReadType;!function(t){t.Pointer="pointer",t.S8="s8",t.U8="u8",t.S16="s16",t.U16="u16",t.S32="s32",t.U32="u32",t.S64="s64",t.U64="u64",t.Short="short",t.UShort="ushort",t.Int="int",t.UInt="uint",t.Long="long",t.ULong="ulong",t.Float="float",t.Double="double",t.ByteArray="byteArray",t.CString="cstring",t.Utf8String="utf8string",t.Utf16String="utf16string",t.AnsiString="ansistring"}(PointerReadType||(PointerReadType={}));export var PointerWriteType;!function(t){t.Pointer="pointer",t.S8="s8",t.U8="u8",t.S16="s16",t.U16="u16",t.S32="s32",t.U32="u32",t.S64="s64",t.U64="u64",t.Short="short",t.UShort="ushort",t.Int="int",t.UInt="uint",t.Long="long",t.ULong="ulong",t.Float="float",t.Double="double",t.ByteArray="byteArray",t.Utf8String="utf8string",t.Utf16String="utf16string",t.AnsiString="ansistring"}(PointerWriteType||(PointerWriteType={}));
✄
/**
 * Process API相关类型定义
 */
export interface ProcessInfo {
    id: number;
    arch: string;
    platform: string;
    pageSize: number;
    pointerSize: number;
    codeSigningPolicy: string;
}
export interface ThreadDetails {
    id: number;
    state: string;
    context: any;
}
export interface ModuleDetails {
    name: string;
    base: string;
    size: number;
    path: string;
}
export interface RangeDetails {
    base: string;
    size: number;
    protection: string;
    file?: {
        path: string;
        offset: number;
        size: number;
    };
}
export interface EnumerateRangesSpecifier {
    protection: string;
    coalesce: boolean;
}
export interface ProcessOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}

✄
{"version":3,"file":"process-types.js","names":[],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":[],"mappings":"","ignoreList":[]}
✄
export{};
✄
/**
 * Socket API相关类型定义
 */
export type SocketType = 'tcp' | 'tcp6' | 'unix';
export interface SocketEndpointAddress {
    ip?: string;
    port?: number;
    path?: string;
    family?: string;
}
export interface SocketListenOptions {
    type?: SocketType;
    port?: number;
    address?: string;
    backlog?: number;
    path?: string;
    exclusive?: boolean;
}
export interface SocketConnectOptions {
    type?: SocketType;
    host?: string;
    port?: number;
    path?: string;
    timeout?: number;
}
export interface SocketConnection {
    id: string;
    type: SocketType;
    localAddress: SocketEndpointAddress;
    peerAddress: SocketEndpointAddress;
}
export interface SocketListener {
    id: string;
    type: SocketType;
    address: SocketEndpointAddress;
}
export interface SocketOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}

✄
{"version":3,"file":"socket-types.js","names":[],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":[],"mappings":"","ignoreList":[]}
✄
export{};
✄
/**
 * Stalker API的类型定义
 */
/// <reference types="frida-gum" />
export declare enum StalkerEventType {
    CALL = "call",
    RET = "ret",
    EXEC = "exec",
    BLOCK = "block",
    COMPILE = "compile"
}
export interface StalkerEvent {
    type: StalkerEventType;
    location?: string;
    target?: string;
    depth?: number;
    data?: any;
}
export interface StalkerOptions {
    events?: {
        call?: boolean;
        ret?: boolean;
        exec?: boolean;
        block?: boolean;
        compile?: boolean;
    };
    transform?: StalkerTransformCallback;
    onEvent?: StalkerEventCallback;
    onReceive?: (events: ArrayBuffer) => void;
    onCallSummary?: (summary: {
        [target: string]: number;
    }) => void;
    onCallProbe?: StalkerCallProbeCallback;
    queueCapacity?: number;
    queueDrainInterval?: number;
}
export type StalkerTransformCallback = (iterator: any) => void;
export type StalkerEventCallback = (event: StalkerEvent) => void;
export type StalkerCallProbeCallback = ((args: any[]) => void) | NativeCallback<any, any[]>;
export interface StalkerOperationResult {
    success: boolean;
    error?: string;
    data?: any;
}
export interface StalkerProbeInfo {
    id: string;
    address: string;
    callback: StalkerCallProbeCallback;
}
export interface StalkerThreadState {
    threadId: number;
    options: StalkerOptions;
    events: StalkerEvent[];
    probes: Map<string, StalkerProbeInfo>;
}
export interface StalkerMemoryRange {
    base: string;
    size: number;
}
export interface StalkerConfig {
    trustThreshold: number;
    queueCapacity: number;
    queueDrainInterval: number;
}

✄
{"version":3,"file":"stalker-types.js","names":["StalkerEventType"],"sourceRoot":"D:/WebstormProjects/mcp-frida-agent/src/types/","sources":["stalker-types.ts"],"mappings":"OAKA,IAAYA,kBAAZ,SAAYA,GACVA,EAAA,YACAA,EAAA,UACAA,EAAA,YACAA,EAAA,cACAA,EAAA,iBACD,CAND,CAAYA,oCAAgB","ignoreList":[]}
✄
export var StalkerEventType;!function(e){e.CALL="call",e.RET="ret",e.EXEC="exec",e.BLOCK="block",e.COMPILE="compile"}(StalkerEventType||(StalkerEventType={}));
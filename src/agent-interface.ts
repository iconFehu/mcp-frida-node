import frida from 'frida';

// --- Redefined Types from mcp-frida-agent/src/types --- 
// (Needed because the server project doesn't directly import from agent project)

export interface PointerOperationResult {
  success: boolean;
  error?: string;
  pointer?: string; // Resulting pointer address as string, e.g., "0x1234"
  data?: any;      // Result data (e.g., read value, boolean, comparison result)
}

export enum PointerOperation {
  Add = 'add',
  Subtract = 'sub',
  And = 'and',
  Or = 'or',
  Xor = 'xor',
  ShiftLeft = 'shl',
  ShiftRight = 'shr'
}

export type PointerAuthKey = 'ia' | 'ib' | 'da' | 'db';

export interface PointerAuthConfig {
  key: PointerAuthKey;
  data?: string; // Pointer address string
}

export interface BatchOperationRequest {
  operations: PointerOperation[]; // Array of operations to perform
  addresses: string[]; // Array of addresses corresponding to operations
}

// We assume the agent returns a standard ArrayBuffer for byte arrays
// over RPC, which Frida typically handles.
// type AgentByteArray = ArrayBuffer; 
// --- End Redefined Types ---

export interface MemoryOperationResult {
  success: boolean;
  error?: string;
  address?: string; // Resulting address as string (e.g., for alloc)
  data?: any;      // Result data (e.g., scan matches, protection status)
}

export interface MemoryScanMatch {
  address: string; // Address of the match as string "0x..."
  size?: number; // Size, if applicable (not typically returned by basic scan)
}

export type PageProtection = 
  | '---' | 'r--' | '-w-' | '--x' 
  | 'r-x' | 'rw-' | '-wx' | 'rwx';

export interface MemoryAllocOptions {
  near?: string;   // Desired proximity address string
  maxDistance?: number;
  protection?: PageProtection;
}

export interface MemoryScanOptions {
  limit?: number;  // Max number of matches to return
  // encoding?: string; // Currently not used in the RPC wrapper logic provided
}

export interface ProcessOperationResult {
  success: boolean;
  error?: string;
  data?: any;      // Result data (e.g., process info, module list, thread list)
}

export interface ThreadDetails {
  id: number;
  state: string; // e.g., 'running', 'stopped', 'waiting', 'uninterruptible', 'halted'
  context: any;  // Architecture-specific context (registers etc.)
}

export interface EnumerateRangesSpecifier {
  protection?: PageProtection; // Optional protection filter
  coalesce?: boolean;        // Whether to coalesce adjacent ranges with same protection
}

export interface SocketOperationResult {
  success: boolean;
  error?: string;
  data?: any;      // Result data (e.g., listener info, connection info, received data)
}

export type SocketType = 'tcp' | 'tcp6' | 'unix';

export interface SocketEndpointAddress {
  ip?: string;
  port?: number;
  path?: string;
  family?: string; // e.g., 'ipv4', 'ipv6', 'unix'
}

export interface SocketListenOptions {
  type?: SocketType;
  port?: number;
  address?: string; // Listen address (e.g., '0.0.0.0')
  backlog?: number;
  path?: string;    // For UNIX sockets
  exclusive?: boolean;
}

export interface SocketConnectOptions {
  type?: SocketType;
  host?: string;
  port?: number;
  path?: string;    // For UNIX sockets
  timeout?: number; // Connection timeout in ms
}

export interface SocketConnection {
  id: string; // Unique ID managed by the agent
  type: SocketType;
  localAddress: SocketEndpointAddress;
  peerAddress: SocketEndpointAddress;
}

export interface SocketListener {
  id: string; // Unique ID managed by the agent
  type: SocketType;
  address: SocketEndpointAddress;
}

export interface StalkerOperationResult {
  success: boolean;
  error?: string;
  data?: any;      // Result data (e.g., events, probe ID, config)
}

export enum StalkerEventType {
  CALL = 'call',
  RET = 'ret',
  EXEC = 'exec',
  BLOCK = 'block',
  COMPILE = 'compile'
}

// Note: StalkerEvent data structure returned by agent might differ slightly
// from Frida's raw GumStalkerEvent due to parsing/annotation.
export interface StalkerEvent {
  type: StalkerEventType;
  location?: string; // Address as string "0x..."
  target?: string;   // Target address as string "0x..." (for call/ret)
  depth?: number;    // Call depth
  // data?: any;    // Agent doesn't seem to explicitly return extra data per event in parse
}

// Note: Callbacks (transform, onEvent) cannot be passed via RPC.
// The agent likely handles event collection via onReceive internally.
export interface StalkerFollowOptions {
  events?: {
    call?: boolean;
    ret?: boolean;
    exec?: boolean;
    block?: boolean;
    compile?: boolean;
  };
  // transform?: StalkerTransformCallback; // Not serializable
  // onEvent?: StalkerEventCallback;       // Not serializable
  // onReceive?: (events: ArrayBuffer) => void; // Handled by agent
  // onCallSummary?: (summary: { [target: string]: number }) => void; // Not serializable
  // queueCapacity?: number; // Set via stalkerSetConfig
  // queueDrainInterval?: number; // Set via stalkerSetConfig
}

// Callback function itself cannot be passed. Agent might expect a predefined action string,
// or this RPC method needs redesign in the agent.
export type StalkerCallProbeCallbackDefinition = string | { type: string; details: any };

export interface StalkerMemoryRange {
  base: string;
  size: number;
}

export interface StalkerConfig {
  trustThreshold?: number;
  queueCapacity?: number;
  queueDrainInterval?: number;
}

export interface KernelOperationResult {
  success: boolean;
  error?: string;
  data?: any;      // Result data (e.g., kernel info, modules, ranges, read value)
}

export interface KernelInfo {
  available: boolean;
  base: string; // Kernel base address as string "0x..."
  pageSize: number;
}

export interface KernelModuleRangeDetails extends MemoryRange {
  name: string;
  // path?: string; // Path might be less relevant or unavailable for kernel ranges
}

// 内存扫描选项
export interface KernelScanOptions {
  onMatch?: (address: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export interface InterceptorOperationResult {
  success: boolean;
  error?: string;
  data?: any;      // Result data (e.g., listener ID, original address)
}

export interface InterceptorListenerId {
  id: string;
}

// Structure of data collected by agent hooks and sent via send()
export interface InterceptorCallbackContext {
  returnAddress?: string;
  threadId?: number;
  depth?: number;
  context?: any; // Arch-specific register context
  args?: Array<{ // Collected arguments
    value: string;
    asInt?: number;
    asFloat?: number;
    asPointer?: string;
  }>;
  returnValue?: { // Collected return value
    value: string;
    asInt?: number;
    asFloat?: number;
    asPointer?: string;
  };
}

// Configuration for attaching an interceptor via RPC
export interface InterceptorAttachConfig {
  onEnter?: boolean; // Trigger event on function entry?
  onLeave?: boolean; // Trigger event on function exit?
  // synchronous?: boolean; // Seems unused in provided agent code
  collectContext?: boolean; // Collect threadId, depth, returnAddress, context regs?
  argCount?: number; // How many arguments to collect (default 8 in agent)
  collectReturnValue?: boolean; // Collect return value?
}

export enum ReplacementMode {
  Normal = 'normal', // Interceptor.replace
  Fast = 'fast'      // Interceptor.replaceFast (might be less stable)
}

export interface ReplacementConfig {
  mode: ReplacementMode;
  saveOriginal?: boolean; // If agent should store original ptr for revert?
  // data?: NativePointer; // Data parameter for Interceptor.replace seems unused in agent wrapper
}

export type BreakpointKind = 'soft' | 'hard';

// Structure of messages received via script.message.connect
export enum InterceptorEventType {
  Enter = 'interceptor:onEnter',
  Leave = 'interceptor:onLeave',
  Error = 'interceptor:onError'
}

export interface InterceptorEventData {
  type: InterceptorEventType;
  targetId: string; // The listener ID returned by interceptorAttach
  context: InterceptorCallbackContext;
  error?: string;
  timestamp: number;
}

/**
 * Interface defining the methods exposed by the Frida Agent via RPC.
 * This acts as a typed wrapper around session.rpc.
 * TODO: Add methods from other core modules (memory, process, etc.)
 * TODO: Refine 'any' types where possible for PointerOperationResult.data
 */
export interface AgentRpc {
    // --- NativePointer Operations (from nativepointer-rpc.ts) ---

    /** Creates a new NativePointer object representation. */
    nativePointerCreate(address: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Checks if the pointer address is null. */
    nativePointerIsNull(address: string): Promise<PointerOperationResult>; // data: { isNull: boolean }
    /** Performs a generic pointer operation (add, sub, and, or, xor, shl, shr). */
    nativePointerOperate(operation: PointerOperation, address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Adds an offset to the pointer address. */
    nativePointerAdd(address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Subtracts an offset from the pointer address. */
    nativePointerSub(address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise AND operation. */
    nativePointerAnd(address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise OR operation. */
    nativePointerOr(address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise XOR operation. */
    nativePointerXor(address: string, operand: string | number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise left shift. */
    nativePointerShl(address: string, operand: number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise right shift. */
    nativePointerShr(address: string, operand: number): Promise<PointerOperationResult>; // data: { address: string }
    /** Performs a bitwise NOT operation. */
    nativePointerNot(address: string): Promise<PointerOperationResult>; // data: { address: string }
    /** Signs the pointer using Pointer Authentication Codes (PAC). */
    nativePointerSign(address: string, config: PointerAuthConfig): Promise<PointerOperationResult>; // data: { address: string }
    /** Strips the PAC signature from the pointer. */
    nativePointerStrip(address: string, key: PointerAuthKey): Promise<PointerOperationResult>; // data: { address: string }
    /** Blends a small integer into the pointer (PAC utility). */
    nativePointerBlend(address: string, smallInteger: number): Promise<PointerOperationResult>; // data: { address: string }
    /** Compares the pointer address with another address. */
    nativePointerCompare(address: string, otherAddress: string | number): Promise<PointerOperationResult>; // data: { result: -1 | 0 | 1 }
    /** Checks if the pointer address equals another address. */
    nativePointerEquals(address: string, otherAddress: string | number): Promise<PointerOperationResult>; // data: { equals: boolean }
    /** Converts the pointer address to a signed 32-bit integer. */
    nativePointerToInt32(address: string): Promise<PointerOperationResult>; // data: { value: number }
    /** Converts the pointer address to an unsigned 32-bit integer. */
    nativePointerToUInt32(address: string): Promise<PointerOperationResult>; // data: { value: number }
    /** Converts the pointer address to a string representation (hex by default). */
    nativePointerToString(address: string, radix?: number): Promise<PointerOperationResult>; // data: { value: string }
    /** Converts the pointer address to a Frida match pattern string. */
    nativePointerToMatchPattern(address: string): Promise<PointerOperationResult>; // data: { pattern: string }

    // --- Memory Reading Operations ---
    nativePointerReadPointer(address: string): Promise<PointerOperationResult>; // data: { value: string } (address)
    nativePointerReadS8(address: string): Promise<PointerOperationResult>;    // data: { value: number }
    nativePointerReadU8(address: string): Promise<PointerOperationResult>;    // data: { value: number }
    nativePointerReadS16(address: string): Promise<PointerOperationResult>;   // data: { value: number }
    nativePointerReadU16(address: string): Promise<PointerOperationResult>;   // data: { value: number }
    nativePointerReadS32(address: string): Promise<PointerOperationResult>;   // data: { value: number }
    nativePointerReadU32(address: string): Promise<PointerOperationResult>;   // data: { value: number }
    nativePointerReadS64(address: string): Promise<PointerOperationResult>;   // data: { value: string | number } (Frida returns Int64/UInt64 objects, often stringified for RPC)
    nativePointerReadU64(address: string): Promise<PointerOperationResult>;   // data: { value: string | number }
    nativePointerReadShort(address: string): Promise<PointerOperationResult>; // data: { value: number }
    nativePointerReadUShort(address: string): Promise<PointerOperationResult>; // data: { value: number }
    nativePointerReadInt(address: string): Promise<PointerOperationResult>;   // data: { value: number }
    nativePointerReadUInt(address: string): Promise<PointerOperationResult>;  // data: { value: number }
    nativePointerReadLong(address: string): Promise<PointerOperationResult>;  // data: { value: string | number }
    nativePointerReadULong(address: string): Promise<PointerOperationResult>; // data: { value: string | number }
    nativePointerReadFloat(address: string): Promise<PointerOperationResult>; // data: { value: number }
    nativePointerReadDouble(address: string): Promise<PointerOperationResult>; // data: { value: number }
    /** Reads a byte array from the pointer address. */
    nativePointerReadByteArray(address: string, length: number, volatile?: boolean): Promise<PointerOperationResult>; // data: { value: ArrayBuffer }
    /** Reads a C-style null-terminated string (encoding?). */
    nativePointerReadCString(address: string, maxLength?: number): Promise<PointerOperationResult>; // data: { value: string }
    /** Reads a UTF8 encoded string. */
    nativePointerReadUtf8String(address: string, maxLength?: number): Promise<PointerOperationResult>; // data: { value: string }
    /** Reads a UTF16 encoded string. */
    nativePointerReadUtf16String(address: string, maxLength?: number): Promise<PointerOperationResult>; // data: { value: string }
    /** Reads an ANSI encoded string. */
    nativePointerReadAnsiString(address: string, maxLength?: number): Promise<PointerOperationResult>; // data: { value: string }

    // --- Memory Writing Operations ---
    nativePointerWritePointer(address: string, value: string): Promise<PointerOperationResult>; // No return data expected beyond success/error
    nativePointerWriteS8(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteU8(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteS16(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteU16(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteS32(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteU32(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteS64(address: string, value: string | number): Promise<PointerOperationResult>;
    nativePointerWriteU64(address: string, value: string | number): Promise<PointerOperationResult>;
    nativePointerWriteShort(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteUShort(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteInt(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteUInt(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteLong(address: string, value: string | number): Promise<PointerOperationResult>;
    nativePointerWriteULong(address: string, value: string | number): Promise<PointerOperationResult>;
    nativePointerWriteFloat(address: string, value: number): Promise<PointerOperationResult>;
    nativePointerWriteDouble(address: string, value: number): Promise<PointerOperationResult>;
    /** Writes a byte array (JS Array or ArrayBuffer) to the pointer address. */
    nativePointerWriteByteArray(address: string, value: number[] | ArrayBuffer, volatile?: boolean): Promise<PointerOperationResult>;
    /** Writes a UTF8 encoded string. */
    nativePointerWriteUtf8String(address: string, value: string): Promise<PointerOperationResult>;
    /** Writes a UTF16 encoded string. */
    nativePointerWriteUtf16String(address: string, value: string): Promise<PointerOperationResult>;
    /** Writes an ANSI encoded string. */
    nativePointerWriteAnsiString(address: string, value: string): Promise<PointerOperationResult>;

    // --- Batch Operation ---
    /** Performs multiple pointer operations in a single RPC call. */
    nativePointerBatchOperate(request: BatchOperationRequest): Promise<PointerOperationResult>; // data: { results: PointerOperationResult[] }

    // --- Memory Operations (from memory-rpc.ts) ---

    /** Scans a memory range for a pattern (asynchronously). */
    memoryScan(baseAddress: string, size: number, pattern: string, options?: MemoryScanOptions): Promise<MemoryOperationResult>; // data: MemoryScanMatch[]
    /** Scans a memory range for a pattern (synchronously). */
    memoryScanSync(baseAddress: string, size: number, pattern: string, options?: MemoryScanOptions): MemoryOperationResult; // data: MemoryScanMatch[]
    /** Allocates a block of memory. */
    memoryAlloc(size: number, options?: MemoryAllocOptions): Promise<MemoryOperationResult>; // address: string (allocated pointer)
    /** Allocates memory and writes a UTF8 string into it. */
    memoryAllocUtf8String(text: string): Promise<MemoryOperationResult>; // address: string
    /** Allocates memory and writes a UTF16 string into it. */
    memoryAllocUtf16String(text: string): Promise<MemoryOperationResult>; // address: string
    /** Allocates memory and writes an ANSI string into it. */
    memoryAllocAnsiString(text: string): Promise<MemoryOperationResult>; // address: string
    /** Copies memory from one address to another. */
    memoryCopy(dstAddress: string, srcAddress: string, size: number): Promise<MemoryOperationResult>; // No specific data returned on success
    /** Duplicates a memory region, returning a pointer to the new copy. */
    memoryDup(address: string, size: number): Promise<MemoryOperationResult>; // address: string (duplicated pointer)
    /** Changes the protection of a memory range. */
    memoryProtect(address: string, size: number, protection: PageProtection): Promise<MemoryOperationResult>; // data: { protected: boolean }
    /** Queries the protection of the memory page containing the address. */
    memoryQueryProtection(address: string): Promise<MemoryOperationResult>; // data: { protection: PageProtection }
    /** Patches code at a specific address with the provided byte array. */
    memoryPatchCode(address: string, bytes: number[]): Promise<MemoryOperationResult>; // No specific data returned on success

    // --- Process Operations (from process-rpc.ts) ---

    /** Gets basic information about the target process. */
    processGetInfo(): Promise<ProcessOperationResult>; // data: ProcessInfo
    /** Gets common directory paths associated with the process. */
    processGetDirs(): Promise<ProcessOperationResult>; // data: { current: string, home: string, temp: string }
    /** Checks if a debugger is attached to the process. */
    processIsDebuggerAttached(): Promise<ProcessOperationResult>; // data: { attached: boolean }
    /** Gets the ID of the current thread executing the agent code. */
    processGetCurrentThreadId(): Promise<ProcessOperationResult>; // data: { threadId: number }
    /** Enumerates all threads in the process. */
    processEnumerateThreads(): Promise<ProcessOperationResult>; // data: ThreadDetails[]
    /** Finds the module containing the specified memory address. */
    processFindModuleByAddress(address: string): Promise<ProcessOperationResult>; // data: ModuleInfo | null
    /** Finds the module with the specified name. */
    processFindModuleByName(name: string): Promise<ProcessOperationResult>; // data: ModuleInfo | null
    /** Enumerates all modules loaded by the process. */
    processEnumerateModules(): Promise<ProcessOperationResult>; // data: ModuleInfo[]
    /** Finds the memory range containing the specified address. */
    processFindRangeByAddress(address: string): Promise<ProcessOperationResult>; // data: MemoryRange | null
    /** Enumerates memory ranges matching the specifier (e.g., protection). */
    processEnumerateRanges(specifier: string | EnumerateRangesSpecifier): Promise<ProcessOperationResult>; // data: MemoryRange[]
    /** Enumerates memory ranges allocated by malloc. */
    processEnumerateMallocRanges(): Promise<ProcessOperationResult>; // data: MemoryRange[]

    // --- Socket Operations (from socket-rpc.ts) ---

    /** Creates a socket listener. Returns listener info including an ID. */
    socketListen(options: SocketListenOptions): Promise<SocketOperationResult>; // data: SocketListener
    /** Connects to a socket server. Returns connection info including an ID. */
    socketConnect(options: SocketConnectOptions): Promise<SocketOperationResult>; // data: SocketConnection
    /** Gets the type of a raw socket handle (less useful with ID-based management). */
    socketGetType(handle: number): Promise<SocketOperationResult>; // data: { type: SocketType | null }
    /** Gets the local address of a raw socket handle. */
    socketGetLocalAddress(handle: number): Promise<SocketOperationResult>; // data: SocketEndpointAddress | null
    /** Gets the peer address of a raw socket handle. */
    socketGetPeerAddress(handle: number): Promise<SocketOperationResult>; // data: SocketEndpointAddress | null
    /** Closes an active socket connection by its agent-managed ID. */
    socketCloseConnection(id: string): Promise<SocketOperationResult>; // No data on success
    /** Closes an active socket listener by its agent-managed ID. */
    socketCloseListener(id: string): Promise<SocketOperationResult>; // No data on success
    /** Sends data over an active connection identified by ID. */
    socketSend(id: string, data: string | ArrayBuffer): Promise<SocketOperationResult>; // No data on success
    /** Receives data from an active connection identified by ID. */
    socketReceive(id: string, size: number): Promise<SocketOperationResult>; // data: { buffer: ArrayBuffer }

    // --- Stalker Operations (from stalker-rpc.ts) ---

    /** Starts stalking a specific thread. Callbacks are handled by the agent. */
    stalkerFollow(threadId: number, options: StalkerFollowOptions): Promise<StalkerOperationResult>; // data: { threadId }
    /** Stops stalking a specific thread. */
    stalkerUnfollow(threadId: number): Promise<StalkerOperationResult>; // No data on success
    /** Excludes a memory range from Stalker instrumentation. */
    stalkerExclude(range: StalkerMemoryRange): Promise<StalkerOperationResult>; // No data on success
    /** Parses a raw event buffer (obtained via internal onReceive). Use getThreadEvents instead for server use. */
    stalkerParse(events: ArrayBuffer): Promise<StalkerOperationResult>; // data: StalkerEvent[] (Potentially less useful via RPC)
    /** Flushes the Stalker event queue for the calling thread. */
    stalkerFlush(): Promise<StalkerOperationResult>; // No data on success
    /** Triggers Stalker's internal garbage collection. */
    stalkerGarbageCollect(): Promise<StalkerOperationResult>; // No data on success
    /** Invalidates the Stalker code cache for a specific address in a thread. */
    stalkerInvalidate(threadId: number, address: string): Promise<StalkerOperationResult>; // No data on success
    /** Adds a call probe. Callback function cannot be passed via RPC directly. Agent implementation needs review. */
    stalkerAddCallProbe(address: string, callbackDefinition: StalkerCallProbeCallbackDefinition): Promise<StalkerOperationResult>; // data: { probeId: string } - Agent needs modification?
    /** Removes a previously added call probe by its ID. */
    stalkerRemoveCallProbe(probeId: string): Promise<StalkerOperationResult>; // No data on success
    /** Retrieves accumulated Stalker events for a specific thread. */
    stalkerGetThreadEvents(threadId: number): Promise<StalkerOperationResult>; // data: StalkerEvent[]
    /** Clears accumulated Stalker events for a specific thread. */
    stalkerClearThreadEvents(threadId: number): Promise<StalkerOperationResult>; // No data on success
    /** Sets Stalker configuration values. */
    stalkerSetConfig(newConfig: StalkerConfig): Promise<StalkerOperationResult>; // No data on success
    /** Gets the current Stalker configuration. */
    stalkerGetConfig(): Promise<StalkerOperationResult>; // data: StalkerConfig

    // --- Kernel Operations (from kernel-rpc.ts) ---
    /** Gets information about the Kernel API availability and properties. */
    kernelGetInfo(): Promise<KernelOperationResult>; // data: KernelInfo
    /** Enumerates kernel modules. */
    kernelEnumerateModules(): Promise<KernelOperationResult>; // data: { modules: ModuleInfo[] }
    /** Enumerates kernel memory ranges based on protection. */
    kernelEnumerateRanges(protection: PageProtection): Promise<KernelOperationResult>; // data: { ranges: MemoryRange[] }
    /** Enumerates memory ranges associated with a specific kernel module (or all if name is null). */
    kernelEnumerateModuleRanges(name: string | null, protection: PageProtection): Promise<KernelOperationResult>; // data: { ranges: KernelModuleRangeDetails[] }
    /** Allocates memory in the kernel address space. */
    kernelAlloc(size: number): Promise<KernelOperationResult>; // data: { address: string }
    /** Changes the protection of a kernel memory range. */
    kernelProtect(address: string, size: number, protection: PageProtection): Promise<KernelOperationResult>; // success: boolean, error?: string
    /** Scans kernel memory asynchronously (Callback limitations apply via RPC). */
    kernelScan(address: string, size: number, pattern: string, options: KernelScanOptions): Promise<KernelOperationResult>; // Potentially unusable due to callbacks
    /** Scans kernel memory synchronously. */
    kernelScanSync(address: string, size: number, pattern: string): Promise<KernelOperationResult>; // data: { matches: { address: string }[] }
    
    // --- Kernel Memory Reading ---
    kernelReadS8(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadU8(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadS16(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadU16(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadS32(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadU32(address: string): Promise<KernelOperationResult>; // data: { value: number }
    // kernelReadS64/U64 missing from RPC wrapper?
    kernelReadFloat(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadDouble(address: string): Promise<KernelOperationResult>; // data: { value: number }
    kernelReadByteArray(address: string, length: number): Promise<KernelOperationResult>; // data: { value: ArrayBuffer | null }
    kernelReadCString(address: string, size?: number): Promise<KernelOperationResult>; // data: { value: string | null }
    kernelReadUtf8String(address: string, size?: number): Promise<KernelOperationResult>; // data: { value: string | null }
    kernelReadUtf16String(address: string, length?: number): Promise<KernelOperationResult>; // data: { value: string | null }

    // --- Kernel Memory Writing ---
    kernelWriteS8(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteU8(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteS16(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteU16(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteS32(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteU32(address: string, value: number): Promise<KernelOperationResult>;
    // kernelWriteS64/U64 missing from RPC wrapper?
    kernelWriteFloat(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteDouble(address: string, value: number): Promise<KernelOperationResult>;
    kernelWriteByteArray(address: string, value: number[] | ArrayBuffer): Promise<KernelOperationResult>;
    kernelWriteUtf8String(address: string, value: string): Promise<KernelOperationResult>;
    kernelWriteUtf16String(address: string, value: string): Promise<KernelOperationResult>;

    // --- Interceptor Operations (from interceptor-rpc.ts) ---

    /** Attaches an interceptor to a target address. Events (onEnter/onLeave) are sent back via script messages. */
    interceptorAttach(targetAddress: string, config: InterceptorAttachConfig): Promise<InterceptorOperationResult>; // data: { id: string } (Listener ID)
    /** Detaches a specific interceptor listener by its ID. */
    interceptorDetach(listenerId: string): Promise<InterceptorOperationResult>; // No data on success
    /** Detaches all active interceptor listeners. */
    interceptorDetachAll(): Promise<InterceptorOperationResult>; // No data on success
    /** Replaces the implementation of a function at targetAddress with the one at replacementAddress. */
    interceptorReplace(targetAddress: string, replacementAddress: string, config: ReplacementConfig): Promise<InterceptorOperationResult>; // data?: { originalAddress: string } (only for mode:Fast)
    /** Reverts a previous replacement operation on targetAddress. Agent must have stored the original. */
    interceptorRevert(targetAddress: string): Promise<InterceptorOperationResult>; // No data on success
    /** Flushes any pending intercepted calls (rarely needed). */
    interceptorFlush(): Promise<InterceptorOperationResult>; // No data on success
    /** Gets the current breakpoint kind used by the interceptor. */
    interceptorGetBreakpointKind(): Promise<InterceptorOperationResult>; // data: { kind: BreakpointKind }
    /** Sets the breakpoint kind ('soft' or 'hard'). */
    interceptorSetBreakpointKind(kind: BreakpointKind): Promise<InterceptorOperationResult>; // No data on success
}

/**
 * Creates a typed RPC proxy object to interact with the Frida agent.
 * @param scriptExports The Frida script exports object.
 * @returns A typed AgentRpc object.
 */
export function createAgentInterface(scriptExports: frida.ScriptExports): AgentRpc {
  if (!scriptExports || typeof scriptExports !== 'object') {
    throw new Error("Invalid Frida script exports provided for RPC interface creation.");
  }
  // Directly cast the exports to the AgentRpc interface
  return scriptExports as unknown as AgentRpc; // Use unknown first for safer casting
}

// --- Supporting Types (Examples - Refine as needed) ---
export interface ModuleInfo {
    name: string;
    base: string; // Address as string '0x...'
    size: number;
    path: string;
}

export interface ProcessInfo {
    id: number;
    name?: string; // Name might not be available directly from Process module, added as optional
    arch: string;
    platform: string;
    pageSize: number;
    pointerSize: number;
    codeSigningPolicy?: string; // Optional based on platform/availability
}

export interface MemoryRange {
    base: string; // Address as string '0x...'
    size: number;
    protection: PageProtection; // Use the defined PageProtection type
    file?: { 
         path: string;
         offset: number;
         size: number;
    };
    state?: 'free' | 'reserved' | 'committed'; // State might not be directly from Process.enumerateRanges, verify agent logic
}

// Placeholder types from frida module if needed directly (though RPC usually simplifies)
type InvocationContext = any; // frida.InvocationContext
type InvocationArguments = any; // frida.InvocationArguments
type InvocationReturnValue = any; // frida.InvocationReturnValue 
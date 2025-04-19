# 在AI IDE中配置MCP Frida服务器

本文档将指导您如何在AI集成开发环境(IDE)中设置和使用MCP Frida服务器，使AI模型能够直接与Frida交互，进行内存分析和操作。

## 前提条件

1. 已安装Node.js (建议版本 >= 16)
2. 已安装Git
3. 已安装Frida（通过npm全局安装或在项目中本地安装）
4. 已克隆或下载MCP Frida项目

## 安装步骤

### 1. 克隆MCP Frida仓库

```bash
git clone https://github.com/iconFehu/mcp-frida-node.git
cd mcp-frida-node
```

### 2. 安装依赖

```bash
npm install
# 或使用pnpm
pnpm install
```

### 3. 构建项目

```bash
npm run build
# 或使用pnpm
pnpm run build
```

## 配置AI IDE

### 在Claude/ChatGPT等AI聊天界面中配置

1. 打开您的AI聊天界面（如Claude、ChatGPT等）
2. 安装支持MCP的插件或扩展
3. 在设置中配置MCP服务器地址（默认为`http://localhost:3000/mcp`）

### 在Cursor等代码编辑器中配置

1. 打开Cursor或其他支持AI的代码编辑器
2. 进入扩展/插件设置
3. 搜索并安装MCP集成插件
4. 在插件设置中将MCP服务器地址设置为`http://localhost:3000/mcp`

## 启动MCP Frida服务器

### 使用SSE传输（推荐用于AI IDE集成）

```bash
# 启动MCP Frida服务器，使用SSE传输，默认端口3000
node dist/index.js --transport=sse --port=3000
```

### 使用标准输入/输出传输（适用于命令行交互）

```bash
# 启动MCP Frida服务器，使用stdio传输
node dist/index.js --transport=stdio
```

## 使用MCP Frida与目标进程交互

启动服务器后，可以通过AI IDE向MCP Frida发送指令，执行以下操作：

### 1. 附加到进程

```
附加到名为PlantsVsZombies.exe的进程
```

或

```
附加到PID为1234的进程
```

### 2. 内存操作示例

读取内存：
```
从地址0x40D120读取32位整数
```

写入内存：
```
向地址0x40D120写入值42（32位整数）
```

搜索内存：
```
在模块base地址到base+0x100000范围内搜索模式"8B 45 ?? 83 C0 01"
```

### 3. 使用Stalker跟踪代码执行

```
开始跟踪主线程的执行
```

## 故障排除

1. **连接问题**
   - 确保MCP Frida服务器已启动并在正确的端口运行
   - 检查防火墙是否阻止了连接

2. **附加失败**
   - 确保目标进程存在且有足够的权限附加
   - 在Windows上，可能需要以管理员身份运行

3. **内存操作错误**
   - 验证地址是否有效
   - 检查内存保护属性是否允许读写

4. **MCP集成问题**
   - 确保AI IDE正确配置了MCP服务器地址
   - 检查网络连接是否正常

## 高级配置

### 自定义MCP服务器端口

```bash
node dist/index.js --transport=sse --port=3001
```

### 自定义MCP端点

```bash
node dist/index.js --transport=sse --port=3000 --endpoint=/custom-mcp
```

## 完整示例：分析植物大战僵尸

以下是使用MCP Frida通过AI IDE分析植物大战僵尸游戏的完整工作流程：

1. 启动MCP Frida服务器：
   ```bash
   node dist/index.js --transport=sse
   ```

2. 在AI IDE中连接到MCP服务器

3. 请求AI附加到游戏进程：
   ```
   请附加到PlantsVsZombies.exe进程
   ```

4. 分析特定函数：
   ```
   分析地址0x40D120处的函数逻辑
   ```

5. 修改游戏内存：
   ```
   将阳光值修改为9999
   ```

通过这种方式，AI可以帮助您分析和修改目标进程的内存和行为，无需手动使用复杂的调试器或Frida命令。 
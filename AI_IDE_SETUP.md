# 在AI IDE中配置MCP Frida服务器

本文档将指导您如何在AI集成开发环境(IDE)中设置和使用MCP Frida服务器，使AI模型能够直接与Frida交互，进行内存分析和操作。

![MCP与AI集成架构图](docs/assets/mcp-ai-integration.png)

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

### Claude Desktop集成

Claude Desktop提供了很好的MCP支持，可以通过以下步骤进行配置：

1. 安装Claude Desktop（如果尚未安装）
2. 找到Claude Desktop的配置文件：
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. 在配置文件中添加以下内容：
```json
{
  "mcpServers": {
    "frida": {
      "command": "node D:/WebstormProjects/mcp-frida/dist/index.js --transport=sse"
    }
  }
}
```

> 注意：请将路径替换为您实际的MCP Frida项目路径。

4. 保存配置文件并重启Claude Desktop
5. 现在，Claude Desktop将自动启动MCP Frida服务器，并将其连接到Claude AI

### 在Claude Web版/ChatGPT等AI聊天界面中配置

对于基于浏览器的AI聊天界面，您需要：

1. 手动启动MCP Frida服务器：
```bash
# 启动MCP Frida服务器，使用SSE传输，默认端口3000
node dist/index.js --transport=sse --port=3000
```

2. 安装浏览器端的MCP集成扩展：
   - [Model Context Protocol Browser Extension](https://github.com/mcp-plugins/browser-extension)（或其他适用的扩展）
   
3. 在扩展设置中添加MCP服务器地址：`http://localhost:3000/mcp`

4. 确保浏览器允许跨域请求，或使用适当的CORS配置启动服务器

### 在Cursor等代码编辑器中配置

Cursor支持MCP协议，可以通过以下步骤进行配置：

1. 打开Cursor设置
2. 找到"AI & Language Model"部分
3. 在MCP Servers配置中添加：
```json
{
  "frida": {
    "url": "http://localhost:3000/mcp"
  }
}
```

4. 手动启动MCP Frida服务器：
```bash
node dist/index.js --transport=sse --port=3000
```

5. 在Cursor中使用时，可以通过@frida前缀调用MCP Frida功能

## 启动MCP Frida服务器

### 使用SSE传输（推荐用于AI IDE集成）

```bash
# 启动MCP Frida服务器，使用SSE传输，默认端口3000
node dist/index.js --transport=sse --port=3000
```

高级选项：
```bash
# 自定义端口和端点
node dist/index.js --transport=sse --port=8080 --endpoint=/api/mcp-frida

# 启用详细日志
node dist/index.js --transport=sse --verbose
```

### 使用标准输入/输出传输（适用于命令行交互）

```bash
# 启动MCP Frida服务器，使用stdio传输
node dist/index.js --transport=stdio
```

## 验证集成

要验证MCP Frida与AI IDE的集成是否成功，可以执行以下测试：

1. 在AI界面中输入以下请求：
```
请列出当前的Frida会话信息
```

2. AI应当能够调用MCP Frida服务器，并返回会话信息（如果尚未附加到任何进程，则会显示未附加状态）

3. 尝试简单的附加操作：
```
请附加到记事本程序
```

如果一切配置正确，AI应能成功执行操作并返回结果。

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

更多高级示例，请参考[示例文档](EXAMPLES.md)。

### 3. 使用Stalker跟踪代码执行

```
开始跟踪主线程的执行
```

## AI提示模板

以下是一些有效的AI提示模板，可以帮助您更好地使用MCP Frida：

### 内存分析提示
```
请帮我分析进程X中的内存区域Y。首先列出该区域的保护属性，然后搜索可能的字符串引用，最后分析其中的代码模式。
```

### 逆向工程提示
```
请帮我逆向分析地址0xXXXXXXXX处的函数。通过Stalker跟踪执行流程，识别所有内存读写操作，并推断函数的用途和参数含义。
```

### 游戏修改提示
```
请帮我在游戏X中修改Y值。需要先附加到游戏进程，然后搜索可能的内存位置，最后修改对应的值。
```

## 故障排除

1. **连接问题**
   - 确保MCP Frida服务器已启动并在正确的端口运行
   - 检查防火墙是否阻止了连接
   - 验证CORS设置是否正确（对于基于浏览器的AI集成）

2. **附加失败**
   - 确保目标进程存在且有足够的权限附加
   - 在Windows上，可能需要以管理员身份运行
   - 检查Frida版本是否与目标兼容

3. **内存操作错误**
   - 验证地址是否有效
   - 检查内存保护属性是否允许读写
   - 确保数据类型匹配（例如不要尝试从无效地址读取字符串）

4. **MCP集成问题**
   - 确保AI IDE正确配置了MCP服务器地址
   - 检查网络连接是否正常
   - 查看MCP Frida服务器的日志输出，寻找可能的错误

5. **常见错误及解决方案**

   | 错误消息 | 可能原因 | 解决方案 |
   |---------|---------|---------|
   | "Not attached to any process" | 尚未附加到进程 | 先使用system_attachProcess附加到目标进程 |
   | "Memory access violation" | 尝试访问无效内存 | 确认地址有效，并具有正确的访问权限 |
   | "Failed to find module" | 模块名称错误或不存在 | 使用process_enumerate枚举所有模块，确认正确名称 |
   | "Connection refused" | MCP服务器未运行或端口被占用 | 确保服务器运行并尝试不同端口 |

## 高级配置

### 自定义MCP服务器端口

```bash
node dist/index.js --transport=sse --port=3001
```

### 自定义MCP端点

```bash
node dist/index.js --transport=sse --port=3000 --endpoint=/custom-mcp
```

### 安全配置

对于生产环境，可能需要添加身份验证和加密。可以考虑：

1. 添加API密钥验证
2. 使用HTTPS而非HTTP
3. 限制允许的IP地址

> 注意：当前版本未内置这些安全功能，需要在外部实现（如通过代理服务器）。

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

## 资源和链接

- [Frida官方文档](https://frida.re/docs/home/)
- [MCP协议规范](https://github.com/mcp-core/spec)
- [示例文档](EXAMPLES.md)
- [常见问题解答](FAQ.md) 
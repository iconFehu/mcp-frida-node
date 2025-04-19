# MCP Frida

MCP Frida是一个结合Model Context Protocol (MCP)和Frida框架的工具，它允许AI模型通过直观的接口与Frida交互，进行内存操作、进程注入和运行时分析。

![MCP Frida 概述](docs/assets/mcp-frida-overview.png)

## 概述

本项目提供了一个基于Node.js的MCP兼容服务器，使AI系统能够与Frida动态插桩工具无缝交互。借助MCP协议，AI模型可以直接分析和修改目标进程的内存和行为，无需手动编写复杂的Frida脚本。

## 功能特点

- **完整的Frida功能支持**：
  - 进程附加与管理
  - 内存读写与操作
  - 指针操作与内存扫描
  - 代码跟踪和分析(Stalker)
  - 内核空间操作(支持的平台)

- **强大的内存操作**：
  - 支持多种数据类型的读写
  - 高级内存扫描和补丁
  - 内存保护属性管理
  - 批量操作支持

- **进程与线程管理**：
  - 查找和附加到进程
  - 枚举模块和内存区域
  - 线程跟踪和分析

- **MCP协议集成**：
  - 支持SSE和标准输入/输出传输方式
  - 事件通知和实时反馈
  - 与AI IDE无缝集成

## 安装

### 前提条件

- Node.js (推荐版本 >= 16)
- npm 或 pnpm 包管理器
- Frida (全局安装或本地安装)

### 快速安装

```bash
# 克隆仓库
git clone https://github.com/iconFehu/mcp-frida-node.git
cd mcp-frida-node

# 安装依赖
npm install
# 或使用pnpm
pnpm install

# 构建项目
npm run build
# 或使用pnpm
pnpm run build
```

## 使用方法

### 启动MCP Frida服务器

```bash
# 使用SSE传输（推荐用于AI IDE集成）
node dist/index.js --transport=sse --port=3000

# 使用标准输入/输出传输（适用于命令行交互）
node dist/index.js --transport=stdio
```

### 与AI集成

查看[AI IDE设置指南](AI_IDE_SETUP.md)获取详细的AI IDE集成步骤。

## 使用示例

### 基础内存操作

```
// 附加到进程
附加到名为PlantsVsZombies.exe的进程

// 读取内存
从地址0x40D120读取32位整数

// 写入内存
向地址0x40D120写入值42（32位整数）
```

### 高级功能

```
// 内存扫描
在模块base地址到base+0x100000范围内搜索模式"8B 45 ?? 83 C0 01"

// 使用Stalker跟踪代码执行
开始跟踪主线程的执行

// 枚举模块
列出所有加载的模块及其地址范围
```

更多示例请参考[示例文档](EXAMPLES.md)。

## 贡献

欢迎提交问题和拉取请求来改进项目。

## 许可

MIT 
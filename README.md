# MCP Frida

MCP Frida是一个结合Model Context Protocol (MCP)和Frida框架的工具，它允许AI模型通过直观的接口与Frida交互，进行内存操作、进程注入和运行时分析。

## 功能特点

- 附加到任何可访问的进程
- 读写内存中的各种数据类型
- 执行内存操作（搜索、分配、修改保护属性等）
- 使用Stalker进行代码跟踪和分析
- 通过MCP与AI模型无缝交互

## 安装

```bash
# 使用npm
npm install

# 或使用pnpm
pnpm install
```

## 使用方法

1. 启动MCP Frida服务器
2. 附加到目标进程
3. 使用提供的工具进行内存分析和操作

## 开发

```bash
# 构建项目
npm run build

# 运行开发服务器
npm run dev
```

## 贡献

欢迎提交问题和拉取请求来改进项目。

## 许可

MIT 
# AI 时代前端开发工作流

> Agentic Software Development — 从编码到交付的全链路工作流

## 📁 目录结构

```
work-flow/
├── index.html                 # 入口页（导航到 Global / Local）
├── global/
│   ├── index.html             # Global版交互式文档
│   ├── data.js                # 工作流结构化数据（范式、管线、工具链、信息流）
│   └── sources.json           # 追踪的信息源配置
├── local/
│   ├── index.html             # Local版交互式文档
│   └── customizations.js      # 项目定制层（覆盖工具、Tips、约定）
├── scripts/
│   └── fetch-sources.py       # 自动抓取信息源脚本
└── README.md
```

## 🌍 Global 版

追踪业内一流的 Agentic 开发方法论与工具链集成：
- **开发管线**：6阶段端到端工作流，每个阶段定义 AI/人类职责
- **开发范式**：5大范式（Vibe Coding / AI Pair Programming / Agent-Driven / Spec-Driven / Test-Driven AI）
- **工具链**：AI编码工具 + Agent平台 + 测试工具的选型评估
- **信息流**：来自 X / Reddit / Medium / HackerNews / ArXiv 的一线分享

## 🎯 Local 版

基于 Global 版的项目定制：
- 继承全局工作流数据和管线
- 叠加项目特定的工具配置和团队约定
- 记录项目内部的AI开发实践数据

## 🔄 持续更新

### 信息源自动更新（通过 OpenClaw Cron）

设置每周自动搜索和更新：

```bash
# 手动触发一次更新
python3 scripts/fetch-sources.py --dry-run    # 预览
python3 scripts/fetch-sources.py               # 执行更新
```

### 数据更新方式

1. **自动**：通过 OpenClaw cron job 定期调用 fetch-sources.py
2. **半自动**：在对话中让 AI 搜索最新内容并更新 data.js
3. **手动**：直接编辑 data.js 中的 feed 数组

### 更新 Global 工作流数据

编辑 `global/data.js`：
- `paradigms` — 新增/更新开发范式
- `pipeline.stages` — 调整管线阶段内容
- `toolchain` — 更新工具评估
- `feed` — 添加新的信息流条目

### 更新 Local 定制

编辑 `local/customizations.js`：
- `pipelineOverrides` — 覆盖特定阶段的工具和Tips
- `conventions` — 添加/修改团队约定
- `localTools` — 更新内部工具
- `paradigmFocus` — 调整重点范式
- `localFeed` — 添加项目动态

## 🚀 快速开始

1. 用浏览器打开 `index.html`
2. 点击 "Global 工作流" 查看业界最佳实践
3. 点击 "Local 工作流" 查看项目定制
4. 点击各阶段的卡片展开详情
5. 使用信息流的搜索和过滤功能

## 📊 设计原则

- **数据与视图分离**：所有内容在 data.js / customizations.js 中，HTML只负责渲染
- **渐进式细节**：折叠/展开交互，避免信息过载
- **AI/人类职责分明**：每个管线阶段清晰标注AI和人类的分工
- **持续追踪**：信息流部分定期更新一线实践

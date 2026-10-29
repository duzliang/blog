# 枝叶

个人中文博客，记录 AI 工作流、工程实践和阅读思考。基于 Astro 5、Svelte、Tailwind CSS 与 Fuwari，沿用 LogiMap 的设计配色。

线上地址：https://blog-two-sage-40.vercel.app/

## 本地开发

需要 Node.js 20+ 与 pnpm 9。

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

搜索使用 Pagefind，须构建后在预览环境验证；开发环境会显示提示。

## 内容与入口

- 首页：三个主题入口与最新文章。
- `/topics/ai-workflow/`：AI 工作流文章及现有交互工具入口。
- `/topics/engineering/`：工程实践，包含待写选题。
- `/topics/reading/`：阅读与思考，首篇为 a16z 文章的中文摘要与学习笔记。
- `/ai-workflow/local/`：已有的项目定制工作流；Global 和 v2 路由继续可用。
- `/archive/`、`/about/`、`/rss.xml`：归档、关于和订阅。

主题配置在 `src/constants/topics.ts`，站点、作者及菜单在 `src/config.ts`。正式域名在 `astro.config.mjs` 配置。

## 写文章

```sh
pnpm new-post my-first-note
```

新文件放在 `src/content/posts/`，默认中文、草稿、工程实践分类。写完后设置标题、描述、标签和分类，将 `draft` 改为 `false` 后发布。分类请优先使用“AI 工作流”“工程实践”“阅读与思考”。日期使用 `YYYY-MM-DD`。

原有 LogiMap 草稿和个人成长地图保存在 `notes/`，不参与网站构建和搜索。模板示例文章、插图和多语言说明文档已经移除。

## 主题

`public/theme.css` 保存从本地 LogiMap 提取的共享语义色、字体栈与动效变量；`src/styles/theme.css` 适配博客组件，`public/ai-workflow/theme.css` 适配独立工作流页面。支持明暗模式和减少动态效果偏好。字体优先使用本机已安装字体。

主题源参考：`../logimap/packages/ui/src/styles/tokens.css`，博客不依赖该目录即可单独构建。

## 内容规划与版权

后续选题和维护建议见 [内容规划](docs/content-plan.md)。a16z 笔记是摘要与延伸思考，不是授权转载或全文译文；原文来源和作者在文中注明。

项目沿用 [Fuwari](https://github.com/saicaca/fuwari) 的开源基础，许可证见 [LICENSE](LICENSE)。

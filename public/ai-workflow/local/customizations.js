// Local Customizations — Project-specific overrides and additions
// This file extends the Global workflow data with project-specific context
// Last updated: 2026-06-05

const LOCAL_CUSTOMIZATIONS = {
  meta: {
    projectName: "当前项目",
    team: "",
    lastUpdated: "2026-06-05",
    baseVersion: "global/v1.0.0"
  },

  // Override specific pipeline stages for this project
  pipelineOverrides: {
    "s3-implementation": {
      tools: ["Cursor (团队统一)", "Claude Code", "内部CI"],
      tips: [
        "本项目使用 pnpm workspace，让AI生成代码时指定 workspace 协议",
        "组件开发遵循 Storybook 驱动：先写 Story 再写组件",
        "API 调用统一走 @/api 层，不要在组件里直接 fetch"
      ]
    },
    "s5-deployment": {
      tools: ["内部 CI/CD", "Vercel (预览)", "内部监控平台"],
      tips: [
        "预览环境自动部署：PR 创建即部署预览链接",
        "生产发布需要 Code Owner 审批"
      ]
    }
  },

  // Project-specific paradigms focus
  paradigmFocus: ["ai-pair-programming", "spec-driven-dev"],

  // Project-specific toolchain
  localTools: [
    { name: "内部组件库", emoji: "🧩", type: "UI Library", strength: "统一设计语言 + AI可引用的组件规范", pricing: "Internal" },
    { name: "内部 API Mock", emoji: "🔮", type: "Mock Service", strength: "基于 OpenAPI Schema 自动生成", pricing: "Internal" },
    { name: "内部监控", emoji: "📊", type: "Observability", strength: "前端错误追踪 + 性能指标", pricing: "Internal" }
  ],

  // Project conventions
  conventions: [
    { category: "代码风格", rule: "ESLint + Prettier 统一格式化，AI生成代码必须通过 lint" },
    { category: "分支策略", rule: "feat/* / fix/* 分支命名，squash merge 到 main" },
    { category: "提交规范", rule: "Conventional Commits，AI辅助生成 commit message" },
    { category: "组件规范", rule: "每个组件必须有 TypeScript 类型 + JSDoc + Storybook Story" },
    { category: "API 规范", rule: "API 层统一封装，类型从 OpenAPI Schema 自动生成" }
  ],

  // kimi-webbridge engineering workflow
  webbridgeSteps: [
    {
      title: "启动 kimi-webbridge 并连接浏览器",
      subtitle: "确保浏览器已登录目标站点",
      description: "kimi-webbridge 是一个本地代理服务，允许 AI Agent 通过 CDP 协议操控已登录的浏览器。启动后，Agent 可以复用已有的登录态，无需手动输入密码或处理验证码。",
      commands: "$ webbridge start\n✓ webbridge v1.9.16 running on http://localhost:9222\n✓ Chrome extension connected",
      tips: [
        "确保 Chrome/Edge 浏览器已打开并安装 webbridge 扩展",
        "启动前先手动登录所有需要访问的站点（原型站、接口文档站等）",
        "webbridge 默认端口 9222，如需修改可在配置文件中指定"
      ]
    },
    {
      title: "读取原型网站页面结构",
      subtitle: "从 Axure/Figma 原型提取页面组件树",
      description: "通过 webbridge 的 snapshot 功能，AI Agent 可以读取原型页面的完整 accessibility tree，识别出导航结构、模块划分、表单字段等关键信息。这比截图识别更精确，能获取到文本内容和层级关系。",
      commands: "# 1. 打开原型首页\nbrowser navigate https://demo.feewee.cn/\n\n# 2. 获取页面结构\nbrowser snapshot\n\n# 3. 进入具体模块\nbrowser click \"售后首页\"",
      output: "页面导航树：\n├─ A1.事故车拆解\n├─ A2.报价管理\n├─ A3.施工管理\n├─ A4.自媒体智能分析\n├─ A8.财务\n└─ 售后首页（当前页）\n\n页面组件：搜索栏、工单列表、状态筛选、操作按钮组",
      tips: [
        "先浏览目录结构，再逐个进入关键页面获取详细结构",
        "Axure 原型的 accessibility tree 比截图更可靠——包含完整文本和语义",
        "对复杂页面，结合截图 + snapshot 双重确认布局关系"
      ]
    },
    {
      title: "读取接口文档定义",
      subtitle: "从 Torna/Swagger 提取 API 契约",
      description: "接口文档站（如 Torna）通常提供 OpenAPI/Swagger 格式的接口定义。Agent 可以通过页面操作获取完整的接口列表、参数定义和响应结构。部分平台支持 OpenAPI token，可直接通过 API 批量拉取。",
      commands: "# 1. 进入接口文档站\nbrowser navigate https://torna.feewee.cn/\n\n# 2. 获取项目列表\nbrowser snapshot\n\n# 3. 进入目标项目\nbrowser click \"fw-card\"\n\n# 4. 查看接口列表\nbrowser click \"接口列表\"\n\n# 5. 获取 OpenAPI 定义（如支持）\ncurl -H \"Authorization: Bearer ce8867...\" \\\n  https://torna.feewee.cn/api/openapi/get?token=xxx",
      output: "项目：fw-card\n├─ 接口列表（23个接口）\n│  ├─ POST /api/card/create\n│  ├─ GET  /api/card/list\n│  └─ PUT  /api/card/update\n└─ OpenAPI Token: ce8867002f6f416aaffe21d65761d4f6",
      tips: [
        "优先使用 OpenAPI token 批量拉取，效率远高于逐个页面读取",
        "如果平台支持导出 Swagger JSON，优先导出后本地解析",
        "接口文档中的枚举值和必填标记必须完整获取，影响后续 TypeScript 类型生成"
      ]
    },
    {
      title: "生成代码骨架",
      subtitle: "原型 + 接口 → 页面组件 + TypeScript 类型 + API 函数",
      description: "将前两步获取的原型结构和接口定义合并，AI Agent 自动生成：页面组件树（基于原型模块划分）、TypeScript interface（基于 API Schema）、API 调用函数（基于接口定义）、页面骨架代码（基于原型布局）。",
      output: "生成文件清单：\n├─ types/card.ts          # TypeScript 接口定义\n├─ api/card.ts            # API 调用函数\n├─ components/CardList/   # 页面组件\n│  ├─ index.tsx\n│  ├─ CardItem.tsx\n│  └─ CardFilter.tsx\n└─ pages/card/index.tsx   # 页面骨架",
      tips: [
        "生成的 TypeScript 类型必须与 OpenAPI Schema 一一对应，用工具校验",
        "API 函数统一走 @/api 层，保持项目一致性",
        "骨架代码先出结构，具体样式后续通过原型截图微调",
        "建议生成后立即与原型对比，确认组件划分是否合理"
      ]
    }
  ],

  // Core Points — 核心要点
  corePoints: [
    {
      title: "Plan 模式",
      emoji: "📋",
      tags: ["claude", "codex", "solo"],
      description: "功能复杂，改动较多的模块",
      details: [
        "适用于大规模功能变更、架构调整等复杂场景",
        "AI 分析需求 → 输出实施计划 → 人工审核确认",
        "变更越大，计划越细；审核通过后再执行"
      ]
    },
    {
      title: "Spec 模式",
      emoji: "📐",
      tags: ["claude", "solo"],
      description: "复杂功能开发，提前规划需求细节",
      details: [
        "编写技术规格文档，明确功能边界和实现方案",
        "列出详细的任务列表，拆分可执行的子任务",
        "标注验收标准，确保交付质量可衡量"
      ]
    },
    {
      title: "精简上下文",
      emoji: "🎯",
      description: "提供必要且尽可能精简的上下文",
      details: [
        "只提供与任务直接相关的文件和代码片段",
        "避免无关信息干扰 AI 的判断和输出",
        "Prompt 保留必要冗余，以便模型全面理解"
      ]
    }
  ],

  // Standard Workflow — 团队常规 AI 开发工作流
  standardWorkflow: [
    {
      id: "wf-prototype",
      title: "原型 → UI 设计稿",
      emoji: "🎨",
      phase: "设计",
      description: "没有设计稿的功能，先将原型截图导入 Figma，AI 辅助生成可交互的设计稿。",
      tips: [
        "原型截图作为参考输入，Figma 中构建可交互高保真设计稿",
        "利用 AI 辅助快速生成设计规范、间距系统和基础组件",
        "输出物：Figma 设计稿 + 交互说明"
      ]
    },
    {
      id: "wf-api",
      title: "定义接口与数据类型",
      emoji: "🔌",
      phase: "设计",
      description: "提前定义接口契约和数据类型，作为前后端协作的合约。",
      tips: [
        "演进路径：微信截图识别 → 导出结构化数据 → 终极集成 Torna MCP",
        "接口定义包含：接口方法、TS Request/Response Interface（需遵循code-style规范）",
        "api/server 内容组织建议接口按顺序集中定义，如 listApi()、detailApi(id)、editApi(id) 等，方便与接口文档核对，类型定义可导航查看"
      ]
    },
    {
      id: "wf-ui-page",
      title: "UI → 页面生成",
      emoji: "⚡",
      phase: "开发",
      description: "基于设计稿和接口定义，AI 自动生成页面代码。",
      tips: [
        "通过 Figma Plugin 读取设计稿，自动提取布局、颜色、字体规格",
        "有设计稿的页面可直接截图 + API 定义 → 生成完整页面",
        "无设计稿页面：原型结构 + API 定义 → 先生成骨架再细化"
      ]
    },
    {
      id: "wf-plan",
      title: "复杂功能：Plan / Spec 模式",
      emoji: "📋",
      phase: "开发",
      description: "新功能或复杂逻辑变更，先开启 Plan/Spec 模式制定详细计划，审核通过后再执行。",
      tips: [
        "Plan 模式：AI 分析需求 → 输出实施计划 → 人工审核确认",
        "Spec 模式：编写技术规格文档 → AI 基于规格生成代码",
        "核心原则：变更越大，计划越细；审核通过后再执行，避免返工"
      ]
    },
    {
      id: "wf-worktree",
      title: "并行开发：Worktree + 最小提交",
      emoji: "🌲",
      phase: "开发",
      description: "多个独立任务并行开发时使用 Git Worktree，代码提交遵循最小功能/任务原则。",
      tips: [
        "每个独立任务使用独立 worktree，避免分支切换冲突",
        "改完一个功能、验证没问题就提交，保持提交原子性",
        "提交信息清晰描述变更内容，方便回溯和 Code Review",
        "可使用桌面端 Code Agent（如 Codex、Solo）来管理 worktree，交互更友好"
      ]
    },
    {
      id: "wf-scope",
      title: "精准定位：指定目录/文件",
      emoji: "🎯",
      phase: "开发",
      description: "功能修改时指定具体目录和文件，缩小范围，避免 AI 大范围查找。",
      tips: [
        "明确告诉 AI 目标文件路径，减少无关文件的扫描",
        "复杂变更先列出涉及文件清单，确认后再执行",
        "利用 @file 或绝对路径引用，提高上下文精度"
      ]
    },
    {
      id: "wf-review",
      title: "代码三板斧：Simplify / Review / Verify",
      emoji: "🔍",
      phase: "质量",
      description: "代码变更后执行 simplify、code-review、verify 三步，确保代码质量和功能正确性。",
      tips: [
        "simplify：检查代码简化、复用、效率优化空间",
        "code-review：检查正确性、潜在 Bug、安全漏洞",
        "verify：运行应用验证变更实际生效，避免'看起来对'"
      ]
    },
    {
      id: "wf-multi-model",
      title: "复杂功能：多模型交叉验证",
      emoji: "🤖",
      phase: "质量",
      description: "复杂功能可使用多个 AI 模型交叉验证，提升方案可靠性。",
      tips: [
        "同一需求用不同模型（Claude / GPT / kimi）分别实现",
        "对比各模型输出，取最优方案或融合优点",
        "特别适用于架构设计、算法实现等关键决策"
      ]
    },
    {
      id: "wf-commit",
      title: "自动生成提交信息",
      emoji: "📝",
      phase: "交付",
      description: "利用 AI 自动生成规范的提交信息，保持提交历史清晰可读。",
      tips: [
        "遵循 Conventional Commits 规范：type(scope): subject",
        "AI 基于 diff 内容自动生成描述，人工确认后提交",
        "复杂变更补充 body 说明变更动机和影响范围"
      ]
    },
    {
      id: "wf-design-token",
      title: "设计规格：Design Token / 标注文件",
      emoji: "🎨",
      phase: "探索",
      description: "探索使用 Design Token 或设计稿标注文件，精确读取设计规格。",
      tips: [
        "Figma 导出 Design Token（颜色、字体、间距、阴影）",
        "利用设计稿标注文件替代截图识别，提升规格读取精度",
        "目标：设计稿 → 代码的零损耗转换"
      ]
    }
  ],

  // Domain Skills — 特定领域专属 Skill，提升任务执行精度
  // 完整内容存放在 ai/skills/{skillId}/SKILL.md，点击卡片可展开查看
  domainSkills: [
    {
      name: "通用代码规范",
      emoji: "📐",
      skillId: "code-style",
      domain: "通用规范",
      status: "active",
      description: "所有项目通用的代码风格规范。涵盖功能模块目录结构、文件与函数命名规则、API 命名规范等。",
      tips: [
        "功能模块标准结构：index.tsx / api.ts / entity.ts / components/ / style.scss",
        "目录使用 kebab-case，文件内不使用重复功能名前缀",
        "API 命名：listApi / detailApi / saveApi，Interface 命名：ListItem / Detail / SaveParams"
      ]
    },
    {
      name: "H5 代码规范",
      emoji: "📱",
      skillId: "h5-code-style",
      domain: "H5 应用",
      status: "active",
      description: "H5 应用代码风格规范，基于 React + Modern.js + @feewee/h5app-common 技术栈。",
      tips: [
        "页面主文件统一命名为 page.tsx，子页面放 __subpages/ 目录",
        "API 函数使用描述性名称 + Api 后缀，如 listApi() / detailApi(id)",
        "组件使用 PageProvider 包裹，统一使用 useRequest 处理 API 请求"
      ]
    },
    {
      name: "售后报表代码规范",
      emoji: "📊",
      skillId: "report-code-style",
      domain: "售后报表",
      status: "active",
      description: "售后报表系统代码风格规范，基于 src/pages/Cas 目录的代码模式。",
      tips: [
        "报表模块三件套：Summary / Trend / Lists 组件",
        "实时报表 index.tsx，历史报表 history.tsx",
        "维度切换使用 Dimension 枚举 + DimensionAdapter + DimensionCodeAdapter"
      ]
    },
    {
      name: "RN → H5 代码迁移",
      emoji: "🔄",
      skillId: "rn-code-migration",
      domain: "跨端迁移",
      status: "active",
      description: "React Native 代码迁移至 H5 的转换规范，基于 KeeperAI 项目迁移经验。",
      tips: [
        "业务行为优先于 UI 对等，保持功能等价性",
        "StyleSheet → Tailwind CSS，react-navigation → @modern-js/runtime/router",
        "使用 @feewee/h5-common 组件替代 RN 组件，优先使用项目已有组件"
      ]
    },
    {
      name: "小程序代码规范",
      emoji: "💬",
      skillId: "wx-code-style",
      domain: "微信小程序",
      status: "active",
      description: "微信小程序（pgCas）开发代码规范，基于 src/pgCas 目录的编码习惯。",
      tips: [
        "页面文件：index.tsx + api.ts + style.less + components/",
        "API 命名使用 [action]Api 后缀，必须定义 Params 和 Result 接口",
        "使用 Taro.showLoading / showToast 处理加载和反馈，Container 组件包裹页面"
      ]
    }
  ],

  // Use Cases — 其他场景实践案例
  useCases: [
    {
      title: "前端项目集成 Ant Design AI 功能",
      emoji: "🐜",
      category: "组件库集成",
      categoryLink: "https://ant.design/docs/react/llms-cn",
      tags: ["Ant Design", "AI", "组件库"],
      scenario: "提高 AI 对 Ant Design 组件库的准确理解，使 AI 生成的代码更贴合组件库 API。",
      approach: "将 Ant Design 的组件文档、API 定义、使用示例集成到 AI 上下文，提升组件使用准确性。",
      outcome: "AI 能准确引用 antd 组件和 Props，减少因 API 误用导致的返工。"
    },
    {
      title: "售后自媒体报表功能整合",
      emoji: "📊",
      category: "计划-执行-迭代",
      tags: ["售后系统", "报表", "迁移", "计划模式"],
      scenario: "完全不理解业务，全由 AI 进行功能整合和迁移。",
      approach: "理清功能模块相互关系和迁移前后映射 → 设计代码组织结构 → 梳理组件依赖关系 → 核对计划并确认 → 执行 → 测试 → 迭代直到功能完整。",
      outcome: "AI 主导完成复杂业务系统的功能整合，通过结构化计划和迭代验证确保迁移质量。"
    },
    {
      title: "kimi-webbridge 页面自验证",
      emoji: "🔍",
      category: "自动化验证",
      tags: ["kimi-webbridge", "自动化", "验证"],
      scenario: "利用 kimi-webbridge 对开发完成的页面进行自动化操作验证。",
      approach: "AI 通过 webbridge 操控真实浏览器，自动点击、输入、跳转，验证页面功能是否正常。",
      outcome: "无需人工逐页测试，AI 自动完成端到端功能验证，提升测试效率。"
    },
    {
      title: "桌面端 Agent 工具探索",
      emoji: "🖥️",
      category: "工具探索",
      tags: ["桌面端", "Agent", "Codex", "Solo"],
      scenario: "探索桌面端 Agent 工具（如 Codex、Solo），相比 CLI 交互更友好，方便多项目多任务管理。",
      approach: "评估桌面端 Agent 在构建计划时的交互式问答和条件选择能力，特别是在边界模糊的情况下进行确认。",
      outcome: "桌面端 Agent 提供更友好的交互体验，在计划构建阶段通过交互式问答提升计划质量。"
    }
  ],

  // Local feed — project-specific updates
  localFeed: [
    {
      id: "lf1",
      title: "本周Sprint回顾：AI辅助编码效率提升40%",
      date: "2026-06-03",
      tags: ["📊数据"],
      summary: "Sprint数据统计：使用Cursor+Claude Code后，人均代码产出提升40%，Code Review通过率从65%提升到82%。主要提升来自样板代码生成和测试用例生成。"
    },
    {
      id: "lf2",
      title: "kimi-webbridge 工程化实践落地：原型→接口→代码闭环",
      date: "2026-06-05",
      tags: ["🌉工程化"],
      summary: "通过 kimi-webbridge 实现了原型站（demo.feewee.cn）和接口文档站（torna.feewee.cn）的自动读取。Agent 可复用浏览器登录态，自动提取页面结构和 API 定义，生成 TypeScript 类型和页面骨架代码。"
    }
  ]
};

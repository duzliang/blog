// Agentic Software Development Workflow Data
// Last updated: 2026-06-04

const WORKFLOW_DATA = {
  meta: {
    version: "1.0.0",
    lastUpdated: "2026-06-04",
    updateFrequency: "weekly",
    sources: ["X/Twitter", "Reddit", "Medium", "HackerNews", "GitHub", "ArXiv"]
  },

  paradigms: [
    {
      id: "vibe-coding",
      name: "Vibe Coding",
      emoji: "🎨",
      tagline: "用自然语言描述意图，AI生成代码",
      maturity: "emerging",
      description: "由 Andrej Karpathy 提出，开发者用自然语言描述意图而非逐行编码，AI负责生成实现。核心是'提示词即代码'的范式转变。",
      keyPractices: [
        "清晰的问题分解和意图表达",
        "增量式提示词迭代（而非一次写完）",
        "生成后的人工审查和调整",
        "上下文管理：保持对话窗口的聚焦"
      ],
      tools: ["Claude Code", "Cursor", "GitHub Copilot Workspace", "Windsurf", "Aider"],
      risks: ["生成代码质量参差不齐", "安全漏洞隐藏在AI生成代码中", "过度依赖导致理解缺失"],
      sources: [
        { title: "Karpathy: Vibe Coding is the future", platform: "X", date: "2025-02", url: "#" },
        { title: "Vibe Coding 陷阱与最佳实践", platform: "Medium", date: "2025-04", url: "#" }
      ]
    },
    {
      id: "ai-pair-programming",
      name: "AI Pair Programming",
      emoji: "👥",
      tagline: "人类导航，AI驱动——持续结对开发",
      maturity: "mainstream",
      description: "人类作为导航者（Navigator），AI作为驱动者（Driver）。人类负责架构决策、业务逻辑审查；AI负责代码实现、样板代码、测试生成。",
      keyPractices: [
        "明确职责边界：人做决策，AI做执行",
        "小步快跑：每次让AI处理一个小任务",
        "持续Code Review：AI生成的每段代码都需要审查",
        "测试先行：让AI基于测试用例生成实现"
      ],
      tools: ["Cursor", "GitHub Copilot", "Claude Code", "Codeium", "Tabnine"],
      risks: ["盲目接受AI建议", "代码一致性下降", "安全盲区"],
      sources: [
        { title: "AI Pair Programming 实战经验", platform: "Reddit", date: "2025-06", url: "#" },
        { title: "How we use AI pair programming at scale", platform: "Medium", date: "2025-05", url: "#" }
      ]
    },
    {
      id: "agent-driven-dev",
      name: "Agent-Driven Development",
      emoji: "🤖",
      tagline: "AI Agent自主完成端到端开发任务",
      maturity: "emerging",
      description: "AI Agent接收高层任务描述，自主规划、编码、测试、调试。人类从执行者转变为监督者和审核者。这是Agentic开发的终极形态。",
      keyPractices: [
        "任务分解与Agent编排",
        "安全沙箱：Agent在隔离环境中执行",
        "自动化测试和验证门控",
        "人机协作检查点（Human-in-the-loop）"
      ],
      tools: ["Devin", "OpenHands", "SWE-Agent", "AutoGPT", "MetaGPT", "Claude Code (Agent Mode)"],
      risks: ["Agent行为不可预测", "成本失控（无限循环）", "安全边界模糊"],
      sources: [
        { title: "SWE-bench: Agent能否独立解决真实Issue", platform: "ArXiv", date: "2025-03", url: "#" },
        { title: "Agent-Driven Dev 在企业的落地挑战", platform: "HackerNews", date: "2025-05", url: "#" }
      ]
    },
    {
      id: "spec-driven-dev",
      name: "Spec-Driven Development",
      emoji: "📋",
      tagline: "先写规格，再让AI实现——规格即合约",
      maturity: "growing",
      description: "在AI编码之前，先用结构化的规格文档（PRD、技术设计、API Schema）定义清楚做什么。AI基于规格生成代码，人类审查规格而非代码。",
      keyPractices: [
        "结构化需求文档（PRD → Tech Spec → API Contract）",
        "规格版本化和变更追踪",
        "AI基于规格生成代码 + 测试",
        "规格与实现的自动一致性检查"
      ],
      tools: ["Claude Code", "Cursor Spec Mode", "GitHub Copilot Workspace", "GPT Engineer"],
      risks: ["规格本身的质量问题", "规格与实现的漂移", "过度规格化导致僵化"],
      sources: [
        { title: "Spec-Driven Development with AI", platform: "Medium", date: "2025-04", url: "#" },
        { title: "从PRD到代码：AI时代的开发流程重构", platform: "X", date: "2025-06", url: "#" }
      ]
    },
    {
      id: "test-driven-ai",
      name: "Test-Driven AI Development",
      emoji: "🧪",
      tagline: "测试先行，AI补实现——确定性最强的工作流",
      maturity: "growing",
      description: "人类写测试用例定义期望行为，AI生成通过测试的实现代码。结合TDD与AI，实现'测试即规格'的开发流程。",
      keyPractices: [
        "先写失败的测试（Red）",
        "让AI生成通过测试的最小实现（Green）",
        "AI辅助重构优化（Refactor）",
        "变异测试验证测试质量"
      ],
      tools: ["Cursor", "Claude Code", "GitHub Copilot", "Aider"],
      risks: ["测试覆盖的假象", "AI可能通过硬编码通过测试", "边界条件遗漏"],
      sources: [
        { title: "TDD + AI: The Perfect Match", platform: "Reddit", date: "2025-05", url: "#" }
      ]
    }
  ],

  pipeline: {
    name: "Agentic Frontend Development Pipeline",
    stages: [
      {
        id: "s1-ideation",
        name: "需求理解与拆解",
        icon: "💡",
        description: "理解业务需求，拆解为可执行的技术任务",
        inputs: ["PRD", "用户故事", "设计稿"],
        outputs: ["技术任务列表", "验收标准"],
        aiRole: "辅助需求分析、识别边界条件、生成任务拆解建议",
        humanRole: "定义业务目标、做优先级决策、审核任务拆解合理性",
        tools: ["Claude/GPT (需求分析)", "Linear/Jira (任务管理)", "Figma AI (设计理解)"],
        tips: [
          "用AI辅助做需求完整性检查——'这个需求有没有遗漏边界条件？'",
          "让AI生成验收标准初稿，人工补充业务逻辑",
          "设计稿 → AI生成组件结构建议"
        ]
      },
      {
        id: "s2-architecture",
        name: "技术设计与架构",
        icon: "🏗️",
        description: "确定技术方案、组件架构、数据流设计",
        inputs: ["技术任务列表", "现有架构文档"],
        outputs: ["技术设计文档", "API契约", "组件树"],
        aiRole: "生成架构方案建议、API设计初稿、组件结构建议",
        humanRole: "做架构决策、评估技术风险、确保方案与团队技术栈匹配",
        tools: ["Claude Code (架构讨论)", "Mermaid (架构图)", "OpenAPI/GraphQL Schema"],
        tips: [
          "让AI基于现有代码库生成架构分析——'当前架构的瓶颈在哪？'",
          "API契约先行，AI基于Schema生成Mock和类型定义",
          "用AI做方案对比——'方案A vs 方案B的trade-off'"
        ]
      },
      {
        id: "s3-implementation",
        name: "编码实现",
        icon: "⌨️",
        description: "AI辅助编码，从组件到页面到功能完整实现",
        inputs: ["技术设计文档", "API契约", "设计稿"],
        outputs: ["功能代码", "单元测试", "组件文档"],
        aiRole: "生成代码实现、编写测试、处理样板代码",
        humanRole: "审查代码质量、确保业务逻辑正确、处理复杂边界",
        tools: ["Cursor", "Claude Code", "GitHub Copilot", "Windsurf", "Aider"],
        tips: [
          "小步提交：每次让AI处理一个组件/功能点",
          "AI生成代码后立即Review，不要积累技术债",
          "让AI基于现有代码风格生成——'参考src/components/Button的实现风格'",
          "复杂逻辑先用伪代码描述，再让AI翻译"
        ]
      },
      {
        id: "s4-testing",
        name: "测试与质量保障",
        icon: "🧪",
        description: "自动化测试、代码审查、质量门控",
        inputs: ["功能代码", "验收标准"],
        outputs: ["测试报告", "代码审查结果", "覆盖率数据"],
        aiRole: "生成测试用例、执行代码审查、识别潜在Bug",
        humanRole: "审查AI生成的测试覆盖度、处理复杂测试场景",
        tools: ["Vitest/Jest", "Playwright", "Claude Code (Review)", "SonarQube"],
        tips: [
          "让AI生成'攻击性测试'——'什么输入会破坏这个函数？'",
          "E2E测试用AI辅助生成，人工补充业务关键路径",
          "AI Review重点关注：安全漏洞、性能问题、边界条件"
        ]
      },
      {
        id: "s5-deployment",
        name: "部署与发布",
        icon: "🚀",
        description: "CI/CD流水线、灰度发布、监控",
        inputs: ["通过测试的代码", "部署配置"],
        outputs: ["线上版本", "发布日志", "监控面板"],
        aiRole: "生成部署脚本、配置文件、回滚策略",
        humanRole: "审批发布、监控线上指标、处理异常",
        tools: ["GitHub Actions", "Vercel/Netlify", "Claude Code (CI配置)"],
        tips: [
          "让AI生成CI/CD Pipeline配置——'基于项目结构生成GitHub Actions工作流'",
          "AI辅助写部署检查清单",
          "灰度发布策略让AI基于历史数据推荐"
        ]
      },
      {
        id: "s6-iteration",
        name: "迭代与优化",
        icon: "🔄",
        description: "基于数据反馈持续迭代，AI辅助性能优化和重构",
        inputs: ["用户反馈", "监控数据", "性能指标"],
        outputs: ["优化方案", "重构代码", "A/B测试结果"],
        aiRole: "分析性能瓶颈、生成优化方案、执行重构",
        humanRole: "评估优化ROI、做迭代优先级决策",
        tools: ["Lighthouse", "Chrome DevTools", "Claude Code (重构)"],
        tips: [
          "让AI分析Bundle——'哪些依赖可以懒加载/替换？'",
          "性能优化让AI先出方案，人工评估ROI",
          "技术债清理：每周让AI扫一遍代码库生成重构建议"
        ]
      }
    ]
  },

  toolchain: {
    categories: [
      {
        name: "AI编码工具",
        items: [
          { name: "Cursor", type: "IDE", strength: "深度代码理解 + 多文件编辑", pricing: "Free/Pro $20/mo", recommendation: "⭐⭐⭐⭐⭐" },
          { name: "Claude Code", type: "CLI Agent", strength: "终端级Agent，深度项目理解", pricing: "API计费", recommendation: "⭐⭐⭐⭐⭐" },
          { name: "GitHub Copilot", type: "IDE Plugin", strength: "生态整合 + 企业级支持", pricing: "Free/Pro $19/mo", recommendation: "⭐⭐⭐⭐" },
          { name: "Windsurf", type: "IDE", strength: "Cascade多步推理", pricing: "Free/Pro $15/mo", recommendation: "⭐⭐⭐⭐" },
          { name: "Aider", type: "CLI", strength: "Git原生 + 多模型支持", pricing: "Free + API", recommendation: "⭐⭐⭐⭐" }
        ]
      },
      {
        name: "AI Agent平台",
        items: [
          { name: "Devin", type: "Agent", strength: "端到端自主开发", pricing: "Enterprise", recommendation: "⭐⭐⭐" },
          { name: "OpenHands", type: "Agent", strength: "开源 + 可自部署", pricing: "Free", recommendation: "⭐⭐⭐⭐" },
          { name: "SWE-Agent", type: "Agent", strength: "学术级Issue解决", pricing: "Free", recommendation: "⭐⭐⭐" }
        ]
      },
      {
        name: "测试与质量",
        items: [
          { name: "Playwright + AI", type: "E2E Testing", strength: "AI生成+维护测试用例", pricing: "Free", recommendation: "⭐⭐⭐⭐⭐" },
          { name: "Vitest", type: "Unit Testing", strength: "Vite生态原生支持", pricing: "Free", recommendation: "⭐⭐⭐⭐⭐" }
        ]
      }
    ]
  },

  feed: [
    {
      id: "f1",
      title: "Cursor 1.0 发布：Agent模式全面升级",
      platform: "X",
      author: "@cursor_ai",
      date: "2026-06-01",
      tags: ["🔧工具", "⚡新闻"],
      summary: "Cursor 1.0带来全新Agent模式，支持多文件自主编辑、终端命令执行、和浏览器调试。Agent模式可处理复杂的多步任务。",
      url: "#"
    },
    {
      id: "f2",
      title: "为什么我从Vibe Coding转向Spec-Driven Development",
      platform: "Medium",
      author: "@dev_experience",
      date: "2026-05-28",
      tags: ["📋方法论"],
      summary: "作者分享了从纯Vibe Coding到Spec-Driven的转型经验。核心观点：没有规格的AI编码在项目复杂度上升后变得不可维护，Spec-Driven通过前置规格定义解决了这个问题。",
      url: "#"
    },
    {
      id: "f3",
      title: "Claude Code Agent模式实战：重构10万行代码",
      platform: "Reddit",
      author: "r/ChatGPTPro",
      date: "2026-05-25",
      tags: ["💡案例"],
      summary: "详细记录了使用Claude Code Agent模式重构大型前端项目的过程。包括任务分解策略、检查点设置、和错误恢复机制。",
      url: "#"
    },
    {
      id: "f4",
      title: "Agentic开发中的安全边界：企业实践指南",
      platform: "HackerNews",
      author: "security-eng",
      date: "2026-05-20",
      tags: ["📋方法论", "🔧工具"],
      summary: "讨论AI Agent在企业开发环境中的安全边界。提出了沙箱隔离、权限分级、和审计日志三道防线。",
      url: "#"
    },
    {
      id: "f5",
      title: "SWE-bench Verified 最新榜单：Agent能力突破60%",
      platform: "ArXiv",
      author: "princeton-nlp",
      date: "2026-05-15",
      tags: ["⚡新闻"],
      summary: "SWE-bench Verified最新结果显示，顶级Agent在真实GitHub Issue解决率上突破60%。OpenHands和SWE-Agent领先。",
      url: "#"
    },
    {
      id: "f6",
      title: "Test-Driven AI：用测试用例驱动AI编码的实践经验",
      platform: "Reddit",
      author: "r/ExperiencedDevs",
      date: "2026-05-10",
      tags: ["📋方法论", "💡案例"],
      summary: "分享TDD + AI编码的实践：先写测试定义行为期望，再让AI生成实现。测试通过率从40%提升到85%，代码质量显著提升。",
      url: "#"
    }
  ]
};

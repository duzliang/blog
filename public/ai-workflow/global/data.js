// Agentic Software Development Workflow Data
// Last updated: 2026-08-24

const WORKFLOW_DATA = {
  meta: {
    version: "1.0.0",
    lastUpdated: "2026-08-31",
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
          { name: "Cursor", type: "IDE", strength: "深度代码理解 + 多文件编辑 + Agent Workspace", pricing: "Free/Pro $20/mo", recommendation: "⭐⭐⭐⭐⭐" },
          { name: "Claude Code", type: "CLI Agent", strength: "终端级Agent，深度项目理解 + Sub-Agent并行", pricing: "API计费/Max $100/mo", recommendation: "⭐⭐⭐⭐⭐" },
          { name: "GitHub Copilot", type: "IDE Plugin", strength: "GPT-5.5生态整合 + 企业级支持", pricing: "Free/Pro $19/mo", recommendation: "⭐⭐⭐⭐" },
          { name: "TRAE SOLO", type: "IDE", strength: "中文Vibe Coding + 全链路自动开发 + 免费", pricing: "Free", recommendation: "⭐⭐⭐⭐" },
          { name: "Windsurf", type: "IDE", strength: "AutoAgent自主模式 + Cascade多步推理", pricing: "Free/Pro $15/mo", recommendation: "⭐⭐⭐⭐" },
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
      id: "f82",
      title: "Anthropic官方Claude Code最佳实践：验证优先、规划先于执行、Subagent隔离探索",
      platform: "Anthropic Engineering",
      author: "Anthropic Engineering Team",
      date: "2026-08-31",
      tags: ["🔧工具", "📋方法论"],
      summary: "Anthropic官方发布Claude Code最佳实践，核心三条：①验证先于断言——给Claude可执行的检查(test/build/lint/截图diff)，而非主观声称"看起来好了"；②规划先于执行——Exploration→Plan→Implement→Commit四阶段，避免解错问题；③Subagent隔离中间探索——子代理独立上下文，研究结果返回主会话而非污染主上下文。验证标准应写在同一prompt里，含具体测试用例和命令。",
      url: "https://www.anthropic.com/engineering/claude-code-best-practices"
    },
    {
      id: "f81",
      title: "Beyond Code Autocomplete 2026实战：bounded agentic workflow + MCP统一上下文层 + 面向Agent友好的代码库",
      platform: "DEV Community",
      author: "johnnylemonny",
      date: "2026-08-31",
      tags: ["📋方法论", "🔧工具"],
      summary: "2026开发者工作流已从AI补全升级为AI委派，70%+工程师日常使用高级AI工具。MCP(Model Context Protocol)成为统一上下文层——让Agent安全连接Sentry/DB Schema/Git等工具而非人工复制粘贴。面向Agent友好的代码库三要素：严格TypeScript类型守卫、Next.js/Nuxt约定文件夹结构、完整测试套件使Agent可自验证。React Compiler等工具已接管微观优化，开发者聚焦数据流和架构决策。",
      url: "https://dev.to/johnnylemonny/beyond-code-autocomplete-how-to-build-a-modern-agentic-workflow-in-2026-566f"
    },
    {
      id: "f80",
      title: "Cursor Vibe Coding 2026完全指南：.cursorrules工程化 + CRTC Prompt模板 + Rules/Skills分层架构",
      platform: "稀土掘金",
      author: "技术社区",
      date: "2026-08-31",
      tags: ["🔧工具", "📋方法论"],
      summary: "2026年Cursor Vibe Coding系统性指南：①.cursorrules工程化——随项目迭代积累成代码DNA，AI输出质量随规则增长而复合提升；②CRTC Prompt模板——Context(背景)+Request(任务)+Constraints(约束)+Completion(完成标准)，避免模糊指令；③Rules/Skills分层——Rules管边界(.cursor/rules/*.mdc)，Skills管流程(.cursor/skills/)，两者互补；④MCP连接外部工具(Figma/数据库)实现设计稿→代码直转。",
      url: "https://juejin.cn/post/7647086721049395209"
    },
    {
      id: "f79",
      title: "AI Coding Agents 2026全景：多Agent分工协作 + 自主编码五阶段 + 企业级落地风险矩阵",
      platform: "The Code Beast",
      author: "The Code Beast",
      date: "2026-08-17",
      tags: ["📋方法论", "⚡新闻"],
      summary: "AI Coding Agent已从单步补全进化为完整开发伙伴：Planner Agent制定策略→Developer Agent写代码→Testing Agent生成测试→Reviewer Agent审查安全与架构。自主编码五阶段：需求解析→多Agent编排→迭代生成→自我修复测试循环→生产部署。AI生成代码每千行主要问题比人类高1.7倍，安全漏洞更频繁——人工Review仍是生产级交付不可替代的环节。",
      url: "https://thecodebeast.com/ai-coding-agents-in-2026-how-autonomous-ai-is-changing-software-development"
    },
    {
      id: "f78",
      title: "Claude Code CLI + Agentic Coding全流程实战：分支隔离 + 自动测试闭环 + /compact上下文压缩",
      platform: "SAPIREX",
      author: "SAPIREX",
      date: "2026-08-18",
      tags: ["🔧工具", "📋方法论"],
      summary: "Claude Code终端级Agentic开发全流程：①分支隔离——任何不理想修改可git reset干净丢弃，保障main稳定；②自动测试闭环——Agent写逻辑→写单元测试→跑测试套件→分析失败→自我修复直到全通过；③/compact主动压缩——重大探索或调试阶段后运行，防止token耗尽；④CLAUDE.md持续更新——依赖、测试脚本或架构规则变更时同步更新；⑤代码diff严格审查——像同事PR一样验证逻辑、边界、安全后再合并。",
      url: "https://sapirex.com/en/claude-code-cli-setup-and-agentic-coding-workflow-autonomous-terminal-pair-programming-guide"
    },
    {
      id: "f77",
      title: "Claude Code Subagents 2026生产级实战手册：并行编排、SubagentStop门控与嵌套Agent",
      platform: "Totalum",
      author: "Totalum Team",
      date: "2026-08-11",
      tags: ["📋方法论", "🔧工具"],
      summary: "Claude Code subagent生产级落地：用'并行separate subagents'短语明确扇出，每个subagent限定scope与tools防相互污染；SubagentStop hook做测试门控/密钥扫描/越界写阻断；嵌套subagent深度上限5。Skill教流程+Hook强制门控+Subagent委派三者组合才达生产级，Anthropic内部基准任务成功率因此提升最多10个百分点。",
      url: "https://www.totalum.app/blog/claude-code-subagents-totalum"
    },
    {
      id: "f76",
      title: "MCP、Subagents与Hooks三位一体：Claude Code最值得收藏的实战指南",
      platform: "DEV Community",
      author: "Alvarito",
      date: "2026-08-19",
      tags: ["📋方法论", "🔧工具"],
      summary: "系统讲解Claude Code三大机制：.claude/agents/定义subagent(frontmatter含tools/disallowedTools/model/mcpServers)，独立上下文隔离探索/审查/验证；MCP作为外部集成层(只读优先)；Hooks在PreToolUse/PostToolUse生命周期做确定性护栏。并行subagent示例：'用separate subagents并行研究auth/database/API模块'。Slash command与Skill已合并，重复提示应封装为Skill。",
      url: "https://dev.to/alvarito1983/mcp-subagents-and-hooks-in-claude-code-the-guide-i-wish-id-had-4gg"
    },
    {
      id: "f75",
      title: "Claude Code Subagent约定手册：把subagent当团队约定而非prompt技巧",
      platform: "Claude Workshop",
      author: "Claude Workshop",
      date: "2026-06-23",
      tags: ["📋方法论"],
      summary: "核心观点：subagent不是prompt trick，而是带job description的轻量队友。给出可落地的repo级约定模板：何时用subagent(安全审查/测试修复/迁移规划)、每个subagent必备role+scope+tools+output+stop rule四要素、CLAUDE.md只放持久约束(建议删掉首版30%)、MCP只读优先。可审查性(reviewable)是agent团队协作的胜负手。",
      url: "https://www.claudeworkshop.com/research/claude-team-conventions-20260623-1448"
    },
    {
      id: "f74",
      title: "Cursor Agent Mode 2026使用手册：选对模式比换模型更重要",
      platform: "DEV Community",
      author: "dublecc",
      date: "2026-07-20",
      tags: ["🔧工具", "📋方法论"],
      summary: "多数觉得Cursor'不稳定'的人不是模型问题而是模式问题。详解四种工具切换：Agent(自主多文件)、Ask(只读问答)、Plan(写代码前先规划)、Inline Edit(Cmd+K精准改动)。给出决策表——重命名用Inline Edit、解释用Ask、新功能取舍用Plan、12文件重构必先进Plan。三大习惯：选对模式、写代码前先规划、逐行读diff。",
      url: "https://dev.to/dublecc/cursor-agent-mode-how-to-use-it-in-2026-3afk"
    },
    {
      id: "f73",
      title: "Cursor官方Agent最佳实践：TDD、代码库探索与Git工作流三类范式",
      platform: "Cursor",
      author: "Cursor Team",
      date: "2026-01-09",
      tags: ["🔧工具", "📋方法论"],
      summary: "Cursor官方给出的Agent常见工作流：①测试驱动开发——让Agent按输入输出对写测试、明确TDD避免mock、跑测试确认失败后再实现；②理解陌生代码库——像问队友一样提问，Agent同时用grep与语义搜索；③Git工作流——/pr命令自动git diff、写commit、推送并用gh pr create开PR。支持截图/设计稿/Figma MCP做设计到代码。",
      url: "https://cursor.com/cn/blog/agent-best-practices"
    },
    {
      id: "f72",
      title: "Claude Code四大定制机制选型指南：CLAUDE.md/Hooks/Skills/Subagents怎么选",
      platform: "阿里云开发者社区",
      author: "技术社区",
      date: "2026-07-02",
      tags: ["📋方法论", "🔧工具"],
      summary: "基于2026-07官方文档的四大机制决策表：CLAUDE.md(每次会话加载的持久指令/软约束)、Hooks(生命周期硬约束，exit 2阻断)、Skills(按需加载的可复用流程，单文件命令已合并进Skill)、Subagents(独立上下文分工)。选型口诀：该'知道'的写CLAUDE.md、必须'发生'的写Hook、反复'照做'的做Skill、不想'污染主上下文'的给Subagent。CLAUDE.md超200行用rules/按路径拆分。",
      url: "https://developer.aliyun.com/article/1745131"
    },
    {
      id: "f71",
      title: "2026 Agent Pair Programming格局：人机协作三种模式与七大平台并行编排",
      platform: "Zylos AI",
      author: "Zylos Research",
      date: "2026-05-26",
      tags: ["📋方法论", "⚡新闻"],
      summary: "Anthropic 2026 Agentic Coding报告核心张力：开发者60%工作用AI，但能完全委托的仅0–20%。七大平台(Claude Code/Copilot/Codex/Cursor/Antigravity/Windsurf/Devin)均从单agent转向并行编排。人机协作三模式：Supervisor(人定规格、Agent执行、提交前审查)、Collaborative(按子任务交替角色)、Autonomous(高危、仅限隔离项目)。McKinsey：65%高绩效AI团队定义了human-in-the-loop校验。",
      url: "https://zylos.ai/zh/research/2026-05-26-ai-agent-pair-programming-collaboration-patterns"
    },
    {
      id: "f70",
      title: "面向资深工程师的AI Pair Programming：探索/测试规划/审查/调试的分层工作流",
      platform: "Personal Blog",
      author: "Nazar Boyko",
      date: "2026-05-01",
      tags: ["📋方法论"],
      summary: "资深工程师的AI结对不是让AI自动驾驶。给出可复用prompt模板：用AI做探索(先画系统地图再自己验证)、测试规划(实现前先出测试计划含边界/授权/失败用例)、文档生成(标注不确定性)、代码审查(只做顾问不approve)、调试('先调查后给补丁')、小步实现(约束scope保持diff小)。核心循环：AI映射→人验证→AI澄清→人决策。",
      url: "https://www.nazarboyko.com/en/articles/ai-pair-programming-for-senior-engineers"
    },
    {
      id: "f69",
      title: "Vibe Coding 2026最佳实践：7条有效、3个陷阱，何时该停止Vibe",
      platform: "Personal Blog",
      author: "Kunal Ganglani",
      date: "2026-07-10",
      tags: ["📋方法论"],
      summary: "2026 Vibe Coding实战：把规则写进CLAUDE.md常驻上下文；每次成功迭代后commit(频率应高于传统开发)并写有意义的message；先写测试再让AI生成实现以打破'循环测试'假象；识别AI开始绕圈(重复相似方案、跨文件深度集成、性能优化)时切回手写。三大陷阱：一次生成整个App的幻想、跳过安全、丢失变更追踪。",
      url: "https://www.kunalganglani.com/blog/vibe-coding-best-practices-2026"
    },
    {
      id: "f68",
      title: "v0 vs Lovable 2026对比：组件级归v0、全栈MVP归Lovable，混合工作流成主流",
      platform: "AI Agent Rank",
      author: "AI Agent Rank",
      date: "2026-05-21",
      tags: ["🔧工具"],
      summary: "2026 AI前端生成器实测：v0(Vercel)输出React+shadcn/ui+Tailwind，组件级代码质量A-、贴近'你自己会写的代码'，适合现有项目内加组件；Lovable深度集成Supabase(auth/DB/RLS自动生成)，0→1全栈MVP更快(带登录的todo 8步25分钟)。主流混合流：Lovable做原型→导出GitHub→Cursor/v0做后续组件，既快又可持续维护。",
      url: "https://aiagentrank.io/blog/v0-vs-lovable-2026"
    },
    {
      id: "f67",
      title: "2026年国内主流AI Coding Plan套餐全对比：智谱/MiniMax/Kimi/火山引擎/百炼五大平台横评开发者避坑指南",
      platform: "CSDN",
      author: "技术社区",
      date: "2026-08-05",
      tags: ["⚡新闻", "🔧工具"],
      summary: "2026年国内五大AI Coding Plan平台横评：阿里云百炼首月7.9元最低、智谱GLM按Prompt计费(1次Prompt≈1200-1600次API)、MiniMax同样按Prompt计量、Kimi全面切换Token计费模式(仅统计未命中缓存Token)。计费单位从「请求次数」到「Token消耗」的演进，反映了各平台从获客期向精细化运营的转型。",
      url: "https://blog.csdn.net/weixin_44162814/article/details/158658021"
    },
    {
      id: "f66",
      title: "2026 AI Coding Agent从需求到上线全流程实操：替代60%以上重复性开发工作，周期缩短50%",
      platform: "CSDN",
      author: "Bruce2048",
      date: "2026-08-04",
      tags: ["📋方法论", "💡案例"],
      summary: "2026年AI Coding Agent已从「辅助编码工具」进化为「重构开发流程的核心载体」——从需求文档解析、代码生成，到自动化测试、部署上线，替代60%以上重复性开发工作。传统「需求→开发→测试→上线」周期缩短50%以上。核心能力边界：从「能做什么」到「能稳定做好什么」的质变。",
      url: "https://blog.csdn.net/Bruce2048/article/details/159385657"
    },
    {
      id: "f65",
      title: "别再「写」代码了：2026年Vibe Coding实战全指南，Intent-Driven Development核心理念",
      platform: "CSDN",
      author: "一线开发者",
      date: "2026-08-05",
      tags: ["📋方法论", "🔧工具"],
      summary: "Vibe Coding本质是Intent-Driven Development(意图驱动开发)：传统开发是需求→架构设计→手写逻辑→调试→部署，Vibe Coding是需求→传递Vibe(自然语言+约束文件)→AI Agent执行→验证/微调→自动化部署。爽点包括消除冷启动恐惧、跨领域无缝切换、心流不中断；痛点是超过50个文件后上下文偏移。2026模型选型建议：Claude 3.5/4.5 Sonnet适合复杂逻辑/重构，GPT-5.2覆盖通用场景。",
      url: "https://blog.csdn.net/2201_75368691/article/details/157943025"
    },
    {
      id: "f64",
      title: "Cursor AI编辑器完全教程2026最新版：安装/配置/核心功能/快捷键/AI对话/代码重构实战",
      platform: "CSDN",
      author: "w395919590",
      date: "2026-08-05",
      tags: ["🔧工具", "📋方法论"],
      summary: "Cursor AI编辑器2026完整实战教程：基于VS Code内核，内置Claude/GPT-4等AI模型。核心功能包括AI代码补全(Ctrl+Tab接受补全)、AI对话(Ctrl+L唤出)、代码解释/重构/Bug修复。安装支持macOS .dmg和Windows .exe，订阅方案分Free和Pro两档。Cursor已从「更聪明的代码补全器」进化为「全栈AI开发协作系统」。",
      url: "https://blog.csdn.net/w395919590/article/details/158978078"
    },
    {
      id: "f63",
      title: "2026年AI工作流革命：从本地Agent到跨平台自动化实践，vLLM+MLX+systemd完整方案",
      platform: "博客园",
      author: "xiaoheiba",
      date: "2026-08-05",
      tags: ["📋方法论", "🔧工具"],
      summary: "2026年AI工作流范式迁移：从「调用一个API」走向「设备端自主感知—规划—执行—反馈」完整闭环。生产环境主力模型Qwen2.5-4B-Instruct与Phi-4-3.8B经AWQ量化+KV Cache优化后，MacBook M3 Pro推理延迟稳定<800ms(P99)。工具链协同：vLLM 0.7.3 + PagedAttention v2做动态批处理，MLX替代PyTorch启动耗时下降62%，封装systemd服务+cgroup内存限制实现热重载。",
      url: "https://www.cnblogs.com/xiaoheiba/p/19833950"
    },
    {
      id: "f62",
      title: "Uber开始给AI「限额」：92%工程师使用AI后，企业级AI使用策略反思",
      platform: "企鹅号",
      author: "Olimpiu Pop",
      date: "2026-08-05",
      tags: ["⚡新闻", "📋方法论"],
      summary: "Uber推行「零增长技术栈」(Zero Growth Stack)，在92%工程师使用AI后开始给AI使用「限额」。战略核心：容量增长与业务需求增长解耦，优先推进自动化运行时优化及严格的AI生命周期管理，降低传统资源扩容开销。反映大厂开始从「鼓励AI使用」转向「精细化AI治理」的新阶段。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_7046a7293f201552"
    },
    {
      id: "f61",
      title: "OpenHands v2026.07更新：AI-Driven Development开源平台7070 Commits里程碑",
      platform: "GitHub",
      author: "All-Hands-AI",
      date: "2026-08-05",
      tags: ["⚡新闻", "🔧工具"],
      summary: "OpenHands(AI-Driven Development开源平台)2026年7月里程碑版本更新，项目累计7070次提交。支持多Agent协作、Skill系统、Enterprise部署、Frontend UI。定位为开源版Devin，覆盖从需求理解到代码实现的完整Agent工作流。",
      url: "https://github.com/all-hands-ai/openhands"
    },
    {
      id: "f60",
      title: "Agentic Design Patterns 2026指南：六种核心设计模式，从ReAct到完全自主Agent循环",
      platform: "SitePoint",
      author: "SitePoint Team",
      date: "2026-08-05",
      tags: ["📋方法论"],
      summary: "Agentic设计模式已从研究好奇进入生产必需品阶段。2026年核心演进：从Chain-of-thought到ReAct风格交织推理，再到完全自主Agent循环(规划-执行-反思-恢复无需人工干预)。LangGraph/LangGraph.js已达stable semver版本，可处理生产级并发Agent实例。覆盖六种核心设计模式和选型决策框架。",
      url: "https://www.sitepoint.com/the-definitive-guide-to-agentic-design-patterns-in-2026"
    },
    {
      id: "f59",
      title: "Symphony协议：OpenAI 2026年4月发布的开源多Agent协作规范，Linear作为状态机驱动并行Agent",
      platform: "博客园",
      author: "aimagician",
      date: "2026-08-05",
      tags: ["⚡新闻", "📋方法论"],
      summary: "Symphony是OpenAI 2026年4月发布的开源协议规范(Apache 2.0)，将Linear issue tracker重新定义为Agent调度状态机，让并行Agent从「人类逐个监督」变为「issue-driven自动调度」。当你同时开四个Codex CLI会话对应四个并行任务时，Symphony解决的不是能力问题，是协调问题。",
      url: "https://www.cnblogs.com/aimagician/p/20047774"
    },
    {
      id: "f58",
      title: "Augment Code Cosmos发布：企业级Agent编排平台，让组织的每个智能体协同运作而非孤岛作战",
      platform: "augmentcode.com",
      author: "Augment Code Team",
      date: "2026-08-03",
      tags: ["⚡新闻", "🔧工具"],
      summary: "Augment Code发布Cosmos企业级Agent编排平台，定位'你的工程师有Agent，但你的组织没有'。解决个人级AI工具与企业级协作之间的断层：跨SDLC（软件开发生命周期）编排多个Agent、团队级上下文共享、统一治理与审计。工程团队的Agent需要组织级协调能力，Cosmos填补了这一空白。",
      url: "https://www.augmentcode.com/"
    },
    {
      id: "f57",
      title: "2026年AI协同底座盘点：Codex/Cursor真正跑通企业业务流的核心在于外部Agent与协同平台的分层协作",
      platform: "企鹅号",
      author: "技术负责人",
      date: "2026-08-03",
      tags: ["📋方法论", "🔧工具"],
      summary: "外部Agent(Cursor/Claude Code/Codex)普遍存在落地障碍：缺少企业内部业务上下文、Agent间无法自动流转、AI成果无法直接触发评审/工单/文档归档等后续动作。核心解法是'Agent为专家、底座为舞台'的分层协作架构——外部Agent专注专项执行，协同底座(如飞书aily)负责上下文供给、任务编排、成果流转与企业治理。制造企业研发团队借助该架构，串联代码生成→静态扫描→线上评审流程，有效缩短版本迭代前置沟通周期。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_9796a69b17520852"
    },
    {
      id: "f56",
      title: "AI Coding 2026深度实战指南：Agent本质=LLM+Memory+Planning+Tools死循环，Thinking Model正在颠覆传统ReAct",
      platform: "博客园",
      author: "hong6234",
      date: "2026-08-03",
      tags: ["📋方法论", "🔧工具"],
      summary: "2026年AI Coding核心认知：Agent本质是死循环(Loop)，直到满足停止条件。2026新趋势是Thinking Model(o3/Gemini 3 Pro)可在单次推理中完成规划，减少Agent与环境交互的往返次数。Agent落地三大痛点：死循环(设max_steps强制人类介入)、上下文溢出(实现summarize_memory()定期压缩)、工具调用失败(标准化MCP协议)。Claude Code/Trae可通过角色定义快速创建多Agent协作，日常无需自研底层框架。",
      url: "https://www.cnblogs.com/hong6234/p/19704165"
    },
    {
      id: "f55",
      title: "Cursor官方团队17个AI工作流全开源：Cursor Team Kit，一条命令安装零依赖开箱即用",
      platform: "博客园",
      author: "iTech",
      date: "2026-08-03",
      tags: ["🔧工具", "📋方法论"],
      summary: "Cursor官方团队将内部使用的17个AI工作流Skill全部开源，覆盖CI监控、代码审查、PR管理、UI验证等完整开发周期。不同于第三方小工具，这是Cursor内部团队每日实际使用的Plugin，一条命令安装零依赖。实测部分Skill效果惊艳，是目前最接近'官方最佳实践'的Skill合集。",
      url: "https://www.cnblogs.com/itech/p/19986762"
    },
    {
      id: "f54",
      title: "CLAUDE.md会话管理2026黄金法则：新任务新会话、/compact优于自动压缩、/rewind重写优于修正、子代理隔离中间探索",
      platform: "CSDN/GitCode",
      author: "claude-code-best-practice社区",
      date: "2026-08-03",
      tags: ["📋方法论", "🔧工具"],
      summary: "claude-code-best-practice项目2026年更新会话管理核心法则：(1)新任务=新会话，避免上下文腐化 (2)/compact手动压缩优于自动压缩 (3)/rewind回到失败点重写优于修补 (4)子代理隔离中间探索，保留工具调用过程在子代理中，只将最终结论返回主上下文。CLAUDE.md保持60行以内、使用.claude/rules/*.md分割大型指令、用!command注入动态内容。/goal命令支持代理长期运行数天，是2026年最被低估的AI特性之一。",
      url: "https://blog.csdn.net/gitblog_01115/article/details/153954044"
    },
    {
      id: "f53",
      title: "InfoQ深度：AI编码实测反而慢19%，METR对照实验揭示主观认知与客观效率的39个百分点落差",
      platform: "InfoQ/腾讯网",
      author: "Stella Berhe, Stephan Bragner 等 (METR)",
      date: "2026-07-27",
      tags: ["📋方法论", "⚡新闻"],
      summary: "METR让经验丰富的开发者在自己的大型代码库中进行对照实验，结果AI工具使用者耗时反而增加了19%，但主观认为效率提升了20%——主观认知与客观实测存在39个百分点落差。前80%环节AI确实提效，但系统集成的后20%才是真正的难点。亚马逊2026年3月线上宕机事故即因AI生成代码未经审核合并。核心洞察：代码生成速度与理解速度已脱钩，可理解性应成为架构质量的核心维度。",
      url: "https://new.qq.com/rain/a/20260726A04SQP00"
    },
    {
      id: "f52",
      title: "Claude Code官方开源code-simplifier插件：一键将AI生成屎山代码重构为清晰可维护的人类级代码",
      platform: "CSDN",
      author: "@zsh_1314520",
      date: "2026-07-27",
      tags: ["🔧工具", "📋方法论"],
      summary: "Anthropic于2026年2月开源的Claude Code核心插件code-simplifier，由Claude Code工程团队开发维护。基于全球顶级软件工程最佳实践训练，10秒内将AI生成的混乱冗长不可读代码转换为清晰简洁符合规范的可维护代码。解决Vibe Coding最大痛点：AI生成代码看似能跑实则无法维护，修改时花费时间比自己从头写还长。",
      url: "https://blog.csdn.net/zsh_1314520/article/details/160105041"
    },
    {
      id: "f51",
      title: "BMad Method V6发布：从构思到Agentic实现的全流程AI开发框架，支持Claude/Cursor/Copilot",
      platform: "bmad-method.org",
      author: "Brian Madison (BMad)",
      date: "2026-07-27",
      tags: ["📋方法论", "🔧工具"],
      summary: "BMad Method(Build More Architect Dreams)V6发布，面向Agentic开发全流程的AI驱动框架。提供专业化AI Agent、引导式工作流和智能规划，覆盖从构思到Agentic实现的全链路。25年软件工程经验沉淀，适配项目复杂度自动调整，支持Claude/Cursor/Copilot三大主流工具。核心理念：架构师梦更多，AI负责构建。",
      url: "https://docs.bmad-method.org/"
    },
    {
      id: "f50",
      title: "VS Code + OpenAI Codex深度集成2026攻略：从安装到AI结对编程的完整实战路径",
      platform: "CSDN",
      author: "@He_CSDN2025",
      date: "2026-07-27",
      tags: ["🔧工具", "💡案例"],
      summary: "2026年VS Code与OpenAI Codex的深度集成实战指南：终端npm install -g @openai/codex安装、VS Code扩展市场一键激活、内置终端直接启动Codex跑脚本修Bug无需切换窗口、云端chatgpt.com/codex轻量备选。Codex从代码补全助手进化为综合性开发平台，全球约300万周活开发者。",
      url: "https://blog.csdn.net/He_CSDN2025/article/details/160480223"
    },
    {
      id: "f49",
      title: "Spec-Driven Development：终结Prompt & Pray时代，用可执行合约替代AI代码祈祷式开发",
      platform: "Coditude",
      author: "Coditude Team",
      date: "2026-07-27",
      tags: ["📋方法论"],
      summary: "Master Spec-Driven Development明确提出终结Prompt & Pray范式。核心主张：停止修复AI生成的bug，开始架构可执行合约。当代码生成成为商品，差异化转向理解领域和设计护栏，让系统底层逻辑在全生命周期内始终可控。契约驱动开发、TDD与架构适配函数构成统一验证系统。",
      url: "https://www.coditude.com/capabilities/ai-driven-coding-and-generative-engineering/"
    },
    {
      id: "f48",
      title: "AI编程Token计费时代全面到来：GitHub Copilot/Claude Code按量收费成主流",
      platform: "技术控/企鹅号",
      author: "技术控",
      date: "2026-07-19",
      tags: ["⚡新闻", "🔧工具"],
      summary: "2025年6月Cursor从「每月500次请求」改为「含一定API credit」的订阅制，2026年5月29日GitHub Copilot跟进开启按Token收费模式，标志AI编程工具「固定订阅」时代终结。Token计费让重度用户成本可控，但轻度用户反而可能更贵，开发者需重新评估工具ROI。",
      url: "https://www.yingrui.org/"
    },
    {
      id: "f47",
      title: "2026年5月AI Coding工具大爆发实测：Devin 2.0任务完成度95%领跑，Cursor仍为编辑器天花板",
      platform: "CSDN",
      author: "@yp0to1",
      date: "2026-07-19",
      tags: ["🔧工具", "💡案例"],
      summary: "5万行Go微服务用户积分系统实测横评：Devin 2.0完成度95%但价格最贵，Aider(GPT-4o)完成度80%但代码质量90分性价比最高，Cursor综合85%仍是编辑器集成天花板，Copilot仅60%但企业生态完整。",
      url: "https://blog.csdn.net/yp0to1/article/details/161188183"
    },
    {
      id: "f46",
      title: "OpenAI GPT-5.6 + xAI Grok 4同日发布：Codex融入ChatGPT，AI编程进入多模态理解设计稿时代",
      platform: "企鹅号",
      author: "行业观察",
      date: "2026-07-19",
      tags: ["⚡新闻", "📋方法论"],
      summary: "2026年7月9日OpenAI发布GPT-5.6系列将Codex融入ChatGPT，同日xAI推出专注编程和Agent的大模型Grok 4。GPT-5.6 Codex/Gemini 3.0 Code等模型已可解析UI设计稿生成完整代码骨架，AI生成代码缺陷率已低于人类平均水平15%。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_8006a54f05721652"
    },
    {
      id: "f45",
      title: "Cursor开发Sand通用AI办公智能体：挑战Claude Cowork与ChatGPT Work，剑指日常生产力",
      platform: "企鹅号",
      author: "新智元",
      date: "2026-07-19",
      tags: ["⚡新闻", "🔧工具"],
      summary: "Cursor正在开发名为Sand的通用型AI办公智能体，对标Anthropic Claude Cowork和OpenAI ChatGPT Work。Sand目标接管日常重复性工作：邮件回复、短信管理、电子表格整理及工程相关任务。2026年6月下旬已内部上线测试，标志着Cursor从开发者工具向全岗位生产力助手转型。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_7486a57232a20052"
    },
    {
      id: "f44",
      title: "2026 AI编程终极套装：Claude Code + Codex + Gemini CLI + Antigravity四位一体实战指南",
      platform: "CSDN",
      author: "@xh2277659985",
      date: "2026-07-19",
      tags: ["🔧工具", "📋方法论"],
      summary: "2026年四位一体AI编程工作流实战指南：Claude Code作为主力(复杂重构/架构设计)、Codex集成于ChatGPT(即时编程问答)、Gemini CLI(快速原型验证)、Antigravity(专属加速层)。组合覆盖从架构设计到代码实现的全链路。",
      url: "https://blog.csdn.net/xh2277659985/article/details/157212445"
    },
    {
      id: "f43",
      title: "Vibe Coding已过时？Karpathy 2026年2月宣布被Agentic Engineering取代，背后是无数翻车事故",
      platform: "CSDN",
      author: "@qq_60735796",
      date: "2026-07-19",
      tags: ["📋方法论"],
      summary: "2026年2月4日Karpathy公开宣布Vibe Coding已过时，取而代之的是更严肃的术语「Agentic Engineering」。背后是一年间无数翻车事故——代码质量失控、安全漏洞频出、上下文丢失。预示AI编程从「随意生成」向「纪律化执行」的范式转移。",
      url: "https://blog.csdn.net/qq_60735796/article/details/158770663"
    },
    {
      id: "f42",
      title: "Vibe Coding入门教程：从自然语言编程到工程化实践的完整指南（2026最新版）",
      platform: "菜鸟教程",
      author: "菜鸟教程",
      date: "2026-07-19",
      tags: ["📋方法论", "🔧工具"],
      summary: "Vibe Coding是2025-2026年爆火编程新范式，用自然语言指挥AI写代码。教程涵盖核心理念（人负责「什么」，AI负责「怎么做」）、Claude Code/Cursor/Copilot工具链详解，以及适用场景边界。",
      url: "https://www.runoob.com/ai-agent/vibe-coding-start.html"
    },
    {
      id: "f41",
      title: "Claude Code Ralph-loop永动机插件：实现无限循环迭代，告别「给AI当保姆」",
      platform: "CSDN",
      author: "@zsh_1314520",
      date: "2026-07-19",
      tags: ["🔧工具", "📋方法论"],
      summary: "2026年Claude Code核心痛点：AI「跑一次」就停下来等报错，需人类全程盯屏幕不断输入指令引导。Ralph-loop插件实现无限循环迭代：AI自主处理报错→修复→再跑→再报错→再修复全程自动化，从「跑一次」升级为「自主跑到底」，告别Vibe Coding过程中的频繁中断。",
      url: "https://blog.csdn.net/zsh_1314520/article/details/160104813"
    },
    {
      id: "f40",
      title: "Cursor发布iOS移动端App：AI编程智能体从桌面走向口袋",
      platform: "企鹅号/新智元",
      author: "Cursor Team",
      date: "2026-07-01",
      tags: ["⚡新闻", "🔧工具"],
      summary: "Cursor正式发布iOS移动端应用公测版，与Cursor 2.0 Agent模式深度整合。支持语音输入启动Agent、远程监控桌面端Agent任务进度、查看代码差异并合并PR。AI编程从'坐在电脑前写代码'转向'随时管理云端智能体'，移动端成为Agent协作新入口。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_2126a435e6e96852"
    },
    {
      id: "f39",
      title: "3层编程工作流实践：别再把AI当搜索框，Google Agent Smith + Meta AI Transformation Weeks正在重塑开发",
      platform: "CSDN",
      author: "@a13085759937",
      date: "2026-07-04",
      tags: ["📋方法论", "⚡新闻"],
      summary: "Google内部Agent Smith工具访问量爆到被限流，Meta正在推行AI Transformation Weeks鼓励员工直接上手Claude Code/agents/vibe coding。作者提出3层工作流：L1对话层(探索/理解)、L2编排层(多Agent分工协作)、L3自动化层(CI/CD闭环)。大公司卷的不是谁会写prompt，而是谁把AI当成'可分工的同事'。",
      url: "https://blog.csdn.net/a13085759937/article/details/159583525"
    },
    {
      id: "f38",
      title: "Vibe Coding vs Spec Coding范式对决：Vibe依赖模型直觉自由发挥，Spec用前置规则剥夺AI自由度降低幻觉",
      platform: "CSDN",
      author: "@wangqiaowq",
      date: "2026-07-01",
      tags: ["📋方法论"],
      summary: "两种AI编程范式深度对比：Vibe Coding依赖大模型通用常识自由发挥补全细节，开发者用感性自然语言描述需求，跳过传统分析-设计-编码链路；Spec Coding通过前置物理规则和规格说明书剥夺AI自由度，强行框定代码风格，大幅降低幻觉概率。适合逻辑复杂且要求严谨的场景，鲁棒性更高。",
      url: "https://blog.csdn.net/wangqiaowq/article/details/161003575"
    },
    {
      id: "f37",
      title: "Superpowers开源技能框架突破24万Stars：TDD驱动的AI编码Agent方法论，被Anthropic官方收录",
      platform: "GitHub/CSDN",
      author: "Jesse Vincent (obra)",
      date: "2026-07-04",
      tags: ["🔧工具", "📋方法论"],
      summary: "Superpowers(obra/superpowers)GitHub星数突破24万，日增920星。核心流程：brainstorming→TDD→branch-isolation→writing-plans→subagent-driven-development，将AI编码从'直接写代码'改为'先理解再规划再执行'的纪律化流程。2026年1月被Anthropic官方插件市场收录，支持Claude Code/Cursor/Codex/Gemini CLI六大平台一次编写处处运行。",
      url: "https://github.com/obra/superpowers"
    },
    {
      id: "f36",
      title: "Claude Code创始人Boris Cherny：程序员2026年开始消失，100%用Claude Code每天落20个PR",
      platform: "CSDN",
      author: "@weixin_38717458",
      date: "2026-07-04",
      tags: ["⚡新闻", "📋方法论"],
      summary: "TypeScript权威书籍作者、Claude Code构建者Boris Cherny坦言：自从Opus 4.5后卸载IDE，100%用Claude Code，每天落20个PR。Anthropic人均工程产出暴涨150%。核心观点：把Claude当委派任务的资深工程师而非结对伙伴，首轮说清意图+约束+验收标准，批量发送减少交互轮次。",
      url: "https://blog.csdn.net/weixin_38717458/article/details/158620976"
    },
    {
      id: "f35",
      title: "vibe-coding-cn开源教程：中文Vibe Coding从入门到精通，Prompt/Skill/Workflow/上下文管理全链路",
      platform: "GitHub",
      author: "tradecatlabs",
      date: "2026-07-04",
      tags: ["📋方法论", "🔧工具"],
      summary: "tradecatlabs/vibe-coding-cn系统性中文教程，道法术器四层框架：先固定人与AI协作关系(道)，再用方法论docs(法)，然后工具prompts/skills(术)，最后资产层GEO(器)。覆盖Cursor/Claude Code/Codex/Gemini CLI实战、Prompt/Skill/Context/Quality方法论、从想法到可运行产品全流程。",
      url: "https://github.com/tradecatlabs/vibe-coding-cn"
    },
    {
      id: "f34",
      title: "Trae SOLO模式深度实测：Vibe Coding首选IDE，8分钟从一句话生成完整可运行桌面应用",
      platform: "CSDN",
      author: "@yuanlaimm",
      date: "2026-07-03",
      tags: ["🔧工具", "💡案例"],
      summary: "字节跳动Trae IDE SOLO模式实测：输入'做一个本地密码管理器，支持加密存储/查询/导出'一句话需求，Trae自主完成技术栈选型(Electron)、多文件代码生成、依赖配置、报错修复全流程，8分钟生成可直接运行的桌面应用，手工修改量不足4%。Vibe Coding原生工作流闭环：需求规格→任务拆分→代码生成→测试→修复→迭代。",
      url: "https://blog.csdn.net/yuanlaimm/article/details/161319740"
    },
    {
      id: "f33",
      title: "Vibe Coding必备2个超实用Prompt：第一性原理管生成 + 对抗式审查管验证",
      platform: "企鹅号",
      author: "一线开发者",
      date: "2026-06-29",
      tags: ["📋方法论", "💡案例"],
      summary: "近1年Vibe Coding最高频两个Prompt技巧：(1)第一性原理——在提示词末尾加'从第一性原理出发'，迫使AI从根本假设重建而非堆砌拼凑；(2)对抗式审查——让AI以攻击者视角审查自己生成的代码，发现安全漏洞和逻辑缺陷。前者管生成质量，后者管验证质量，组合使用实现质的飞跃。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_9866a41daa326452"
    },
    {
      id: "f32",
      title: "2026 AI Agent选型指南：内嵌型/平台型/底座型三种落地形态的博弈与共生",
      platform: "企鹅号",
      author: "行业观察",
      date: "2026-07-06",
      tags: ["⚡新闻", "📋方法论"],
      summary: "当前市场呈现三种Agent落地形态：(1)内嵌型(小鹅通)——AI深度融入业务系统，用户无需切换平台；(2)平台型(迈富时)——构建通用智能体中台应对跨行业需求；(3)底座型(华为云/字节)——夯实底层算力与大模型基础设施。三条路线无绝对优劣，只有与企业场景的匹配度高低。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_3076a4b075266552"
    },
    {
      id: "f31",
      title: "CASE 2027：首届Agentic Software Engineering国际会议，柏林2027年2月",
      platform: "case-conf.com",
      author: "CASE Conference",
      date: "2026-06-29",
      tags: ["⚡新闻", "📋方法论"],
      summary: "首届Agentic Software Engineering国际会议CASE 2027定于柏林举办，标志着Agentic开发从实践探索进入学术制度化阶段。会议聚焦Agent驱动软件工程的新兴学科定义、工具链标准化、安全与治理框架。",
      url: "https://www.case-conf.com/"
    },
    {
      id: "f30",
      title: "MIT+微软联合发布智能体工作流自动化优化系统，解决Agent编排效率问题",
      platform: "企鹅号",
      author: "MIT/Microsoft Research",
      date: "2026-06-25",
      tags: ["⚡新闻", "📋方法论"],
      summary: "MIT与微软联合开发智能系统，自动化简化Agent工作流设计并优化执行方式。解决当前高度分散化Agent系统在算力、能源和成本上的效率浪费问题，自动搜索最优编排策略。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_5596a3d1e9655152"
    },
    {
      id: "f29",
      title: "Claude Code终极使用指南v2.1.150：25个CLI命令+58个Flags+60+斜杠命令全解析",
      platform: "CSDN",
      author: "@weixin_45284808",
      date: "2026-06-24",
      tags: ["🔧工具", "📋方法论"],
      summary: "基于Claude Code v2.1.150(2026年5月23日发布)官方文档的完整指南：25个CLI命令、58个Flags、60+斜杠命令。新增/plugin插件管理、/stats使用统计、/loop自动循环定时任务等核心命令，--append-system-prompt保留默认行为追加项目规则。",
      url: "https://blog.csdn.net/weixin_45284808/article/details/161429319"
    },
    {
      id: "f28",
      title: "MCP-Persona (ICML 2026)：真实世界个性化MCP工具上的LLM Agent基准评测",
      platform: "GitHub",
      author: "wwh0411",
      date: "2026-06-29",
      tags: ["⚡新闻", "📋方法论"],
      summary: "ICML 2026收录论文，首个基于真实MCP工具的个性化Agent评测基准。三阶段流水线：Tool-Traverse爬取真实MCP服务器生成模拟代码、Context-Tree构建结构化实体层级填充个性化数据、Task-Gen自动生成评测任务。超越简化/合成环境，覆盖社交媒体/协作平台/邮件/内容管理。",
      url: "https://github.com/wwh0411/MCP-Persona"
    },
    {
      id: "f27",
      title: "Claude Code十大必装Skills：从代码助手到全栈工程Agent的升级路径",
      platform: "CSDN",
      author: "@qq_73472828",
      date: "2026-06-05",
      tags: ["🔧工具", "📋方法论"],
      summary: "2026年Skills成为Claude Code核心灵魂，Karpathy claude-skills项目标准化MCP协议扩展。十大必装：claude-dev-skills(Karpathy全栈核心)、Git/GitHub全流程管理、技术文档写作、代码审查、测试生成等。组合使用可实现端到端项目开发。",
      url: "https://blog.csdn.net/qq_73472828/article/details/160794286"
    },
    {
      id: "f26",
      title: "Vibe Coding全链路实战：CLAUDE.md工程化裁剪+Skills+Subagents+Plugins五层架构",
      platform: "CSDN",
      author: "@yangshangwei",
      date: "2026-06-15",
      tags: ["📋方法论", "💡案例"],
      summary: "从聊天框升级为可复用工程工作流系统的完整路径：/init生成起点需人工去噪、CLAUDE.md/Skills/Subagents/Hooks/Plugins五层架构、规则当代码维护(PR/Review/版本化)、/compact手动压缩优于自动、子代理隔离中间探索。",
      url: "https://blog.csdn.net/yangshangwei/article/details/158319117"
    },
    {
      id: "f25",
      title: "前端Vue3项目Vibe Coding标准化流程：人定方向+AI执行+机器校验三段式",
      platform: "一聚教程网",
      author: "前端开发者",
      date: "2026-06-05",
      tags: ["📋方法论", "💡案例"],
      summary: "面向Vue3项目的可重复Vibe Coding流程模板：需求澄清→技术选型→架构设计→Skill定义→Rules+Lint→迭代开发→验证。核心公式：人定方向+AI执行+机器校验。规矩越前置，AI越像带规范的pair programmer而非碰运气的代码生成器。",
      url: "https://www.111cn.net/new/556654.htm"
    },
    {
      id: "f24",
      title: "coreland-ai-powers：多平台AI Skills框架，支持Claude/Cursor/Codebuddy/Codex",
      platform: "GitHub",
      author: "anymore2026",
      date: "2026-06-03",
      tags: ["🔧工具"],
      summary: "开源多平台AI Skills框架，一套Skill定义同时适配Claude Code(.claude)、Cursor(.cursor)、Codebuddy(.codebuddy)、Codex(.codex-plugin)四大平台。解决跨工具Skill复用问题，实现一次编写多平台运行。",
      url: "https://github.com/anymore2026/coreland-ai-powers"
    },
    {
      id: "f23",
      title: "AI编程进入全智能体时代：GPT-5 Codex/Gemini 3.0 Code多模态理解设计稿，Agentic Coding落地",
      platform: "企鹅号",
      author: "行业观察",
      date: "2026-06-21",
      tags: ["⚡新闻", "📋方法论"],
      summary: "2026年Q2全球月活AI编程工具开发者超7500万，同比增300%。GPT-5 Codex/Gemini 3.0 Code等模型可解析UI设计稿、流程图生成完整代码骨架，Windsurf AutoAgent模式中等复杂功能成功率超65%。开发范式从'编码-编译-调试'转向'设计-描述-验证'，AI生成代码缺陷率已低于人类平均水平15%。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_8206a37d3dd40452"
    },
    {
      id: "f22",
      title: "SpaceX 600亿美元收购Cursor母公司Anysphere，加码AI编程赛道",
      platform: "企鹅号",
      author: "智通财经",
      date: "2026-06-16",
      tags: ["⚡新闻", "🔧工具"],
      summary: "马斯克旗下SpaceX宣布以600亿美元收购Cursor开发商Anysphere，预计2026年Q3完成。此举旨在加速企业级AI市场布局，Cursor当前日活开发者数百万，是AI编程领域估值最高的独立公司。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_6926a312c0451752"
    },
    {
      id: "f21",
      title: "Solving Agent Context Loss：Beads + Claude Code工作流，17任务Epic自主执行",
      platform: "Blog",
      author: "Jarred Kenny (Tracktile CTO)",
      date: "2026-06-01",
      tags: ["📋方法论", "💡案例"],
      summary: "用外部任务状态（Beads模式）解决Agent上下文丢失问题，将Claude Code工作流从'持续盯盘'转变为自主执行17任务Epic。核心：将任务状态外化为可检查点，Agent可在上下文丢失后自动恢复，附完整可复现Skill集。",
      url: "https://www.jarredkenny.com/solving-agent-context-loss/"
    },
    {
      id: "f20",
      title: "CLAUDE.md会话管理黄金法则：新任务新会话、/compact智能压缩、/rewind重写优于修正",
      platform: "CSDN/GitCode",
      author: "claude-code-best-practice社区",
      date: "2026-06-16",
      tags: ["📋方法论", "🔧工具"],
      summary: "claude-code-best-practice项目更新会话管理核心法则：(1)新任务=新会话，避免上下文腐化 (2)/compact手动压缩优于自动压缩 (3)/rewind回到失败点重写优于修补 (4)子代理隔离中间探索。新增/goal长期运行命令和跨模型工作流集成（插件/MCP/路由器三种机制）。",
      url: "https://blog.csdn.net/gitblog_01115/article/details/153954044"
    },
    {
      id: "f19",
      title: "Cursor vs Claude Code vs Copilot 2026终极横评：Express迁移Fastify同任务实测",
      platform: "CSDN",
      author: "@qq_31142761",
      date: "2026-06-17",
      tags: ["🔧工具", "💡案例"],
      summary: "2026年三大工具同任务深度横评：50路由Express→Fastify迁移。Copilot逐文件辅助约4h、Cursor Composer批量迁移约1.5h、Claude Code自主执行约1h。2026范式从补全升级为Agentic Coding：Agent自主规划执行、上下文从当前文件扩展到整个代码库。Copilot升级GPT-5.5系列，Cursor支持百万行项目解析。",
      url: "https://blog.csdn.net/qq_31142761/article/details/161399934"
    },
    {
      id: "f18",
      title: "微软Build 2026：Agent优先时代全面落地，自研MAI模型+Scout智能体+GitHub Copilot深度Agentic化",
      platform: "企鹅号",
      author: "微软Build 2026报道",
      date: "2026-06-03",
      tags: ["⚡新闻", "🔧工具"],
      summary: "微软Build 2026确立Agent优先方向：发布MAI自研模型家族、Scout智能体、GitHub Copilot进入深度Agentic模式，Windows系统级AI安全沙箱MXC、Project Solara智能体设备平台，以及开发者治理框架ASSERT。从2025年的'用什么标准和框架'进化到2026年的'如何用自家的模型和产品真正跑起来'。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_6466a1f740a43252"
    },
    {
      id: "f17",
      title: "Agentic Engineering Framework：基于Skill的模块化AI Coding Agent框架",
      platform: "GitHub",
      author: "davidYichengWei",
      date: "2026-06-10",
      tags: ["🔧工具", "📋方法论"],
      summary: "开箱即用的AI Coding Agent Skills框架，将工程纪律与AI能力系统性结合。推荐工作流：需求澄清→系统设计→代码生成→测试生成→代码审查，每步由AI以不同角色(引导者/协作者/执行者)参与，并通过反馈闭环自动沉淀团队工程经验。",
      url: "https://github.com/davidYichengWei/agentic-engineering-framework"
    },
    {
      id: "f16",
      title: "claude-code-best-practice：从Vibe Coding到Agentic Engineering的完整进化路径",
      platform: "GitHub/CSDN",
      author: "shanraisshan",
      date: "2026-06-04",
      tags: ["📋方法论", "🔧工具"],
      summary: "GitHub 20K+ stars项目，系统化Claude Code使用指南。核心内容：CLAUDE.md编写规范、Skills/Hooks/Commands最佳实践、Git Worktrees实现多Agent并行开发、防降智策略(手动/compact、分阶段门控计划)。2026年3月登上GitHub Trending。",
      url: "https://github.com/shanraisshan/claude-code-best-practice"
    },
    {
      id: "f15",
      title: "12-Factor Agents：生产级LLM软件工程方法论，将Heroku经典12因子移植到Agent开发",
      platform: "CSDN",
      author: "@qinchao_mei",
      date: "2026-05-19",
      tags: ["📋方法论"],
      summary: "GitHub 20K+ stars项目，解决Agent从Demo到生产的可靠性问题。将Heroku经典12-Factor App方法论移植到LLM驱动软件中，定义生产级Agent开发的标准实践。核心问题：不是'能不能跑通'，而是'能不能在客户手上可靠运行'。",
      url: "https://blog.csdn.net/qinchao_mei/article/details/161216939"
    },
    {
      id: "f14",
      title: "Claude Code并行任务三层机制：Subagents/Agent Teams/Git Worktree选型指南",
      platform: "菜鸟教程",
      author: "Claude Code社区",
      date: "2026-06-11",
      tags: ["🔧工具", "📋方法论"],
      summary: "Claude Code提供三层并行化：Subagents(独立子任务，单向汇报)、Agent Teams(需讨论协作的复杂工作，多向通信)、Git Worktree(需隔离代码环境的多任务，完全独立)。内置Explore/Plan/General-purpose三种Subagent，分别用Haiku(快速)和继承主对话模型处理不同复杂度任务。",
      url: "https://www.runoob.com/claude-code/claude-code-parallel-tasks.html"
    },
    {
      id: "f13",
      title: "2026 AI Coding工具终极实战指南：从辅助编程范式到Agentic Coding范式升级",
      platform: "CSDN",
      author: "@qq_31142761",
      date: "2026-06-05",
      tags: ["📋方法论", "🔧工具"],
      summary: "2026年范式已从对话补全升级为Agentic Coding：交互从补全变为Agent自主规划执行、上下文从当前文件扩展到整个代码库+工具调用、能力从单行补全到跨文件重构/PR生成/CI修复。Copilot升级GPT-5.5系列、Cursor 0.45版、Devin 2.0实测任务完成度95%。",
      url: "https://blog.csdn.net/qq_31142761/article/details/161713483"
    },
    {
      id: "f7",
      title: "Agentic开发三大开放标准：MCP + AGENTS.md + Agent Skills 正在收敛",
      platform: "HUMANSREADCODE",
      author: "humansreadcode",
      date: "2026-06-01",
      tags: ["📋方法论", "⚡新闻"],
      summary: "MCP、AGENTS.md、Agent Skills三大厂商中立标准正在汇聚，定义Agentic Software Development的工作方式。三者互通互操作，为Agent开发提供了可依赖的基础设施层。",
      url: "http://humansreadcode.com/"
    },
    {
      id: "f8",
      title: "Claude Code最佳实践：给AI验证自己工作的能力，质量提升2-3倍",
      platform: "CSDN",
      author: "@m0_63058076",
      date: "2026-06-01",
      tags: ["📋方法论", "💡案例"],
      summary: "Claude Code构建者Boris Cherny强调：让Claude能通过测试、Lint、浏览器工具闭环验证自己的输出，是影响力最大的单一实践。配合CLAUDE.md项目规范文件和Hooks确定性约束，可实现2-3倍质量提升。",
      url: "https://blog.csdn.net/m0_63058076/article/details/161020240"
    },
    {
      id: "f9",
      title: "Opus 4.7 发布：xhigh努力等级 + 委派模式，像分配任务给资深工程师一样使用AI",
      platform: "CSDN",
      author: "@weixin_54390868",
      date: "2026-06-02",
      tags: ["🔧工具", "📋方法论"],
      summary: "Opus 4.7引入xhigh努力等级（介于high和max之间），建议将Claude当作委派任务的资深工程师而非结对伙伴。核心技巧：首轮说清意图+约束+验收标准、批量发送减少交互轮次、善用Auto模式解放注意力。",
      url: "https://blog.csdn.net/weixin_54390868/article/details/160235829"
    },
    {
      id: "f10",
      title: "Vibe Coding落地反思：前置工程规范才是核心，Prompt精细化不是关键",
      platform: "企鹅号",
      author: "一线开发者",
      date: "2026-06-03",
      tags: ["📋方法论", "💡案例"],
      summary: "基于8个商业与个人项目的实战复盘，提出Vibe Coding五步标准化流程：前置规则定义→需求工程化→约束锁定→增量迭代→验证闭环。核心发现：工程规范的约束力远比Prompt技巧重要。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_9056a1eff1971552"
    },
    {
      id: "f11",
      title: "Claude Code 调优实操：改完10个设置，输出质量和效率翻倍",
      platform: "企鹅号",
      author: "一线开发者",
      date: "2026-06-03",
      tags: ["🔧工具", "📋方法论"],
      summary: "实战调优指南：关掉自适应思考(adaptive thinking)避免跳过推理导致bug、固定effort为high确保深度思考、默认权限设为acceptEdits减少确认打断、用plan模式探索不熟悉的代码库。从一上午47次确认弹窗降到个位数。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_0676a2026bb55952"
    },
    {
      id: "f12",
      title: "Claude Code团队成员亲述：动态工作流(Workflows)的正确打开方式",
      platform: "企鹅号",
      author: "Claude Code Team",
      date: "2026-06-05",
      tags: ["🔧工具", "📋方法论"],
      summary: "Claude Code团队分享Workflows实战用法：用子Agent并行处理多维度任务（投资者/客户/竞争对手视角拆解商业计划）、回顾历史会话挖掘重复性错误生成CLAUDE.md规则、跨文件重构自动编排执行顺序。",
      url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_3336a2231c908652"
    },
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

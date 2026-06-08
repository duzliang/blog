---
name: wx-code-style
description: wechat mini program code style, Trigger when user create new file in wx-feecar
---

# pgCas 开发技能规范

本指南总结了 `src/pgCas` 目录下的编码习惯和代码风格，旨在指导后续开发工作。

## 1. 目录结构规范
每个页面或独立功能模块应包含以下文件：
- `index.tsx`: 页面入口，负责组件逻辑和 UI 渲染。
- `api.ts`: 所有的接口请求函数及对应的 TypeScript 类型定义（Params, Result, Entity）。
- `style.less` 或 `index.less`: 样式定义。
- `components/`: (可选) 存放该功能特有的子组件。
- `utils.ts`: (可选) 存放该功能特有的工具函数。
- `entity.ts`: (可选) 存放该功能相关的枚举或共享实体。

## 2. 编码习惯

### 组件开发
- **函数式组件**: 统一使用 React Hooks (`useState`, `useEffect`, `useMemo` 等)。
- **配置**: 页面配置使用 `Component.config = { ... } as Config`。
- **页面参数**: 使用 `useRouter().params` 获取路由参数。
- **业务 Hooks**: 优先使用项目封装的 Hooks，如 `useLoginEffect` 处理需要登录态的页面初始化。

### 接口请求 (api.ts)
- **命名规范**: 统一使用 `[action]Api` 后缀，如 `listApi`, `detailApi`, `saveApi`, `confirmApi`。
- **类型安全**: 必须为每个接口定义 `Params` 和 `Result` 接口。
- **统一工具**: 使用 `src/utils/http` 进行请求，返回类型为 `PromiseResp<T>`。
- **Host 管理**: 使用 `src/utils/http/host` 获取不同微服务的基准路径。

### UI 交互
- **加载状态**: 使用 `Taro.showLoading` / `hideLoading` 或 `Container` 组件的 `loading` 属性。
- **反馈提示**: 使用 `Taro.showToast` 进行成功或失败提示。
- **容器组件**: 统一使用 `components/Container` 或 `components/Container1` 包裹页面内容。

### 数据处理
- **金额**: 使用 `currency.js` 进行精确计算，UI 展示使用 `src/utils/currency` 中的 `rmb` 工具。
- **日期**: 使用 `dayjs` 进行日期格式化和计算。
- **资产**: 图片、图标等资源统一从 `assets/remote` 导入。

## 3. 代码风格
- **命名**: 
  - 组件与接口 (Interface): PascalCase。
  - 函数与变量: camelCase。
  - 常量/枚举成员: SCREAMING_SNAKE_CASE。
- **类型声明**: 严禁使用 `any`，应尽可能通过接口定义清晰的数据结构。
- **事件处理**: 页面内的事件处理函数建议以 `handle` 开头，如 `handleConfirm`, `handleSelect`。
- **解构**: 积极使用解构赋值来简化代码。

## 4. 示例模版 (api.ts)
```typescript
import http from 'src/utils/http';
import { PromiseResp } from 'pages/common/response';
import host from 'src/utils/http/host';

export interface DetailParams {
  id: number;
}

export interface DetailResult {
  name: string;
  status: number;
}

export function detailApi(params: DetailParams): PromiseResp<DetailResult> {
  return http.get(`${host.cas}/wx/your/api/path`, { params });
}
```

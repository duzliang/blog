---
name: h5-code-style
description: H5 应用代码风格规范，基于 React + Modern.js + @feewee/h5app-common 的项目。当用户在 h5app-* 项目中创建新文件、编写新组件、页面或服务时代码风格规范
---

# H5 应用代码风格规范

你是 H5 应用代码风格指南。基于 React + Modern.js + @feewee/h5app-common 技术栈。创建新代码时遵循以下规范：

## 1. 功能模块目录结构

每个功能模块必须遵循以下标准结构：

```shell
feature-name/
├── page.tsx                    # 主页面入口（默认导出）
├── entity.ts                   # 枚举、常量、配置项
├── service.ts                  # API 请求函数和接口定义
├── components/                 # 组件目录
│   ├── ComponentName/
│   │   ├── index.tsx          # 组件主文件
│   │   └── api.ts             # 组件专用 API（如有）
│   └── ListItem.tsx           # 简单组件可直接放在 components 下
├── __subpages/                 # 子页面目录（如有）
│   └── subpage-name/
│       ├── page.tsx
│       └── service.ts
```

### 目录命名规则

- 主功能目录使用 **kebab-case**：`book-part/`, `customer-related/`, `pickup-destroy/`
- 子页面目录使用 `__subpages/` 前缀

## 2. 文件命名规则

### 页面文件

- 主页面统一命名为 `page.tsx`
- 子页面也命名为 `page.tsx`（通过目录区分）
- 不使用 `BookPartList.tsx` 这种重复功能名的命名

**正确示例：**

```shell
book-part/
├── page.tsx           # ✅ 主页面
├── edit/
│   └── page.tsx       # ✅ 编辑页面
├── detail/
│   └── page.tsx       # ✅ 详情页面
└── approval/
    └── page.tsx       # ✅ 审批页面
```

### 组件文件

- 简单组件：`ListItem.tsx`, `MenuItem.tsx`, `RowItem.tsx`
- 复杂组件（带子组件）：使用文件夹 + `index.tsx`

**正确示例：**

```shell
components/
├── ListItem.tsx                  # ✅ 简单组件
├── BaseAutoInfo/
│   └── index.tsx                 # ✅ 复杂组件
└── PartBookProgress/
    ├── index.tsx                 # ✅ 主组件
    └── api.ts                    # ✅ 组件专用 API
```

### 服务文件

- 统一命名为 `service.ts`
- 组件专用 API 命名为 `api.ts`

### 类型定义文件

- 枚举和常量：`entity.ts`
- TypeScript 类型：`types.ts`（如有需要）

## 3. API 函数命名规则

### 命名格式

使用 **描述性名称 + Api 后缀**，采用驼峰命名：

```typescript
// ✅ 正确示例
export const listApi = () => http.get('/list')
export const detailApi = (id: number) => http.get('/detail', { id })
export const saveApi = (params: SaveParams) => http.post('/save', params)
export const deleteApi = (id: number) => http.del(`/delete/${id}`)
export const confirmApi = (orderId: number) => http.post('/confirm', { orderId })
export const destroyApi = (id: number) => http.post('/destroy', { id })
export const rollbackApi = (id: number) => http.post('/rollback', { id })
```

### 接口定义

```typescript
// ✅ 正确示例 - 使用描述性名称
export interface ListResult {
  id: number
  name: string
  status: number
}

export interface DetailResult {
  orderId: number
  orderNo: string
  items: Item[]
}

export interface SaveParams {
  orderId: number
  pass: boolean
  remarks?: string
}

// ❌ 错误示例 - 避免冗余前缀
export interface BookPartListResult { ... }  // 在 book-part/service.ts 中不需要重复功能名
export interface BookPartDetail { ... }
```

## 4. 组件编写规范

### 函数组件

```tsx
import { useState, useMemo, useCallback } from 'react'
import { Button, PageProvider, ListRow, Toast, useUrlParams } from '@feewee/h5app-common'
import { useNavigate } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import { Helmet } from '@modern-js/runtime/head'

// ✅ 接口定义放在组件外部
interface PageParams {
  dataId: number
  orderId?: number
}

// ✅ 默认导出主组件
export default function FeatureName() {
  const navigate = useNavigate()
  const { dataId, orderId } = useUrlParams<PageParams>()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // ✅ 使用 useRequest 处理 API 请求
  const { data, loading: queryLoading, error } = useRequest(detailApi, {
    defaultParams: [dataId],
  })

  // ✅ 事件处理函数
  const handleSubmit = async (params: SaveParams) => {
    Toast.loading('操作中...', { duration: 0 })
    try {
      await saveApi(params)
      Toast.success('操作成功', { onClose: () => helper.goBack(navigate) })
    } catch (err) {
      Toast.fail(err?.message || '操作失败')
    } finally {
      Toast.clear()
    }
  }

  const handleBack = () => helper.goBack(navigate)

  // ✅ 渲染部分
  return (
    <PageProvider
      tittle="页面标题"
      loading={queryLoading}
      errMsg={error?.message}
      onBackClick={handleBack}
    >
      <main className="bg-default overflow-y-auto" style={{ height: 'calc(100vh - 44px - 61px)' }}>
        {/* 内容区域 */}
        <ListRow title="标题" extra={<span>内容</span>} />
      </main>

      {/* 底部操作栏 */}
      <div className="actionWrapper flex flex-row justify-between">
        <Button size="large" type="danger" className="flex-1" onClick={handleBack}>
          取消
        </Button>
        <Button type="primary" size="large" className="flex-1 ml-2.5" onClick={handleSubmit}>
          确认
        </Button>
      </div>
    </PageProvider>
  )
}
```

### 组件 Props 接口

```tsx
interface Props {
  className?: string
  data: ListResult[]
  loading?: boolean
  onAction?: (type: ActionType, item: ListResult) => void
}

export default function ComponentName({ className, data, loading, onAction }: Props) {
  // ...
}
```

## 5. 枚举和常量定义

### 枚举命名

使用 **语义化中文键名** 或 **英文大写枚举名**：

```typescript
// ✅ 正确示例 1 - 中文键名（适用于状态映射）
export enum StatusEnum {
  /** 草稿 */
  DRAFT = 0,
  /** 待确认 */
  PLAN_CONFIRM = 1,
  /** 待审批 */
  APPROVE = 2,
  /** 已完成 */
  REFUND_COMPLETE = 10,
}

// ✅ 正确示例 2 - 中文键名直接映射值
export enum TypeEnum {
  '在修车辆' = 1,
  '提前离站' = 2,
  '客户订件' = 3,
}

// ✅ 正确示例 3 - 业务类型枚举
export enum ItemTagEnum {
  '24 项检测' = 0,
  '机修' = 1,
  '钣喷' = 3,
  '装潢' = 4,
}
```

### 常量配置

```typescript
// ✅ 路由配置
export const RouteConfig = {
  list: '/cas/book-part',
  detail: '/cas/book-part/detail',
  edit: '/cas/book-part/edit',
  approval: '/cas/book-part/approval',
}

// ✅ 标签映射
export const BearTypeTag: { [key: number]: 'primary' | 'warn' } = {
  1: 'primary',
  2: 'warn',
}

// ✅ Tab 配置
export const tabsConfig = [
  {
    title: '客户未确认',
    value: 1,
  },
  {
    title: '客户已确认',
    value: 2,
  },
]
```

## 6. Hooks 使用规范

### 自定义 Hooks

放在 `hooks/` 目录下，使用 `useXxx` 命名：

```typescript
// hooks/useDataTransform.ts
import { useMemo } from 'react'
import type { WorkingOrder } from '../service'

export function useDataTransform() {
  const transformWorkingOrderList = useMemo(() => {
    return (workingOrderList: WorkingOrder[] | undefined) => {
      if (!workingOrderList) return []
      return workingOrderList.map(order => ({
        ...order,
        plateNo: order.plateNo,
      }))
    }
  }, [])

  return {
    transformWorkingOrderList,
  }
}

// hooks/useStore.ts
import { useReducer } from 'react'

interface State {
  currentType?: number
  currentNode?: number
  menuHeight: number
  drawer: {
    open: boolean
    bookPartId?: number
  }
}

type Action =
  | { type: 'SET_CURRENT_TYPE'; payload: number }
  | { type: 'SET_CURRENT_NODE'; payload: number }
  | { type: 'OPEN_DRAWER'; payload: number }
  | { type: 'CLOSE_DRAWER' }

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = {
    setCurrentType: (type: number) => dispatch({ type: 'SET_CURRENT_TYPE', payload: type }),
    setCurrentNode: (node: number) => dispatch({ type: 'SET_CURRENT_NODE', payload: node }),
    openDrawer: (bookPartId: number) => dispatch({ type: 'OPEN_DRAWER', payload: bookPartId }),
    closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
  }

  return { state, actions }
}
```

## 7. 样式规范

### 使用 Tailwind CSS 类名

 - h5app-cas项目，除Tailwind CSS外，系统通用样式使用cas.scss中的样式，如text-default,text-primary等
 - 其他h5app项目，除Tailwind Css外，系统通用样式优先使用fw-primary等tailwind.config.ts中配置的样式

```tsx
// ✅ 正确示例
<div className="flex flex-row items-center justify-between bg-white px-[15px] py-[7.5px]">
  <span className="text-default font-bold">标题</span>
  <span className="text-warn text-[15px]">金额</span>
</div>

// ✅ 条件类名使用 clsx
import clsx from 'clsx'

<span className={clsx({
  'font-bold': true,
  'text-default': fee.subtotal >= 0,
  'text-warn': fee.subtotal < 0,
})}>
  {rmb.sp(fee.subtotal)}
</span>
```

### 内联样式

用于动态计算的高度、宽度等：

```tsx
<main
  className="bg-default overflow-y-auto"
  style={{
    height: `calc(100vh - var(--nutui-navbar-height, 44px) - 60px)`,
  }}
/>
```

## 8. 常用工具库

### 必须使用的库

```typescript
import { useState, useMemo, useCallback, useEffect, Fragment } from 'react'
import { Button, Form, helper, ListRow, PageProvider, TextArea, Toast, UploaderPro, useUrlParams, WhiteSpace, Icon, Dialog, ConfirmModal, Ellipsis, SearchBar, usePagination, LinearHeader } from '@feewee/h5app-common'
import { useNavigate } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import { Helmet } from '@modern-js/runtime/head'
import { Table, type TableColumnsType } from 'antd'
import clsx from 'clsx'
import currency from 'currency.js'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
```

### 工具函数

```typescript
import rmb from '@/utils/rmb'  // 金额格式化
import currency from 'currency.js' // 金额计算

// rmb.p(1000) → "1,000.00"
// rmb.sp(-1000) → "-1,000.00"（带符号）
// const totalPrice = currency(partCnt).multiply(partPrice).value
```

## 9. 代码注释规范

### 文件顶部注释

```typescript
/**
 * 拆解费用确认
 * todo 待确认页面
 */
```

### 接口注释

```typescript
export interface Item {
  /** 拆解 id */
  id: number
  /** 拆解类型 1:机修拆解，2:钣金拆解 */
  type: number
  /** 拆解人员 id */
  userId: number
  /** 提交时间 */
  commitTime: number
}
```

### 函数注释

```typescript
/** 工单追加进站类型 */
export function addOrderServiceTypeApi(params: OrderServiceTypeParams): Promise<void> {
  return http.post(`${host.cas}/app/order/add/service/type`, params)
}
```

## 10. 页面布局模板

### 标准列表页

```tsx
export default function ListPage() {
  const navigate = useNavigate()
  const { list, setRefreshing, loading, onLoadMore, onRefresh, errMsg, setParams } = usePagination(listApi, { type: 1 })

  const handleAction = (type: ActionType, item: ListResult) => {
    // 处理操作
  }

  return (
    <PageProvider
      tittle="列表页"
      loading={loading}
      errMsg={errMsg}
      onBackClick={() => helper.goBack(navigate)}
      right={<Button>新增</Button>}
    >
      <SearchBar placeholder="搜索" onChange={handleSearch} />
      <ListRefresh
        list={list}
        renderItem={item => <ListItem key={item.id} item={item} onAction={handleAction} />}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
      />
    </PageProvider>
  )
}
```

### 标准详情页

```tsx
export default function DetailPage() {
  const navigate = useNavigate()
  const { dataId } = useUrlParams<{ dataId: number }>()

  const { data, loading, error } = useRequest(detailApi, {
    defaultParams: [dataId],
  })

  const handleSubmit = async () => {
    // 提交逻辑
  }

  return (
    <PageProvider
      tittle="详情页"
      loading={loading}
      errMsg={error?.message}
      onBackClick={() => helper.goBack(navigate)}
    >
      <main className="overflow-y-auto" style={{ height: 'calc(100vh - 44px - 61px)' }}>
        {/* 内容 */}
      </main>

      <div className="actionWrapper flex flex-row justify-between">
        <Button size="large" type="danger" className="flex-1">取消</Button>
        <Button type="primary" size="large" className="flex-1 ml-2.5" onClick={handleSubmit}>确认</Button>
      </div>
    </PageProvider>
  )
}
```

## 11. 注意事项

1. **不要重复功能名**：在 `book-part/` 目录下的文件不要命名为 `BookPartXxx.tsx`
2. **使用 PageProvider**：所有页面必须使用 `PageProvider` 包裹
3. **统一使用 useRequest**：处理 API 请求状态
4. **Toast 反馈**：操作结果使用 Toast 提示
5. **helper.goBack**：返回上一页统一使用此方法
6. **金额显示**：使用 `rmb.p()` 或 `rmb.sp()` 格式化
7. **金额计算**: 使用currency计算金额加减乘除
8. **类型安全**：所有接口和参数必须定义 TypeScript 类型

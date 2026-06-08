---
name: report-code-style
description: 售后报表系统代码风格规范，基于 src/pages/Cas目录的代码模式。当用户在 CAS 报表项目中创建新模块、页面或组件时代码风格规范
---

# 售后报表系统代码风格规范

你是 CAS 报表系统代码风格指南。基于 `src/pages/Cas` 目录的代码模式，遵循以下规范：

## 1. 功能模块目录结构

每个报表功能模块必须遵循以下标准结构：

```shell
feature-name/
├── index.tsx                   # 主页面入口（实时报表）
├── history.tsx                 # 历史报表页面
├── entity.ts                   # 枚举、常量、配置项
├── api.ts                      # API 请求函数和接口定义
├── components/                 # 组件目录
│   ├── Summary/
│   │   └── index.tsx          # 概况组件
│   ├── Trend/
│   │   └── index.tsx          # 趋势组件
│   └── Lists/
│       ├── index.tsx          # 列表组件
│       └── subpages/
│           └── ModalList.tsx  # 列表弹窗子页面
└── usepage/                    # 特殊页面目录（如有）
    └── Lists/
        └── index.tsx
```

### 目录命名规则

- 主功能目录使用 **kebab-case**：`order-insurance/`, `lifetime-maintain-card/`, `market-action/`
- 组件目录使用 **PascalCase**：`Summary/`, `Trend/`, `Lists/`
- 子页面目录使用 `subpages/`

## 2. 文件命名规则

### 页面文件

- 实时报表：`index.tsx`
- 历史报表：`history.tsx`
- 不使用 `OrderInsurancePage.tsx` 这种重复功能名的命名

**正确示例：**

```shell
order-insurance/
├── index.tsx          # ✅ 实时报表
├── history.tsx        # ✅ 历史报表
├── entity.ts          # ✅ 枚举常量
└── api.ts             # ✅ API 定义
```

### 组件文件

- 标准三件套组件：`Summary/`, `Trend/`, `Lists/`
- 复杂组件使用文件夹 + `index.tsx`

**正确示例：**

```shell
components/
├── Summary/
│   └── index.tsx                 # ✅ 概况组件
├── Trend/
│   └── index.tsx                 # ✅ 趋势组件
└── Lists/
    ├── index.tsx                 # ✅ 列表组件
    └── subpages/
        └── ModalList.tsx         # ✅ 弹窗子页面
```

### 服务文件

- 统一命名为 `api.ts`
- 实体定义：`entity.ts`

## 3. API 函数命名规则

### 命名格式

使用 **功能描述 + Api 后缀**，采用驼峰命名：

```typescript
// ✅ 正确示例
export function summaryApi(params: SummaryParams): PromiseResp<SummaryResult>
export function trendApi(params: TrendParams): PromiseResp<TrendResult>
export function listApi(params: ListParams): PromiseResp<ListResult[]>
export function changeListApi(params: ListParams): PromiseResp<ListChangeResult[]>
```

### 接口定义

```typescript
// ✅ 正确示例 - 使用描述性名称
export interface SummaryParams extends Report.Params {
  userIds?: string
  exId?: string
  exName?: string
  analyzeId?: string
}

export interface TrendParams extends Report.Params, SummaryParams {
  norm: number
  mon?: boolean
}

export interface ListParams extends Report.Params, SummaryParams {
  dimension: string | number
  exDimension?: string
  roleCode?: string | null
}

export interface SummaryResult {
  i1: number  // 本月应维护数量
  i2: number  // 本月已维护数量
  i3: number  // 本月未维护数量
  d1: number  // 本月保单维护率
  i4: number  // 今日应维护数量
  i5: number  // 今日已维护数量
  i6: number  // 今日未维护数量
  d2: number  // 今日保单维护率
}

export interface TrendResult {
  dates: string[]
  data: DataItem[]
}

interface DataItem {
  name: string
  data: number[]
}

export interface ListResult extends SummaryResult {
  id: string
  name: string
  exId: string
  exName: string
  b3: boolean
}
```

### API 路径规范

```typescript
import { get, host, PromiseResp } from '@/utils/request'

export function summaryApi(params: SummaryParams): PromiseResp<SummaryResult> {
  return get(`${host.report}/cas/038/summary`, { params })
}

export function trendApi(params: TrendParams): PromiseResp<TrendResult> {
  return get(`${host.report}/cas/038/norm/trend`, { params })
}

export function listApi(params: ListParams): PromiseResp<ListResult[]> {
  return get(`${host.report}/cas/038/list`, { params })
}
```

## 4. 组件编写规范

### Summary 组件模板

```tsx
import React from 'react'
import { Flex } from 'antd-mobile-v2'
import { CardView, DeadLine, Exception, ReportText, SubHeader } from '@/components'
import { formatNumber } from '@/utils/number'
import { useInitial } from '@/hooks'
import { ReportDateType } from '@/entity'
import { NativeRoutes, NavToNative } from '@/pages/Cas/native-routes'
import { BizType } from './entity'
import type { SummaryResult } from './api'
import { summaryApi } from './api'

export default function Summary({ ...condition }) {
  const { realtime, dateType, beginDate, endDate, shopIds, delay } = condition

  const { data, errMsg, loading, refreshing } = useInitial(
    summaryApi,
    {} as SummaryResult,
    { realtime, dateType, beginDate, endDate, shopIds },
    delay,
  )

  function showNativePage(dateType: ReportDateType, type: BizType) {
    const pathParams = {
      realtime,
      dateType,
      beginDate,
      endDate,
      shopIds,
      type,
    }
    NavToNative.openH5(NativeRoutes.OrderInsurancePool, pathParams)
  }

  return (
    <CardView
      title="概况"
      loading={loading || refreshing}
      headerRight={
        realtime ? (
          <DeadLine dateType={dateType} untilNow />
        ) : (
          <DeadLine dateType={dateType} beginDate={beginDate} endDate={endDate} />
        )
      }
    >
      {errMsg ? (
        <Exception type="noData">{errMsg}</Exception>
      ) : (
        <>
          {realtime && (
            <>
              <SubHeader title="今日" />
              <Flex style={{ marginBottom: 19 }}>
                <ReportText title="应维护" unit="台" align="left" onClick={() => showNativePage(ReportDateType.DAY, BizType.NEED_DO)}>
                  {data.i4 || 0}
                </ReportText>
                <ReportText title="已维护" unit="台" onClick={() => showNativePage(ReportDateType.DAY, BizType.DONE)}>
                  {data.i5 || 0}
                </ReportText>
                <ReportText title="未维护" unit="台" onClick={() => showNativePage(ReportDateType.DAY, BizType.UNDO)}>
                  {data.i6 || 0}
                </ReportText>
                <ReportText title="维护率" unit="%" align="right">
                  {formatNumber((data.d2 || 0) * 100)}
                </ReportText>
              </Flex>
              <SubHeader title="本月" />
            </>
          )}
          <Flex>
            <ReportText title="应维护" unit="台" align="left" onClick={() => showNativePage(ReportDateType.MONTH, BizType.NEED_DO)}>
              {data.i1 || 0}
            </ReportText>
            <ReportText title="已维护" unit="台" onClick={() => showNativePage(ReportDateType.MONTH, BizType.DONE)}>
              {data.i2 || 0}
            </ReportText>
            <ReportText title="未维护" unit="台" onClick={() => showNativePage(ReportDateType.MONTH, BizType.UNDO)}>
              {data.i3 || 0}
            </ReportText>
            <ReportText title="维护率" unit="%" align="right">
              {formatNumber((data.d1 || 0) * 100)}
            </ReportText>
          </Flex>
        </>
      )}
    </CardView>
  )
}
```

### Trend 组件模板

```tsx
import React, { useEffect, useState } from 'react'
import { RatioTrend } from '@/components'
import type { TrendData } from '@/components/RatioTrend'
import { useInitial } from '@/hooks'
import { ReportDateType } from '@/entity'
import { ChartColors, RangeTab } from '@/pages/Cas/entity'
import { trendApi, type TrendResult } from './api'

interface Props extends Report.ReportProps {
  rangeTab: RangeTab
}

interface SeriesItem {
  title: string
  CntData: number[]
  RatioData: number[]
  CntName: string
  RatioName: string
}

export default function Trend({ rangeTab, ...condition }: Props) {
  const { beginDate, endDate, shopIds, delay } = condition
  
  // 根据 rangeTab 决定实时/历史
  const realtime = rangeTab === RangeTab.TODAY

  const [chartData, setChartData] = useState<TrendData>({ xdata: [], data: [] })
  const [dateType, setDateType] = useState<number>(ReportDateType.MONTH)

  const params = {
    realtime,
    dateType,
    beginDate,
    endDate,
    shopIds,
    todayTab: rangeTab === RangeTab.TODAY ? 1 : 0,
    selectCurrent: rangeTab === RangeTab.CURRENT,
  }
  const { data, loading, refreshing, setParams, errMsg } = useInitial(trendApi, {} as TrendResult, params, delay)

  useEffect(() => {
    // 切换 tab 时重置状态
    setDateType(ReportDateType.MONTH)
    setParams({ ...params, dateType: ReportDateType.MONTH }, true)
  }, [rangeTab])

  useEffect(() => {
    if (Object.keys(data).length > 0 && data.data.length > 0) {
      const xSeries: SeriesItem[] = []
      data.data.forEach((item: DataItem) => {
        const isRatio = item.name?.includes('率')
        xSeries.push({
          title: item.name,
          CntName: isRatio ? '' : item.name,
          CntData: isRatio ? [] : item.data || [],
          RatioName: isRatio ? item.name : '',
          RatioData: isRatio ? item.data || [] : [],
        })
      })

      const _data = {
        xdata: data.dates,
        data: xSeries.map((i, _index) => ({
          ...i,
          titleStyle: {
            borderColor: ChartColors[_index],
            color: ChartColors[_index],
            backgroundColor: ChartColors[_index].concat('20'),
          },
          series: getSeries(i, _index),
        })),
      }
      setChartData(_data)
    }
  }, [data, rangeTab])

  function getSeries(item: SeriesItem, i: number) {
    return [
      {
        name: item.CntName,
        type: 'line',
        smooth: false,
        data: item.CntData.map((_it) => ({
          value: _it,
          label: {
            show: true,
            position: 'outside',
            color: ChartColors[i],
            fontSize: 10,
            rotate: 45,
            offset: [10, 20],
            formatter: (v: { value: any }) => v.value,
          },
        })),
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: ChartColors[12 - i],
        },
      },
      {
        name: item.RatioName,
        type: 'line',
        smooth: false,
        data: item.RatioData.map((_it) => ({
          value: _it,
          label: {
            show: true,
            position: 'outside',
            color: ChartColors[i],
            fontSize: 10,
            rotate: 45,
            offset: [10, 20],
            formatter: (v: { value: any }) => `${v.value}%`,
          },
        })),
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: ChartColors[i],
        },
      },
    ]
  }

  return (
    <div className="card-trend" style={{ paddingTop: 0 }}>
      <RatioTrend data={chartData} loading={loading || refreshing} errMsg={errMsg} legend={[]} />
    </div>
  )
}
```

### Lists 组件模板

```tsx
import React, { useEffect, useMemo, useState } from 'react'
import { history } from 'umi'
import type { TableColumns } from '@/components'
import { DataTable, ListCondition } from '@/components'
import { getBlueStyle, getOrangeStyle, ReportDateType } from '@/entity'
import { useInitial } from '@/hooks'
import { createCondition, Dimension, DimensionAdapter, DimensionCodeAdapter, DimensionColumnName } from '@/pages/Cas/entity'
import { NativeRoutes, NavToNative } from '@/pages/Cas/native-routes'
import type { ListParams, ListResult } from './api'
import { listApi } from './api'
import { BizType } from './entity'
import ModalList from './subpages/ModalList'

const conditions = [
  createCondition(Dimension.D10),
  createCondition(Dimension.D20),
  {
    value: 1,
    name: '管理层',
    children: {
      title: '角色',
      items: [createCondition(Dimension.D51), createCondition(Dimension.D52), createCondition(Dimension.D53)],
    },
  },
]

export default function Lists({ ...condition }) {
  const { realtime, dateType, beginDate, endDate, shopIds, delay } = condition

  const [dimension, setDimension] = useState(Dimension.D10)
  const [listParams, setListParams] = useState<ListParams>({} as ListParams)
  const [visible, setVisible] = useState(false)
  const [selectDataName, setSelectDataName] = useState('')

  const params = { realtime, dateType, beginDate, endDate, shopIds, dimension }
  const { data, loading, refreshing, errMsg, setParams } = useInitial(listApi, [], params, delay)

  useEffect(() => {
    setParams(
      {
        ...params,
        dimension: DimensionAdapter[dimension],
        roleCode: DimensionCodeAdapter[dimension],
      },
      true,
    )
  }, [dimension])

  const columns: TableColumns<ListResult> = useMemo(() => {
    const baseColumns: TableColumns<ListResult> = [
      {
        headerName: DimensionColumnName[dimension],
        field: 'name',
        pinned: true,
        lockPinned: true,
        sortable: true,
        minWidth: dimension === Dimension.D10 ? 110 : 120,
        cellRenderer: e => e.data.name || '--',
      },
    ]
    // 根据 realtime 动态添加列
    return baseColumns
  }, [realtime, dimension])

  function showNativePage(data: ListResult, dateType: ReportDateType, type: BizType) {
    const pathParams = {
      realtime,
      dateType,
      beginDate,
      endDate,
      shopIds,
      dimension: DimensionAdapter[dimension],
      roleCode: DimensionCodeAdapter[dimension],
      tId: data.id,
      type,
    }
    NavToNative.openH5(NativeRoutes.OrderInsurancePool, pathParams)
  }

  return (
    <div className="card-list">
      <ListCondition conditions={conditions} selected={dimension} loading={loading || refreshing} onSelect={value => setDimension(String(value))} />
      <DataTable columns={columns} data={data || []} loading={loading || refreshing} errMsg={errMsg} />
      <ModalList visible={visible} selectDataName={selectDataName} params={listParams} onCancel={() => setVisible(false)} />
    </div>
  )
}
```

## 5. 实体定义规范

### 枚举定义

```typescript
import { IterationOB } from 'typing/global'

// 指标定义
export const normData = [{ value: '1', label: '保单维护率' }]
export const normNameEnum: IterationOB = {
  1: '保单维护率',
}
export const normUnitEnum: IterationOB = {
  1: '%',
}

// 日期类型
export const dateData = [
  { value: 10, label: '日趋势' },
  { value: 20, label: '月趋势' },
]
export const dateNameEnum: IterationOB = {
  10: '日趋势',
  20: '月趋势',
}

// 业务类型
export enum BizType {
  /** 应维护 */
  NEED_DO = 1,
  /** 已维护 */
  DONE = 2,
  /** 未维护 */
  UNDO = 3,
}
```

### 维度定义（统一在 `entity.ts` 中）

```typescript
export const Dimension: Record<string, string> = {
  D10: '10',  // 门店
  D20: '20',  // 人员
  D51: '51',  // 管理一级
  D52: '52',  // 管理二级
  D53: '53',  // 管理三级
}

export const DimensionName = {
  [Dimension.D10]: '门店',
  [Dimension.D20]: '人员',
  [Dimension.D51]: '售后一级管理',
  [Dimension.D52]: '售后二级管理',
  [Dimension.D53]: '售后三级管理',
}

export const DimensionColumnName = {
  [Dimension.D10]: '门店',
  [Dimension.D20]: '人员',
  [Dimension.D51]: '人员',
  [Dimension.D52]: '人员',
  [Dimension.D53]: '人员',
}

// 维度适配器（后端接口兼容）
export const DimensionAdapter: IterationOB = {
  [Dimension.D10]: '10',
  [Dimension.D20]: '20',
  [Dimension.D51]: '50',
  [Dimension.D52]: '50',
  [Dimension.D53]: '50',
}

// 角色编码适配器
export const DimensionCodeAdapter = {
  [Dimension.D10]: null,
  [Dimension.D20]: null,
  [Dimension.D51]: 'MANAGER-AFTER-SALES-1',
  [Dimension.D52]: 'MANAGER-AFTER-SALES-2',
  [Dimension.D53]: 'MANAGER-AFTER-SALES-3',
}
```

## 6. 页面入口规范

### index.tsx（实时报表）

```tsx
import React, { useEffect } from 'react'
import { history } from 'umi'
import moment from 'moment'
import { Container } from '@/components'
import { useReportCondition } from '@/hooks'
import { ReportModeEnum } from '@/pages/Common/entity'
import CasUtil from '@/pages/Cas/util'
import Summary from './components/Summary'
import Trend from './components/Trend'
import Lists from './components/Lists'

export default function Index() {
  const condition = CasUtil.uniformDate(useReportCondition())

  const [reportMode, setReportMode] = useLocalStorage<{ mode: ReportModeEnum }>('report_mode', { mode: ReportModeEnum.实时 })

  useEffect(() => {
    setReportMode({ mode: condition.realtime ? ReportModeEnum.实时 : ReportModeEnum.历史 })
  }, [condition.realtime])

  const { isProfitReport, month, shopIds } = history.location.query ?? {}
  if (isProfitReport === 'true' && month) {
    condition.beginDate = moment(month).startOf('month').valueOf()
    condition.endDate = moment(month)
      .endOf(moment(month).get('month') === moment().get('month') ? 'day' : 'month')
      .valueOf()
    if (moment().get('month') === moment(month).get('month')) {
      condition.endDate = moment().subtract(1).endOf('day').valueOf()
    }
    // @ts-ignore
    condition.realtime = false
    // @ts-ignore
    condition.shopIds = shopIds ?? ''
  }

  return (
    <Container>
      <Summary {...condition} />
      <Trend {...condition} />
      <Lists {...condition} />
    </Container>
  )
}
```

### history.tsx（历史报表）

```tsx
import React from 'react'
import { Container } from '@/components'
import { useReportCondition } from '@/hooks'
import CasUtil from '@/pages/Cas/util'
import Summary from './components/Summary'
import Trend from './components/Trend'
import Lists from './components/Lists'

export default function Index() {
  const condition = CasUtil.uniformDate(useReportCondition(11, false))

  return (
    <Container>
      <Summary {...condition} />
      <Trend {...condition} />
      <Lists {...condition} />
    </Container>
  )
}
```

## 7. 工具函数规范

### CasUtil 工具类

```typescript
import moment from 'moment'
import currency from 'currency.js'
import type { Condition } from '@/pages/Common/entity'

const CasUtil = {
  // 统一查询参数：实时报表不传 beginDate，历史报表使用传入的日期
  uniformDate(params: Partial<Condition & { shopIds: string }>) {
    return {
      ...params,
      endDate: params.realtime ? Date.now() : params.endDate,
    }
  },

  // 根据 dateType 获取时间范围
  getPeriodTimeByDateType(dateType: number | string): { beginDate: number; endDate: number } {
    if (dateType === 20) {
      // 本月
      return {
        beginDate: moment().startOf('month').valueOf(),
        endDate: moment().endOf('month').valueOf(),
      }
    } else {
      // 今日
      return {
        beginDate: moment().startOf('day').valueOf(),
        endDate: moment().endOf('day').valueOf(),
      }
    }
  },

  // 万转换为元
  toYuan(num: number = 0) {
    return currency(num * 10000).value
  },
}

export default CasUtil
```

## 8. 原生路由跳转规范

```typescript
import type { H5Params } from '@/utils/navigate'
import navigate, { Report2H5INAPPPath } from '@/utils/navigate'

export enum NativeRoutes {
  /** 商业险保单维护池 */
  OrderInsurancePool = '/cas/Pool/OrderInsurance',
  /** 权限优惠池 */
  PrivilegePool = '/cas/Pool/Privilege',
  /** 市场行动线索池 */
  MarketActionCluePool = '/cas/Pool/MarketActionClue',
}

export const NavToNative = {
  open(route: NativeRoutes, params: any) {
    if (window.ReactNativeWebView) {
      const nativeParams = {
        type: 'navigation',
        path: route,
        pathParams: params,
      }
      window.ReactNativeWebView.postMessage(JSON.stringify(nativeParams))
    }
  },

  openH5(h5Path: string, params: Record<string, any>, sysName: string = 'cas') {
    const h5Params: H5Params = {
      domain_type: sysName,
      path: h5Path,
      pathParams: params,
    }
    navigate({
      path: Report2H5INAPPPath,
      pathParams: h5Params,
      h5: h5Params,
    })
  },
}
```

## 9. 常用工具库

### 必须使用的库

```typescript
import React, { useEffect, useState, useMemo } from 'react'
import { history } from 'umi'
import moment from 'moment'
import { Flex, Picker } from 'antd-mobile-v2'
import type { EChartOption } from 'echarts'
import { cloneDeepWith } from 'lodash'

// 组件库
import {
  Container,
  CardView,
  DataTable,
  ListCondition,
  RatioTrend,
  type TrendData,
  ChartView,
  DropdownLabel,
  Exception,
  Loading,
  DeadLine,
  ReportText,
  SubHeader,
} from '@/components'
import type { TableColumns } from '@/components'

// Hooks
import { useInitial, useReportCondition, useLocalStorage } from '@/hooks'

// 工具
import { formatNumber } from '@/utils/number'
import currency from 'currency.js'
import clsx from 'clsx'

// 类型
import { ReportDateType, getBlueStyle, getOrangeStyle, ChartColors, RangeTab } from '@/entity'
import { IterationOB } from 'typing/global'
```

## 10. 样式规范

### 标准类名

```tsx
// 卡片容器
<div className="card-list">...</div>      // 列表卡片
<div className="card-trend" style={{ paddingTop: 0 }}>...</div>     // 趋势卡片（使用 RatioTrend 时）

// 样式类
className="bg-blue"      // 蓝色背景
className="bg-warn"      // 橙色背景
className="text-center"  // 居中对齐
className="bg-default"   // 默认背景
```

### 内联样式

```tsx
<Flex style={{ marginBottom: 19 }} />
<DropdownLabel style={{ marginLeft: 10 }} />
```

## 11. 注意事项

1. **三件套结构**：每个报表模块必须包含 `Summary`、`Trend`、`Lists` 三个标准组件
2. **实时/历史分离**：`index.tsx` 处理实时报表，`history.tsx` 处理历史报表
3. **统一使用 useInitial**：处理 API 请求状态（loading、refreshing、errMsg）
4. **维度切换**：使用 `Dimension` 枚举 + `DimensionAdapter` + `DimensionCodeAdapter` 三重适配
5. **原生跳转**：使用 `NavToNative.openH5()` 统一跳转
6. **条件查询**：使用 `ListCondition` 组件提供维度切换
7. **数据下钻**：支持从列表跳转到原生池子页面
8. **弹窗分析**：使用 `ModalList` 展示子维度数据
9. **人员变动**：管理层维度支持查看人员变动列表（`ModalChangeList`）
10. **类型安全**：所有接口和参数必须定义 TypeScript 类型
11. **趋势图组件**：使用 `RatioTrend` 组件展示趋势，自动处理数量/比率双轴显示
12. **简化趋势配置**：不再需要选择指标、切换日/月，趋势数据由后端接口统一返回
13. **多指标并列**：`RatioTrend` 支持多个指标并列展示，自动分配颜色（使用 `ChartColors`）

## 12. 快速创建新报表模块

```bash
# 1. 创建目录结构
mkdir -p src/pages/Cas/new-report/{components/{Summary,Trend,Lists/subpages}}

# 2. 创建基础文件
touch src/pages/Cas/new-report/{index.tsx,history.tsx,entity.ts,api.ts}
touch src/pages/Cas/new-report/components/{Summary,Trend,Lists}/index.tsx
touch src/pages/Cas/new-report/components/Lists/subpages/ModalList.tsx

# 3. 复制模板代码并修改
# - 修改 api.ts 中的接口路径
# - 修改 entity.ts 中的枚举和常量
# - 修改组件中的标题和字段映射
# - 在 index.tsx 的 tabs 中添加新模块配置
```

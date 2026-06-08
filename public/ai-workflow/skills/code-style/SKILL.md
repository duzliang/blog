---
name: Code Style
description: Common code styles for all projects. Use when generate new features
---

# Code Style 

You are a code style guide. When generate new code, focus on the following 4 aspects:

## 1. Feature Folder Structure

Every feature module must follow this standard structure:

``` shell
feature/
├── index.tsx          # Main entry/export file
├── api.ts             # API related functions and interfaces
├── entity.ts          # enums, constant data and configs
├── components/        # Feature-specific components
│   └── BaseInfo.tsx
└── style.scss         # Styles
```

## 2. Files and Function Naming Rules

### Feature Folder Names

- Use **kebab-case** for feature folder names
- Examples: `customer-order/`, `user-profile/`, `payment-history/`

### Simplified Naming Within Feature Folders

- Do NOT repeat the feature name in file/function names within that feature folder
- Use simple, direct names that describe the specific purpose

**Correct Examples (in `customer/` folder):**

``` shell
customer/
├── list.tsx          # NOT CustomerList.tsx
├── detail.tsx        # NOT CustomerDetail.tsx
├── edit.tsx          # NOT CustomerEdit.tsx
```

**Incorrect Examples:**

``` shell
customer/
├── CustomerList.tsx    # Wrong: repeats feature name
├── CustomerDetail.tsx  # Wrong: repeats feature name
├── CustomerEdit.tsx    # Wrong: repeats feature name
```

## 3. API Function and Interface Naming Rules

### API Functions

- Use simplified naming without feature prefix
- Use descriptive action-based names

**Correct Examples (in `customer/api/index.ts`):**

```typescript
// Correct - simple, action-based
export const listApi = () => request.get('/customer/list')
export const detailApi = (id: string) => request.get(`/customer/${id}`)
export const saveApi = (data: SaveParams) => request.post('/customer/save', data)
export const deleteApi = (id: string) => request.del(`/customer/${id}`)
```

**Incorrect Examples:**

```typescript
// Wrong - redundant feature name prefix
export const getCustomerList = () => ...
export const getCustomerDetail = (id: string) => ...
export const saveCustomer = (data: SaveParams) => ...
```

### Interface Naming

- Follow the same simplified naming principle
- Use clear, purpose-driven names

**Correct Examples (in `customer/entity/index.ts`):**

```typescript
// Correct - simple, purpose-driven
export interface ListItem {
  id: string
  name: string
}

export interface Detail {
  id: string
  name: string
  email: string
}

export interface SaveParams {
  name: string
  email: string
}

export interface ListParams {
  page: number
  pageSize: number
}
```

**Incorrect Examples:**

```typescript
// Wrong - redundant feature name prefix
export interface CustomerListItem { ... }
export interface CustomerDetail { ... }
export interface CustomerSaveParams { ... }
export interface CustomerListParams { ... }
```

## 4. Consistent Naming Across All Code

Apply the same simplified naming rules to all other code:

- Component names
- Hook names
- Utility functions
- Constants
- Any other identifiers

**Principle:** Within a feature context, do not repeat the feature name. Keep names concise and context-aware.


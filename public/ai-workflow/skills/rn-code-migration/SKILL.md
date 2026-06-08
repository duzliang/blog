---
name: rn-code-migration
description: Migration ReactNative based code to react based H5 code. Use when user metion migrate code from KeeperAI project
---

When migration code, always follow these rules

## Core Principles

1. **Business behavior > UI parity**
   - Maintain functional equivalence
   - Preserve all business rules
   - Ensure workflow consistency

2. **Component Library Preference**
   - @feewee/h5-common has priority over custom code
   - Antd has priority over custom components
   - Use web standards when possible
   - Use tailwind style first

3. **Clean Migration**
   - No React Native artifacts in output
   - No platform-specific code paths
   - No deprecated patterns

4. **Code Quality**
   - Prefer declarative, readable logic
   - Use modern React Hooks
   - Follow TypeScript best practices
   - Maintain consistent code style

5. **Page Requirements**
   Every migrated page must have:
   - clear business model
   - explicit validation logic
   - defined loading / error states
   - proper error handling
   - responsive design
   - accessibility considerations

## Directory Structure Rules

1. **Component Organization**
   - All current page or sub pages Components are in current feature root `components/` directory
   - Api define and related Types in `service.ts` file
   - Enum and constant data in `entity.ts` file
   - Pages in flat directory structure
      - index or list page are all in current root page.tsx
      - add,apply or new page are all in edit/page.tsx
      - detail page are all in detail/page.tsx
      - approve or approval page are all in approval/page.tsx and use CommonOATitle component for page title
      - extract detail and approval content into DetailContent.tsx component and use in these two page

2. **File Naming**
   - Use kebab-case for directories
   - Use kebab-case for files
   - Use PascalCase for components
   - Use Simplify naming for components, services, types, enums, and constants

## Allowed Replacements

- StyleSheet → Tailwind CSS or CSS modules
- Dimensions → CSS media queries or window.innerWidth/innerHeight
- Platform → do not need to detect platform-specific code
- PixelRatio → CSS units (rem, em, px)
- react-navigation → @modern-js/runtime/router
- NavigationEvents → useEffect with router hooks
- NavigationStackScreenProps → React Router useNavigate hook
- ListView → ListRefresh from @components/ListRefresh
- Provider → PageRefreshProvider from @feewee/h5app-common
- Button → Button from @feewee/h5app-common
- FWUploadAttachment,UploadAttachment, FileUploader → from @feewee/h5app-common/UploaderPro
- usePagination → usePagination from @feewee/h5app-common
- useInitial → useRequest from ahooks

## Implementation Rules

1. **API Integration**
   - Centralize API calls in service.ts
   - Use @feewee/h5app-common http client
   - Use @feewee/h5app-common host form api base url
   - Use *Api for api name pattern, e.g. listApi, detailApi, deleteApi, rollbackApi, saveApi etc.
   - Use inline comment for api description
   - Use multi-line comment for api params and return type

2. **State Management**
   - Use React useState/useReducer for local state
   - Use context API for global state when needed
   - Avoid Redux unless absolutely necessary

3. **UI Implementation**
   - Use Tailwind CSS for styling
   - Use project tailwind.config.js for custom styles
   - Implement responsive design
   - Add loading states and skeletons
   - Use appropriate web form controls
   - For inline text show, eg: `name: value` use RowText from @/components/RowText

4. **Navigation**
   - Use @modern-js/runtime/router

5. **Final Rules**
   - For not confirm UI components or simple UI, look through current Project and use existing components if available.
   - Scan current project @/components directory for existing components that match the required functionality.

## Testing Rules

1. **Quality Assurance**
   - Test all business rules
   - Validate form submissions
   - Test error handling
   - Verify responsive behavior

2. **Performance**
   - Optimize API calls
   - Implement proper caching
   - Minimize bundle size

## Review Checklist

1. Business logic preserved
2. All API endpoints migrated
3. All validation rules implemented
4. No RN artifacts present
5. UI responsive and accessible
6. Code follows best practices
7. Performance optimized

## Exception Handling

1. **Breaking Changes**
   - Document all breaking changes
   - Provide migration paths
   - Test thoroughly

2. **Platform Differences**
   - Handle browser compatibility
   - Implement feature detection
   - Provide fallbacks when needed

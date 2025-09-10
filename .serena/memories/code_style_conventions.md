# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode:** Enabled with advanced type safety
- **No `any` types:** Maximize type safety, avoid `any`
- **Strict null checks:** Enabled
- **No implicit returns:** Required
- **No fallthrough cases:** Required
- **No unchecked indexed access:** Enabled
- **Exact optional property types:** Enabled

## Code Style (Prettier Configuration)
- **Semi-colons:** Disabled (no semicolons)
- **Quotes:** Single quotes preferred
- **Tab Width:** 2 spaces
- **Trailing Commas:** ES5 style
- **Print Width:** 100 characters
- **End of Line:** LF
- **Tailwind Plugin:** Enabled for class sorting

## Design Principles
- **Component Reusability:** Paramount importance
- **Single Responsibility Principle (SRP):** Required
- **DRY Principle:** Don't Repeat Yourself
- **SOLID Principles:** Applied in architecture
- **Composition over Inheritance:** Preferred pattern

## File Naming Conventions
- **Components:** PascalCase (e.g., `BlogPost.tsx`)
- **Utilities:** kebab-case (e.g., `data-utils.ts`)
- **Types:** kebab-case (e.g., `wordpress.ts`)
- **Test Files:** `.test.tsx` or `.test.ts` extensions

## Import Organization
- Path aliasing with `@/*` for src directory
- Consistent import ordering and grouping

## Error Handling
- Comprehensive error handling for all WordPress API calls
- TypeScript-first error types and interfaces
# Task Completion Checklist

## CRITICAL: Test-Driven Development (TDD) is Mandatory
- **Always write tests FIRST before implementing any code**
- Follow the TDD cycle: Red → Green → Refactor
- Never implement functionality without corresponding tests
- Tests must be written and failing before any implementation begins

## Code Quality Checks (Run After Each Task)
1. **Type Check:** `npm run type-check`
2. **Linting:** `npm run lint` (auto-fixes issues)
3. **Testing:** `npm test` (all tests must pass)
4. **Build Verification:** `npm run build` (ensure production build works)

## Performance Benchmarks to Maintain
- **Lighthouse Scores:**
  - Performance: 90+ (required)
  - Accessibility: 95+ (required)
  - Best Practices: 95+ (required)
  - SEO: 100 (required)

- **Core Web Vitals:**
  - First Contentful Paint (FCP): ≤ 1.8 seconds
  - Largest Contentful Paint (LCP): ≤ 2.5 seconds
  - Time to Interactive (TTI): ≤ 3.8 seconds

## Git Workflow
- Commit messages should be descriptive
- Pre-commit hooks will automatically run ESLint and Prettier
- Ensure all staged files pass linting before commit

## Testing Requirements
- **Unit Tests:** Required for ALL public APIs and utilities
- **Integration Tests:** Required for all major user flows
- **E2E Tests:** Required for all critical user paths
- **Error Handling Tests:** Required for all error scenarios

## Code Review Checklist
- TypeScript strict mode compliance
- Component reusability principles followed
- SOLID principles applied
- No `any` types used
- Comprehensive error handling implemented
- Performance optimizations considered
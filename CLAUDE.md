# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is a comprehensive Next.js WordPress blog system designed as a commercial product. The project combines WordPress CMS functionality with Next.js performance, targeting Japanese market blogs and corporate sites. 

**Current Implementation Status:**
- ✅ Next.js 15 with TypeScript and App Router
- ✅ Vitest testing framework with comprehensive test coverage
- ✅ WordPress REST API client with full error handling
- ✅ Data utilities for content processing and formatting
- ✅ BlogPost React component with accessibility features
- ✅ TypeScript strict mode configuration
- ✅ Tailwind CSS integration
- ✅ Build process verified and working

## Development Methodology

**CRITICAL: Test-Driven Development (TDD) is mandatory for this project.**

- **Always write tests FIRST before implementing any code**
- Use Vitest as the testing framework
- Follow the TDD cycle: Red → Green → Refactor
- Never implement functionality without corresponding tests
- Tests must be written and failing before any implementation begins

## Code Quality Standards

**TypeScript Requirements:**
- Maximize TypeScript type safety - avoid `any` types
- Use strict mode configuration
- Implement proper interfaces for all data structures
- Leverage union types and generics appropriately

**Design Principles:**
- Component reusability is paramount
- Follow Single Responsibility Principle (SRP)
- Apply DRY (Don't Repeat Yourself) principle consistently
- Implement SOLID principles in architecture
- Prefer composition over inheritance

## Performance Benchmarks

**Lighthouse Score Targets:**
- Performance: 90+ (required)
- Accessibility: 95+ (required)
- Best Practices: 95+ (required)
- SEO: 100 (required)

**Core Web Vitals:**
- First Contentful Paint (FCP): ≤ 1.8 seconds
- Largest Contentful Paint (LCP): ≤ 2.5 seconds
- Time to Interactive (TTI): ≤ 3.8 seconds

**Technical KPIs:**
- Page load time: ≤ 2 seconds
- Error rate: ≤ 0.1%
- System uptime: ≥ 99.9%

## Testing Guidelines

**Test Strategy (Comprehensive):**
- **Unit Tests:** Required for ALL public APIs and utilities
- **Integration Tests:** Required for all major user flows
- **E2E Tests:** Required for all critical user paths
- **Error Handling Tests:** Required for all error scenarios

**Test Implementation:**
- Test files should use `.test.ts` or `.test.tsx` extensions
- Place tests in `__tests__` directories or alongside source files
- Write unit tests for all utilities and components
- Write integration tests for API routes and WordPress integration
- Use TDD methodology: write failing tests first, then implement to make them pass
- Test all WordPress API integrations thoroughly
- Include performance regression tests

## Getting Started

Since this is an empty repository, you'll likely need to:

1. Initialize a Next.js project
2. Set up Vitest testing framework
3. Set up WordPress integration
4. Configure the blog structure

When initializing the project, ensure Vitest is configured with proper test scripts.

## Current Configuration

- Claude Code permissions are configured in `.claude/settings.local.json`
- Currently allows `ls` and `find` bash commands

## Technical Risk Awareness

**WordPress API Risks:**
- API version changes breaking compatibility
- Mitigation: Pin API versions, implement change monitoring
- Use versioned endpoints and maintain backward compatibility

**Performance Risks:**
- Content growth causing performance degradation
- Large media files impacting load times
- Mitigation: Implement efficient caching, optimize images, use CDN

**Security Risks:**
- WordPress vulnerabilities affecting API access
- Third-party dependency vulnerabilities
- Mitigation: Regular security updates, dependency auditing

**Scalability Risks:**
- High concurrent access overwhelming system
- Database performance under load
- Mitigation: Implement proper caching strategies, optimize queries

## Extensibility Requirements

**Theme System:**
- Support for multiple color schemes and layouts
- Custom font integration capabilities
- Responsive design system with breakpoint management

**Component Architecture:**
- Reusable UI components with consistent APIs
- Plugin-like architecture for feature extensions
- Custom field support for WordPress integration

**API Design:**
- RESTful API structure for WordPress data
- Third-party service integration points
- Authentication and authorization hooks

**Customization Points:**
- Custom post types and taxonomies support
- Widget system for sidebar/footer content
- SEO metadata customization options

## Maintenance Guidelines

**Security Updates:**
- Monthly security dependency reviews
- Immediate updates for critical vulnerabilities
- Regular WordPress version compatibility checks

**Performance Monitoring:**
- Quarterly performance audits against benchmarks
- Core Web Vitals monitoring and optimization
- Database query performance analysis

**Code Maintenance:**
- Bi-annual major dependency updates
- Code quality reviews using TypeScript strict mode
- Documentation updates with feature changes

## Available Commands

**Development:**
- `npm run dev` - Start development server with Turbo mode
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

**Testing:**
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report

## Project Architecture

**Core Components:**
- `src/lib/wordpress-api.ts` - WordPress REST API client
- `src/lib/types.ts` - TypeScript interfaces for WordPress data
- `src/lib/data-utils.ts` - Utility functions for data processing
- `src/components/BlogPost.tsx` - Individual blog post component

**Testing:**
- All components have comprehensive test coverage
- Tests are located alongside source files or in `__tests__` directories
- Vitest configuration in `vitest.config.ts`

## WordPress Integration

The WordPress API client supports:
- Fetching posts with pagination
- Retrieving individual posts by ID or slug
- Full error handling and type safety
- Response header parsing for pagination metadata

## Next Steps for Development

- Implement blog listing page with pagination
- Add individual blog post pages with dynamic routing
- Create category and tag filtering
- Implement SEO metadata and structured data
- Add image optimization and lazy loading
- Set up caching strategies
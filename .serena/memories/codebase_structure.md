# Codebase Structure

## Root Level Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration with strict mode
- `vitest.config.ts` - Testing configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `wrangler.toml` - Cloudflare Workers deployment config
- `CLAUDE.md` - AI assistant instructions and project guidelines

## Source Structure (`src/`)

### Core Directories
- `app/` - Next.js App Router pages and layouts
  - `posts/[slug]/` - Individual blog post pages
  - `category/[slug]/` - Category pages
  - `api/` - API routes
- `components/` - React components with comprehensive test coverage
  - `ui/` - Reusable UI components (Card, Button, Avatar, etc.)
  - `__tests__/` - Component test files
- `lib/` - Core utilities and services
  - `wordpress-api.ts` - WordPress REST API client
  - `data-utils.ts` - Data processing utilities
  - `utils.ts` - General utility functions
- `types/` - TypeScript type definitions
  - `wordpress.ts` - WordPress-specific types
  - `app.ts` - Application types
- `data/` - Mock/dummy data for development and testing
- `test/` - Test setup and configuration

### Key Components
- `BlogPost.tsx` - Individual blog post component
- `BlogPostList.tsx` - Blog post listing component
- `BlogListContainer.tsx` - Container for blog listings
- `BlogSidebar.tsx` - Sidebar component
- `Pagination.tsx` - Pagination component
- `TagCloud.tsx` - Tag cloud component
- `CategoryFilter.tsx` - Category filtering component
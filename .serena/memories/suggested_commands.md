# Essential Development Commands

## Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm start` - Start production server

## Code Quality Commands
- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Run ESLint without fixing
- `npm run type-check` - Run TypeScript type checking

## Testing Commands
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report

## Cloudflare Deployment Commands
- `npm run cf:build` - Build for Cloudflare Workers
- `npm run cf:preview` - Preview Cloudflare deployment
- `npm run cf:deploy` - Deploy to Cloudflare Workers

## Utility Commands
- `npm run clean` - Remove build artifacts (.next, out, dist)
- `npm run prepare` - Install husky hooks

## Git Workflow
- Husky pre-commit hooks enabled
- Lint-staged configuration for automatic code formatting
- ESLint and Prettier run on staged files

## System Commands (macOS/Darwin)
- `ls` - List directory contents
- `find` - Find files and directories
- `grep` - Search text patterns
- `git` - Version control operations
- `cd` - Change directory
- `pwd` - Print working directory
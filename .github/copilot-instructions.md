# Copilot Instructions - Macauley Tech Admin Dashboard

## Project Overview
This is a React + TypeScript admin dashboard using **Facebook Relay** for GraphQL data fetching. The project uses Vite for build tooling and targets a GraphQL backend at `http://localhost:5000/graphql`.

## Core Architecture

### Relay Integration
- **Environment**: Configured in `src/environment.ts` with Network layer for GraphQL endpoint
- **Babel Plugin**: Vite configured with `babel-plugin-relay` for compile-time query optimization
- **Suspense**: App wrapped in `<Suspense>` and `<RelayEnvironmentProvider>` in `src/main.tsx`
- **Schema**: Project expects `schema.graphql` at root (currently missing - needs to be introspected/downloaded)

### Key Dependencies
- **React 19**: Latest with concurrent features
- **Relay 20.x**: Modern version with hooks and concurrent mode support
- **Vite 7**: Build tool with React plugin configured for Relay babel transforms

## Critical Workflows

### GraphQL Schema Management
```bash
# Schema must be present for Relay compiler
# Download from backend (adjust URL as needed):
curl -X POST -H "Content-Type: application/json" \
  -d '{"query": "query IntrospectionQuery { __schema { ... } }"}' \
  http://localhost:5000/graphql > schema.json
# Convert to SDL format for relay.config.json
```

### Relay Compiler
```bash
npm run relay  # Generates __generated__ files from GraphQL queries
```

### Development
```bash
npm run dev    # Starts Vite dev server
npm run build  # TypeScript compilation + Vite build
npm run lint   # ESLint with TypeScript and React rules
```

## Code Patterns

### Relay Query Components
When creating components with GraphQL queries, follow this pattern:
- Use `graphql` tagged template for queries/fragments
- Import generated types from `__generated__` directory
- Wrap data-fetching components in `useLazyLoadQuery` or `useFragment`

### Environment Configuration
- GraphQL endpoint defined in `src/environment.ts` as `HTTP_ENDPOINT`
- Network layer handles request/response transformation
- Error handling currently basic - enhance for production

### Component Structure
- App entry point: `src/main.tsx` (Relay setup)
- Main component: `src/App.tsx` (currently placeholder)
- Styling: `src/index.css` (global styles)

## Project-Specific Conventions

### TypeScript Configuration
- Strict mode enabled with comprehensive linting rules
- Project references pattern: separate configs for app (`tsconfig.app.json`) and build tools
- ES2022 target with modern bundler resolution

### ESLint Setup
- Modern flat config in `eslint.config.js`
- React Hooks rules enforced
- React Refresh plugin for HMR compatibility
- TypeScript-aware linting enabled

## Common Development Tasks

1. **Adding GraphQL Operations**: Create `.tsx` files with `graphql` queries, run `npm run relay`
2. **Backend Integration**: Ensure GraphQL server running on port 5000, update `HTTP_ENDPOINT` if needed
3. **Schema Updates**: Re-download schema and run `npm run relay` to regenerate types
4. **Component Creation**: Use Relay hooks pattern with proper fragment composition

## Missing Setup
- GraphQL schema file needed at project root
- Generated Relay artifacts directory (`src/__generated__`) will be created after first query compilation
- Consider adding environment variable configuration for different deployment targets
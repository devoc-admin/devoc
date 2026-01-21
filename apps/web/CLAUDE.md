# Web App Instructions

## Linting

This project uses **Biome** for linting and formatting, not ESLint. Never add eslint-disable comments - use biome-ignore instead when necessary.

Example:
```typescript
// biome-ignore lint/suspicious/noEmptyBlockStatements: exception
```

## Post-Implementation Linting

After implementing a feature or refactoring code, **always run `bun x ultracite fix`** and fix any errors it returns before finishing. A Stop hook is configured to run this automatically, but you must address any errors in the output.

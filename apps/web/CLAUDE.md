# Web App Instructions

## Linting

This project uses **Biome** for linting and formatting, not ESLint. Never add eslint-disable comments - use biome-ignore instead when necessary.

Example:
```typescript
// biome-ignore lint/suspicious/noEmptyBlockStatements: exception
```

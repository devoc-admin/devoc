# Fix Errors

Iteratively fix all lint and build errors across the monorepo until both `turbo lint` and `turbo build` pass cleanly.

## Commands Reference

| Command | Purpose |
|---------|---------|
| `turbo lint` | Runs `bun x ultracite fix` across all apps (auto-fixes formatting, imports, sorting) |
| `turbo build` | Runs TypeScript compilation + Next.js builds for all apps |
| `turbo lint --filter=apps/web` | Target a specific app |
| `turbo build --filter=apps/web` | Target a specific app |

## Error Priority

Fix errors in this order:

1. **TypeScript compilation errors** — broken imports, missing types, type mismatches
2. **Import/export errors** — missing modules, circular dependencies, incorrect paths
3. **Lint errors** — Biome rule violations not auto-fixed by `ultracite fix`
4. **Warnings** — non-blocking but should be resolved

## Common Error Patterns

| Error | Cause | Fix |
|-------|-------|-----|
| `TS2307: Cannot find module` | Missing or wrong import path | Fix the import path or install the package with `bun add` |
| `TS2345: Argument not assignable` | Type mismatch | Correct the type, use `satisfies`, or add a type guard |
| `TS2322: Type not assignable` | Wrong type for prop/variable | Fix the type annotation or the value |
| `TS18046: is of type unknown` | Untyped catch or unknown value | Add a type guard or type narrowing |
| `TS7006: Parameter implicitly has any` | Missing parameter type | Add explicit type annotation |
| `lint/suspicious/noExplicitAny` | Using `any` type | Replace with `unknown` + type guard |
| `lint/correctness/useExhaustiveDependencies` | Missing hook dependencies | Add missing deps or restructure |
| `lint/style/useImportType` | Non-type import used as type only | Change to `import type` |
| `next/no-html-link-for-pages` | Using `<a>` instead of `<Link>` | Replace with `next/link` |
| `"use client"` boundary issues | Server/client component mismatch | Add `"use client"` directive or move logic to server component |

## Project Conventions

- Use `biome-ignore` for suppressions — **never** `eslint-disable`
- Use `types` not `interfaces` (per CLAUDE.md)
- Use `bun` as the package manager — **never** `npm` or `yarn`
- Biome config extends `ultracite/core` and `ultracite/next`

## Procedure

### Phase 1 — Lint

1. Run `turbo lint` to auto-fix what it can and surface remaining issues
2. Read the output and identify all remaining lint errors
3. Fix each error file-by-file, starting with the highest priority
4. If a fix requires suppression, use `biome-ignore lint/rule/name: reason` with a clear reason

### Phase 2 — Build

1. Run `turbo build` to catch TypeScript and build errors
2. Read the output and identify all failing apps
3. Fix errors file-by-file in priority order
4. For type errors, read the relevant file before making changes

### Phase 3 — Iterate

Repeat Phase 1 and Phase 2 until both pass. Constraints:

- **Max 4 full cycles** (lint + build = 1 cycle). If still failing after 4, stop and report.
- **2-attempt limit per error** — if the same error persists after 2 fix attempts, flag it and move on.

### Phase 4 — Summary

When done (or after hitting limits), output a structured summary:

```
## Fix Summary

**Cycles:** X/4
**Result:** All clean ✓ | Remaining issues ✗

### Fixed
- [file:line] Description of what was fixed

### Remaining (if any)
- [file:line] Error description — reason it wasn't fixed

### Notes
- Any relevant observations (e.g., upstream issues, package bugs)
```

## Usage

```
/fix-errors
```

Runs across the entire monorepo. To target a specific app, mention it after invoking:

```
/fix-errors only apps/web
```

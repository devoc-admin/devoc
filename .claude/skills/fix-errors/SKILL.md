---
name: fix-errors
description: Fix all lint and build errors across the monorepo by running Biome and iteratively resolving TypeScript errors.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
  - Glob
---

# Fix Lint & Build Errors

Automatically fix all lint and build errors in the monorepo through an iterative loop.

## Arguments

- `$ARGUMENTS` (optional): a `--filter` target to scope to a specific app/package (e.g. `--filter web`)

## Process

Run up to **5 iterations** of the fix loop below. Stop early if both lint and build pass cleanly.

### Step 1 — Auto-fix lint (Biome)

```bash
bun x ultracite fix
```

This resolves most formatting and lint issues automatically.

### Step 2 — Run the build

Run each app's build to get TypeScript errors. If `$ARGUMENTS` contains `--filter`, scope to that target only:

```bash
# Full build (default) — uses turbo to build all apps in dependency order
bunx turbo build

# Scoped build — build a single app
bun --filter <app> run build

# Type-check only (faster, no full build)
bun --filter <app> run check-types
```

#### Apps in this monorepo

| App | Path | Framework |
|-----|------|-----------|
| `web` | `apps/web` | Next.js 16 |
| `chrome-extension` | `apps/chrome-extension` | Vite + React |
| `email` | `apps/email` | React Email |
| `opencarca` | `apps/customers/opencarca` | Next.js 16 |
| `saveurs-aude` | `apps/saveurs-aude` | Next.js 15 + Payload CMS |

Apps with `check-types` script: `web`, `chrome-extension`, `opencarca`, `saveurs-aude`.

If `$ARGUMENTS` is `--filter web`, only run `bun --filter web run build`.

### Step 3 — Parse and fix errors

If the build fails, parse the error output and fix each error:

1. **Collect all errors** from the build output — file paths, line numbers, error codes, and messages.
2. **Skip generated files** — never edit auto-generated files such as `payload-types.ts` (Payload CMS) or any other generated type files.
3. **Fix errors file by file** — read each file, understand the context, and apply the correct fix.

#### Common TypeScript error strategies

| Error Code | Description | Fix Strategy |
|------------|-------------|--------------|
| `TS2307` | Cannot find module | Add missing import or install package |
| `TS2322` | Type not assignable | Fix type mismatch, check expected vs actual types |
| `TS2339` | Property does not exist | Check if property was renamed, update accessor |
| `TS2345` | Argument type mismatch | Cast or adjust argument to match expected type |
| `TS2532` | Object possibly undefined | Add null check or optional chaining |
| `TS2554` | Wrong number of arguments | Add/remove arguments to match signature |
| `TS2769` | No overload matches | Check overloaded function signature, adjust args |
| `TS7006` | Implicit any | Add explicit type annotation |
| `TS18046` | Unknown type | Add type assertion or narrow the type |

#### Fix rules

- **Imports**: use existing patterns from neighboring files for import paths
- **Generated files**: if the error is in a generated file (e.g. `payload-types.ts`), the fix is upstream (schema or codegen config) — skip it and report
- **Payload CMS types**: `saveurs-aude` uses Payload CMS which auto-generates `payload-types.ts` — never edit this file directly

### Step 4 — Re-run lint after fixes

```bash
bun x ultracite fix
```

Auto-fix any formatting issues introduced by manual edits.

### Step 5 — Loop or finish

- If errors remain, go back to **Step 2** (up to 5 total iterations).
- If both lint and build pass, report success.
- If errors persist after 5 iterations, report the remaining errors to the user.

## Output

After completion, summarize:
- Total iterations run
- Number of files fixed
- Any remaining errors that could not be auto-fixed (with file paths and error messages)

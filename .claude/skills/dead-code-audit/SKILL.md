---
name: dead-code-audit
description: Find and safely remove dead code, orphaned files, unused dependencies and stale config in this monorepo. Use when asked to clean up, find obsolete/unused code, remove dead files, prune dependencies, or audit configuration.
---

# Dead-code audit

Repo shape: bun workspaces (`apps/*`, `packages/**`) + turbo + Biome (via `ultracite`) + Doppler.
Dependency versions are centralised in root `package.json` `workspaces.catalogs` — a package
declaring `"catalog:ui"` resolves from there.

## Order of work

Run the cheap mechanical passes first, then the judgment calls.

```bash
# 0. Preconditions — see "Check node_modules first" below
ls node_modules | wc -l          # a healthy install is >100 top-level entries

# 1. Files nothing imports
python3 .claude/skills/dead-code-audit/scripts/find-orphan-files.py

# 2. Declared-but-unimported dependencies (per workspace)
python3 .claude/skills/dead-code-audit/scripts/find-unused-deps.py

# 3. Stale config: globs pointing at paths that no longer exist
#    (check every "!**/..." in biome.jsonc, every entry in turbo.json / lefthook.yml)

# 4. Verify after every removal
bun install && npx turbo lint typecheck --force

# 5. Re-run 1 and 2 until they stop changing — see "Deletions cascade"
```

### Deletions cascade — iterate to a fixpoint

Deleting a file orphans everything only it imported. One pass is never enough: removing 27
files here exposed a second wave (`react-bits/{laser-flow,threads}.tsx`, `ui/textarea.tsx`)
plus three newly-unused deps (`zod`, `resend`, and a dev-only profiler), and dropping that
profiler in turn made the `react-grab` and `commander` root `overrides` dead. Re-run both
scripts after every deletion round until the output is stable.

### Build verification

A build is the only check that catches a dependency needed at bundle time but never imported
by name. `apps/web` needs no secrets; `apps/admin` runs locally with dummy env:

```bash
cd apps/web && npx next build --turbopack

cd apps/admin && DATABASE_URL="postgresql://u:p@localhost:5432/x" \
  NEXT_PUBLIC_APP_URL="http://localhost:3001" npx next build --turbopack
```

Use `npx next`, **not** `bun --bun next build` — Bun's runtime fails to load Next's compiled
server internals (`Expected CommonJS module to have a function wrapper`), which looks like a
broken build but is unrelated to your change.

## Check node_modules first

Biome's type-aware rules and every import-resolution heuristic silently degrade when the
install is incomplete. This repo's `node_modules` has been found gutted (top-level count in
the single digits, a leftover `node_modules/.old_modules-<hash>` from an interrupted install)
with `bun.lock` deleted. Restore with `git checkout -- bun.lock && bun install` before
trusting any result. Symptom of a broken install: correctly-typed code reported as type errors.

## Trap: `noUnnecessaryConditions` is off, and must stay off

`biome.jsonc` disables `lint/suspicious/noUnnecessaryConditions`. Biome 2.5.7's inference
**ignores explicit generic type arguments**, so `useRef<HTMLDivElement>(null)` is read as
`RefObject<null>` and every `if (!ref.current) return;` guard is reported as redundant.
`useRef<T | null>(null)` is flagged too — there is no code-level workaround.

This matters beyond the noise: **`ultracite fix` autofixes it by deleting the guard.** A Stop
hook and the lefthook pre-commit job both run `ultracite fix`, and it has already silently
removed a real null check from `apps/admin/app/login/_components/balatro.tsx`, turning
clean code into four `TS18047: possibly 'null'` errors.

> Always run `npx turbo typecheck` after any `ultracite fix`, and read `git diff` for guards
> that vanished. Re-check whether the upstream bug is fixed before re-enabling the rule.

## Known non-orphans — do not delete

The orphan script reports these, but they are reachable by mechanisms it cannot see:

| Path | Reached by |
|---|---|
| `apps/email/emails/*.tsx` | react-email entry points (excluded by the script) |
| `apps/*/proxy.ts`, `i18n/request.ts`, `*.config.ts` | framework convention (excluded) |
| `packages/*/src/index.ts`, `src/*/index.ts` | workspace `exports` map (excluded) |

Deps the scripts can't see as used:

- `react-email` — provides the `email` binary used by the `dev`/`export` scripts, not imported.
- `@react-email/preview-server`, `@react-email/ui` — version pins for the generated
  `.react-email` preview app. Verify `bun run dev` in `apps/email` before touching them.
- `sharp` in `apps/admin` `serverExternalPackages` — used by `@dev-oc/crawler`, not by admin source.
- Root `overrides` pin *transitive* deps, so they outlive the package that needed them. Check
  what still pulls each one in before deciding: `grep -c "<name>" bun.lock` after a removal +
  `bun install` tells you whether the pin still has a subject. `entities` (pinned for
  `@react-email/render`) is the only one left; `commander`/`react-grab` were dropped with the
  dev-only profiler that pulled them in.

## Gotchas that produce wrong answers

- **Imports carry explicit extensions here** (`from "./main.tsx"`). A matcher keyed on
  `/name"` finds nothing. Strip `\.(tsx?|jsx?|mjs)$` from specifiers before comparing.
- **A file importing an npm package of its own name** (`foo.tsx` → `import "foo"`) looks
  self-referencing. Exclude the file's own text when deciding if it is referenced.
- **`grep -c <dep>` over the tree matches `package.json` and `bun.lock`.** Exclude both, or
  every dependency looks used.
- **Substring collisions**: `main` matches `domain`, `old` matches `bold`. Match on resolved
  import paths, not bare names.
- `turbo` happily runs a task that only exists as a package.json script and is absent from
  `turbo.json` — an undeclared task is not evidence of dead config (it only loses caching).

## Judgment calls — never delete without asking

A whole feature can be unreferenced because it was temporarily unlinked, not abandoned.
Report these; let the user decide:

- A closed island of files (a section + its form + its hook + its server action) reachable
  from nothing. Deleting it removes a working feature.
- Vendored registry components (`components/{ui,magicui,aceternity,react-bits,motion-core,
  kibo-ui,sera-ui,fancy}`) — pasted in from shadcn-style registries and deliberately excluded
  from linting in `biome.jsonc`. Unused ones are removable, but they are cheap to keep and
  annoying to re-fetch.
- Dev-only tooling wired up in one place (a profiler or debug overlay mounted only in the
  root layout).

## Safe to remove without asking

Config that refers to something that does not exist, and dependencies with zero import sites
confirmed by both scripts and a passing `lint` + `typecheck`.

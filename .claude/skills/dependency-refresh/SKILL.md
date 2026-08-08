---
name: dependency-refresh
description: Check and update every dependency surface of this monorepo — npm packages, bun catalogs, packageManager, GitHub Actions, CLIs pinned in workflows. Use when asked to update dependencies, bump versions, check what is outdated, or to finish what `bun run update` leaves behind.
---

# Dependency refresh

Repo shape: bun workspaces (`apps/*`, `packages/**`) + turbo + Doppler. Versions of shared
dependencies are centralised in root `package.json` `workspaces.catalogs` — a package
declaring `"catalog:ui"` resolves from there.

## What `bun run update` actually covers

`bun run update` is `bun update --recursive --latest --interactive`. Measured on bun 1.3.x by
downgrading entries out of range and re-running: **it rewrites the root `package.json` only.**
It leaves untouched:

- workspace manifests (`apps/*`, `packages/*`)
- `workspaces.catalogs` — the 27 versions that most of the code actually resolves through
- `packageManager`
- GitHub Actions, and CLIs pinned inside workflow `run:` steps

Neither `--recursive` nor `--filter='*'` changes this — both were tried, both no-ops for those
surfaces. So `bun run update` handles the 9 root devDependencies out of the ~80 version
declarations in this repo. The other ~70 are what this skill is for.

## Never run `bun update` from inside a workspace

`cd apps/web && bun update --latest` does bump that workspace's own deps — and **flattens every
`catalog:` reference into a literal range** on the way (22 of them in `apps/web`), silently
dismantling the catalog architecture. The install still works, so nothing warns you; only the
diff shows it.

Recovery: `git checkout apps/web/package.json`. Always run `bun update` from the repo root.

## Order of work

```bash
# 1. Inventory across every surface (npm + Actions + packageManager + pinned CLIs)
python3 .claude/skills/dependency-refresh/scripts/check-versions.py

# 2. npm-only cross-check. Use --filter: bare `bun outdated` hides workspaces AND catalogs
bun outdated --filter='*'

# 3. Root package.json — the only thing bun automates
bun run update

# 4. Everything else: edit by hand per the rules below, then
bun install

# 5. Verify
bun install --frozen-lockfile && bun x turbo typecheck build
```

### Per-surface rules

- **Catalogs** — edit `workspaces.catalogs` in root `package.json`. One edit moves every
  consumer at once; that is the point of the catalog, so do not "fix" a consumer by inlining a
  version. `bun outdated --filter='*'` labels these rows `catalog:ui (web)`.
- **Workspace deps** — edit `apps/*/package.json` and `packages/*/package.json` directly.
  If a dep is already in a catalog, move the workspace to `catalog:<name>` instead of pinning.
- **`packageManager`** — CI resolves its bun from this field (`.github/actions/setup/action.yml`
  uses `bun-version-file: package.json`), so it is the single source for local *and* CI. Run
  `bun upgrade` locally first, then set the field to the version you just verified.
- **GitHub Actions** — `.github/actions/setup/action.yml` holds `actions/cache`,
  `oven-sh/setup-bun` and `dopplerhq/cli-action`; it is easy to miss because it is not under
  `.github/workflows`. The same action is usually pinned in several jobs — the script prints
  `(xN)` so you know how many occurrences to edit.
- **Pinned CLIs** — `bun add -g vercel@X.Y.Z` in `deploy.yml`.
- **`overrides`** — root `overrides` force a transitive version deliberately. Check
  `git log -S '"entities"' -- package.json` before touching one; a bump can re-open whatever
  bug the pin was closing.

### A catalog change invalidates the lockfile

`bun.lock` stores catalog ranges verbatim, so editing one makes `bun install --frozen-lockfile`
fail — that is both the CI setup step and the `pre-push` lefthook job, so it fails late and
looks unrelated. `bun install --lockfile-only` regenerates `bun.lock` without touching
`node_modules`. Always commit the lockfile in the same change as the version edit.

### Majors are a judgment call, not a step

The script flags `<-- MAJOR`. Do not apply those in the same pass as the minors: land minors
and patches first, verify, then take majors one at a time with their changelog open. React,
Next and Tailwind live in catalogs whose entries must move together — bumping `react` without
`react-dom` and `@types/react` in the same edit produces a broken install.

### Verification

`bun x turbo typecheck build` covers most of it. For a real build of `apps/web`, use
`npx next build` rather than `bun --bun next build` — Bun's runtime fails to load Next's
compiled server internals, which looks like a broken upgrade but is not. See the
`dead-code-audit` skill for the full note.

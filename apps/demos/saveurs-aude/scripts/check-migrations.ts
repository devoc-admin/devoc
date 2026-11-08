#!/usr/bin/env bun
import { execSync } from "node:child_process";

// Run Payload's bin under Bun (`bun --bun`) with `--disable-transpile` so it
// loads the prebuilt JS bin directly instead of spawning tsx. tsx rewrites
// `node:crypto` to `node:crypto?tsx-namespace=…`, which Node 24+ fails to
// resolve (ENOENT); Bun then transpiles the TS config and resolves its
// extensionless imports. The bin is invoked by path (not the name `payload`)
// to avoid colliding with the `payload` package.json script.
execSync(
  "bun --bun node_modules/.bin/payload migrate:create --skip-empty --disable-transpile",
  { stdio: "inherit" }
);

const status = execSync("git status --porcelain -- migrations/")
  .toString()
  .trim();

if (status) {
  console.error("✖ A new Payload migration is required for this branch.");
  console.error(
    "  Detected uncommitted changes under apps/saveurs-aude/migrations/:"
  );
  console.error(status);
  console.error("");
  console.error("  Run the following, name the migration, and commit it:");
  console.error("    bun run --cwd apps/saveurs-aude payload migrate:create");
  process.exit(1);
}

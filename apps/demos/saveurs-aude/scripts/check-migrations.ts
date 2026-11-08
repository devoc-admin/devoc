#!/usr/bin/env bun
import { execSync } from "node:child_process";

// Run Payload's bin on Node, not under the Bun runtime (`bun --bun`): Bun
// fails to load Lexical ("Cannot access 'DecoratorNode' before
// initialization"). The bin is invoked by path (not the name `payload`) to
// avoid colliding with the `payload` package.json script.
execSync("node node_modules/.bin/payload migrate:create --skip-empty", {
  stdio: "inherit",
});

const status = execSync("git status --porcelain -- migrations/")
  .toString()
  .trim();

if (status) {
  console.error("✖ A new Payload migration is required for this branch.");
  console.error(
    "  Detected uncommitted changes under apps/demos/saveurs-aude/migrations/:"
  );
  console.error(status);
  console.error("");
  console.error("  Run the following, name the migration, and commit it:");
  console.error(
    "    bun run --cwd apps/demos/saveurs-aude payload migrate:create"
  );
  process.exit(1);
}

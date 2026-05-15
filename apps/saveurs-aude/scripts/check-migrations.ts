#!/usr/bin/env bun
import { execSync } from "node:child_process";

execSync("payload migrate:create --skip-empty", { stdio: "inherit" });

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

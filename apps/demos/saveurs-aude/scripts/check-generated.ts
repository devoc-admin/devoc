#!/usr/bin/env bun
import { execSync } from "node:child_process";

execSync("payload generate:types", { stdio: "inherit" });
execSync("payload generate:importmap", { stdio: "inherit" });

const targets = ["payload-types.ts", "app/(payload)/admin/importMap.js"];
const status = execSync(
  `git status --porcelain -- ${targets.map((t) => `"${t}"`).join(" ")}`
)
  .toString()
  .trim();

if (status) {
  console.error("✖ Generated Payload artifacts are out of date.");
  console.error("  Uncommitted changes detected:");
  console.error(status);
  console.error("");
  console.error("  Run the following inside apps/saveurs-aude/ and commit:");
  console.error("    bun run gen:types && bun run gen:map");
  process.exit(1);
}

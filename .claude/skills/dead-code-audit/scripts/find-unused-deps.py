#!/usr/bin/env python3
"""Report dependencies declared in a workspace package.json that no source file imports.

Matches real module specifiers (`from "pkg"`, `require("pkg")`, `import("pkg")`,
`@import "pkg"` in CSS) plus bare mentions in config files, so plugins referenced
by name (postcss, tailwind) are not reported.

Usage (from repo root):  python3 .claude/skills/dead-code-audit/scripts/find-unused-deps.py
"""

import json
import os
import re
import sys

PKGS = ["apps/web", "apps/email", "packages/crawler", "packages/utils"]
SKIP_DIRS = {"node_modules", ".next", ".turbo", ".react-email", ".vercel", ".git"}
SRC_EXT = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".sh", ".json")

# Never reported: consumed by the toolchain, not by an import statement.
IMPLICIT = {
    "react-dom",          # required by next/react-email at runtime
    "typescript",         # tsc
    "next",               # framework binary
    "tailwindcss",        # postcss pipeline
    "@types/node", "@types/react", "@types/react-dom", "@types/bun",
}
# @types/<x> is implicitly needed whenever <x> is used — handled below.


def read_sources(pkg):
    chunks = []
    for dp, dns, fns in os.walk(pkg):
        dns[:] = [d for d in dns if d not in SKIP_DIRS]
        for fn in fns:
            if fn == "package.json" or not fn.endswith(SRC_EXT):
                continue
            try:
                chunks.append(open(os.path.join(dp, fn), encoding="utf-8", errors="ignore").read())
            except OSError:
                pass
    return "\n".join(chunks)


def main():
    any_found = False
    for pkg in PKGS:
        pj_path = os.path.join(pkg, "package.json")
        if not os.path.isfile(pj_path):
            continue
        pj = json.load(open(pj_path, encoding="utf-8"))
        deps = list(pj.get("dependencies", {})) + list(pj.get("devDependencies", {}))
        text = read_sources(pkg)

        specs = set(re.findall(r"""(?:from|import|require)\s*\(?\s*["']([^"']+)["']""", text))
        specs |= set(re.findall(r"""@import\s+["']([^"']+)["']""", text))
        # package roots: "@scope/name/sub" -> "@scope/name"
        roots = set()
        for s in specs:
            parts = s.split("/")
            roots.add("/".join(parts[:2]) if s.startswith("@") else parts[0])

        unused = []
        for d in deps:
            if d in IMPLICIT or d in roots:
                continue
            if d.startswith("@types/"):
                base = d[len("@types/"):].replace("__", "/")
                if base in roots:          # types for a package actually used
                    continue
            if re.search(r'["\']' + re.escape(d) + r'["\']', text):
                continue                   # named in a config file (plugin string)
            unused.append(d)

        print(f"--- {pkg}: {len(deps)} declared, {len(unused)} unreferenced")
        for u in unused:
            print("     ", u)
        any_found |= bool(unused)

    if any_found:
        print(
            "\nA dep may still be needed transitively (a workspace package that declares it,\n"
            "or a bundler/runtime hook). After removing: bun install && npx turbo lint typecheck build."
        )


if __name__ == "__main__":
    sys.exit(main())

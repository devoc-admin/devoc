#!/usr/bin/env python3
"""Find .ts/.tsx files in the monorepo that no other file imports.

Resolves relative imports (./ ../), the "@/*" tsconfig alias (-> app root) and
workspace imports, so results are precise rather than basename-matched.

Usage (from repo root):  python3 .claude/skills/dead-code-audit/scripts/find-orphan-files.py
"""

import os
import re
import sys

ROOTS = ["apps/web", "apps/email", "packages/crawler", "packages/utils"]
SKIP_DIRS = {"node_modules", ".next", ".turbo", ".react-email", ".vercel", "migrations", ".git"}

# Framework/tooling entry points — loaded by convention, never imported.
ENTRY = re.compile(
    r"(^|/)("
    r"page|layout|template|loading|error|not-found|global-error|route|default"
    r"|middleware|proxy|instrumentation|sitemap|robots|manifest"
    r"|opengraph-image|twitter-image|icon|apple-icon"
    r")\.(ts|tsx)$"
)
CONFIGISH = re.compile(
    r"(next\.config|drizzle\.config|postcss\.config"
    r"|/i18n/request\.|/scripts/|/emails/)"   # emails/* are react-email entry points
)

SPEC_RE = re.compile(r"""(?:from|import|require)\s*\(?\s*["']([^"']+)["']""")
EXT_RE = re.compile(r"\.(tsx?|jsx?|mjs)$")


def source_files():
    out = []
    for root in ROOTS:
        for dp, dns, fns in os.walk(root):
            dns[:] = [d for d in dns if d not in SKIP_DIRS]
            for fn in fns:
                if fn.endswith((".ts", ".tsx")) and not fn.endswith(".d.ts"):
                    out.append(os.path.join(dp, fn).replace(os.sep, "/"))
    return out


def package_entry_points():
    """Files a workspace package.json exposes (main/module/types/exports)."""
    import json

    entries = set()
    for root in ROOTS:
        pj = os.path.join(root, "package.json")
        if not os.path.isfile(pj):
            continue
        data = json.load(open(pj, encoding="utf-8"))
        raw = [data.get("main"), data.get("module"), data.get("types")]

        def walk(node):
            if isinstance(node, str):
                raw.append(node)
            elif isinstance(node, dict):
                for v in node.values():
                    walk(v)

        walk(data.get("exports"))
        for r in raw:
            if isinstance(r, str) and r.endswith((".ts", ".tsx")):
                entries.add(os.path.normpath(os.path.join(root, r)).replace(os.sep, "/"))
    return entries


def app_root_of(path):
    """apps/web/app/foo/bar.tsx -> apps/web  (the dir holding tsconfig.json)."""
    parts = path.split("/")
    for i in range(len(parts), 1, -1):
        cand = "/".join(parts[:i])
        if os.path.isfile(os.path.join(cand, "tsconfig.json")):
            return cand
    return parts[0]


def candidates(resolved):
    """A specifier may point at a file or a directory index."""
    base = EXT_RE.sub("", resolved)
    return {
        base + ".ts", base + ".tsx",
        base + "/index.ts", base + "/index.tsx",
    }


def main():
    files = source_files()
    if not files:
        sys.exit("No source files found — run this from the repo root.")

    referenced = set()
    for f in files:
        try:
            text = open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        d = os.path.dirname(f)
        for spec in SPEC_RE.findall(text):
            if spec.startswith("."):
                resolved = os.path.normpath(os.path.join(d, spec)).replace(os.sep, "/")
            elif spec.startswith("@/"):
                resolved = f"{app_root_of(f)}/{spec[2:]}"
            else:
                continue  # bare npm/workspace specifier — not a local file
            # A file importing itself does not count as a reference.
            referenced |= {c for c in candidates(resolved) if c != f}

    pkg_entries = package_entry_points()
    orphans = [
        f for f in files
        if f not in referenced
        and f not in pkg_entries
        and not ENTRY.search(f)
        and not CONFIGISH.search(f)
    ]

    print(f"{len(files)} source files scanned — {len(orphans)} imported by nothing:\n")
    for o in sorted(orphans):
        print("  ", o)
    print("\nBefore deleting, check SKILL.md 'Known non-orphans'.")


if __name__ == "__main__":
    main()

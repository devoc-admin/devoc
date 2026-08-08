#!/usr/bin/env python3
"""Report every out-of-date dependency across all surfaces of this monorepo.

`bun outdated --filter='*'` only sees npm packages. This also covers the surfaces
it ignores: the `packageManager` field, GitHub Actions in workflows and composite
actions, and CLIs pinned inside workflow `run:` steps.

Read-only: never edits a file. Uses `gh api` when available (auth, no rate limit),
falling back to unauthenticated requests.

Usage (from repo root):  python3 .claude/skills/dependency-refresh/scripts/check-versions.py
"""

import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

WORKSPACE_GLOBS = ["apps", "packages", "tooling"]
ACTION_FILES = [".github/workflows", ".github/actions"]
SKIP_VALUE = ("catalog:", "workspace:", "npm:", "file:", "link:", "git+", "http")


def sh(cmd):
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        return r.stdout.strip() if r.returncode == 0 else None
    except (OSError, subprocess.SubprocessError):
        return None


HAS_GH = sh(["gh", "auth", "status"]) is not None or sh(["gh", "--version"]) is not None


def get_json(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "dev-oc-version-check"})
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.load(r)
    except (urllib.error.URLError, OSError, ValueError, TimeoutError):
        return None


def npm_latest(pkg):
    data = get_json(f"https://registry.npmjs.org/{pkg.replace('/', '%2F')}/latest")
    return data.get("version") if data else None


def gh_latest_tag(repo):
    """Latest release tag of a GitHub repo, falling back to the newest tag."""
    if HAS_GH:
        out = sh(["gh", "api", f"repos/{repo}/releases/latest", "--jq", ".tag_name"])
        if out:
            return out
        out = sh(["gh", "api", f"repos/{repo}/tags?per_page=1", "--jq", ".[0].name"])
        if out:
            return out
        return None
    data = get_json(f"https://api.github.com/repos/{repo}/releases/latest")
    if data and data.get("tag_name"):
        return data["tag_name"]
    tags = get_json(f"https://api.github.com/repos/{repo}/tags?per_page=1")
    return tags[0]["name"] if tags else None


def parse_version(text):
    """Leading numeric version of a range/tag: '^19.2.8' -> (19, 2, 8), 'v6' -> (6,)."""
    m = re.search(r"(\d+)(?:\.(\d+))?(?:\.(\d+))?", text or "")
    if not m:
        return None
    return tuple(int(g) for g in m.groups() if g is not None)


def compare(current, latest):
    """None if up to date (or uncomparable), else 'MAJOR' / 'minor' / 'patch'."""
    c, l = parse_version(current), parse_version(latest)
    if not c or not l:
        return None
    # Compare only on the components the current side actually pins (tags like `v6`).
    depth = min(len(c), len(l))
    c, l = c[:depth], l[:depth]
    if l <= c:
        return None
    if l[0] > c[0]:
        return "MAJOR"
    return "minor" if depth > 1 and l[1] > c[1] else "patch"


def read_json(path):
    try:
        with open(path) as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def workspace_manifests():
    out = []
    for root in WORKSPACE_GLOBS:
        if not os.path.isdir(root):
            continue
        for name in sorted(os.listdir(root)):
            p = os.path.join(root, name, "package.json")
            if os.path.isfile(p):
                out.append(p)
    return out


def collect():
    """Every (surface, location, name, current, resolver) tuple to check."""
    jobs = []
    root = read_json("package.json") or {}

    for cat_name, deps in (root.get("workspaces", {}).get("catalogs", {})).items():
        for pkg, ver in deps.items():
            jobs.append(("catalogs", f"catalog:{cat_name}", pkg, ver, "npm"))
    for pkg, ver in (root.get("workspaces", {}).get("catalog", {})).items():
        jobs.append(("catalogs", "catalog (default)", pkg, ver, "npm"))

    for field, suffix in (("dependencies", ""), ("devDependencies", " (dev)")):
        for pkg, ver in (root.get(field) or {}).items():
            jobs.append(("root", "package.json", pkg + suffix, ver, "npm"))

    for path in workspace_manifests():
        man = read_json(path) or {}
        for field, suffix in (("dependencies", ""), ("devDependencies", " (dev)")):
            for pkg, ver in (man.get(field) or {}).items():
                if ver.startswith(SKIP_VALUE):
                    continue
                jobs.append(("workspaces", os.path.dirname(path), pkg + suffix, ver, "npm"))

    pm = root.get("packageManager")
    if pm and "@" in pm:
        tool, ver = pm.rsplit("@", 1)
        repo = {"bun": "oven-sh/bun", "pnpm": "pnpm/pnpm", "yarn": "yarnpkg/berry"}.get(tool)
        if repo:
            jobs.append(("runtime", "packageManager", tool, ver, f"gh:{repo}"))

    for path in yaml_files():
        text = open(path).read()
        for owner_repo, ref in re.findall(r"uses:\s*([\w.-]+/[\w.-]+)@([\w.-]+)", text):
            jobs.append(("actions", path, owner_repo, ref, f"gh:{owner_repo}"))
        for pkg, ver in re.findall(r"bun add -g\s+([@\w./-]+)@([\d][\w.-]*)", text):
            jobs.append(("clis", path, pkg, ver, "npm"))
    return jobs


def yaml_files():
    out = []
    for base in ACTION_FILES:
        for dirpath, _, names in os.walk(base):
            for n in names:
                if n.endswith((".yml", ".yaml")):
                    out.append(os.path.join(dirpath, n))
    return sorted(out)


def resolve(job):
    surface, loc, name, current, resolver = job
    if resolver == "npm":
        latest = npm_latest(name.replace(" (dev)", ""))
    else:
        latest = gh_latest_tag(resolver[3:])
        # Release tags are not always plain versions (`bun-v1.3.14`); show the
        # version, except for actions where the tag itself is what you pin.
        if latest and surface != "actions":
            parsed = parse_version(latest)
            latest = ".".join(str(n) for n in parsed) if parsed else latest
    return (surface, loc, name, current, latest, compare(current, latest))


TITLES = {
    "catalogs": "CATALOGS  (root package.json -> workspaces.catalogs)",
    "root": "ROOT package.json",
    "workspaces": "WORKSPACE manifests",
    "runtime": "RUNTIME  (drives CI: setup-bun reads packageManager)",
    "actions": "GITHUB ACTIONS  (workflows + composite actions)",
    "clis": "CLIs PINNED IN WORKFLOWS",
}


def main():
    if not os.path.isfile("package.json"):
        sys.exit("Run from the repo root.")

    # The same action is pinned in several jobs of the same file: check it once,
    # but report how many occurrences you will have to edit.
    seen = {}
    for job in collect():
        seen[job] = seen.get(job, 0) + 1
    jobs = list(seen)
    with ThreadPoolExecutor(max_workers=12) as pool:
        results = list(pool.map(resolve, jobs))
    counts = {j[:4]: n for j, n in seen.items()}

    behind = [r for r in results if r[5]]
    unresolved = [r for r in results if r[4] is None]

    for surface in TITLES:
        rows = [r for r in behind if r[0] == surface]
        if not rows:
            continue
        print(f"\n{TITLES[surface]}")
        rows.sort(key=lambda r: (r[5] != "MAJOR", r[1], r[2]))
        for surf, loc, name, current, latest, kind in rows:
            n = counts.get((surf, loc, name, current), 1)
            flag = "  <-- MAJOR" if kind == "MAJOR" else ""
            times = f"  (x{n})" if n > 1 else ""
            print(f"  {loc:<34} {name:<32} {current:<14} -> {latest}{times}{flag}")

    print(f"\n{len(behind)} behind / {len(results)} checked", end="")
    print(f", {len(unresolved)} unresolved" if unresolved else "")
    if unresolved:
        for _, loc, name, current, _, _ in unresolved[:10]:
            print(f"  ? {loc:<34} {name:<32} {current}")
    if not behind:
        print("Everything is current.")


if __name__ == "__main__":
    main()

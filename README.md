# Dev-OC Monorepo

Welcome! This is a monorepo containing multiple web applications. This guide will help you get started, even if you're new to JavaScript development.

## What's a Monorepo?

A monorepo is a single repository that contains multiple projects (apps, shared libraries, etc.). This makes it easier to share code and manage related projects together.

## Project Structure

```
dev-oc/
├── apps/                    # All applications live here
│   ├── web/                # Main Next.js website
│   └── customers/          # Customer-specific projects
│       ├── opencarca/      # OpenCarca 2025 presentation (Next.js + SwiperJS)
│       └── lasbordes/
│           ├── front/      # Lasbordes frontend
│           └── preview/    # Lasbordes preview app (Vite)
├── packages/               # Shared packages
├── tooling/                # Shared configurations
│   └── typescript-config/  # TypeScript settings
└── package.json            # Root package file
```

## Prerequisites

Before you start, you need to install these tools on your computer:

### 1. Bun (JavaScript runtime & package manager)
This project uses **Bun** as the default JavaScript runtime - a fast all-in-one JavaScript runtime and package manager with built-in bundling and testing.

Install with Homebrew/Linuxbrew (recommended):

```bash
brew install oven-sh/bun/bun

# Check if installed
bun --version
```

Alternatively, use the official installer from https://bun.sh

Tip: If you use direnv, the provided `.envrc` adds `~/.bun/bin` to your PATH automatically.

### 2. Git (Version control)
- Download from: https://git-scm.com/
- To check if installed: `git --version`

### 3. Turborepo
Tool for managing the whole monorepo

```bash
bun add -g turbo
```

### 4. just (optional but recommended)
Lightweight task runner to centralize commands (alternative to Make). Used here via the `Justfile`.

```bash
brew install just
just --list   # view available recipes
```

If you prefer not to use it, all commands remain accessible via `bun` and `turbo`.

### 5. IDE Extensions (recommended)

#### Biome
Formatter and linter for JavaScript and TypeScript. Install the plugin for your IDE to enable automatic formatting on save.
- [Biome IDE Extensions](https://biomejs.dev/guides/editors/first-party-extensions/)

#### Tailwind CSS IntelliSense
Essential for TailwindCSS development - provides autocomplete, syntax highlighting, and linting for Tailwind classes.
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- Available for other IDEs via their extension marketplaces

## Getting Started

### Zero Setup Philosophy
This repo is designed so you can clone and start coding without unnecessary manual configuration thanks to [Direnv](#install-direnv).

1. Allow direnv when you enter the folder: `direnv allow`.
2. The `.envrc` file handles:
	- Checking for key tools (git, node, bun)
	- Installing dependencies automatically (`bun install`)
	- Installing/verifying Git hooks (lefthook: pre-commit + commit-msg)
	- Exporting environment variables and adding `node_modules/.bin` to PATH
	- Displaying versions and hints for missing installations

Then run `just dev` or `turbo dev`. Nothing else required.

### Install direnv
Direnv automatically reloads your environment based on `.envrc`.

macOS/Linux (Homebrew/Linuxbrew):
```bash
brew install direnv
```

Enable the hook for your shell (zsh by default here). Add to `~/.zshrc`:
```bash
eval "$(direnv hook zsh)"
```

Then reload:
```bash
source ~/.zshrc
```

Usage:
```bash
cd dev-oc
direnv allow   # first time only
```

Direnv will ask for confirmation each time `.envrc` changes.

### Step 1: Clone the Repository

```bash
# Clone the project to your computer
git clone <repository-url>

# Navigate into the project folder
cd devoc
```

### Step 2: Install Dependencies

This will install all the packages needed for all apps in the monorepo:

```bash
bun install  # or: bun i
# or via just
just install
```

## Running the Applications

### Run All Apps (Development Mode)

```bash
turbo dev
# or
just dev
```

### Run a Specific App

```bash
# Run the main web app
turbo dev --filter=web
# or
just dev web

# Run the OpenCarca presentation (Next.js)
turbo dev --filter=opencarca
# or
just dev opencarca

# Run the lasbordes preview app (Vite)
turbo dev --filter=lasbordes-preview
# or
just dev lasbordes-preview
```

### Code Quality (centralized)

```bash
just lint      # lint all main apps
just format    # format code
just types     # type checking
just commit    # commit message assistant
```

**What does this mean?**
- `--filter` tells turbo which app to run, name is indicated in each package.json file
- `dev` is the development mode (with hot reloading)

### Access the Apps

After running, you can access the apps in your browser:
- Main web app: http://localhost:3000 (usually)
- Check the terminal output for the exact URLs

## Building for Production

To create optimized production builds:

```bash
# Build all apps
turbo build

# Build a specific app
turbo build --filter=web
```

## Code Quality Tools

This project uses several tools to maintain code quality:

### Linting & Formatting

```bash
# Check and fix code style issues
turbo lint --filter=web

# Format code with Biome (runs on all files)
turbo format --filter=web
```

## Understanding the Tech Stack

### Core Technologies

- **Bun**: Default JavaScript runtime, package manager, and bundler - a fast all-in-one toolkit that replaces Node.js, npm, and webpack
- **TypeScript**: JavaScript with types (helps catch errors early)
- **Turbo**: Tool that helps run tasks across multiple projects efficiently

### Frameworks & Libraries

- **Next.js** (apps/web): React framework for building full-stack web apps
- **React**: JavaScript library for building user interfaces
- **Vite** (apps/customers/lasbordes/preview): Fast build tool for modern web projects
- **TailwindCSS**: Utility-first CSS framework for styling

### Development Tools

- **Biome**: Fast linter and formatter for JavaScript/TypeScript
- **lefthook**: Git hooks manager (runs checks before commits)

### Commit Message Format

Follow this convention:
- `feat`: New feature (e.g., `feat: add user login`)
- `fix`: Bug fix (e.g., `fix: resolve navbar issue`)
- `style`: Styling changes (e.g., `style: update hero section`)
- `docs`: Documentation (e.g., `docs: update README`)
- `refactor`: Code refactoring (e.g., `refactor: simplify auth logic`)

## Troubleshooting

### "Command not found: bun"

Install Bun: `brew install oven-sh/bun/bun` (or visit https://bun.sh)

### "Port already in use"

Another app is using the port. Either:
- Stop the other app
- Change the port in the app's configuration

### "Module not found" errors

Try:
```bash
# Clean install
rm -rf node_modules
bun install  # or: bun i
```

### Build/Dev server issues

Clear the cache:
```bash
# Clear Turbo cache
rm -rf .turbo

# Clear Next.js cache (for web app)
rm -rf apps/web/.next

# Reinstall dependencies
bun install  # or: bun i
```

## Getting Help

- Check the documentation for specific technologies on their official websites
- Ask your team members for help
- Look for similar issues on Stack Overflow

## Useful Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## Project Maintenance

### Adding a New App

1. Create a new folder in `apps/`
2. Add a `package.json` file
3. The workspace will automatically detect it

### Managing Dependencies

#### Installing Dependencies Recursively

Bun can install dependencies across all workspaces (apps, packages, tooling) in the monorepo:

```bash
# Install all dependencies in all workspaces from root
bun install  # or: bun i

# Install a specific package in all workspaces
bun add <package-name> --workspace  # or: bun a <package-name> --workspace
```

#### Updating Dependencies

```bash
# Update all dependencies across all workspaces
bun update --recursive  # or: bun u --recursive

# Interactive update - choose which packages to update
bun update --interactive  # or: bun u -i

# Interactive update across all workspaces
bun update --interactive --recursive  # or: bun u -i --recursive

# Update a specific package everywhere
bun update <package-name>  # or: bun u <package-name>

# Update dependencies in a specific workspace
cd apps/web
bun update  # or: bun u
```

**Tip**: The `--interactive` (or `-i`) flag opens an interactive menu where you can:
- See all available updates with version comparisons
- Select specific packages to update using arrow keys and spacebar
- Skip packages you don't want to update yet
- Combine with `--recursive` to interactively update across all workspaces

#### Adding Dependencies to Specific Workspaces

```bash
# Add to a specific app (from root)
bun add <package-name> --filter=web  # or: bun a <package-name> --filter=web

# Add as dev dependency
bun add <package-name> --dev  # or: bun a <package-name> -d or -D

# Or navigate to the workspace
cd apps/web
bun add <package-name>  # or: bun a <package-name>
```

**Common Bun shortcuts**:
- `bun i` = `bun install`
- `bun a` = `bun add`
- `bun u` = `bun update`
- `bun rm` or `bun remove` = remove package
- `-d` or `-D` = `--dev` (dev dependency)
- `-g` = `--global` (global install)
- `-i` = `--interactive`

---

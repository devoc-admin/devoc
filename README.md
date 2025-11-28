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
│       └── lasbordes/
│           ├── front/      # Lasbordes frontend
│           └── preview/    # Lasbordes preview app (Vite)
├── tooling/                # Shared configurations
│   └── typescript-config/  # TypeScript settings
└── package.json            # Root package file
```

## Prerequisites

Before you start, you need to install these tools on your computer:

### 1. Node.js (JavaScript runtime)
- Download from: https://nodejs.org/
- **Recommended version**: Latest LTS (Long Term Support)
- To check if installed: `node --version`

### 2. pnpm (Package manager)
This project uses **pnpm** instead of npm because it's faster and saves disk space.

```bash
# Install pnpm globally
npm install -g pnpm

# Check if installed
pnpm --version
```

### 3. Git (Version control)
- Download from: https://git-scm.com/
- To check if installed: `git --version`

### 4.Turborepo
Our tool for managing the whole monorepo

```bash
pnpm add turbo --global
```

### 5.Turborepo
Our tool for managing the whole monorepo

```bash
pnpm add turbo --global
```

### Bun (runtime & bunx)
This repo runs some scripts and Git hooks using `bunx` (via Bun).

Install with Homebrew/Linuxbrew (recommended):

```bash
brew install oven-sh/bun/bun
bun --version
```

Tip: If you use direnv, the provided `.envrc` adds `~/.bun/bin` to your PATH automatically.

### just (optionnel mais recommandé)
Lightweight task runner pour centraliser les commandes (alternative à Make). Utilisé ici via le fichier `Justfile`.

```bash
brew install just
just --list   # voir les recettes disponibles
```

Si vous ne souhaitez pas l'utiliser, toutes les commandes restent accessibles via pnpm/turbo.

## 6. Biome plugin (recommended)
Biome is our formatter and linter for JavaScript and TypeScript. You probably want to install appropriate plugin for your IDE so it can format your code automatically on save. Please check [this link](https://biomejs.dev/guides/editors/first-party-extensions/) for more information.

## Getting Started

### Zero Setup Philosophy
Ce dépôt est conçu pour que vous puissiez cloner et commencer à coder sans configuration manuelle superflue grace a [Direnv](#installer-direnv).

1. Autorisez direnv quand vous entrez dans le dossier: `direnv allow`.
2. Le fichier `.envrc` s'occupe de:
	- Vérifier la présence des outils clés (git, node, pnpm, bun)
	- Activer pnpm via Corepack à la bonne version
	- Installer automatiquement les dépendances (`pnpm install --recursive`)
	- Installer/Vérifier les hooks Git (lefthook: pré-commit + commit-msg)
	- Exporter les variables d'environnement et ajouter `node_modules/.bin` au PATH
	- Afficher les versions et conseils d'installation manquants

Ensuite lancez `just dev` ou `turbo dev`. Rien d'autre n'est requis.

### Installer direnv
Direnv recharge automatiquement l'environnement selon `.envrc`.

macOS/Linux (Homebrew/Linuxbrew):
```bash
brew install direnv
```

Activez le hook pour votre shell (zsh par défaut ici). Ajoutez dans `~/.zshrc`:
```bash
eval "$(direnv hook zsh)"
```
Puis rechargez:
```bash
source ~/.zshrc
```

Utilisation:
```bash
cd devoc
direnv allow   # première fois
```
À chaque changement du `.envrc`, direnv demandera à nouveau confirmation.

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
pnpm install --recursive
# ou via just
just install
```

## Running the Applications

### Run All Apps (Development Mode)

```bash
turbo dev
## ou
just dev
```

### Run a Specific App

```bash
# Run the main web app
turbo dev --filter=web
## ou
just dev web

# Run the lasbordes preview app (Vite)
turbo dev --filter=lasbordes-preview
## ou
just dev lasbordes-preview
```

### Qualité de code (centralisé)

```bash
just lint      # lint toutes les apps principales
just format    # format
just types     # vérification des types
just commit    # assistant de message de commit
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
pnpm --filter web lint

# Format code with Biome (runs on all files)
pnpm --filter web format
```

## Understanding the Tech Stack

### Core Technologies

- **Node.js**: JavaScript runtime that lets you run JavaScript outside the browser
- **TypeScript**: JavaScript with types (helps catch errors early)
- **pnpm**: Fast package manager for installing dependencies
- **Turbo**: Tool that helps run tasks across multiple projects efficiently

### Frameworks & Libraries

- **Next.js** (apps/web): React framework for building full-stack web apps
- **React**: JavaScript library for building user interfaces
- **Vite** (apps/customers/lasbordes/preview): Fast build tool for modern web projects
- **TailwindCSS**: Utility-first CSS framework for styling

### Development Tools

- **Biome**: Fast linter and formatter for JavaScript/TypeScript
- **lefthook**: Git hooks manager (runs checks before commits)
- **better-commits**: Helper for writing good commit messages

### Making Commits

This project uses `better-commits` to help you write meaningful commit messages:

```bash
# Stage your changes
git add .

# Create a commit (will launch interactive prompt)
pnpm better-commits
# Or use git commit directly (lefthook will validate)
git commit
```

### Commit Message Format

Follow this convention:
- `feat`: New feature (e.g., `feat: add user login`)
- `fix`: Bug fix (e.g., `fix: resolve navbar issue`)
- `style`: Styling changes (e.g., `style: update hero section`)
- `docs`: Documentation (e.g., `docs: update README`)
- `refactor`: Code refactoring (e.g., `refactor: simplify auth logic`)

## Troubleshooting

### "Command not found: pnpm"

Install pnpm: `npm install -g pnpm`

### "Port already in use"

Another app is using the port. Either:
- Stop the other app
- Change the port in the app's configuration

### "Module not found" errors

Try:
```bash
# Clean install
rm -rf node_modules
pnpm install
```

### Build/Dev server issues

Clear the cache:
```bash
# Clear Turbo cache
rm -rf .turbo

# Clear Next.js cache (for web app)
rm -rf apps/web/.next

# Reinstall dependencies
pnpm install
```

## Getting Help

- Check the documentation for specific technologies on their official websites
- Ask your team members for help
- Look for similar issues on Stack Overflow

## Useful Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## Project Maintenance

### Adding a New App

1. Create a new folder in `apps/`
2. Add a `package.json` file
3. The pnpm workspace will automatically detect it

### Updating Dependencies

```bash
# Update all dependencies from root
pnpm update --recursive

# Update a specific package in an app
pnpm --filter <app-name> update <package-name>
```

---

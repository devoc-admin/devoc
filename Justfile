# Justfile pour centraliser les commandes courantes du monorepo
# Installer just: brew install just (Homebrew/Linuxbrew)

set shell := ["zsh", "-c"]

## --- Installation ---
install:
    bun install

## --- Nettoyage ---
clean:
    rm -rf .turbo
    rm -rf node_modules
    rm -rf apps/web/.next
    rm -rf apps/admin/.next
    rm -rf apps/clients/.next

## --- Développement ---
dev app="web":
    bun x turbo dev --filter={{app}}

## --- Build ---
build app="web":
    bun x turbo build --filter={{app}}

## --- Qualité de code ---
# Attention: `bun --filter <app> run <script>` et `bun x --filter <app> <cmd>` ne
# fonctionnent pas — bun lit alors `--filter` comme un flag d'installation et peut
# remonter les versions des catalogs. La bonne forme est `bun run --filter <app>`.
lint app="web":
    bun x turbo lint --filter={{app}}

format app="web":
    bun run --filter {{app}} format:fix

typecheck app="web":
    bun x turbo typecheck --filter={{app}}


## --- Diagnostics ---
versions:
    echo "node: $(node --version 2>/dev/null)"
    echo "bun: $(bun --version 2>/dev/null)"
    echo "turbo: $(bun x turbo --version 2>/dev/null)"
    echo "biome: $(bun x biome --version 2>/dev/null || true)"

## --- Aide ---
help:
    echo "Commandes disponibles :"
    just --list

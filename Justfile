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

## --- Développement ---
dev app="web":
    bunx turbo dev --filter={{app}}

## --- Build ---
build app="web":
    bunx turbo build --filter={{app}}

## --- Qualité de code ---
lint app="web":
    bun --filter {{app}} run lint

format app="web":
    bunx --filter {{app}} biome format --write

types app="web":
    bunx --filter {{app}} tsc --noEmit


## --- Diagnostics ---
versions:
    echo "node: $(node --version 2>/dev/null)"
    echo "bun: $(bun --version 2>/dev/null)"
    echo "turbo: $(bunx turbo --version 2>/dev/null)"
    echo "biome: $(bunx biome --version 2>/dev/null || true)"

## --- Aide ---
help:
    echo "Commandes disponibles :"
    just --list

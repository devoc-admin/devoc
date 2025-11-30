# Justfile pour centraliser les commandes courantes du monorepo
# Installer just: brew install just (Homebrew/Linuxbrew)

set shell := ["zsh", "-c"]

## --- Installation ---
install:
    pnpm install --recursive

## --- Nettoyage ---
clean:
    rm -rf .turbo
    rm -rf node_modules
    rm -rf apps/web/.next

## --- Développement ---
dev app="web":
    turbo dev --filter={{app}}

## --- Build ---
build app="web":
    turbo build --filter={{app}}

## --- Qualité de code ---
lint app="web":
    pnpm --filter {{app}} lint

format app="web":
    pnpm --filter {{app}} exec biome format --write

types app="web":
    pnpm --filter {{app}} exec tsc --noEmit


## --- Diagnostics ---
versions:
    echo "node: $(node --version 2>/dev/null)"
    echo "pnpm: $(pnpm --version 2>/dev/null)"
    echo "bun: $(bun --version 2>/dev/null)"
    echo "turbo: $(pnpm turbo --version 2>/dev/null || turbo --version 2>/dev/null)"
    echo "biome: $(pnpm biome --version 2>/dev/null || true)"

## --- Aide ---
help:
    echo "Commandes disponibles :"
    just --list

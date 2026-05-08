# tooling/typescript-config

Configurations TypeScript partagées par les apps et packages du monorepo.

## Description

Ce dossier ne contient pas de package npm ; il expose simplement deux fichiers `tsconfig` que les workspaces étendent via `extends`.

| Fichier | Pour quoi |
|---------|-----------|
| `base.json` | Réglages communs (`strictNullChecks`, etc.) |
| `next.json` | Étend `base.json` avec les options nécessaires aux apps Next.js (target ES2022, JSX preserve, plugin Next, isolated modules, ...) |

## Usage

Dans un `tsconfig.json` de workspace :

```json
{
  "extends": "../../tooling/typescript-config/next.json",
  "compilerOptions": { /* overrides locaux */ }
}
```

# clients

Espace clients **Dev-OC**.

## Description

Application Next.js (App Router, Turbopack) fraîchement initialisée — template
vierge avec Tailwind CSS v4 et TypeScript strict, prête à recevoir les écrans de
l'espace clients.

Les autres applications du monorepo : [`apps/web`](../web) (vitrine publique) et
[`apps/admin`](../admin) (back-office).

## Démarrage

```bash
direnv allow      # première fois
bun dev           # http://localhost:3002
```

## Scripts utiles

| Script | Description |
|--------|-------------|
| `bun dev` | Serveur Next.js (Turbopack, port 3002, exposé sur le réseau local) |
| `bun build` / `bun start` | Build et exécution production |
| `bun run typecheck` | Vérification TypeScript |
| `bun lint` | Lint via ultracite |
| `bun run ci` | `biome ci` — lint + format + assist, sans écriture (utilisé par la CI) |

## Variables d'environnement

Aucune pour l'instant. Ajoutez-les dans `apps/clients/.env.local` (non
versionné, chargé par `.envrc`, Next.js et Bun) quand le besoin arrivera.

## Ajouter des composants shadcn/ui

Le template n'embarque pas encore `components.json`. Pour l'initialiser :

```bash
bun x shadcn@latest init
```

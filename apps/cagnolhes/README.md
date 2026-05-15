# cagnolhes

Site **démo** Cagnolhes — landing Next.js (App Router, Turbopack).

> ⚠️ **Démo uniquement.** Ce projet est une démonstration commerciale présentée au prospect. Il **ne sera jamais livré en production en l'état** : un projet client dédié sera créé si l'opportunité est confirmée.

## Description

Application Next.js v16 servant de support de présentation pour le prospect Cagnolhes. Stack: React 19, Tailwind v4, shadcn/ui, Base UI, Hugeicons. Le projet utilise une version récente de Next dont les conventions diffèrent de l'historique — voir `AGENTS.md` à la racine de l'app.

## Démarrage

```bash
direnv allow      # première fois
bun dev           # http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Serveur Next.js (Turbopack, exposé `0.0.0.0`) |
| `bun build` | Build production (Turbopack) |
| `bun start` | Démarrage production |
| `bun lint` | Lint via ultracite |
| `bun run format` | Format Biome |
| `bun run types` | Vérification TypeScript |

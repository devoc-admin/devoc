# web

Site vitrine **Dev-OC**.

## Description

Application Next.js (App Router, Turbopack) qui héberge la vitrine publique :
hero, services, réalisations, contact, pages packs, pages légales et sections
éditoriales animées (GSAP / Motion / Three.js).

Le back-office de prospection vit dans une application séparée : [`apps/admin`](../admin).

## Démarrage

```bash
direnv allow      # première fois
bun dev           # http://localhost:3000
```

## Scripts utiles

| Script | Description |
|--------|-------------|
| `bun dev` | Serveur Next.js (Turbopack, exposé sur le réseau local) |
| `bun build` / `bun start` | Build et exécution production |
| `bun run typecheck` | Vérification TypeScript |
| `bun lint` | Lint via ultracite |
| `bun run ci` | `biome ci` — lint + format + assist, sans écriture (utilisé par la CI) |

## Variables d'environnement

À renseigner dans `apps/web/.env.local` (chargé par `.envrc`) :
`RESEND_API_KEY`, `CONTACT_EMAIL`. Les placeholders globaux sont définis à la
racine du monorepo.

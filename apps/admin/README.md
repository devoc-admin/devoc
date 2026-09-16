# admin

Back-office **Dev-OC** (prospection, crawls, audits).

## Description

Application Next.js (App Router, Turbopack) qui héberge l'outillage interne :

- authentification par email / mot de passe (better-auth) ;
- base Postgres / Neon via Drizzle ORM (schéma et migrations dans [`@dev-oc/db`](../../packages/db)) ;
- files de traitement Inngest pour le crawl de sites ;
- stockage des captures d'écran sur Vercel Blob ;
- consommation des packages internes `@dev-oc/auth`, `@dev-oc/db`, `@dev-oc/crawler` et `@dev-oc/utils`.

La vitrine publique vit dans une application séparée : [`apps/web`](../web).

## Démarrage

```bash
direnv allow      # première fois
bun dev           # http://localhost:3001
bun run inngest   # dans un second terminal, devserver Inngest
```

## Scripts utiles

| Script | Description |
|--------|-------------|
| `bun dev` | Serveur Next.js (Turbopack, port 3001, exposé sur le réseau local) |
| `bun build` / `bun start` | Build et exécution production |
| `bun run typecheck` | Vérification TypeScript |
| `bun lint` | Lint via ultracite |
| `bun run ci` | `biome ci` — lint + format + assist, sans écriture (utilisé par la CI) |
| `bun run inngest` | Démarre le devserver Inngest |
| `bun run create-admin` | Crée un compte administrateur |
| `bun run seed-rgaa` | Seed du référentiel RGAA |

## Variables d'environnement

À renseigner dans `apps/admin/.env.local` (chargé par `.envrc`) :
`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`,
`VERCEL_BLOB_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `INNGEST_DEV`.

Aucune URL d'application à configurer : better-auth résout son origine par
requête (`allowedHosts` dans `lib/auth/auth.ts`) et le client
l'infère depuis `window.location`. En production, ajoutez le host à
`allowedHosts` plutôt qu'une variable d'environnement.

# web

Site principal **Dev-OC** (vitrine + back-office prospection).

## Description

Application Next.js (App Router, Turbopack) qui héberge :

- la vitrine publique (hero, services, réalisations, contact, sections éditoriales avec animations GSAP / Motion / Three.js) ;
- un back-office d'audit et de prospection : authentification (better-auth), base Postgres via Drizzle ORM, files Inngest, intégrations Resend (emails) et Vercel Blob (stockage) ;
- la consommation des packages internes `@dev-oc/crawler` et `@dev-oc/utils`.

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
| `bun run check-types` | Vérification TypeScript |
| `bun lint` | Lint via ultracite |
| `bun run inngest` | Démarre le devserver Inngest |
| `bun run db:generate` / `db:migrate` / `db:push` / `db:pull` / `db:studio` | Drizzle Kit (lit `.env.local`) |
| `bun run create-admin` | Crée un compte administrateur |
| `bun run seed-prospects` | Seed des prospects à auditer |

## Variables d'environnement

À renseigner dans `apps/web/.env.local` (chargé par `.envrc`) :
`DATABASE_URL`, `POSTGRES_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`, etc. Les placeholders globaux sont définis à la racine du monorepo.

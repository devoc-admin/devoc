# saveurs-aude

Site e-commerce / vitrine **démo** Saveurs d'Aude — Next.js + Payload CMS.

> ⚠️ **Démo uniquement.** Ce projet est une démonstration commerciale présentée au prospect Saveurs d'Aude. Il **ne sera jamais livré en production en l'état** : un projet client dédié sera créé si l'opportunité est confirmée.

## Description

Application Next.js 16 (App Router, Turbopack) avec :

- **Payload CMS v3** intégré dans le même process Next (collections + admin sur `/admin`) ;
- **PostgreSQL** via `@payloadcms/db-postgres`, stockage médias **Vercel Blob** ;
- **next-intl** pour l'internationalisation (`fr`, `en`), Tailwind v4 + Tailwind Typography ;
- formulaires **TanStack Form** + **Zod**, paiements **Stripe**, emails **Resend** + React Email ;
- éditeur riche **Lexical** (via Payload).

Routage segmenté : `app/(frontend)` pour la vitrine publique, `app/(payload)` pour l'admin Payload.

## Démarrage

```bash
direnv allow         # première fois — lance aussi le Postgres local (docker-compose.yml)
bun run db:deploy    # applique les migrations sur la base locale
bun run seed         # seed Payload (payload/seed.ts)
bun dev              # http://localhost:3000
```

L'admin Payload est sur http://localhost:3000/admin.

La base locale est un Postgres 15 (`payload` / `password`, base `saveurs_aude`, port 5432) défini dans `docker-compose.yml`. `.envrc` le démarre si `$CONTAINER_RUNNER` (docker, podman…) est défini ; sinon : `docker compose up -d`.

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Reset `.next`/`.turbo` puis serveur Next.js |
| `bun run build` | `next build`. Via Turbo, `gen:types` puis `gen:map` tournent avant |
| `bun start` | Démarrage production |
| `bun run gen:types` | Régénère `payload-types.ts` |
| `bun run gen:map` | Régénère l'import map de l'admin (`app/(payload)/admin/importMap.js`) |
| `bun run gen:check` | Vérifie que les fichiers générés commités sont à jour |
| `bun run db:deploy` | Applique les migrations (`migrations/`) |
| `bun run db:push` | Pousse le schéma sans migration (dev uniquement) |
| `bun run db:migration:check` | Échoue si le schéma a changé sans nouvelle migration |
| `bun run seed` | Seed Payload via `payload/seed.ts` |
| `bun run payload` | CLI Payload |
| `bun run lint` / `bun run format` / `bun run typecheck` | Qualité de code |

> La CLI Payload tourne sous **Node**, pas sous le runtime Bun (`bun --bun`) : sous Bun, Lexical plante au chargement (`Cannot access 'DecoratorNode' before initialization`).

`payload-types.ts` et `migrations/` sont générés par Payload et exclus du lint (`biome.json`).

## Variables d'environnement

À définir dans `apps/demos/saveurs-aude/.env.local` (modèle : `.env.example`) :

| Variable | Rôle |
|----------|------|
| `DATABASE_URL` | Postgres |
| `PAYLOAD_SECRET` | Clé de Payload (32 caractères min.) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — sans lui, les médias restent en local |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_URL` | URL publique. Sur Vercel, à défaut, le domaine de production du projet |
| `SECRET_STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET` | Paiements Stripe |
| `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Emails et newsletter |

## CI et déploiement

- **GitHub Actions** (`ci.yml`, job `build-saveurs-aude`) : build sur un Postgres jetable, migrations appliquées, avec un `PAYLOAD_SECRET` factice. Aucun secret de production n'est utilisé.
- **Vercel** (projet `devoc`, root directory `apps/demos/saveurs-aude`) : `vercel.json` lance `bun run db:deploy` avant le build, car les variables marquées *sensitive* ne peuvent pas être récupérées en local avec `vercel env pull`.
- Les variables Vercel doivent exister pour **Production** et **Preview** (notamment `PAYLOAD_SECRET`). Preview et Production partagent le même `DATABASE_URL` : une preview applique donc ses migrations à la base de production.

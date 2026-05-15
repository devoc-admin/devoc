# saveurs-aude

Site e-commerce / vitrine **démo** Saveurs d'Aude — Next.js + Payload CMS.

> ⚠️ **Démo uniquement.** Ce projet est une démonstration commerciale présentée au prospect Saveurs d'Aude. Il **ne sera jamais livré en production en l'état** : un projet client dédié sera créé si l'opportunité est confirmée.

## Description

Application Next.js v16 (App Router, Turbopack) avec :

- **Payload CMS v3** intégré dans le même process Next (collections + admin sur `/admin`) ;
- **PostgreSQL** via `@payloadcms/db-postgres`, stockage médias **Vercel Blob** ;
- **next-intl** pour l'internationalisation, Tailwind v4 + Tailwind Typography ;
- formulaires **TanStack Form** + **Zod**, paiements **Stripe**, emails **Resend** + React Email ;
- éditeur riche **Lexical** (via Payload).

Routage segmenté : `app/(frontend)` pour la vitrine publique, `app/(payload)` pour l'admin Payload.

## Démarrage

```bash
direnv allow         # première fois
bun dev              # nettoie .next/.turbo, lance Next sur 0.0.0.0:3000
bun run seed         # seed Payload (payload/seed.ts)
bun run payload      # CLI Payload
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Reset `.next`/`.turbo` puis serveur Next.js |
| `bun build` | `payload generate:importmap` puis `next build` |
| `bun start` | Démarrage production |
| `bun run seed` | Seed Payload via `payload/seed.ts` |
| `bun run payload` | CLI Payload |
| `bun lint` / `bun run format` / `bun run types` | Qualité de code |

## Variables d'environnement

À définir dans `apps/saveurs-aude/.env.local` :
`DATABASE_URL` (Postgres), `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, clés Stripe…

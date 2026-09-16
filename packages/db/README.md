# @dev-oc/db

Base Postgres (Neon) partagée par `admin` et `clients` : schéma Drizzle, client et migrations, au même endroit.

## Sous-chemins exportés

- **`@dev-oc/db`** : `db`, client Drizzle `neon-http` créé à la première utilisation (lit `DATABASE_URL`)
- **`@dev-oc/db/schema`** : tables, enums et types inférés (`Prospect`, `Crawl`…)
  - `src/schema/auth.ts` : tables better-auth (`user`, `session`, `account`, `verification`)
  - `src/schema/app.ts` : tables métier (crawls, prospects, audits, RGAA)

Les requêtes propres à une app restent dans l'app. N'ajoutez ici que ce qui est partagé.

## Migrations

`DATABASE_URL` doit être renseignée dans `packages/db/.env.local` (chargé par `.envrc`).

| Script | Description |
|--------|-------------|
| `bun run db:generate` | Génère une migration dans `drizzle/` à partir du schéma |
| `bun run db:migrate` / `db:deploy` | Applique les migrations (`db:deploy` est utilisé par `migrate.yml`) |
| `bun run db:push` / `db:pull` / `db:studio` | Drizzle Kit |

La base est partagée et chaque app est déployée indépendamment par Vercel : une migration doit rester compatible avec le code en production de **toutes** les apps (expand puis contract).

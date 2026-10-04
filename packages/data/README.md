# @dev-oc/data

Base Postgres (Neon) partagée par `admin` et `clients` : schéma Drizzle, client et migrations, au même endroit.

## Sous-chemins exportés

- **`@dev-oc/data/db`** : `db`, client Drizzle `neon-http` créé à la première utilisation (lit `DATABASE_URL`)
- **`@dev-oc/data/db/schema`** : tables, enums et types inférés (`Prospect`, `Crawl`…)
  - `src/db/schema/auth.ts` : tables better-auth (`user`, `session`, `account`, `verification`)
  - `src/db/schema/app.ts` : tables métier (crawls, prospects, audits, RGAA)
  - `src/db/schema/clients.ts` : tables de l'espace clients (`customers`, `projects`)
- **`@dev-oc/data/customers`** : requêtes clients (`getCustomerById`)

Les requêtes propres à une app restent dans l'app. N'ajoutez ici que ce qui est partagé.

## Migrations

`DATABASE_URL` doit être renseignée dans `packages/data/.env.local` (chargé par `.envrc`).

| Script | Description |
|--------|-------------|
| `bun run db:generate` | Génère une migration dans `drizzle/` à partir du schéma |
| `bun run db:migrate` / `db:deploy` | Applique les migrations (`db:deploy` est utilisé par `migrate.yml`) |
| `bun run db:push` / `db:pull` / `db:studio` | Drizzle Kit |

La base est partagée et chaque app est déployée indépendamment par Vercel : une migration doit rester compatible avec le code en production de **toutes** les apps (expand puis contract).

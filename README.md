# Dev'Oc

Monorepo du collectif **Dev-OC** : le site vitrine, le back-office de prospection, l'espace clients, l'atelier de templates d'emails et les packages TypeScript partagés. Géré avec **Bun** (workspaces + catalogs) et **Turborepo**.

## Structure

```
dev-oc/
├── apps/
│   ├── web/                    # Site vitrine Next.js
│   ├── admin/                  # Back-office Next.js (prospection, crawls, audits)
│   ├── clients/                # Espace clients Next.js (template vierge)
│   └── email/                  # Atelier de templates React Email
├── packages/
│   ├── crawler/                # @dev-oc/crawler — crawler Playwright + Wapalyzer
│   └── utils/                  # @dev-oc/utils — helpers URL et dates
├── tooling/
│   └── typescript-config/      # tsconfig partagés (base.json, next.json)
├── .github/workflows/          # CI (ci.yml) et déploiement (deploy.yml)
├── package.json                # Workspaces, catalogs de versions, outils racine
├── turbo.json                  # Tâches du monorepo
├── biome.jsonc                 # Lint + format + assist
├── knip.json                   # Audit de code mort
├── lefthook.yml                # Hooks Git
├── commitlint.config.js        # Convention de messages de commit
├── .envrc                      # Environnement de dev (direnv)
└── Justfile                    # Raccourcis de commandes
```

Chaque app et package a son propre `readme.md` avec le détail de ses scripts.

## Applications et packages

| Workspace | Chemin | Rôle |
|-----------|--------|------|
| `web` | `apps/web` | Next.js 16 (App Router, Turbopack). Vitrine publique : animations GSAP / Motion / Three.js, pages packs et pages légales. Port 3000 |
| `admin` | `apps/admin` | Next.js 16 (App Router, Turbopack). Back-office : better-auth, Postgres/Neon via Drizzle ORM, files Inngest, Vercel Blob. Port 3001 |
| `clients` | `apps/clients` | Next.js 16 (App Router, Turbopack). Espace clients, template vierge. Port 3002 |
| `email` | `apps/email` | Templates transactionnels React Email, avec preview live dans le navigateur |
| `@dev-oc/crawler` | `packages/crawler` | Crawl de pages, extraction de métadonnées et détection de technologies. Consommé par `admin` |
| `@dev-oc/utils` | `packages/utils` | Helpers sans dépendances, exportés en sous-chemins (`/url`, `/dates`) |

`tooling/typescript-config` n'est pas un package npm : c'est un dossier de `tsconfig` que les workspaces étendent par chemin relatif.

## Prérequis

| Outil | Requis | Installation |
|-------|--------|--------------|
| [Bun](https://bun.sh) | oui — runtime et gestionnaire de paquets | `brew install oven-sh/bun/bun` |
| [Git](https://git-scm.com/) | oui | `brew install git` |
| [Node.js](https://nodejs.org/) | oui — `.envrc` s'arrête sans lui, et certains outils s'y appuient | `brew install node` |
| [direnv](https://direnv.net/) | oui — prépare l'environnement automatiquement | `brew install direnv` |
| [just](https://github.com/casey/just) | optionnel — raccourcis du `Justfile` | `brew install just` |

La version de Bun utilisée par le repo est épinglée dans le champ `packageManager` du `package.json` racine ; la CI s'en sert pour installer la même.

Pour direnv, activez le hook dans votre shell (zsh ici) puis rechargez :

```bash
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc && source ~/.zshrc
```

Extensions d'éditeur recommandées : [Biome](https://biomejs.dev/guides/editors/first-party-extensions/) (format et lint à la sauvegarde) et Tailwind CSS IntelliSense.

## Démarrage

```bash
git clone https://github.com/devoc-admin/devoc.git
cd devoc
direnv allow      # première fois — voir ci-dessous
just dev          # ou: bun x turbo dev --filter=web — http://localhost:3000
just dev admin    # back-office — http://localhost:3001
just dev clients  # espace clients — http://localhost:3002
```

`direnv allow` déclenche le `.envrc`, qui vérifie la présence de git/bun/node, ajoute les binaires locaux au `PATH`, installe les dépendances (`bun install`), installe les hooks Git (`lefthook install`), désactive la télémétrie Next et Turbo, charge `.env`/`.env.local` s'ils existent et définit des placeholders sûrs pour les variables référencées par `turbo.json`.

## Commandes

Les tâches passent par Turborepo, qui met en cache les résultats et ne relance que ce qui a changé.

```bash
bun x turbo dev --filter=web        # ou: just dev
bun x turbo dev --filter=admin      # ou: just dev admin
bun x turbo dev --filter=clients    # ou: just dev clients
bun x turbo build --filter=web      # ou: just build
bun x turbo typecheck               # tout le monorepo
bun x turbo ci                      # lint + format + assist, sans écriture
bun x turbo boundaries              # vérifie les frontières entre workspaces
```

| Tâche | Ce qu'elle fait |
|-------|-----------------|
| `dev` | Serveur de développement (persistante, non mise en cache) |
| `build` | Build de production. `web`, `admin` et `clients` en ont un |
| `ci` | `biome ci` : lint + format + assist en une passe, sans écriture — ce que lance la CI |
| `lint` | `ultracite check` (Biome) |
| `typecheck` | `tsc --noEmit` |

Seules ces cinq tâches sont déclarées dans `turbo.json`. `lint:fix` et `format:fix` existent en scripts de workspace uniquement : lancez-les avec `bun run --filter <app> lint:fix`.

`--filter` cible un workspace par le champ `name` de son `package.json` (`web`, `admin`, `clients`, `email`, `@dev-oc/crawler`…). Ajoutez `--affected` pour ne traiter que les workspaces touchés depuis la branche de base.

Sans `--filter`, `turbo dev` démarre tous les serveurs de dev en parallèle. `web` et `email` écoutent tous deux sur le port 3000, donc lancez-les séparément ; `admin` (3001) et `clients` (3002) cohabitent sans conflit.

Le `Justfile` racine expose les mêmes raccourcis (`just install`, `just dev [app]`, `just build [app]`, `just lint [app]`, `just typecheck [app]`, `just clean`, `just versions`, `just help`), avec `web` comme app par défaut. Chaque app a aussi son `Justfile` local.

## Gestion des dépendances

Les versions partagées sont centralisées dans les **catalogs Bun** du `package.json` racine, par thème : `react`, `next`, `tailwind`, `ui`, `tooling`, `testing`, `email`, `forms`, `crawler`, `vercel`.

Un workspace y fait référence au lieu de figer une version :

```json
{
  "dependencies": {
    "react": "catalog:react",
    "lucide-react": "catalog:ui"
  }
}
```

Une seule ligne à modifier pour mettre à jour la version partout. Si une dépendance est déjà dans un catalog, utilisez `catalog:<nom>` plutôt qu'une version littérale.

> ⚠️ Lancez toujours `bun install` et `bun run update` **depuis la racine**, et respectez l'ordre des flags : `bun run --filter <app> <script>`. Écrit à l'envers (`bun --filter <app> run <script>`) ou avec `bun x --filter`, bun interprète `--filter` comme un flag d'installation, remonte les plages de versions des catalogs et réécrit `bun.lock` sans rien signaler. Si cela arrive : `git checkout -- package.json apps/*/package.json bun.lock`.

```bash
bun install                              # installe tous les workspaces
bun add <paquet> --filter=web            # ajoute une dépendance à un workspace
bun add <paquet> --dev                   # dépendance de développement
bun run update                           # mise à jour interactive, récursive, en dernières versions
```

## Qualité de code

- **Biome** (via [ultracite](https://www.ultracite.ai/)) pour le lint, le format et les actions d'assist (tri des imports, des attributs, des clés). Configuration à la racine dans `biome.jsonc`.
- **knip** pour l'audit de code mort : `bun x knip` signale fichiers, exports, dépendances et entrées de catalog inutilisés.
- **TypeScript** en `strict`, configs partagées dans `tooling/typescript-config`.
- **Tests** : aucune suite pour l'instant. `packages/crawler` expose un script `test` (`bun test`) mais ne contient pas encore de fichier de test.

### Hooks Git (lefthook)

Installés automatiquement par `.envrc`, définis dans `lefthook.yml` :

| Hook | Vérifications |
|------|---------------|
| `pre-commit` | `ultracite fix` sur les fichiers indexés (corrections réindexées), `turbo typecheck --affected`, `turbo boundaries` |
| `commit-msg` | `commitlint` |
| `pre-push` | `bun install --frozen-lockfile` — le lockfile doit être à jour |

### Messages de commit

Convention [Conventional Commits](https://www.conventionalcommits.org/fr/) (`@commitlint/config-conventional`) : `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `ci`, `build`.

```
feat(admin): ajoute le filtre par département sur les prospects
fix(crawler): corrige la normalisation des URLs relatives
```

## Secrets et variables d'environnement

Les secrets locaux vivent dans des fichiers `.env.local` non versionnés, un par
workspace (`apps/admin/.env.local`, etc.). Ils sont chargés trois fois plutôt
qu'une : par `.envrc` (direnv), par Next.js et par Bun lui-même — aucun wrapper
n'est nécessaire autour des scripts.

| Workspace | Variables |
|-----------|-----------|
| `apps/web` | aucune |
| `apps/clients` | aucune |
| `apps/admin` | `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`, `VERCEL_BLOB_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `INNGEST_DEV` |

En production, les variables sont définies dans le dashboard Vercel de chaque
app. `vercel pull` les récupère au moment du build, donc elles n'ont pas à être
dupliquées dans GitHub.

### Secrets GitHub Actions

Seul `deploy.yml` en a besoin, dans **Settings → Secrets and variables → Actions** :

| Secret | Rôle |
|--------|------|
| `VERCEL_TOKEN` | jeton d'accès Vercel |
| `VERCEL_ORG_ID` | id de la team ; sert aussi de « team signal » exigé par la CLI en non-interactif depuis vercel@55 |
| `VERCEL_PROJECT_ID` | projet `web` — indispensable car `.vercel/` est ignoré par Git |
| `DATABASE_URL` | Postgres de production, pour l'étape de migration Drizzle |

`ci.yml` n'a besoin d'aucun secret : `web` et `admin` se construisent tous les
deux sans aucune variable d'environnement.

## CI/CD

**`ci.yml`** — sur push sur `main` et sur les pull requests, en jobs parallèles : typecheck des workspaces affectés, `turbo boundaries`, `turbo ci` (lint + format), et build des workspaces affectés. Aucun secret requis.

**`migrate.yml`** — sur push sur `main` (ou déclenchement manuel) : applique les migrations Drizzle de production depuis `apps/admin`. Seul secret requis : `DATABASE_URL`.

Le build et le déploiement des apps sont assurés par l'intégration Git de Vercel (projets `devoc-web`, `devoc-admin`, `devoc-clients`), pas par GitHub Actions : chaque push sur `main` déclenche un déploiement de production, chaque PR une preview. Les variables d'environnement de build vivent dans le dashboard Vercel de chaque projet.

## Dépannage

**`command not found: bun`** — installez Bun (`brew install oven-sh/bun/bun`) ; `.envrc` ajoute `~/.bun/bin` au `PATH`.

**Le port 3000 est déjà utilisé** — `web` et `email` l'utilisent tous les deux ; lancez-les séparément avec `--filter`.

**Erreurs de secrets manquants au démarrage d'une app Next** — vérifiez que le `.env.local` du workspace existe et contient les variables listées dans son readme.

**Erreurs « module not found » ou builds incohérents** — nettoyez et réinstallez :

```bash
just clean        # supprime .turbo, node_modules et les .next des apps
bun install
```

**Les changements de `.envrc` ne sont pas pris en compte** — direnv demande une confirmation à chaque modification : relancez `direnv allow`.

## Ressources

[Bun](https://bun.sh/docs) · [Turborepo](https://turborepo.com/docs) · [Next.js](https://nextjs.org/docs) · [React](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/docs/) · [Tailwind CSS](https://tailwindcss.com/docs) · [Biome](https://biomejs.dev/) · [Drizzle ORM](https://orm.drizzle.team/docs/overview) · [React Email](https://react.email/docs)

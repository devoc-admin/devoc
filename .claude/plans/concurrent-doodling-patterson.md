# Plan : Crawler RGAA pour Audit d'Accessibilité

## Objectif
Implémenter un crawler capable d'explorer un site web (y compris les sites JavaScript/SPA) et d'identifier les pages conformes aux recommandations d'échantillon RGAA pour un audit d'accessibilité.

## Stack Technique

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Browser automation | **Playwright** | Meilleur support SPA, multi-navigateur, auto-wait |
| Background jobs | **Inngest** | Serverless-first, step functions, pas d'infra Redis |
| Base de données | Drizzle + PostgreSQL (existant) | - |

## Paramètres configurés
- Max. profondeur : **3 niveaux**
- Limite pages : **Configurable par l'utilisateur**
- Authentification : **Architecture prévue, implémentation future**

---

## Pages RGAA à identifier

### Pages obligatoires (si existantes)
- Page d'accueil
- Contact
- Mentions légales
- Accessibilité (déclaration)
- Plan du site
- Aide
- Authentification/connexion

### Pages additionnelles
- Pages avec formulaires
- Pages avec tableaux de données
- Pages avec multimédia (vidéo, audio)
- Pages avec documents téléchargeables (PDF, etc.)
- Processus multi-étapes (checkout, wizard)
- Pages avec layouts distincts

---

## Schéma Base de Données

### Nouvelle table : `crawl_job`
```
id              TEXT PRIMARY KEY
auditId         INTEGER REFERENCES audit(id)
status          ENUM (pending, running, completed, failed, cancelled)
maxDepth        INTEGER DEFAULT 3
maxPages        INTEGER DEFAULT 50
pagesDiscovered INTEGER DEFAULT 0
pagesCrawled    INTEGER DEFAULT 0
config          JSONB
errorMessage    TEXT
startedAt       TIMESTAMP
completedAt     TIMESTAMP
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

### Nouvelle table : `crawled_page`
```
id                  TEXT PRIMARY KEY
crawlJobId          TEXT REFERENCES crawl_job(id)
url                 TEXT NOT NULL
normalizedUrl       TEXT NOT NULL
title               TEXT
depth               INTEGER
category            ENUM (homepage, contact, legal_notices, accessibility, sitemap, help, authentication, form, table, multimedia, document, multi_step_process, distinct_layout, other)
categoryConfidence  INTEGER (0-100)
hasForm             BOOLEAN
hasTable            BOOLEAN
hasMultimedia       BOOLEAN
hasDocuments        BOOLEAN
hasAuthentication   BOOLEAN
layoutSignature     TEXT
httpStatus          INTEGER
responseTime        INTEGER
selectedForAudit    BOOLEAN DEFAULT false
createdAt           TIMESTAMP
```

---

## Structure des Fichiers

```
apps/web/
├── app/
│   ├── api/inngest/
│   │   └── route.ts                    # Webhook Inngest
│   └── admin/(authenticated)/sites/[id]/
│       ├── actions.ts                  # Server actions crawl
│       ├── page.tsx                    # Page détail site (à modifier)
│       └── _components/
│           ├── crawl-status.tsx        # Statut temps réel
│           ├── start-crawl-form.tsx    # Config crawl
│           └── page-list.tsx           # Liste pages crawlées
├── lib/
│   ├── inngest/
│   │   ├── client.ts                   # Client Inngest
│   │   └── functions/
│   │       └── crawl-website.ts        # Fonction background
│   └── crawler/
│       ├── index.ts                    # Exports
│       ├── crawler.ts                  # Classe WebCrawler
│       ├── page-analyzer.ts            # Analyse DOM
│       ├── category-detector.ts        # Détection catégorie RGAA
│       ├── url-utils.ts                # Normalisation URL
│       └── types.ts                    # Types
└── drizzle/
    └── schema.ts                       # Nouvelles tables
```

---

## Étapes d'Implémentation

### Phase 1 : Infrastructure
1. Installer dépendances : `bun add inngest playwright`
2. Installer Chromium : `npx playwright install chromium`
3. Créer le client Inngest (`lib/inngest/client.ts`)
4. Créer la route API Inngest (`app/api/inngest/route.ts`)
5. Ajouter les nouvelles tables au schéma Drizzle
6. Générer et appliquer la migration : `bun run db:generate && bun run db:migrate`

### Phase 2 : Core Crawler
7. Créer `url-utils.ts` : normalisation URL, détection liens internes
8. Créer `category-detector.ts` : patterns URL + analyse DOM pour catégorisation RGAA
9. Créer `crawler.ts` : classe WebCrawler avec Playwright
   - Gestion queue BFS avec limite profondeur
   - Extraction liens
   - Analyse caractéristiques page
   - Respect délais entre requêtes

### Phase 3 : Background Job
10. Créer `crawl-website.ts` : fonction Inngest avec steps
    - Step 1: Marquer job "running"
    - Step 2: Exécuter crawl
    - Step 3: Sauvegarder pages
    - Step 4: Auto-sélectionner pages obligatoires
    - Step 5: Marquer job "completed"

### Phase 4 : Interface
11. Créer server actions (`sites/[id]/actions.ts`)
    - `startCrawl()` : démarrer crawl
    - `getCrawlStatus()` : statut job
    - `getCrawledPages()` : liste pages
    - `togglePageSelection()` : sélection manuelle
12. Créer composant `start-crawl-form.tsx` : formulaire config
13. Créer composant `crawl-status.tsx` : barre progression
14. Créer composant `page-list.tsx` : tableau pages avec filtres par catégorie
15. Intégrer dans `sites/[id]/page.tsx`

### Phase 5 : Tests & Finalisation
16. Tester avec différents types de sites (statique, SPA)
17. Ajuster heuristiques de détection
18. Gérer cas limites (infinite scroll, routing client)

---

## Fichiers Critiques à Modifier

| Fichier | Action |
|---------|--------|
| `apps/web/lib/db/schema/index.ts` | Ajouter tables crawl_job, crawled_page |
| `apps/web/app/admin/(authenticated)/sites/[id]/page.tsx` | Intégrer composants crawl |
| `apps/web/package.json` | Ajouter inngest, playwright |

## Nouveaux Fichiers à Créer

- `apps/web/lib/inngest/client.ts`
- `apps/web/lib/inngest/functions/crawl-website.ts`
- `apps/web/app/api/inngest/route.ts`
- `apps/web/lib/crawler/crawler.ts`
- `apps/web/lib/crawler/category-detector.ts`
- `apps/web/lib/crawler/url-utils.ts`
- `apps/web/lib/crawler/types.ts`
- `apps/web/app/admin/(authenticated)/sites/[id]/actions.ts`
- `apps/web/app/admin/(authenticated)/sites/[id]/_components/start-crawl-form.tsx`
- `apps/web/app/admin/(authenticated)/sites/[id]/_components/crawl-status.tsx`
- `apps/web/app/admin/(authenticated)/sites/[id]/_components/page-list.tsx`

---

## Variables d'Environnement Requises

```env
INNGEST_EVENT_KEY=xxx
INNGEST_SIGNING_KEY=xxx
```

---

## Considérations Déploiement

Pour Vercel, Playwright nécessite soit :
- Bundle `@playwright/browser-chromium` (plus léger)
- Ou service externe (Browserless, Apify) pour l'exécution navigateur

Alternative locale : le crawler fonctionne tel quel en développement.

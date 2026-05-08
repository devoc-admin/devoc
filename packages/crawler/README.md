# @dev-oc/crawler

Crawler web qui extrait pages, métadonnées et technologies détectées.

## Description

Package interne (TypeScript, ESM) construit autour de **Playwright** et **Wapalyzer**, avec stockage optionnel via `@vercel/blob` et traitement d'images via `sharp`. Réutilise `@dev-oc/utils/url` pour la normalisation d'URL.

Fonctionnalités principales :

- `WebCrawler` — orchestration du crawl (file de pages, limites, callbacks de progression) ;
- détecteurs spécialisés : SEO (`detectSeo`), contact (`detectContactInfo`), auteurs (`detectAuthor`), pages catégorie (`detectCategoryPage`), langues (`detectLanguages`) ;
- helpers d'URL (`isInternalUrl`, `normalizeUrl`, `toAbsoluteUrl`, `shouldCrawlUrl`).

Consommé par `apps/web` (prospection, fiches collectivités).

## API publique (extrait)

```ts
import {
  WebCrawler,
  detectSeo,
  detectContactInfo,
  type CrawlConfig,
  type CrawlResult,
} from "@dev-oc/crawler";

const crawler = new WebCrawler(config);
const result = await crawler.crawl(startUrl);
```

Types exportés depuis `@dev-oc/crawler/types`.

## Structure

```
packages/crawler/
├── src/
│   ├── core/        # Orchestrateur de crawl (Playwright)
│   ├── detectors/   # SEO, contact, auteur, langue, catégorie...
│   ├── utils/       # url-utils, helpers internes
│   ├── index.ts     # API publique
│   └── types.ts     # Types partagés
```

## Tests

```bash
bun test
```

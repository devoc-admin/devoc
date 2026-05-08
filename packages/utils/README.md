# @dev-oc/utils

Helpers TypeScript transverses, partagés entre apps et packages du monorepo.

## Description

Petit package ESM exposant des utilitaires sans dépendances. Sous-chemins exportés :

- **`@dev-oc/utils/url`** — normalisation et validation d'URL :
  `isInternalUrl`, `normalizeUrl`, `toAbsoluteUrl`, `isValidUrlFormat`, `isValidMapsUrl`.
- **`@dev-oc/utils/dates`** — emplacement réservé pour des helpers de date (à venir).

## Usage

```ts
import { normalizeUrl, isInternalUrl } from "@dev-oc/utils/url";

const url = normalizeUrl("HTTPS://Example.com//foo");
const internal = isInternalUrl("https://example.com/page", "https://example.com");
```

## Structure

```
packages/utils/
├── src/
│   ├── url/         # url-utils, validation
│   └── dates/       # placeholder
└── package.json     # exports: ./url, ./dates
```

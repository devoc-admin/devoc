# @dev-oc/auditer

Auditeur d'accessibilité **RGAA** programmable (tests automatisés et semi-automatisés).

## Description

Package interne (TypeScript, ESM) qui expose `RgaaAuditer` et les types associés pour exécuter des audits RGAA sur une page web. S'appuie sur **Playwright** pour l'instrumentation du navigateur. Les critères RGAA sont déclarés dans `src/criteria/`.

Pensé pour être consommé par d'autres apps/packages du monorepo (ex. `apps/web`, `packages/accessibility-tester`).

## API publique

```ts
import {
  RgaaAuditer,
  computeOverallStatus,
  type AuditConfig,
  type PageAuditResult,
  type CriterionResult,
} from "@dev-oc/auditer";

const auditer = new RgaaAuditer(config);
const result = await auditer.audit(url);
```

Types exportés depuis le sous-chemin `@dev-oc/auditer/types`.

## Structure

```
packages/auditer/
├── src/
│   ├── core/        # Cœur de l'auditeur (Playwright)
│   ├── criteria/    # Implémentation des critères RGAA
│   ├── utils/       # Helpers (DOM, sérialisation, ...)
│   ├── index.ts     # API publique
│   └── types.ts     # Types partagés
```

## Tests

```bash
bun test
```

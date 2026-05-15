# chrome-extension

**Dev-OC Accessibility Auditor** — extension Chrome (Manifest V3) qui lance un audit d'accessibilité directement depuis le navigateur sur l'onglet actif.

## Description

Extension construite avec Vite + `@crxjs/vite-plugin`, React 19 et Tailwind v4. Permissions: `activeTab`, `scripting`. Composée d'un popup React, d'un service worker et de scripts de contenu injectés dans la page auditée.

Source dans `src/` : `popup/`, `background/`, `content/`. Le `manifest.json` à la racine décrit l'extension et ses points d'entrée.

## Démarrage

```bash
direnv allow      # première fois
bun dev           # vite dev (HMR)
bun run build     # produit dist/
```

Pour charger l'extension dans Chrome :
1. `bun run build`
2. Ouvrir `chrome://extensions`
3. Activer le mode développeur, puis « Charger l'extension non empaquetée » → sélectionner `apps/chrome-extension/dist`.

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Vite en mode dev |
| `bun run build` | Build production (sortie `dist/`) |
| `bun lint` | Lint via ultracite |
| `bun run format` | Format Biome |
| `bun run types` | Vérification TypeScript |

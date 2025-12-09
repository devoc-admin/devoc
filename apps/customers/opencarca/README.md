## OpenCarca 2025 — Présentation (apps/customers/opencarca)

Projet de présentation pour la compétition entrepreneuriale OpenCarca 2025.
Stack: Next.js (App Router) + TypeScript strict + Tailwind v4 + SwiperJS.

### Démarrage rapide

```bash
direnv allow          # une fois, si direnv est installé
just install          # installe les dépendances via le parent
just dev              # lance le serveur (Turbopack)
```

URL par défaut: http://localhost:3000

### Commandes (via just)
- `just dev`: mode développement (Turbopack)
- `just build`: build de production
- `just lint`: lint (ultracite via bunx)
- `just format`: format avec Biome
- `just types`: vérification TypeScript

### Outillage aligné au monorepo
- Direnv (`.envrc`) pour auto-install et PATH
- Justfile pour commandes locales
- Biome pour format/lint
- Tailwind v4 via `@tailwindcss/postcss`

### SwiperJS
Une démo minimale est disponible dans `app/page.tsx`:
- import des composants depuis `swiper/react`
- import des styles `swiper/css`

Adapter les slides pour la présentation (vision, problèmes, roadmap, etc.).

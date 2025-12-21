# Accessibility Tester

Outil d'audit RGAA 4.1 et RGPD pour agences web ciblant les collectivites francaises (mairies, EPCI, etc.).

## Fonctionnalites

- **Audit RGAA 4.1**: Detection automatique des non-conformites via Axe-core avec mapping vers les 106 criteres RGAA
- **Audit RGPD**: Detection cookies/trackers avant consentement, banniere cookies, HTTPS
- **Detection CMS**: WordPress, Drupal, TYPO3, Concrete5, SPIP, Joomla
- **Detection Consent Managers**: Tarteaucitron, Axeptio, Cookiebot, Orejime, Didomi
- **Audit Lighthouse**: Accessibilite, Performance, SEO, Bonnes pratiques
- **Batch Audit**: Audit en masse depuis fichier CSV de prospection
- **Calcul de scores**: Scores RGAA/RGPD en pourcentage + priorite commerciale

## Installation

```bash
bun install
```

## Usage

### Audit simple (une URL)

```bash
bun run audit:single https://example.com
```

### Audit RGAA seul

```bash
bun run audit:rgaa https://example.com
```

### Audit batch (CSV)

Auditer tous les prospects d'un fichier CSV:

```bash
bun run audit:batch prospects.csv
```

Options disponibles:

```bash
bun run audit:batch prospects.csv --concurrency 5      # 5 audits en parallele
bun run audit:batch prospects.csv --skip-audited       # Ignorer les deja audites
bun run audit:batch prospects.csv --priority 5         # Uniquement priorite 5
bun run audit:batch prospects.csv --output-dir ./out   # Dossier de sortie
```

## Format CSV

Le fichier CSV doit contenir les colonnes suivantes:

| Colonne | Description |
|---------|-------------|
| Nom | Nom de la collectivite |
| Type | CA, CC, Commune, CCAS, etc. |
| Site_web | URL du site a auditer |
| Statut_RGAA | conforme, partiel, non_conforme, non_audite |
| Score_RGAA | Score 0-100 |
| Score_RGPD | Score 0-100 |
| Priorite | 1-5 (5 = critique) |
| Problemes_RGAA | Liste des problemes RGAA |
| Problemes_RGPD | Liste des problemes RGPD |
| Technologies | CMS, plugins detectes |

## Scores

### Score RGAA (0-100%)

- **100%**: Conforme
- **75-99%**: Partiellement conforme
- **< 75%**: Non conforme

### Score RGPD (0-100%)

Penalites:
- Site non HTTPS: -30 points
- Cookies avant consentement: -5 points par cookie (max -25)
- Trackers sans consentement: -15 points par tracker (max -45)
- Banniere cookies absente: -20 points

### Priorite commerciale (1-5)

- **5 (Critique)**: Violations CNIL directes ou scores < 20%
- **4 (Haute)**: Scores < 40% + population > 5000
- **3 (Moyenne)**: Scores < 60%
- **2 (Basse)**: Scores < 80%
- **1 (Tres basse)**: Globalement conforme

## Structure du projet

```
packages/accessibility-tester/
├── src/
│   ├── core/
│   │   ├── browser.ts      # Singleton browser Puppeteer
│   │   └── types.ts        # Types TypeScript
│   ├── auditors/
│   │   └── rgpd.ts         # Audit RGPD + detection techno
│   ├── scoring/
│   │   └── rgaa-score.ts   # Calcul scores et priorites
│   ├── batch/
│   │   ├── batch-auditor.ts    # Orchestration batch
│   │   └── csv-processor.ts    # Lecture/ecriture CSV
│   └── index.ts            # Exports
├── data/
│   └── rgaa.json           # Referentiel RGAA 4.1
├── reports/                # Rapports generes
├── index.ts                # CLI audit simple (legacy)
├── rgaa-audit.ts           # CLI audit RGAA (legacy)
└── rgpd.ts                 # Module RGPD (legacy)
```

## API Programmatique

```typescript
import { auditSingleUrl, batchAudit } from 'accessibility-tester'

// Audit simple
const result = await auditSingleUrl('https://mairie-example.fr')
console.log(result.rgaa.score) // 45
console.log(result.priority)   // 5

// Audit batch
const { audited, failed, results } = await batchAudit({
  csvPath: './prospects.csv',
  outputDir: './reports',
  concurrency: 3,
  updateCsv: true,
  skipAudited: true
})
```

## Trackers detectes

- Google Analytics / GTM
- Facebook Pixel
- Google Ads
- Google Fonts
- Matomo/Piwik
- Hotjar
- LinkedIn Insight
- Twitter Pixel
- YouTube embeds

## Consent Managers detectes

- Tarteaucitron
- Axeptio
- Cookiebot
- Orejime
- Didomi
- OneTrust
- CookieYes
- Complianz

## CMS detectes

- WordPress (+ version, plugins: Elementor, Divi, Yoast, etc.)
- Drupal
- TYPO3
- Joomla
- SPIP
- Concrete5

## Dependances

- **puppeteer**: Automatisation navigateur
- **@axe-core/puppeteer**: Tests accessibilite
- **lighthouse**: Audit performance/accessibilite
- **chrome-launcher**: Lancement Chrome headless

## Licence

MIT

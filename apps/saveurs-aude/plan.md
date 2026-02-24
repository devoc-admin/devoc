# Saveurs d'Aude — Spécification technique et fonctionnelle

## Contexte

Saveurs d'Aude est un site e-commerce fictif réalisé en démonstration commerciale pour prouver que la stack **Next.js / Payload CMS / Vercel** est une alternative viable à WordPress pour un commerce local. Le site présente une boutique de spécialités audoises basée à Carcassonne, avec vente en ligne (livraison + click & collect).

Le design s'inspire d'une esthétique nostalgique et artisanale (type Comptoir de Mathilde), sans surcharge d'animations.

---

## Stack technique

| Outil | Rôle |
|---|---|
| **Next.js 15** (App Router) | Framework principal, SSR/SSG |
| **TypeScript** | Typage strict |
| **Payload CMS 3** | CMS headless intégré en plugin Next.js |
| **Drizzle ORM** | ORM (utilisé via Payload + PostgreSQL adapter) |
| **PostgreSQL (Neon)** | Base de données |
| **Tailwind CSS 4** | Styles utilitaires |
| **Biome** | Linter + formatter (remplace ESLint + Prettier) |
| **Bun** | Runtime + package manager |
| **Vercel** | Hébergement + déploiement |
| **Vercel Blob Storage** | Stockage des images et assets (via `@payloadcms/storage-vercel-blob`) — voir note ci-dessous |
| **Vercel Analytics** | Analytics privacy-friendly |
| **GitHub** | Dépôt de code |
| **GitHub Actions** | CI/CD |
| **Stripe Checkout** | Paiement en ligne |
| **Resend + react-email** | Emails transactionnels + newsletter |
| **next-intl** | i18n (routing + textes statiques) |
| **Payload localized fields** | i18n du contenu dynamique CMS |
| **Nuqs** | Gestion des search params (filtres catalogue) |
| **Zod** | Validation de schémas |
| **Motion** | Animations légères (anciennement Framer Motion) |
| **Tanstack Form** | Gestion des formulaires |

### Note : Vercel Blob Storage + Payload 3

L'adapter officiel `@payloadcms/storage-vercel-blob` existe et est maintenu par l'équipe Payload. Cependant, plusieurs limitations sont documentées (février 2026) :

| Problème | Impact | Contournement |
|---|---|---|
| **Limite 4.5 MB** upload serveur (contrainte Vercel serverless) | Fichiers > 4.5 MB échouent | Activer `clientUploads: true` |
| **Client uploads intermittents** (issue #14709) | Échecs sporadiques avec "unsupported file type" | Retry ou réduction des uploads en masse |
| **Image cropping corrompu** (issue #15267) | WebP/JPEG corrompus après crop | Désactiver le crop ou cropper avant upload |
| **SSRF blocking** sur crop (contrainte Vercel) | Crop serveur bloqué par Vercel | Crop côté client uniquement |

**Décision** : on utilise Vercel Blob avec `clientUploads: true` et sans crop serveur. Si les bugs client uploads sont trop bloquants à l'étape 1, on bascule sur **Cloudflare R2 via `@payloadcms/storage-s3`** (S3-compatible, free tier généreux, pas de limite upload). Cette décision sera prise à l'étape 1 après test.

---

## Principes de code

### Référence architecturale

L'architecture et les patterns de code s'inspirent directement de **`dev-oc/apps/web/app/admin`** (projet existant du développeur). Les conventions suivantes doivent être reproduites et adaptées au contexte Payload CMS :

### Patterns à reproduire

**Structure par feature :**
```
[feature]/
├── page.tsx                    # Server Component mince : Suspense + Skeleton
├── [feature].tsx               # Client Component principal
├── [feature]-context.tsx       # React Context : état + queries + mutations
├── [feature]-actions.ts        # "use server" — requêtes DB / mutations
├── [feature]-queries.ts        # queryOptions() + hooks useXxx()
├── [feature]-mutations.ts      # useMutation() hooks
├── [feature]-keys.ts           # Query key factories
└── _components/                # Composants privés de la feature
```

**Pages Server Component minces :**
```tsx
// page.tsx — délègue immédiatement
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}
```

**Actions serveur avec `ActionResult<T>` :**
```tsx
// Type discriminé universel dans /lib/api.ts
export type ActionResult<T = void> = ActionSuccess<T> | ActionFailure;

// Chaque action : try/catch + getErrorMessage
export async function createProduct(data: NewProduct): Promise<ActionResult<Product>> {
  try {
    const result = await db.insert(products).values(data).returning();
    return { success: true, response: result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
```

**Types dérivés, jamais dupliqués :**
```tsx
type: only (jamais interface)
// Types dérivés du schéma : $inferSelect / $inferInsert
// Types dérivés des queries : Awaited<typeof query>
// Types de champs : Product["status"]
```

**Formulaires Tanstack Form :**
```tsx
// validators.onSubmit (sync) + onSubmitAsync (server action)
// <form.Subscribe> pour l'état de soumission
// ErrorMessage co-localisé en bas de fichier
```

**État URL avec Nuqs :**
```tsx
const [category, setCategory] = useQueryState("category");
const [sort, setSort] = useQueryState("sort", parseAsStringLiteral(sortOptions).withDefault("newest"));
```

**Styling :**
```tsx
// cn() multi-lignes groupées, shadcn/ui, Lucide icons
// React.ComponentProps<"div"> pour les wrappers primitifs
// Sous-composants privés co-localisés en bas de fichier
```

### Adaptations pour Payload CMS

Le projet Saveurs d'Aude utilise Payload CMS 3 intégré à Next.js, ce qui modifie certains patterns :

| Pattern dev-oc | Adaptation Saveurs d'Aude |
|---|---|
| Drizzle direct (`db.select()...`) | **Payload Local API** côté serveur (`payload.find()`, `payload.create()`) — Drizzle reste sous le capot via Payload |
| Actions retournant `ActionResult<T>` | Même pattern, mais les queries passent par Payload Local API au lieu de Drizzle direct |
| TanStack Query pour tout | Server Components + Payload Local API pour le rendu initial, TanStack Query uniquement pour les mutations et l'interactivité client |
| Schéma Drizzle comme source de types | Collections Payload comme source de types (types auto-générés par Payload) |

### Exigences de qualité

Le code produit doit être **concis, moderne et idiomatique**. Chaque ligne doit justifier sa présence.

- **Pas de verbosité inutile** : pas de commentaires évidents, pas de types redondants quand l'inférence TypeScript suffit, pas de wrappers superflus
- **Abstractions intelligentes** : factoriser quand un pattern se répète 3+ fois, jamais avant. Une abstraction prématurée est pire que la duplication
- **API modernes en priorité** : toujours utiliser les API, syntaxes et méthodes les plus récentes de chaque librairie
  - Next.js 15 : App Router, Server Components par défaut, `use()`, server actions, `unstable_cache` / `cacheLife`, Partial Prerendering si stable
  - React 19 : `use()`, `useActionState`, `useOptimistic`, `<form action={}>` natif
  - TypeScript : `satisfies`, `const` assertions, template literal types quand pertinent
  - Tailwind CSS 4 : nouvelle syntaxe CSS-first (`@theme`, `@variant`), pas de `tailwind.config.ts` si évitable
  - Payload CMS 3 : Local API privilégiée côté serveur, hooks typés, access control déclaratif
- **Server-first** : tout ce qui peut rester côté serveur y reste. `"use client"` uniquement quand nécessaire (interactivité, hooks React client)
- **Pas de sur-engineering** : pas de feature flags, pas de shims de compatibilité, pas de helpers pour un seul usage, pas d'abstraction "au cas où"
- **Nommage clair** : noms de variables/fonctions explicites, en anglais, cohérents dans tout le projet

### Outils d'aide à la qualité

Pour atteindre ces objectifs, les outils suivants seront utilisés pendant le développement :

| Outil | Rôle |
|---|---|
| **Context7 MCP** (déjà connecté) | Consultation de la documentation à jour de chaque librairie pour toujours utiliser les API les plus récentes |
| **Biome** | Lint + format automatique, détection de patterns obsolètes |
| **TypeScript strict mode** | `strict: true`, `noUncheckedIndexedAccess`, inférence maximale |

### MCPs et plugins recommandés

Pour améliorer la qualité du code produit, les MCPs/plugins suivants peuvent être activés :

| MCP / Plugin | Ce qu'il apporte |
|---|---|
| **Context7** (actif) | Doc à jour de Next.js, Payload, Tailwind, Stripe, etc. — évite les API dépréciées |
| **@anthropic/claude-code-prettier** ou **Biome plugin** | Format automatique à chaque écriture de fichier |
| **MCP Playwright** (`@anthropic/mcp-playwright`) | Test visuel des pages rendues — vérification du rendu sans quitter le terminal |
| **MCP Stripe** (officiel Stripe) | Interaction directe avec l'API Stripe pour créer/tester les webhooks, produits, sessions |
| **MCP Sentry** | Si monitoring d'erreurs souhaité en production |

> **À valider** : souhaites-tu que j'active des MCPs supplémentaires avant de démarrer, ou on avance avec Context7 + Figma + Atlassian déjà connectés ?

---

## Architecture

### Monorepo unique

Payload 3 s'intègre directement dans le projet Next.js. Un seul repo, un seul déploiement Vercel.

```
saveurs-aude/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/         # Route group : site public
│   │   │   ├── [locale]/       # Routes i18n (/fr, /en)
│   │   │   │   ├── page.tsx                # Accueil
│   │   │   │   ├── boutique/               # Catalogue produits
│   │   │   │   │   ├── page.tsx            # Liste produits + filtres
│   │   │   │   │   └── [slug]/page.tsx     # Fiche produit
│   │   │   │   ├── panier/page.tsx         # Panier
│   │   │   │   ├── commande/               # Tunnel de commande
│   │   │   │   │   ├── page.tsx            # Formulaire livraison/retrait
│   │   │   │   │   ├── paiement/page.tsx   # Redirection Stripe
│   │   │   │   │   └── confirmation/page.tsx
│   │   │   │   ├── a-propos/page.tsx       # Histoire et valeurs
│   │   │   │   ├── blog/                   # Blog / Actualités
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/page.tsx
│   │   │   │   ├── avis/page.tsx           # Témoignages clients
│   │   │   │   ├── faq/page.tsx            # FAQ
│   │   │   │   ├── contact/page.tsx        # Formulaire de contact
│   │   │   │   ├── compte/                 # Espace client (optionnel)
│   │   │   │   │   ├── page.tsx            # Dashboard
│   │   │   │   │   ├── commandes/page.tsx  # Historique commandes
│   │   │   │   │   └── profil/page.tsx     # Infos personnelles
│   │   │   │   ├── mentions-legales/page.tsx
│   │   │   │   ├── politique-confidentialite/page.tsx
│   │   │   │   └── cgv/page.tsx
│   │   │   └── layout.tsx
│   │   └── (payload)/          # Route group : admin CMS
│   │       └── admin/[[...segments]]/page.tsx
│   ├── payload/
│   │   ├── collections/        # Collections Payload
│   │   ├── globals/            # Globals Payload (config site)
│   │   ├── hooks/              # Hooks Payload (avant/après save)
│   │   └── access/             # Politiques d'accès
│   ├── components/             # Composants React réutilisables
│   ├── lib/                    # Utilitaires, helpers, config Stripe
│   ├── emails/                 # Templates react-email
│   ├── messages/               # Fichiers i18n JSON (fr.json, en.json)
│   └── types/                  # Types TypeScript partagés
├── public/                     # Assets statiques (favicon, fonts)
├── payload.config.ts
├── next.config.ts
├── drizzle.config.ts
├── biome.json
├── tailwind.config.ts
└── package.json
```

---

## Collections Payload CMS

### Products (Produits)

```
- title: text (localized)
- slug: text (auto-generated)
- description: richText (localized)
- shortDescription: text (localized)
- category: relationship → Category
- images: array of upload (Vercel Blob)
- variants: array
  - label: text (localized) — ex: "250g", "500g"
  - price: number (centimes)
  - sku: text
  - stock: number
  - weight: number (grammes, pour calcul livraison)
- featured: boolean (mise en avant page d'accueil)
- status: select [draft, published, archived]
- promotion: group (optionnel)
  - type: select [percentage, fixed]
  - value: number
  - startDate: date
  - endDate: date
- seo: group (title, description, image)
```

### Categories

```
- title: text (localized)
- slug: text
- description: richText (localized)
- image: upload
- order: number (tri d'affichage)
```

### Orders (Commandes)

```
- orderNumber: text (auto-generated, ex: SA-20260221-001)
- customer: relationship → Customers (si connecté) OU group inline
  - email: email
  - firstName: text
  - lastName: text
  - phone: text
- items: array
  - product: relationship → Products
  - variant: text (label de la variante choisie)
  - quantity: number
  - unitPrice: number
- deliveryMethod: select [shipping, clickAndCollect]
- shippingAddress: group (si shipping)
  - street: text
  - city: text
  - zipCode: text
  - country: text
- shippingCost: number
- totalAmount: number
- status: select [pending, confirmed, preparing, shipped, ready, delivered, collected, cancelled]
- trackingNumber: text (optionnel)
- stripeSessionId: text
- stripePaymentIntentId: text
- notes: textarea (notes internes admin)
- createdAt / updatedAt: auto
```

### Customers (Clients)

Collection auth Payload (login/password).

```
- email: email (unique)
- firstName: text
- lastName: text
- phone: text
- addresses: array
  - label: text (ex: "Domicile", "Bureau")
  - street: text
  - city: text
  - zipCode: text
  - country: text
- newsletter: boolean
```

### BlogPosts (Articles)

```
- title: text (localized)
- slug: text
- excerpt: text (localized)
- content: richText (localized)
- coverImage: upload
- author: text
- tags: array of text
- publishedAt: date
- status: select [draft, published]
- seo: group
```

### Reviews (Avis clients)

```
- customerName: text
- rating: number (1-5)
- comment: text (localized si traduit par admin)
- product: relationship → Products (optionnel, avis général ou spécifique)
- approved: boolean (modération manuelle)
- createdAt: auto
```

### FAQ

```
- question: text (localized)
- answer: richText (localized)
- category: text (localized) — ex: "Livraison", "Produits", "Commandes"
- order: number
```

### Pages (pages statiques)

```
- title: text (localized)
- slug: text
- content: richText (localized)
- seo: group
```

Utilisé pour : mentions légales, politique de confidentialité, CGV, à propos.

### Media

```
- file: upload (Vercel Blob Storage adapter)
- alt: text (localized)
- caption: text (localized)
```

---

## Globals Payload CMS

### SiteConfig

```
- siteName: text
- logo: upload
- favicon: upload
- socialLinks:
  - instagram: text (URL)
  - facebook: text (URL)
- contactInfo:
  - email: email
  - phone: text
  - address: text
- openingHours: array
  - day: select [lundi..dimanche]
  - openMorning: text (ex: "09:00")
  - closeMorning: text
  - openAfternoon: text
  - closeAfternoon: text
  - closed: boolean
- exceptionalClosures: array
  - date: date
  - reason: text (localized)
```

### ShippingConfig

```
- shippingCost: number (en centimes)
- freeShippingThreshold: number (en centimes, ex: 8000 = 80€)
- shippingZones: array (optionnel)
  - label: text
  - zipCodePrefix: text
  - cost: number
- clickAndCollectEnabled: boolean
- clickAndCollectInstructions: richText (localized)
```

### Homepage

```
- hero: group
  - title: text (localized)
  - subtitle: text (localized)
  - backgroundImage: upload
  - cta: group (label + link)
- featuredCategories: relationship → Categories (array)
- promotionBanner: group (optionnel)
  - text: text (localized)
  - link: text
  - active: boolean
```

### CookieConsent

```
- message: text (localized)
- acceptLabel: text (localized)
- rejectLabel: text (localized)
- privacyPolicyLink: text
```

---

## Fonctionnalités clés

### 1. Catalogue produits

- Liste paginée avec filtres (catégorie, prix, disponibilité, promotion) via **Nuqs**
- Recherche textuelle
- Tri (prix croissant/décroissant, nouveautés, popularité)
- Badge promo avec pourcentage/montant affiché
- Badge "Rupture de stock" si toutes les variantes à stock 0
- Fiche produit : galerie images, sélecteur de variante, description, produits similaires

### 2. Panier

- Stocké en **localStorage** (pas de panier serveur pour les invités)
- Synchro avec le compte client si connecté (stocké dans un cookie session ou via Payload)
- Calcul automatique des frais de port selon config CMS
- Affichage du seuil de gratuité avec barre de progression

### 3. Tunnel de commande

1. **Panier** → récapitulatif
2. **Infos client** → formulaire (Tanstack Form + Zod) OU pré-rempli si connecté
3. **Mode de livraison** → choix shipping/click & collect
4. **Paiement** → redirection Stripe Checkout
5. **Confirmation** → page de confirmation + email (Resend)

### 4. Espace client (optionnel)

- Inscription / connexion via Payload Auth (email + password)
- Historique des commandes avec statut en temps réel
- Gestion des adresses de livraison
- Modification du profil
- Inscription/désinscription newsletter

### 5. Blog

- Liste des articles avec pagination
- Filtrage par tags
- Article complet avec rich text (images, liens, etc.)
- SEO optimisé par article

### 6. Avis clients

- Page dédiée avec liste paginée
- Note moyenne affichée
- Modération manuelle dans Payload (champ `approved`)
- Possibilité d'associer un avis à un produit

### 7. FAQ

- Accordéons regroupés par catégorie
- Gérée entièrement depuis Payload

### 8. Formulaire de contact

- Champs : nom, email, sujet, message
- Validation Zod + Tanstack Form
- Envoi email au gérant via Resend
- Email de confirmation automatique au client
- Protection anti-spam (honeypot + rate limiting)

### 9. Newsletter

- Formulaire d'inscription (footer + page dédiée optionnelle)
- Stockage des abonnés : champ `newsletter: boolean` sur la collection Customers + une collection `NewsletterSubscribers` pour les non-inscrits
- Envoi via Resend (campagnes manuelles depuis un outil externe ou script)

### 10. Horaires et fermetures

- Affichés dans le footer et sur la page contact
- Badge "Ouvert maintenant" / "Fermé" calculé dynamiquement
- Fermetures exceptionnelles affichées en bannière si date proche

---

## Internationalisation (FR + EN)

### Stratégie

- **next-intl** pour le routing (`/fr/...`, `/en/...`) et les textes statiques (navigation, boutons, labels)
- **Payload localized fields** pour tout le contenu dynamique (produits, articles, FAQ, pages, etc.)
- Locale par défaut : `fr`
- Détection automatique de la langue du navigateur au premier accès
- Sélecteur de langue dans le header

### Fichiers de traduction

```
src/messages/
├── fr.json   # Textes statiques français
└── en.json   # Textes statiques anglais
```

---

## SEO

- **Metadata dynamiques** : chaque page/produit/article a ses propres title + description via le groupe `seo` dans Payload
- **sitemap.xml** : auto-généré via `next-sitemap` ou la fonctionnalité native Next.js (`app/sitemap.ts`)
- **robots.txt** : généré via `app/robots.ts`
- **Open Graph + Twitter Cards** : images et descriptions pour le partage social
- **JSON-LD** :
  - `LocalBusiness` sur la page d'accueil et contact
  - `Product` sur chaque fiche produit
  - `BreadcrumbList` sur toutes les pages
  - `FAQPage` sur la page FAQ
  - `BlogPosting` sur les articles
- **Fil d'Ariane** : sur toutes les pages (sauf accueil)
- **URLs canoniques** : gérées par locale
- **Balises hreflang** : générées automatiquement par next-intl

---

## Emails (Resend + react-email)

### Templates à créer

| Email | Déclencheur | Destinataire |
|---|---|---|
| Confirmation de commande | Après paiement Stripe réussi | Client |
| Changement de statut | Modification statut dans Payload | Client |
| Expédition + n° suivi | Ajout tracking number | Client |
| Prête pour retrait | Statut → "ready" (click & collect) | Client |
| Nouvelle commande | Après paiement réussi | Admin/gérant |
| Message de contact | Soumission formulaire contact | Admin/gérant |
| Confirmation contact | Soumission formulaire contact | Client |
| Bienvenue | Création de compte | Client |
| Inscription newsletter | Ajout à la liste | Abonné |

---

## Paiement (Stripe Checkout)

- Création d'une session Stripe Checkout via **server action** Next.js
- Les `line_items` sont construits côté serveur à partir du panier
- Webhook Stripe (`/api/stripe/webhook`) pour confirmer le paiement et créer la commande dans Payload
- Gestion des erreurs : page d'échec de paiement avec possibilité de réessayer
- Montants en centimes (standard Stripe)
- Métadonnées Stripe : `orderId`, `customerEmail`, `deliveryMethod`

---

## Design et identité visuelle

### Direction artistique

Ambiance **nostalgique, artisanale et chaleureuse**, évoquant la chaleur d'une vieille maison de village du Sud de la France. Inspirée des épiceries fines traditionnelles, avec des matières naturelles (bois, terre cuite, lin, cuivre) traduites visuellement.

### Palette de couleurs

Palette volontairement **neutre et chaude**, centrée sur les tons crème, marron et cuivre. Pas de couleurs vives — l'accent vient des photos produits qui ressortent sur les fonds doux.

| Rôle | Couleur | Hex | Évocation |
|---|---|---|---|
| Fond principal | Crème lin | `#FAF3E8` | Nappe ancienne, mur crépi |
| Fond secondaire | Sable chaud | `#EDE0CC` | Pierre de Carcassonne |
| Fond tertiaire | Beige rosé | `#E8D5C0` | Terre cuite claire |
| Primaire | Marron chaud | `#6B3A2A` | Bois de chêne, cacao |
| Primaire hover | Marron foncé | `#4A2518` | Chocolat noir |
| Accent | Cuivre | `#B87333` | Casserole en cuivre, miel |
| Accent clair | Cuivre doré | `#D4956A` | Cuivre patiné |
| Texte principal | Brun profond | `#2C1810` | Encre sépia |
| Texte secondaire | Brun grisé | `#6B5E54` | Pierre vieillie |
| Bordures/séparateurs | Beige foncé | `#D1C4B2` | Lin naturel |
| Succès (stock) | Vert sauge | `#7A8B6F` | Olive, herbes séchées |
| Erreur/promo | Terracotta | `#A0522D` | Terre cuite, brique |

### Typographies (Google Fonts)

- **Titres** : `Playfair Display` (serif élégant, esprit rétro — évoque les enseignes anciennes)
- **Corps** : `Lato` ou `Source Sans 3` (sans-serif lisible, contraste moderne)
- **Accents/prix** : `Cormorant Garamond` (serif raffiné, esprit carte de restaurant)

### Workflow design

Le design est guidé par des **références visuelles concrètes**, pas par génération à l'aveugle.

1. **Moodboard Figma** : le développeur prépare un fichier Figma avec captures d'écran, détails UI, ambiances qui l'inspirent. Analysé via Figma MCP (`get_design_context` / `get_screenshot`).
2. **URLs d'inspiration** : les sites de référence sont analysés via Playwright (screenshots) + WebFetch (structure) pour en extraire les patterns visuels concrets (espacement, proportions, rythme, hiérarchie).
3. **Skill `frontend-design`** : utilisée systématiquement pour la création de chaque composant/page — génère du code UI production-grade en évitant l'esthétique générique AI.
4. **Vérification Playwright** : après chaque page/composant, screenshot du rendu réel dans le navigateur pour itérer visuellement.
5. **Validation humaine** : chaque page est soumise au développeur avant de passer à la suivante.

**Sites de référence :**
- [Le Comptoir de Mathilde](https://www.lecomptoirdemathilde.com/) — ambiance générale, épicerie fine
- [Confiserie du Tech](https://confiseriedutech.com/) — structure e-commerce similaire
- (à compléter par le développeur dans le moodboard Figma)

### Principes de design

- **Tons neutres dominants** : crème, sable, marron — la chaleur d'un intérieur ancien
- **Les produits sont les seules touches de couleur vive** : les photos ressortent naturellement sur les fonds doux
- Beaucoup d'espace (fond crème) pour aérer, jamais d'étouffement visuel
- Textures subtiles en arrière-plan possibles (papier kraft, lin, grain de bois très léger en opacité basse)
- Photos produits de haute qualité sur fonds neutres cohérents
- Animations subtiles au scroll avec Motion (fade-in, légers parallaxes)
- Pas de surcharge : max 2-3 animations par page
- Composants avec bordures arrondies douces (border-radius modéré)
- Ombres légères, chaudes (teintées marron, pas de gris froid)
- Boutons principaux en marron chaud avec texte crème
- Liens et éléments interactifs en cuivre
- Séparateurs fins en beige foncé plutôt que des lignes grises

### Patterns design de référence

Patterns récurrents identifiés chez les meilleurs sites e-commerce terroir/artisanal :

- **Photo produit "hero" en grand format** : éclairage naturel, ambiance terroir mais contemporaine (bois clair, lin, céramique artisanale)
- **Typo serif moderne** (pas de script "calligraphie de grand-mère") — polices comme Playfair Display, Cormorant, Noto Serif
- **Palette terroir désaturée** : crème, terracotta doux, vert sauge, or chaud, noir mat
- **Whitespace généreux** — laisser respirer les produits
- **Storytelling du producteur intégré dans le parcours produit** (pas relégué en page "à propos")
- **Sections recettes comme contenu natif**, pas une annexe

---

## Produits et visuels

### Stratégie produits

Les spécialités proposées doivent provenir de la zone **Toulouse – Castelnaudary – Carcassonne – Narbonne – Perpignan** (Aude, Haute-Garonne, Pyrénées-Orientales). Elles doivent :

- Couvrir un **grand nombre de catégories** (épicerie sucrée, salée, conserves, condiments, vins/spiritueux, biscuits, confiseries, charcuterie sèche, fromages à pâte dure, miels, huiles, etc.)
- Être cohérentes avec une **petite enseigne artisanale** capable de les préparer ou de les sélectionner
- Avoir une **bonne durée de conservation** (conserves, bocaux, produits secs, confits, séchés, sous vide, alcools) — pas de plats frais périssables

### Processus

1. **Recherche** : identification des spécialités régionales authentiques
2. **Proposition** : liste complète soumise pour validation avant intégration
3. **Visuels** : recherche d'un outil de génération d'images produits (type Nano Banana ou alternative spécialisée) pour produire des photos cohérentes entre elles (même style, même fond, même lumière)
4. **Validation** : choix de l'outil + style visuel confirmé avant génération

### Infos à fournir

- Validation de la liste de spécialités proposée
- Choix de l'outil de génération visuelle après recommandation
- Style visuel souhaité (fond neutre crème ? mise en scène rustique ? packshot fond blanc ?)

---

## RGPD et conformité

- **Bannière cookies** : consentement avant activation de Vercel Analytics
- **Mentions légales** : page statique gérée dans Payload (collection Pages)
- **Politique de confidentialité** : idem
- **CGV** : idem (conditions générales de vente)
- **Vercel Analytics** : activé uniquement après consentement
- **Consentement** : stocké en cookie, géré via un composant React custom (pas de lib externe lourde)

---

## CI/CD (GitHub Actions)

### Workflow principal (sur push/PR vers `main`)

1. `bun install`
2. `biome check` (lint + format)
3. Type check (`tsc --noEmit`)
4. Build (`bun run build`)
5. Déploiement automatique via intégration Vercel-GitHub

### Environnements

- **Production** : branche `main` → déploiement auto Vercel
- **Preview** : chaque PR → déploiement preview Vercel

---

## Plan d'implémentation par étapes

L'implémentation se fait **étape par étape** pour valider chaque brique avant de passer à la suivante. À chaque étape, les informations nécessaires seront demandées avant de commencer.

### Étape 1 — Fondations

- Initialiser le projet Next.js 15 + Bun
- Configurer TypeScript, Biome, Tailwind CSS 4
- Intégrer Payload CMS 3 (plugin Next.js)
- Configurer Drizzle + Neon (base PostgreSQL)
- Configurer Vercel Blob Storage adapter pour Payload
- Mettre en place le repo GitHub + GitHub Actions (lint + build)
- **Vérification** : Payload admin accessible sur `/admin`, base connectée

**Prérequis — Infos à fournir :**
- `DATABASE_URI` — chaîne de connexion Neon PostgreSQL
- `PAYLOAD_SECRET` — clé secrète Payload (ou génération d'une valeur par défaut)
- `BLOB_READ_WRITE_TOKEN` — token Vercel Blob Storage
- Nom du repo GitHub souhaité (ex: `saveurs-aude`)
- Initialisation du repo Git + remote : à faire ensemble ou en autonomie ?

### Étape 2 — Collections CMS de base

- Créer les collections : Categories, Products (avec variantes + promotions), Media
- Créer les globals : SiteConfig, Homepage
- Insérer des données de test
- **Vérification** : CRUD fonctionnel dans Payload admin

**Prérequis — Infos à fournir :**
- Aucun. Validation du schéma avant insertion des données de test.

### Étape 3 — Recherche produits et visuels

- Recherche des spécialités régionales (zone Toulouse – Perpignan)
- Proposition de la liste complète pour validation
- Recherche et recommandation d'outils de génération de visuels produits (type Nano Banana ou alternative)
- **Vérification** : liste validée + outil choisi avant génération

**Prérequis — Infos à fournir :**
- Validation de la liste de spécialités
- Choix de l'outil de génération visuelle
- Style visuel souhaité

### Étape 4 — i18n

- Configurer next-intl (routing `/fr`, `/en`)
- Configurer les locales dans Payload (`fr`, `en`)
- Créer les fichiers de traduction de base (`fr.json`, `en.json`)
- **Vérification** : navigation entre les langues fonctionnelle

**Prérequis — Infos à fournir :**
- Aucun — configuration purement locale.

### Étape 5 — Layout et navigation

- Créer le layout principal (header, footer, navigation)
- Intégrer la direction artistique (couleurs, typographies, Tailwind theme)
- Afficher les infos dynamiques du CMS (logo, réseaux sociaux, horaires)
- Sélecteur de langue
- **Vérification** : layout responsive et cohérent sur mobile/desktop

**Prérequis — Infos à fournir :**
- Assets à intégrer (logo, images, favicons) — sinon placeholders
- Confirmation de la palette de couleurs et typographies, ou ajustements

### Étape 6 — Pages catalogue

- Page liste produits avec filtres (Nuqs) et pagination
- Fiche produit (galerie, variantes, stock, promo, produits similaires)
- Panier (localStorage + UI)
- **Vérification** : navigation catalogue fluide, panier fonctionnel

**Prérequis — Infos à fournir :**
- Aucun — repose sur les collections CMS déjà en place.

### Étape 7 — Commande et paiement

- Tunnel de commande (Tanstack Form + Zod)
- Intégration Stripe Checkout
- Webhook Stripe + création commande dans Payload
- Collection Orders
- **Vérification** : commande complète de bout en bout (test mode Stripe)

**Prérequis — Infos à fournir :**
- `STRIPE_SECRET_KEY` — clé secrète Stripe (mode test)
- `STRIPE_WEBHOOK_SECRET` — secret du webhook Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — clé publique Stripe
- URL du site pour configurer le webhook (ou configuration localhost dans un premier temps)

### Étape 8 — Branding assets (favicons & app icons)

- Générer un set complet de favicons et app icons à partir du logo via [RealFaviconGenerator](https://realfavicongenerator.net/favicon-generator/nextjs) (générateur dédié Next.js)
- Formats à produire : `favicon.ico`, SVG favicon, Apple Touch Icon (180x180), icônes PWA (192x192, 512x512), image Open Graph (1200x630)
- Intégrer les fichiers dans le projet Next.js (metadata dans le root layout)
- Réutiliser les assets pour les emails transactionnels, les réseaux sociaux et le manifest PWA
- **Vérification** : favicon visible dans l'onglet navigateur, Apple Touch Icon correct sur iOS, Favicon Checker de RealFaviconGenerator au vert

**Prérequis — Infos à fournir :**
- Logo source en haute résolution (SVG ou PNG 512x512 minimum)

### Étape 9 — Emails

- Configurer Resend
- Créer les templates react-email (confirmation commande, contact, etc.)
- Brancher les hooks Payload pour envoyer les emails au changement de statut
- **Vérification** : emails reçus à chaque étape clé

**Prérequis — Infos à fournir :**
- `RESEND_API_KEY` — clé API Resend
- Adresse email d'expédition (ex: `contact@saveurs-aude.fr`) — doit être vérifiée dans Resend
- Adresse email du gérant/admin pour recevoir les notifications

### Étape 10 — Espace client

- Collection Customers (auth Payload)
- Pages inscription, connexion, profil, historique commandes
- Synchronisation panier avec compte
- **Vérification** : parcours complet invité vs. connecté

**Prérequis — Infos à fournir :**
- Aucun — utilise l'auth intégrée Payload.

### Étape 11 — Contenu éditorial

- Collection BlogPosts + pages blog
- Collection Reviews + page avis
- Collection FAQ + page FAQ
- Pages statiques (mentions légales, CGV, confidentialité, à propos)
- **Vérification** : contenu créé dans Payload affiché correctement

**Prérequis — Infos à fournir :**
- Aucun. Choix entre contenu de démo réaliste ou placeholders.

### Étape 12 — SEO et conformité

- Metadata dynamiques sur toutes les pages
- Sitemap, robots.txt
- JSON-LD (LocalBusiness, Product, FAQPage, BlogPosting, BreadcrumbList)
- Bannière cookies + Vercel Analytics conditionnel
- Open Graph + Twitter Cards
- **Vérification** : audit Lighthouse SEO > 90, Rich Results Test Google

**Prérequis — Infos à fournir :**
- `NEXT_PUBLIC_SITE_URL` — URL de production du site (ex: `https://saveurs-aude.fr`)
- ID Vercel Analytics (ou récupération automatique via `@vercel/analytics`)

### Étape 13 — Config admin et livraison

- Global ShippingConfig (frais, seuils, zones)
- Calcul dynamique des frais dans le tunnel de commande
- Global CookieConsent
- **Vérification** : modification dans Payload reflétée côté front

**Prérequis — Infos à fournir :**
- Aucun — configuration éditable depuis Payload admin.

### Étape 14 — Newsletter et finitions

- Formulaire newsletter (footer)
- Collection/logique NewsletterSubscribers
- Formulaire de contact (Tanstack Form + Zod + Resend)
- Animations Motion (fade-in, transitions de page)
- Responsive final pass
- **Vérification** : test complet du site sur mobile et desktop

**Prérequis — Infos à fournir :**
- Aucun — Resend déjà configuré à l'étape 9.

### Étape 15 — Déploiement production

- Variables d'environnement Vercel (Stripe, Resend, Neon, Blob)
- Domaine custom (si applicable)
- CI/CD GitHub Actions finalisé
- Données de démo insérées
- **Vérification** : site live et fonctionnel

**Prérequis — Infos à fournir :**
- Nom de domaine custom (si applicable)
- Confirmation que toutes les variables d'environnement sont configurées dans Vercel Dashboard
- Accès au projet Vercel (ou liste des env vars à configurer manuellement)

---

## Résumé des étapes nécessitant des infos

| Étape | Infos requises |
|---|---|
| 1 — Fondations | Connexion BDD Neon, Blob Storage token, config GitHub |
| 3 — Produits/visuels | Validation liste spécialités, choix outil visuels |
| 5 — Layout | Assets visuels (logo, favicon) ou placeholders |
| 7 — Paiement | Clés Stripe (test mode) |
| 8 — Branding assets | Logo source haute résolution (SVG ou PNG 512x512+) |
| 9 — Emails | Clé Resend, emails expéditeur/admin |
| 12 — SEO | URL de production |
| 15 — Déploiement | Domaine, variables Vercel |

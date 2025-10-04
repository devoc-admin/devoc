# Configuration SEO - Dev'Oc

## Fichiers ajoutés pour le SEO

### 1. Sitemap (`app/sitemap.ts`)
- Génère automatiquement un sitemap.xml
- Inclut toutes les pages principales du site
- Met à jour automatiquement les dates de modification
- Priorise les pages importantes

### 2. Robots.txt (`app/robots.ts`)
- Autorise l'indexation des pages publiques
- Bloque l'accès aux dossiers sensibles (`/api/`, `/_next/`, `/admin/`, `/private/`)
- Bloque les bots d'IA (GPTBot, ChatGPT-User, CCBot, etc.)
- Pointe vers le sitemap

### 3. Icône du site (`app/icon.tsx`)
- Génère une icône SVG dynamique
- Couleurs cohérentes avec la charte graphique
- Format optimisé pour tous les navigateurs

### 4. Manifest PWA (`app/manifest.ts`)
- Configuration pour Progressive Web App
- Métadonnées pour l'installation sur mobile
- Icônes et thème cohérents

## Métadonnées améliorées

### Open Graph
- Titre optimisé pour les réseaux sociaux
- Description engageante
- Images de partage (à créer : `public/og-image.jpg`)
- Locale française (`fr_FR`)

### Twitter Cards
- Format `summary_large_image`
- Comptes Twitter configurés
- Images optimisées

### SEO technique
- Langue française (`lang="fr"`)
- Mots-clés pertinents
- Structure sémantique
- URLs canoniques

## Prochaines étapes recommandées

1. **Créer les images manquantes :**
   - `public/og-image.jpg` (1200x630px)
   - `public/icon-192.png` (192x192px)
   - `public/icon-512.png` (512x512px)

2. **Ajouter Google Analytics :**
   - Script de tracking
   - Configuration des événements

3. **Optimiser les performances :**
   - Lazy loading des images
   - Compression des assets
   - Cache headers

4. **Tester le SEO :**
   - Google Search Console
   - PageSpeed Insights
   - Lighthouse audit

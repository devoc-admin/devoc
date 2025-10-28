# AI Build Brief: Modern Multi‑Page Municipal Website (Lasbordes 11400)

You are an autonomous senior full‑stack engineer. Generate a production‑ready monorepo that rebuilds a modern, accessible, multi‑page municipal website using the constraints and requirements below. Follow all instructions deterministically. Do not remove or skip sections. If any data is missing, use safe, realistic placeholders.

Source website to extract/adapt content from (text structure, page taxonomy, representative copy where available):
- https://www.lasbordes11400.fr/ (cite as “Source: Site officiel Lasbordes 11400”)  


## 1) Tech Stack and Non‑Negotiable Constraints
- Monorepo with two apps: a public site (Next.js) and a headless CMS (Payload)
- Next.js (App Router, TypeScript)
- Payload CMS (TypeScript)
- Tailwind CSS
- shadcn/ui base components
- Motion for animations (Framer Motion)
- Biome for formatting and linting
- TypeScript everywhere (no any)
- PostgreSQL database
- Vercel Blob for media storage (images/videos/files) from the CMS
- Resend for contact form emails
- Prisma (only if needed) as ORM for DB access
- Strict a11y and code quality (follow rules in this brief)

Target: clean, fast, responsive, WCAG‑aware site with subtle animations and strong content modeling.


## 2) Repository Structure
Use pnpm workspaces or bun/pnpm as available; ensure workspace integrity.

```
/ (repo root)
  biome.jsonc            # Biome config (or reuse if present); ensure formatting + lint rules
  package.json           # workspace scripts
  pnpm-workspace.yaml    # workspaces
  apps/
    web/                 # Next.js site
    cms/                 # Payload CMS
  packages/
    ui/                  # optional shared UI primitives (if needed)
    config/              # shared configs (tailwind, tsconfig, biome presets)
```

Scripts at root:
- dev: run both apps in parallel
- build: build both apps
- lint, format, typecheck: run Biome and TypeScript


## 3) Environment Variables
Define and document in `.env.example` for both apps. Use stable, lowercase keys where reasonable.

Common:
- DATABASE_URL=postgresql://user:pass@host:5432/db
- RESEND_API_KEY=...
- BLOB_READ_WRITE_TOKEN=...  # Vercel Blob signed token
- NEXT_PUBLIC_SITE_URL=https://example.com

Next.js (apps/web):
- NEXT_PUBLIC_GOOGLE_MAPS_KEY=... (optional if map is included)

Payload (apps/cms):
- PAYLOAD_SECRET=long-random-secret
- PAYLOAD_PUBLIC_SERVER_URL=https://cms.example.com
- RESEND_FROM=“Mairie <no-reply@example.com>”

Ensure safe fallbacks and fail‑loud validation on missing critical keys.


## 4) Next.js App (apps/web)
- App Router with TypeScript, Tailwind, shadcn/ui, Framer Motion
- Biome integrated
- Global layout with metadata config
- Routing and pages:
  - `/` (Home):
    - Top contact bar (email, phone, address)
    - Header with navigation
    - Optional banner (CMS‑managed, togglable)
    - Hero with background image (use provided image if available), greeting “Bienvenue à Lasbordes !” and short description, quick‑access buttons, key facts (invent if unavailable)
    - “Actualités” section: chronological cards, click to detail page; “Toutes les actualités” CTA
    - Opening hours section with CTA “Prendre rendez‑vous”
    - “Services municipaux” cards (Loisirs/Culture, Jeunesse, Médical)
    - Optional map centered on the commune
    - Optional local weather widget (pluggable)
    - Footer with useful links and legal pages
  - `/actualites` (list) and `/actualites/[slug]` (detail)
  - `/mairie` (municipal team + council minutes PDFs)
  - `/histoire` or `/culture` (editable content about the commune)
  - `/vie-culturelle-associative` (cultural life and associations)
  - `/commerces` (local businesses and shops)
  - `/services` (municipal services overview)
  - `/contact` (contact form)
  - `/rss.xml` (RSS feed for news)
  - Legal pages: `/mentions-legales`, `/politique-de-confidentialite`, `/accessibilite`

- Components (minimally):
  - `TopBar` (contact info)
  - `Header` (nav, logo, accessible menu)
  - `Banner` (CMS‑toggled info banner)
  - `Hero`
  - `NewsCard` and `NewsList`
  - `HoursSection`
  - `ServicesGrid`
  - `AssociationCard` and `AssociationList`
  - `BusinessCard` and `BusinessList`
  - `Map` (optional; feature‑flag if no key)
  - `Weather` (optional; feature‑flag if no key)
  - `SocialLinks` (social media links)
  - `RSSLink` (RSS feed link component)
  - `PDFViewer` (optimized PDF reading component)
  - `CalendarExport` (add to calendar functionality)
  - `Footer`

- Design:
  - Harmonized color palette, Tailwind tokens; light animations with Framer Motion
  - shadcn/ui primitives for buttons, cards, inputs, etc.
  - Responsive for mobile/tablet/desktop

- Accessibility:
  - Semantic landmarks (header, nav, main, footer)
  - Focus states, skip link, keyboard nav
  - Alt text for images; SVGs with <title>
  - Valid roles/ARIA only where appropriate
  - Form labels + descriptions, error handling announced accessibly

- SEO/performance:
  - `metadata` per page, Open Graph, Twitter cards
  - `sitemap.xml`, `robots.txt`
  - RSS feed at `/rss.xml` (auto-generated from published news)
  - Image optimization, font loading best practices
  - Code‑splitting, avoid heavy client JS
  - Structured data (JSON-LD) for municipality, events, organization

- Contact form (Resend):
  - Frontend form with validation
  - Server route/action that sends email via Resend
  - Success/failure states, spam protection (basic honeypot or rate‑limit)


## 5) CMS App (apps/cms) – Payload Configuration
- TypeScript Payload config with collections and globals below
- Auth: simple admin‑only access (seed one admin)
- Media storage: Integrate Vercel Blob adapter for uploads; store metadata (mimetype, size, alt, caption, credits)
- Access control: read‑public for published content; write restricted to admins

Collections:
1) `news` (Actualités)
   - title: string (required)
   - slug: unique (auto from title)
   - description: rich text/long text
   - location: string (optional)
   - image: upload (optional, → Blob)
   - createdAt: date (auto)
   - eventDate: date (optional)
   - eventTime: time (optional, if eventDate is set)
   - eventEndDate: date (optional, for multi-day events)
   - eventEndTime: time (optional)
   - calendarExport: boolean (default true, enables .ics download)
   - status: enum [draft, published]

2) `services` (Services municipaux)
   - title: string (required)
   - slug: unique
   - category: enum [loisirs_culture, jeunesse, medical]
   - description: rich text
   - icon: string or SVG ref (optional)

3) `municipalTeam` (Équipe municipale)
   - name, role, photo (Blob), email (optional)
   - order: number

4) `councilMinutes` (Comptes rendus)
   - title: string (required)
   - date: date (required)
   - pdf: upload (Blob, accept PDF only)
   - summary: text (optional, for preview)
   - tags: string[] (optional, for categorization)

5) `pages` (CMS‑editable content pages)
   - title, slug, content (rich text/blocks)

6) `associations` (Associations et vie culturelle)
   - name: string (required)
   - slug: unique
   - description: rich text
   - category: enum [culture, sport, social, environnement, autres]
   - contact: { email, phone, website }
   - president: string (optional)
   - foundedYear: number (optional)
   - logo: upload (optional, → Blob)
   - activities: rich text (optional)
   - meetingSchedule: text (optional)

7) `businesses` (Commerces et entreprises)
   - name: string (required)
   - slug: unique
   - description: rich text
   - category: enum [alimentation, restauration, artisanat, services, autres]
   - contact: { email, phone, website }
   - address: string (required)
   - openingHours: structured weekly schedule
   - owner: string (optional)
   - logo: upload (optional, → Blob)
   - services: rich text (optional)
   - specialities: string[] (optional)

8) `media` (Uploads)
   - standard media library with alt/caption/credits

Globals:
- `siteSettings`:
  - contact: { email, phone, address }
  - openingHours: structured weekly schedule
  - banner: { enabled: boolean, message: string, severity: enum }
  - hero: { title, subtitle, image }
  - footer: { links: { label, href }[], socials: { platform: enum [facebook, twitter, instagram, youtube], url: string }[] }
  - municipality: { name: string, population: number, mayor: string, foundedYear: number }
  - emergency: { phone: string, email: string }

Validation and hooks:
- Generate slug, ensure unique
- Default status = draft; publication controls
- Sanitize rich text; require alt text if image used


## 6) Data Access and Integration
- Next.js fetches published content via Payload REST/GraphQL or direct server import (co‑locate type definitions for safety)
- If Prisma is used: generate types from schema; otherwise use Payload built‑ins and Zod for validation
- Timezone: handle dates in Europe/Paris; format localized (fr‑FR)


## 7) Content Sourcing and Seeding
- Extract navigation, page names, semantic structure, and representative copy from the source site when available: “Source: Site officiel Lasbordes 11400”
- Fill missing content with realistic placeholders (e.g., key figures about the commune)
- Seed:
  - A few `news` items (different states, one with eventDate)
  - 3‑6 `services` across categories
  - 1 `municipalTeam` list with mayor + councillors
  - 2 `councilMinutes` with PDFs
  - 1 CMS page for "Histoire" or "Culture"
  - 4‑6 `associations` across different categories
  - 5‑8 `businesses` across different categories
  - `siteSettings` with banner enabled example


## 8) UI/UX and Animations
- Use shadcn/ui for primitives (Button, Card, Input, Textarea, Tooltip, Avatar)
- Framer Motion for subtle section reveals; respect prefers‑reduced‑motion
- Maintain 60fps; avoid parallax heavy effects


## 9) Accessibility Requirements (strict)
- No `accessKey`; no `aria-hidden="true"` on focusables
- Provide labels and descriptions; required fields identified
- Keyboard operability for all interactive controls
- Valid ARIA roles only; don’t duplicate implicit roles
- Buttons have `type` attribute; anchors are valid and navigable
- Images have meaningful `alt`; SVGs have `<title>`
- Include `lang="fr"` on html
- Respect `tabIndex` best practices (no positive values)


## 10) SEO, Performance, and Quality Gates
- Metadata per route; Open Graph + social images
- Sitemap and robots
- Preload critical assets responsibly
- Lighthouse target: ≥90 Performance, ≥95 Accessibility
- Biome passes with zero errors; TypeScript no‑error build


## 11) Contact Form with Resend
- `/contact` page with form: name, email, subject, message
- Server action/route sends via Resend using `RESEND_API_KEY` and `RESEND_FROM`
- Validate inputs, anti‑spam (honeypot); show success and error states


## 12) PDF Reading and Calendar Integration
- **PDF Viewer Component**: 
  - Optimized PDF reading experience using PDF.js or similar
  - Responsive design with zoom controls, page navigation
  - Mobile-friendly touch gestures for scrolling and zooming
  - Download option for offline reading
  - Search functionality within PDF documents
  - Print-optimized view with proper page breaks
- **Calendar Export for Events**:
  - Generate `.ics` files for events with `eventDate` set
  - Support for single-day and multi-day events
  - "Ajouter à mon agenda" button on news cards with events
  - Compatible with Google Calendar, Outlook, Apple Calendar
  - Include event details: title, description, location, time
## 13) RSS Feed and Social Media Integration
- RSS feed at `/rss.xml`: auto-generated from published news items
  - Include: title, description, publication date, link to detail page
  - Follow RSS 2.0 standard with proper XML structure
  - Cache for performance; regenerate on news updates
- Social media links in footer and header (if space allows)
  - Facebook, Twitter/X, Instagram, YouTube (configurable via CMS)
  - Use proper social media icons (SVG with titles for accessibility)
  - External links with `rel="noopener"` and `target="_blank"`

## 14) Map and Weather (Optional, Pluggable)
- `Map` component (e.g., Google Maps or Leaflet). Only render if API key configured
- `Weather` component: fetch from public API if key provided; otherwise hide with empty state


## 15) Legal and Footer
- Footer includes internal navigation and links to:
  - Mentions légales
  - Politique de confidentialité
  - Accessibilité
- Include external links with `rel="noopener"` when `target="_blank"`
- Add emergency contact information prominently
- Include municipality key facts (population, mayor, founding year)


## 16) Additional Municipal Features
- **Emergency Information**: Prominent display of emergency contacts (police, fire, medical)
- **Municipal Calendar**: Integration with events/meetings calendar (if available)
- **Document Downloads**: Centralized section for official documents, forms, and PDFs
- **Search Functionality**: Site-wide search for news, services, pages, associations, and businesses
- **Newsletter Signup**: Optional email subscription for municipal updates
- **Accessibility Tools**: High contrast mode, font size adjustment
- **Print Styles**: Optimized CSS for printing municipal documents
- **Association Directory**: Searchable and filterable list of local associations
- **Business Directory**: Local commerce directory with categories and contact info

## 17) Commands and Developer Experience
Root scripts:
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "biome lint .",
    "format": "biome format . --write",
    "typecheck": "turbo run typecheck",
    "seed": "turbo run seed"
  }
}
```
Each app defines its own `dev`, `build`, `typecheck`, `seed` as applicable. Provide `README.md` in each app with clear setup steps.


## 18) Acceptance Criteria and QA Checklist
Delivery is accepted only if all items below are satisfied:
- Monorepo boots: `pnpm i && pnpm dev` runs both apps
- Pages and routes exist and render with seeded content
- CMS creates/edits content: news, services, team, minutes (PDF upload), pages, settings, associations, businesses
- Banner toggling works from CMS
- Actualités list sorts chronologically; detail page renders rich fields
- Mairie page shows team and downloadable PDFs
- Vie culturelle et associative page displays associations with filtering by category
- Commerces page displays businesses with filtering by category and contact info
- Contact form sends via Resend in dev (mock) and prod (config‑based)
- RSS feed at `/rss.xml` generates valid XML with latest news
- Social media links display correctly with proper icons and accessibility
- PDF viewer renders documents with zoom, navigation, and download options
- Calendar export generates valid `.ics` files for events with proper metadata
- Optional Map/Weather gracefully disabled without keys
- Emergency contact information prominently displayed
- a11y passes manual checks: keyboard nav, focus order, ARIA validity, color contrast
- Biome lint and TypeScript typecheck pass with zero errors
- Lighthouse scores meet targets


## 19) Output and Handoff
- Generate the full monorepo with all code, configs, and seeds
- Provide `.env.example` for root, `apps/web`, `apps/cms`
- Provide `README.md` for root and each app (setup, commands, env)
- Include a short note citing content source: “Source: Site officiel Lasbordes 11400 — https://www.lasbordes11400.fr/”


---
Execute all steps precisely. Prefer strong typing, clear naming, and readable code. Maintain a small, cohesive component set and avoid over‑engineering. Respect French locale and content throughout.


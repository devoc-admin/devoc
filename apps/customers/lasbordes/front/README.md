# Lasbordes Municipal Website

Modern, accessible municipal website for the commune of Lasbordes (11400) with integrated CMS.

**Source**: Site officiel Lasbordes 11400 — https://www.lasbordes11400.fr/

## 🏗️ Project Structure

This is a monorepo containing:

- **apps/web**: Next.js application with integrated Payload CMS (public site + admin panel at `/admin`)
- **packages/ui**: Shared UI components
- **packages/config**: Shared configuration (Tailwind, TypeScript)

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL database

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
cp apps/web/.env.example apps/web/.env

# Configure your environment variables in the .env files

# Run development server
pnpm dev
```

The website will be available at:
- **Public site**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/admin

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3 (integrated)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Database**: PostgreSQL
- **Media Storage**: Vercel Blob
- **Email**: Resend
- **Linting/Formatting**: Biome
- **Monorepo**: Turborepo + pnpm workspaces

## 📋 Available Scripts

```bash
# Development
pnpm dev          # Run app in development mode

# Build
pnpm build        # Build app for production

# Code Quality
pnpm lint         # Lint all files with Biome
pnpm format       # Format all files with Biome
pnpm typecheck    # Type-check all TypeScript files
```

## 🌐 Features

### Public Website

- ✅ **Homepage** with hero, news, services, and opening hours
- ✅ **News section** with list and detail pages
- ✅ **Municipal team** page with council minutes
- ✅ **Services** overview page
- ✅ **Cultural life** and associations directory
- ✅ **Businesses** directory
- ✅ **Contact form** with Resend integration
- ✅ **RSS feed** for news
- ✅ **Sitemap** and robots.txt
- ✅ **Legal pages** (mentions légales, privacy policy, accessibility)
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Accessibility** (WCAG compliant, keyboard navigation)
- ✅ **SEO optimized** (metadata, Open Graph, structured data)
- ✅ **Subtle animations** with Framer Motion
- ⚙️ **Optional features**: Map integration, Weather widget

### CMS (Accessible at `/admin`)

The CMS provides collections for:

- **News** (Actualités): title, description, location, event dates, calendar export
- **Services**: municipal services by category
- **Municipal Team**: team members with photos and roles
- **Council Minutes**: downloadable PDF documents
- **Pages**: CMS-editable content pages
- **Associations**: local associations directory
- **Businesses**: local commerce directory
- **Media**: media library with Vercel Blob storage

Global settings for:

- Contact information and opening hours
- Banner messages (toggleable)
- Hero section content
- Footer links and social media
- Municipality information
- Emergency contacts

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (payload)/                # Payload CMS routes (admin panel + API)
│   │   │   ├── admin/[[...segments]]/  # Admin UI at /admin
│   │   │   └── api/[...slug]/          # REST API at /api/*
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── actualites/               # News pages
│   │   ├── mairie/                   # Municipal team page
│   │   ├── services/                 # Services page
│   │   ├── vie-culturelle-associative/ # Associations directory
│   │   ├── commerces/                # Businesses directory
│   │   ├── contact/                  # Contact page
│   │   ├── histoire/                  # History page
│   │   └── api/                      # Custom API routes
│   ├── components/                   # React components
│   │   ├── layout/                  # Layout components
│   │   ├── ui/                      # UI primitives
│   │   └── features/                # Feature components
│   ├── lib/                         # Utilities and types
│   └── payload/                     # Payload CMS configuration
│       ├── collections/             # CMS collections
│       ├── globals/                 # CMS globals
│       └── payload.config.ts        # Payload config
├── public/                          # Static assets
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎯 Key Features

### Public Pages

- **/** - Homepage with hero, news, services, hours, and map
- **/actualites** - News list page
- **/actualites/[slug]** - News detail page
- **/mairie** - Municipal team and council minutes
- **/services** - Services overview
- **/vie-culturelle-associative** - Associations directory
- **/commerces** - Businesses directory
- **/contact** - Contact form
- **/histoire** - History page
- **/mentions-legales** - Legal mentions
- **/politique-de-confidentialite** - Privacy policy
- **/accessibilite** - Accessibility statement

### CMS Routes

- **/admin** - Payload CMS admin panel
- **/api/*** - Payload REST API endpoints

### Custom API Routes

- **/api/contact** - Contact form submission (sends email via Resend)

### SEO & Social

- **/sitemap.xml** - XML sitemap
- **/robots.txt** - Robots file
- **/rss.xml** - RSS feed for news

## 🎨 Components

### Layout Components

- `TopBar`: Contact information bar
- `Header`: Main navigation
- `Banner`: CMS-managed banner messages
- `Footer`: Footer with links and social media

### UI Components (shadcn/ui based)

- `Button`: Button component with variants
- `Card`: Card component for content
- `Input`: Form input
- `Label`: Form label
- `Textarea`: Textarea for forms

### Feature Components

- `Hero`: Homepage hero section
- `NewsSection`: News cards on homepage
- `ServicesGrid`: Services display
- `HoursSection`: Opening hours
- `AssociationCard` & `AssociationList`: Associations display
- `BusinessCard` & `BusinessList`: Businesses display
- `MapSection`: Optional map component
- `PDFViewer`: Optimized PDF reading component
- `CalendarExport`: Add to calendar functionality

## 🗄️ Payload CMS

### Collections

1. **News** (Actualités)
   - Title, slug, description, location
   - Event dates and times
   - Calendar export (.ics)
   - Status: draft/published

2. **Services**
   - Title, slug, description
   - Category: loisirs_culture, jeunesse, medical
   - Icon identifier

3. **Municipal Team**
   - Name, role, photo, email
   - Display order

4. **Council Minutes**
   - Title, date, PDF document
   - Summary and tags

5. **Pages**
   - Title, slug, rich content
   - Editable content pages

6. **Associations**
   - Name, description, category
   - Contact info, president, activities
   - Logo, meeting schedule

7. **Businesses**
   - Name, description, category
   - Contact info, address, hours
   - Logo, services, specialities

8. **Media**
   - Image/PDF uploads
   - Alt text, caption, credits
   - Automatic image resizing
   - Vercel Blob storage

9. **Users**
   - Admin authentication

### Global Settings

- Contact information
- Opening hours
- Banner messages (toggleable)
- Hero section content
- Footer links and social media
- Municipality information
- Emergency contacts

### Accessing the CMS

1. Start the dev server: `pnpm dev`
2. Navigate to http://localhost:3000/admin
3. Create your first admin user
4. Start managing content!

## 🔐 Environment Variables

### Required

- `DATABASE_URL`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Long random secret for Payload CMS (min 32 characters)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token
- `RESEND_API_KEY`: Resend API key for emails

### Optional

- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: Google Maps API key (for map feature)
- `NEXT_PUBLIC_SITE_URL`: Public URL (defaults to localhost in dev)

### Environment Variables Example

```env
# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lasbordes"

# Payload CMS
PAYLOAD_SECRET="your-long-random-secret-here-minimum-32-characters"

# Email (Resend)
RESEND_API_KEY="re_xxx"
RESEND_FROM="Mairie <no-reply@lasbordes11400.fr>"
CONTACT_EMAIL="mairie@lasbordes11400.fr"

# Media Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxx"

# Optional: Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=""
```

See `.env.example` files for detailed configuration.

## 🎨 Design System

The design system uses Tailwind CSS with a custom color palette:

- Primary: Blue-based palette for main actions and branding
- Secondary: Neutral palette for secondary elements
- Muted: Backgrounds and less prominent content
- Accent: Highlights and interactive elements

All components follow accessibility guidelines with proper contrast ratios.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

## ♿ Accessibility

This website follows WCAG 2.1 Level AA guidelines:

- Semantic HTML with proper landmarks
- Keyboard navigation support
- Skip links for main content
- ARIA labels where appropriate
- Focus indicators on all interactive elements
- Alt text for images
- Color contrast ratios meet WCAG requirements
- Reduced motion support

## 🎬 Animations

Animations use Framer Motion with:
- Respect for `prefers-reduced-motion`
- Subtle fade-in and slide effects
- 60fps target
- Viewport-based animations

## 📊 Performance

- Image optimization with Next.js Image
- Font optimization
- Code splitting
- Static generation where possible
- Efficient animations

## 🧪 Code Quality

The project uses Biome for linting and formatting with strict rules:

- TypeScript strict mode enabled
- No `any` types allowed
- Accessibility rules enforced
- Import organization
- Consistent code style

## 🔗 Integrations

### Payload CMS

Content is managed through Payload CMS at `/admin`. The CMS is fully integrated into the Next.js app.

**Fetching data from CMS:**

```typescript
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload/payload.config';

const payload = await getPayloadHMR({ config });
const news = await payload.find({
  collection: 'news',
  where: {
    status: {
      equals: 'published',
    },
  },
});
```

### Resend (Email)

Contact form submissions are sent via Resend API.

```typescript
// Usage in API route
await resend.emails.send({
  from: process.env.RESEND_FROM,
  to: process.env.CONTACT_EMAIL,
  subject: 'Contact form submission',
  text: message,
});
```

### Vercel Blob (Media)

Images from CMS are automatically stored in Vercel Blob and served with Next.js Image optimization.

## 🧪 Scripts

```bash
# Development
pnpm dev          # Start dev server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Quality
pnpm typecheck    # Run TypeScript checks
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set all environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy!

The CMS will be accessible at `your-domain.com/admin`

### Database Migrations

Payload CMS automatically handles database migrations. On first deployment:

1. Payload will create all necessary tables
2. You'll be prompted to create your first admin user at `/admin`

## 📝 Notes

- Mock data is used for demonstration in the public pages
- Connect the pages to the CMS API to use real data
- The map component is feature-flagged based on API key presence
- Calendar export generates `.ics` files for events
- All content is managed through the CMS at `/admin`

## 🔄 Connecting Pages to CMS

To replace mock data with CMS data, use Payload's API:

```typescript
// Example: Fetching news for homepage
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload/payload.config';

export default async function HomePage() {
  const payload = await getPayloadHMR({ config });

  const { docs: news } = await payload.find({
    collection: 'news',
    where: {
      status: { equals: 'published' },
    },
    sort: '-createdAt',
    limit: 3,
  });

  return <NewsSection news={news} />;
}
```

## 📄 License

This project is developed for the Municipality of Lasbordes.

## 🤝 Contributing

For questions or contributions, please contact: mairie@lasbordes11400.fr

## 📚 Documentation

- [Web App README](./apps/web/README.md) - Detailed documentation for the Next.js app

---

Built with ❤️ for Lasbordes

For more information about Payload CMS, visit: https://payloadcms.com/docs
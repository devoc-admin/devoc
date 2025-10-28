# Getting Started with Lasbordes Website

Follow these steps to get the project up and running.

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (version 20 or higher)
   ```bash
   node --version  # Should be >= 20.0.0
   ```

2. **pnpm** (version 9 or higher)
   ```bash
   npm install -g pnpm
   pnpm --version  # Should be >= 9.0.0
   ```

3. **PostgreSQL** database (local or hosted)
   - Local: Install PostgreSQL from https://www.postgresql.org/
   - Or use a hosted service like:
     - Supabase (https://supabase.com)
     - Neon (https://neon.tech)
     - Railway (https://railway.app)

4. **Accounts for third-party services:**
   - Vercel account for Blob storage: https://vercel.com
   - Resend account for emails: https://resend.com

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# From the root directory
pnpm install
```

This will install all dependencies for the app and packages in the monorepo.

### 2. Set Up Environment Variables

#### Root Environment

```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: Your PostgreSQL connection string
- `PAYLOAD_SECRET`: Generate a long random string (at least 32 characters)
- `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token
- `RESEND_API_KEY`: Your Resend API key

#### Web App Environment

```bash
cp apps/web/.env.example apps/web/.env
```

Edit `apps/web/.env` and configure the same values as above.

### 3. Database Setup

#### Create Database

If using local PostgreSQL:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE lasbordes;

# Exit
\q
```

Your `DATABASE_URL` should look like:
```
postgresql://postgres:password@localhost:5432/lasbordes
```

#### Generate PAYLOAD_SECRET

Generate a secure secret (minimum 32 characters):

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use an online generator
# https://generate-secret.vercel.app/32
```

Copy this value to both `.env` files for `PAYLOAD_SECRET`.

### 4. Get API Keys

#### Vercel Blob

1. Go to https://vercel.com
2. Create a new project or use existing
3. Go to Storage → Create → Blob
4. Copy the `BLOB_READ_WRITE_TOKEN`

#### Resend

1. Go to https://resend.com
2. Sign up and verify your email
3. Go to API Keys
4. Create a new API key
5. Copy the key (starts with `re_`)

#### Google Maps (Optional)

1. Go to https://console.cloud.google.com
2. Create a project
3. Enable Maps JavaScript API
4. Create credentials (API key)
5. Copy the API key

### 5. Start Development Server

```bash
# Start the app
pnpm dev
```

**Access points:**
- Website: http://localhost:3000
- CMS Admin: http://localhost:3000/admin

### 6. Create First CMS User

1. Open http://localhost:3000/admin
2. You'll see a "Create First User" form
3. Enter your details:
   - Email
   - Password (minimum 8 characters)
   - Confirm password
4. Click "Create"

You're now logged into the CMS!

### 7. Add Content

#### Add News

1. In CMS, go to "News" (Actualités)
2. Click "Create New"
3. Fill in the fields:
   - Title (required)
   - Slug (auto-generated)
   - Description (required)
   - Optional: Location, Event Date, Image
4. Set Status to "Published"
5. Click "Save"

#### Configure Site Settings

1. In CMS, go to "Globals" → "Site Settings"
2. Configure:
   - Contact information
   - Opening hours
   - Banner message (toggle on/off)
   - Hero section
   - Footer links and socials
   - Municipality information
3. Click "Save"

#### Upload Images

1. In CMS, go to "Media"
2. Click "Upload"
3. Select an image file
4. Fill in the alt text (required for accessibility)
5. Optionally add caption and credits
6. Click "Save"

### 8. View Your Website

1. Go to http://localhost:3000
2. You should see:
   - Homepage with hero
   - News section (currently showing mock data)
   - Services grid
   - Opening hours
   - All navigation working

### 9. Connect Pages to CMS (Optional)

To replace mock data with real CMS data, edit the page files:

```typescript
// Example: apps/web/src/app/page.tsx
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload/payload.config';

export default async function HomePage() {
  const payload = await getPayloadHMR({ config });

  // Fetch published news
  const { docs: news } = await payload.find({
    collection: 'news',
    where: {
      status: { equals: 'published' },
    },
    sort: '-createdAt',
    limit: 3,
  });

  // Fetch site settings
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  });

  // Pass data to components
  return (
    <>
      <Hero settings={settings} />
      <NewsSection news={news} />
      {/* ... */}
    </>
  );
}
```

## Common Issues & Solutions

### Issue: pnpm command not found

**Solution:**
```bash
npm install -g pnpm
```

### Issue: Database connection error

**Solutions:**
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL is correct
- Ensure database exists: `psql -U postgres -l`
- Check firewall settings

### Issue: Port already in use

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

Or change the port in package.json dev script.

### Issue: Module not found errors

**Solution:**
```bash
# Clean install
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
rm pnpm-lock.yaml
pnpm install
```

### Issue: Vercel Blob uploads fail

**Solutions:**
- Verify BLOB_READ_WRITE_TOKEN is correct
- Check token permissions in Vercel dashboard
- Ensure token is for the correct project

### Issue: Emails not sending

**Solutions:**
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for errors
- Verify RESEND_FROM email is verified in Resend
- Check API usage limits

### Issue: Cannot access /admin

**Solutions:**
- Ensure PAYLOAD_SECRET is set in .env
- Check DATABASE_URL is correct
- Clear browser cache
- Check browser console for errors

## Verifying Everything Works

### Checklist

- [ ] Website loads at http://localhost:3000
- [ ] CMS loads at http://localhost:3000/admin
- [ ] Can log into CMS
- [ ] Can create news in CMS
- [ ] Can upload images in CMS
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Email received from contact form
- [ ] Mobile responsive design works
- [ ] Keyboard navigation works
- [ ] No console errors

## Next Steps

1. **Customize Content**
   - Add real news and events
   - Upload actual images
   - Configure real opening hours
   - Add team members
   - Add associations and businesses

2. **Connect Public Pages to CMS**
   - Replace mock data in components
   - Fetch real data from Payload API
   - Update types to match CMS schemas

3. **Customize Design**
   - Update colors in tailwind.config.ts
   - Add your logo
   - Customize fonts

4. **Add More Features**
   - Implement search functionality
   - Add newsletter signup
   - Integrate analytics
   - Set up monitoring

5. **Prepare for Production**
   - Set up domain
   - Configure production database
   - Set up backups
   - Enable monitoring
   - Run security audit

## Development Commands

```bash
# Start development
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

## CMS Features

### Collections

- **News**: Manage news articles and events
- **Services**: Municipal services
- **Municipal Team**: Team members with photos
- **Council Minutes**: Upload PDF documents
- **Pages**: Editable content pages
- **Associations**: Local associations directory
- **Businesses**: Local businesses directory
- **Media**: Central media library
- **Users**: Admin user management

### Global Settings

- Site contact information
- Opening hours
- Banner messages (toggle on/off)
- Hero section content
- Footer configuration
- Municipality information

### Media Management

- Upload images and PDFs
- Automatic image resizing (thumbnail, card, hero sizes)
- Vercel Blob storage integration
- Alt text for accessibility
- Optional captions and credits

## Getting Help

- Check the main README.md
- Check [Web App README](./apps/web/README.md)
- Review PROJECT_SUMMARY.md for implementation details
- Visit Payload CMS docs: https://payloadcms.com/docs
- Open an issue in your repository

## Resources

- Next.js Docs: https://nextjs.org/docs
- Payload CMS Docs: https://payloadcms.com/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- shadcn/ui Docs: https://ui.shadcn.com
- Framer Motion Docs: https://www.framer.com/motion

---

**Need help?** Contact: mairie@lasbordes11400.fr

Good luck with your project! 🚀

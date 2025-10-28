# Static Assets

Place your static assets (images, icons, etc.) in this directory.

## Required Images

- `hero-lasbordes.jpg` - Hero section background image (recommended size: 1920x1080px)
- `favicon.ico` - Website favicon

## Image Optimization

All images should be optimized for web:
- Use WebP format when possible
- Compress images before uploading
- Use appropriate dimensions for the context

## Usage in Next.js

Images in the `public` directory can be referenced with an absolute path:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-lasbordes.jpg"
  alt="Description"
  width={1920}
  height={1080}
/>
```

Or for background images:

```tsx
<div style={{ backgroundImage: 'url(/images/hero-lasbordes.jpg)' }}>
  Content
</div>
```

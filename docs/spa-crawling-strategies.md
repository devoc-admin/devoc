# SPA Crawling Strategies for Playwright

## The Problem

Standard page load events are insufficient for Single Page Applications:

```typescript
// These lines are fragile for SPAs
await page.waitForLoadState("domcontentloaded");
await this.delay(500);
```

- `waitForLoadState("domcontentloaded")` fires when HTML is parsed, but **before** JavaScript renders content
- Fixed delays (`delay(500)`) are unreliable: too short = flaky, too long = slow

---

## Performance Considerations

### Time Estimates Per Page

| Step | Typical Duration |
|------|------------------|
| `domcontentloaded` | 100-500ms |
| `networkidle` | 500ms-5s (capped) |
| Selector wait | 0-2s |
| DOM stability (200ms debounce) | 200ms-3s |
| **Total per page** | **~1-10 seconds** |

### Scaling Impact

| Pages | Single Browser | 10 Concurrent |
|-------|----------------|---------------|
| 1,000 | 17 min - 2.7 hrs | 1.7 min - 16 min |
| 10,000 | 2.7 hrs - 27 hrs | 16 min - 2.7 hrs |
| 100,000 | 27 hrs - 11 days | 2.7 hrs - 27 hrs |

---

## Large-Scale Crawling Optimizations

### 1. Parallelize with Browser Contexts

```typescript
import pLimit from 'p-limit';

const CONCURRENCY = 10;
const browser = await chromium.launch();
const limit = pLimit(CONCURRENCY);

const results = await Promise.all(
  urls.map(url => limit(async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(url);
      // ... crawl logic
      return extractedData;
    } finally {
      await context.close();
    }
  }))
);
```

### 2. Tiered Loading Strategy

Fast first, thorough only when needed:

```typescript
async function fastCrawl(page: Page) {
  await page.waitForLoadState("domcontentloaded");

  // Quick check: is there visible content?
  const hasContent = await page.evaluate(() =>
    document.body.innerText.trim().length > 100
  );

  if (hasContent) return; // Good enough

  // Only wait longer if content is missing
  await page.waitForLoadState("networkidle").catch(() => {});
}
```

### 3. Hybrid Crawling (Browser as Fallback)

```typescript
async function hybridCrawl(url: string) {
  // First pass: try raw fetch (handles SSR/static pages)
  const response = await fetch(url);
  const html = await response.text();

  // Check if it's a SPA that needs JS rendering
  const needsBrowser = html.includes('id="root"') &&
                       !html.includes('data-server-rendered');

  if (!needsBrowser) {
    // Parse with cheerio - fast!
    return parseWithCheerio(html);
  }

  // Only use Playwright for true SPAs
  return crawlWithPlaywright(url);
}
```

This approach can handle **60-80% of pages in milliseconds**.

### 4. Block Unnecessary Resources

```typescript
await page.route('**/*', route => {
  const type = route.request().resourceType();
  if (['image', 'font', 'stylesheet', 'media'].includes(type)) {
    return route.abort();
  }
  return route.continue();
});
```

Reduces load times by **50-70%**.

### 5. Reuse Browser Contexts

```typescript
// Create a pool of contexts
const contextPool: BrowserContext[] = [];

async function getContext(browser: Browser) {
  return contextPool.pop() || browser.newContext();
}

async function releaseContext(context: BrowserContext) {
  // Clear state and return to pool
  await context.clearCookies();
  contextPool.push(context);
}
```

---

## Tool Comparison

| Tool | Speed per Page | JS Support | Best For |
|------|----------------|------------|----------|
| `fetch` / `axios` | ~50-200ms | No | SSR/static pages |
| `cheerio` | ~50-200ms | No | HTML parsing |
| Playwright | ~1-10s | Yes | SPAs, interactions |
| Puppeteer | ~1-10s | Yes | SPAs, interactions |
| Playwright (optimized) | ~500ms-3s | Yes | Balanced approach |

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      URL Queue                          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   fetch() + cheerio                     │
│              (handles ~70% of pages fast)               │
└─────────────────────────┬───────────────────────────────┘
                          │
                          │ SPA detected?
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Playwright Pool (10 contexts)              │
│           (handles ~30% that need JS rendering)         │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐     ┌─────────┐   │
│  │ Context │ │ Context │ │ Context │ ... │ Context │   │
│  └─────────┘ └─────────┘ └─────────┘     └─────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

| Use Case | Recommended Approach |
|----------|---------------------|
| Small crawl, high accuracy | Combined strategy with DOM stability |
| Large crawl, known structure | Specific selectors + parallelization |
| Large crawl, unknown sites | Hybrid (fetch first, Playwright fallback) |
| Maximum speed | fetch + cheerio only, skip JS-heavy pages |

**Key principle:** Use the lightest tool that gets the job done. Reserve browser automation for pages that truly require JavaScript execution.

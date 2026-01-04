import { put } from "@vercel/blob";
import pLimit from "p-limit";
import {
  type Browser,
  type BrowserContext,
  chromium,
  type Page,
} from "playwright";
import {
  isInternalUrl,
  normalizeUrl,
  shouldCrawlUrl,
  toAbsoluteUrl,
} from "@/lib/crawler/url-utils";
import type { CrawlConfig } from "@/lib/db/schema";
import { detectCategoryPage } from "./category-detector";
import type {
  CrawlPageResult,
  CrawlProgressCallback,
  CrawlResult,
  QueueItem,
} from "./types";

const DEFAULT_DELAY_BETWEEN_REQUESTS = 100;
const DEFAULT_MAX_DEPTH = 3;
const DEFAULT_MAX_PAGES = 100;
const DEFAULT_CONCURRENCY = 5;
const httpRegex = /^https?:\/\//;

export class WebCrawler {
  private browser: Browser | null = null;
  private readonly visited = new Set<string>(); // URLs that have been crawled
  private readonly pending = new Set<string>(); // URLs in queue (prevents duplicates)
  private readonly queue: QueueItem[] = [];
  private readonly config: CrawlConfig;
  private readonly baseUrl: string;
  private readonly baseOrigin: string;
  private readonly crawlJobId: string;
  private readonly pages: CrawlPageResult[] = [];
  private readonly errors: Array<{ url: string; error: string }> = [];

  // 🏗️ Constructor
  constructor({
    baseUrl,
    config,
    crawlJobId,
  }: {
    baseUrl: string;
    config: Partial<CrawlConfig>;
    crawlJobId: string;
  }) {
    this.baseUrl = baseUrl;
    this.baseOrigin = new URL(baseUrl).origin;
    this.crawlJobId = crawlJobId;
    this.config = {
      concurrency: config.concurrency ?? DEFAULT_CONCURRENCY,
      delayBetweenRequests:
        config.delayBetweenRequests ?? DEFAULT_DELAY_BETWEEN_REQUESTS,
      excludePaths: config.excludePaths,
      includePaths: config.includePaths,
      maxDepth: config.maxDepth ?? DEFAULT_MAX_DEPTH,
      maxPages: config.maxPages ?? DEFAULT_MAX_PAGES,
      respectRobotsTxt: config.respectRobotsTxt ?? true,
      skipResources: config.skipResources ?? false,
    };
  }

  //💥 Start crawling
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Crawler logic requires sequential checks
  async crawl({
    onProgress,
  }: {
    onProgress?: CrawlProgressCallback;
  }): Promise<CrawlResult> {
    const concurrency = this.config.concurrency ?? DEFAULT_CONCURRENCY;
    const limit = pLimit(concurrency);

    try {
      // 1️⃣ Init browser
      this.browser = await chromium.launch();

      // 2️⃣🏡 Add homepage
      const normalizedBaseUrl = normalizeUrl({
        baseUrl: this.baseUrl,
        url: this.baseUrl,
      });
      this.queue.push({ depth: 0, url: normalizedBaseUrl });
      this.pending.add(normalizedBaseUrl);

      // 3️⃣🔁 Loop through site with parallel processing
      while (
        this.queue.length > 0 &&
        this.pages.length < this.config.maxPages
      ) {
        // 📦 Get batch of items to process (up to concurrency limit)
        const batch: QueueItem[] = [];
        const remainingSlots = this.config.maxPages - this.pages.length;
        const batchSize = Math.min(
          concurrency,
          remainingSlots,
          this.queue.length
        );

        for (let i = 0; i < batchSize; i++) {
          const item = this.queue.shift();
          if (!item) break;

          const normalizedUrl = normalizeUrl({
            baseUrl: this.baseUrl,
            url: item.url,
          });

          // ⏭️ Skip checks
          if (this.visited.has(normalizedUrl)) {
            this.pending.delete(normalizedUrl);
            continue;
          }
          if (item.depth > this.config.maxDepth) continue;
          if (!shouldCrawlUrl({ config: this.config, url: item.url })) continue;

          // ✅➕ Mark as visited before processing (prevents duplicates in parallel)
          this.visited.add(normalizedUrl);
          this.pending.delete(normalizedUrl); // Move from pending to visited
          batch.push({ ...item, url: normalizedUrl });
        }

        if (batch.length === 0) continue;

        // 🚀 Process batch in parallel
        const results = await Promise.all(
          batch.map((item) =>
            limit(async () => {
              const context = await this.createContext();
              try {
                const result = await this.crawlPage({
                  context,
                  depth: item.depth,
                  normalizedUrl: item.url,
                  url: item.url,
                });
                return { item, result };
              } finally {
                await context.close();
              }
            })
          )
        );

        // 🎁 Process results
        for (const { item, result } of results) {
          if (!result) continue;

          // 🔔 Notify progress
          if (onProgress) {
            await onProgress({
              crawled: this.pages.length,
              crawledPage: result,
              discovered: this.visited.size + this.queue.length,
            });
          }
          this.pages.push(result);

          // Add discovered links to queue (check both visited AND pending to prevent duplicates)
          if (item.depth < this.config.maxDepth) {
            for (const link of result.links) {
              const normalizedLink = normalizeUrl({
                baseUrl: this.baseUrl,
                url: link,
              });

              // Skip if already visited or already in queue
              if (
                this.visited.has(normalizedLink) ||
                this.pending.has(normalizedLink)
              ) {
                continue;
              }

              this.pending.add(normalizedLink);
              this.queue.push({ depth: item.depth + 1, url: normalizedLink });
            }
          }
        }

        // ⏳ Small delay between batches
        if (this.config.delayBetweenRequests > 0) {
          await this.delay(this.config.delayBetweenRequests);
        }
      }
      return { errors: this.errors, pages: this.pages };
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Create a new browser context with optional resource blocking
   */
  private async createContext(): Promise<BrowserContext> {
    if (!this.browser) {
      throw new Error("Browser not initialized");
    }

    const context = await this.browser.newContext({
      locale: "fr-FR",
      userAgent: "RGAA-Audit-Crawler/1.0 (Accessibility Audit Tool)",
      viewport: { height: 720, width: 1280 },
    });

    // 🚫 Block unnecessary resources for 50-70% faster crawling (optional)
    if (this.config.skipResources) {
      await context.route("**/*", (route) => {
        const resourceType = route.request().resourceType();
        if (["image", "font", "stylesheet", "media"].includes(resourceType)) {
          return route.abort();
        }
        return route.continue();
      });
    }

    return context;
  }

  /**
   * Crawl page
   */
  private async crawlPage({
    url,
    normalizedUrl,
    depth,
    context,
  }: {
    url: string;
    normalizedUrl: string;
    depth: number;
    context: BrowserContext;
  }): Promise<CrawlPageResult | null> {
    const page = await context.newPage();

    try {
      //⏰ Start time
      const startTime = Date.now();

      //⛵ Go to page
      const response = await page.goto(url, {
        timeout: 30_000,
        waitUntil: "domcontentloaded",
      });

      const responseTime = Date.now() - startTime;

      if (!response) {
        this.errors.push({ error: "No response received", url });
        return null;
      }

      const httpStatus = response.status();
      const contentType = response.headers()["content-type"] || "";

      // ⏭️ Skip non-HTML pages
      if (!contentType.includes("text/html")) {
        return null;
      }

      // ⌚ Wait for SPA content to load
      await waitForSpaLoad(page);

      // 🆎 Get title
      const title = await page.title();

      //📦 Get category
      const { category, confidence, characteristics } =
        await detectCategoryPage({ page, url });

      // 🔗 Extract links
      const links = await this.extractLinksFromPage(page);

      // 📸 Take screenshot and upload to Vercel Blob
      const screenshotUrl = await this.takeAndUploadScreenshot({
        normalizedUrl,
        page,
      });

      // 🎁 Result
      const nowString = new Date().toISOString();
      return {
        category,
        categoryConfidence: confidence,
        characteristics,
        contentType,
        createdAt: nowString,
        depth,
        httpStatus,
        links,
        normalizedUrl,
        responseTime,
        screenshotUrl,
        title,
        url,
      };
    } catch (error) {
      // 🚫 Errors
      const message = error instanceof Error ? error.message : String(error);
      this.errors.push({ error: message, url });
      return null;
    } finally {
      //👋 Close page
      await page.close();
    }
  }

  /**
   * Extract links from page
   */
  private async extractLinksFromPage(page: Page): Promise<string[]> {
    const links = await page.evaluate(() => {
      const anchors = document.querySelectorAll("a[href]");
      return Array.from(anchors)
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => href !== null);
    });

    const absoluteLinks: string[] = [];
    for (const link of links) {
      const absolute = toAbsoluteUrl({ baseUrl: this.baseUrl, url: link });
      if (
        absolute &&
        isInternalUrl({ baseOrigin: this.baseOrigin, url: absolute })
      ) {
        absoluteLinks.push(absolute);
      }
    }
    return [...new Set(absoluteLinks)];
  }

  /**
   * Take screenshot and upload to Vercel Blob
   */
  private async takeAndUploadScreenshot({
    page,
    normalizedUrl,
  }: {
    page: Page;
    normalizedUrl: string;
  }): Promise<string | undefined> {
    try {
      // Check for token
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error("📸 BLOB_READ_WRITE_TOKEN is not set");
        return undefined;
      }

      const screenshot = await page.screenshot({
        fullPage: false,
        quality: 80,
        type: "jpeg",
      });

      // Create a safe filename from the URL
      const safeFilename = normalizedUrl
        .replace(httpRegex, "")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .slice(0, 100);

      const filename = `screenshots/${this.crawlJobId}/${safeFilename}.jpg`;

      const blob = await put(filename, screenshot, { access: "public" });
      return blob.url;
    } catch (error) {
      // Screenshot failed, but don't fail the entire crawl
      console.error(`📸 Screenshot failed for ${normalizedUrl}:`, error);
      return undefined;
    }
  }

  /**
   * Delay between requests
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clean up resources
   */
  private async cleanup(): Promise<void> {
    if (this.browser) await this.browser.close();
  }
}

// Tiered SPA loading strategy - fast first, thorough only when needed
async function waitForSpaLoad(page: Page) {
  // 1. Basic DOM ready
  await page.waitForLoadState("domcontentloaded");

  // 2. Quick check: is there already visible content?
  const hasContent = await page.evaluate(() => {
    const bodyText = document.body?.innerText?.trim() || "";
    const hasMainContent =
      document.querySelector('main, [role="main"], article, .content') !== null;
    return bodyText.length > 100 || hasMainContent;
  });

  // ⚡ Fast path: content already present, skip expensive waits
  if (hasContent) {
    // Brief stabilization only (200ms)
    await page.waitForTimeout(200);
    return;
  }

  // 🐢 Slow path: SPA that needs JS rendering
  // Wait for initial network burst to settle (cap at 3s)
  await Promise.race([
    page.waitForLoadState("networkidle"),
    page.waitForTimeout(3000),
  ]);

  // Wait for critical content (optional)
  try {
    await page.waitForSelector(
      'main, [role="main"], #app, #root, article, .content',
      {
        state: "visible",
        timeout: 2000,
      }
    );
  } catch {
    // Selector not found - page may have different structure, continue anyway
  }

  // Brief stabilization for any final renders
  try {
    await waitForDomStable(page, 1500, 150);
  } catch {
    // DOM stability timeout - page may be highly dynamic, continue anyway
  }
}

// waitForDomStable
async function waitForDomStable(page: Page, timeout = 5000, debounce = 300) {
  await page.evaluate(
    ({ timeout, debounce }) => {
      return new Promise<void>((resolve, reject) => {
        let timer: NodeJS.Timeout;
        const timeoutId = setTimeout(
          () => reject(new Error("DOM stability timeout")),
          timeout
        );

        const observer = new MutationObserver(() => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            observer.disconnect();
            clearTimeout(timeoutId);
            resolve();
          }, debounce);
        });

        observer.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
        });

        // Initial trigger
        timer = setTimeout(() => {
          observer.disconnect();
          clearTimeout(timeoutId);
          resolve();
        }, debounce);
      });
    },
    { debounce, timeout }
  );
}

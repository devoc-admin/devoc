import { put } from "@vercel/blob";
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
const httpRegex = /^https?:\/\//;

export class WebCrawler {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private readonly visited = new Set<string>();
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
      delayBetweenRequests:
        config.delayBetweenRequests ?? DEFAULT_DELAY_BETWEEN_REQUESTS,
      excludePaths: config.excludePaths,
      includePaths: config.includePaths,
      maxDepth: config.maxDepth ?? DEFAULT_MAX_DEPTH,
      maxPages: config.maxPages ?? DEFAULT_MAX_PAGES,
      respectRobotsTxt: config.respectRobotsTxt ?? true,
    };
  }

  //💥 Start crawling
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Crawler logic requires sequential checks
  async crawl({
    onProgress,
  }: {
    onProgress?: CrawlProgressCallback;
  }): Promise<CrawlResult> {
    try {
      // 1️⃣ Init browser
      this.browser = await chromium.launch();
      this.context = await this.browser.newContext({
        locale: "fr-FR",
        userAgent: "RGAA-Audit-Crawler/1.0 (Accessibility Audit Tool)",
        viewport: { height: 720, width: 1280 },
      });

      // 🚫 Block unnecessary resources for 50-70% faster crawling (optional)
      if (this.config.skipResources) {
        await this.context.route("**/*", (route) => {
          const resourceType = route.request().resourceType();
          if (["image", "font", "stylesheet", "media"].includes(resourceType)) {
            return route.abort();
          }
          return route.continue();
        });
      }

      // 2️⃣🏡 Add homepage
      this.queue.push({ depth: 0, url: this.baseUrl });

      //3️⃣🔁 Loop through site
      while (
        this.queue.length > 0 &&
        this.pages.length < this.config.maxPages
      ) {
        const item = this.queue.shift();
        if (!item) continue;
        const normalizedUrl = normalizeUrl({
          baseUrl: this.baseUrl,
          url: item.url,
        });

        // ⏭️ Skip if alread visited
        if (this.visited.has(normalizedUrl)) continue;
        // ⏭️ Skip if max depth reached
        if (item.depth > this.config.maxDepth) continue;
        // ⏭️ Skip if it shouldn't crawl (static assets or excluded paths)
        if (!shouldCrawlUrl({ config: this.config, url: item.url })) continue;

        // ✅➕ Add to visited if all checks are passed
        this.visited.add(normalizedUrl);

        // 🏊 Crawl page
        const result = await this.crawlPage({
          depth: item.depth,
          normalizedUrl,
          url: item.url,
        });

        // 🎁 Result
        if (result) {
          // 🔔 Notify progress
          if (onProgress) {
            await onProgress({
              crawled: this.pages.length,
              crawledPage: result,
              discovered: this.visited.size + this.queue.length,
            });
          }
          this.pages.push(result);

          // Add discovered links to queue
          if (item.depth < this.config.maxDepth) {
            for (const link of result.links) {
              const normalizedLink = normalizeUrl({
                baseUrl: this.baseUrl,
                url: link,
              });

              if (!this.visited.has(normalizedLink)) {
                this.queue.push({ depth: item.depth + 1, url: normalizedLink });
              }
            }
          }
        }

        //⏳ Delay between requests
        await this.delay(this.config.delayBetweenRequests);
      }
      return { errors: this.errors, pages: this.pages };
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Crawl page
   */

  private async crawlPage({
    url,
    normalizedUrl,
    depth,
  }: {
    url: string;
    normalizedUrl: string;
    depth: number;
  }): Promise<CrawlPageResult | null> {
    if (!this.context) {
      throw new Error("Browser context not initialized");
    }
    const page = await this.context.newPage();

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

      console.log(`📸 Screenshot uploaded: ${blob.url}`);
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
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

// wait for SPA load
async function waitForSpaLoad(page: Page) {
  // 1. Basic DOM ready
  await page.waitForLoadState("domcontentloaded");

  // 2. Wait for initial network burst to settle (cap at 5s)
  await Promise.race([
    page.waitForLoadState("networkidle"),
    page.waitForTimeout(5000),
  ]);

  // 3. Wait for critical content (optional - some pages may not have these selectors)
  try {
    await page.waitForSelector(
      'main, [role="main"], #app, #root, article, .content',
      {
        state: "visible",
        timeout: 3000,
      }
    );
  } catch {
    // Selector not found - page may have different structure, continue anyway
  }

  // 4. Brief stabilization for any final renders
  try {
    await waitForDomStable(page, 2000, 200);
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

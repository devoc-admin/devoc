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

export class WebCrawler {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private readonly visited = new Set<string>();
  private readonly queue: QueueItem[] = [];
  private readonly config: CrawlConfig;
  private readonly baseUrl: string;
  private readonly baseOrigin: string;
  private readonly pages: CrawlPageResult[] = [];
  private readonly errors: Array<{ url: string; error: string }> = [];

  // 🏗️ Constructor
  constructor({
    baseUrl,
    config,
  }: {
    baseUrl: string;
    config: Partial<CrawlConfig>;
  }) {
    this.baseUrl = baseUrl;
    this.baseOrigin = new URL(baseUrl).origin;
    this.config = {
      delayBetweenRequests: config.delayBetweenRequests ?? 1000,
      excludePaths: config.excludePaths,
      includePaths: config.includePaths,
      maxDepth: config.maxDepth ?? 3,
      maxPages: config.maxPages ?? 50,
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
        // ⏭️ Skip if it shouldn't crawl
        if (!shouldCrawlUrl({ config: this.config, url: item.url })) continue;

        // ✅➕ Add to visited if all checks are passed
        this.visited.add(normalizedUrl);

        // 🔔 Notify progress
        if (onProgress) {
          await onProgress({
            crawled: this.pages.length,
            currentUrl: item.url,
            discovered: this.visited.size + this.queue.length,
          });
        }

        // 🏊 Crawl page
        const result = await this.crawlPage({
          depth: item.depth,
          normalizedUrl,
          url: item.url,
        });

        //🎁 Result
        if (result) {
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
        waitUntil: "networkidle",
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

      // ⌚ Additional delay for SPA
      await page.waitForLoadState("domcontentloaded");
      await this.delay(500);

      // 🆎 Get title
      const title = await page.title();
      //📦 Get category
      const categoryResult = await detectCategoryPage({ page, url });

      // 🔗 Extract links
      const links = await this.extractLinksFromPage(page);

      // 🎁 Result
      return {
        category: categoryResult.category,
        categoryConfidence: categoryResult.confidence,
        characteristics: categoryResult.characteristics,
        contentType,
        depth,
        httpStatus,
        links,
        normalizedUrl,
        responseTime,
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

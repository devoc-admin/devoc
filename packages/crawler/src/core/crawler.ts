import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { isInternalUrl, normalizeUrl, toAbsoluteUrl } from "@dev-oc/utils/url";
import { put } from "@vercel/blob";
import {
  type Browser,
  type BrowserContext,
  chromium,
  type Page,
} from "playwright";
import sharp from "sharp";
import { detectAuthor } from "../detectors/author-detector";
import { detectCategoryPage } from "../detectors/category-detector";
import { detectContactInfo } from "../detectors/contact-detector";
import { detectLanguages } from "../detectors/language-detector";
import { detectNewsletter } from "../detectors/newsletter-detector";
import { detectRssFeed } from "../detectors/rss-detector";
import { detectSeo } from "../detectors/seo-detector";
import { detectSocialLinks } from "../detectors/social-detector";
import { detectTechnologies } from "../detectors/technology-detector";
import type {
  AuthorDetectionResult,
  ContactInfoDetectionResult,
  CrawlConfig,
  CrawlPageResult,
  CrawlProgressCallback,
  CrawlResult,
  LanguageDetectionResult,
  NewsletterDetectionResult,
  QueueItem,
  RssFeedDetectionResult,
  SeoDetectionResult,
  SocialLinksResult,
  TechnologyDetectionResult,
} from "../types";
import {
  fetchRobotsTxt,
  isPathAllowed,
  type RobotsRules,
} from "../utils/robots-parser";
import { shouldCrawlUrl } from "../utils/url-utils";

const DEFAULT_DELAY_BETWEEN_REQUESTS = 100;
const DEFAULT_MAX_DEPTH = 3;
const DEFAULT_MAX_PAGES = 100;
const DEFAULT_CONCURRENCY = 10;
const httpRegex = /^https?:\/\//;

export class WebCrawler {
  private browser: Browser | null = null;
  private readonly visited = new Set<string>(); // URLs that have been crawled
  private readonly pending = new Set<string>(); // URLs in queue (prevents duplicates)
  private readonly queue: QueueItem[] = [];
  private readonly config: CrawlConfig;
  private readonly baseUrl: string;
  private readonly baseOrigin: string;
  private readonly crawlId: string;
  private readonly pages: CrawlPageResult[] = [];
  private readonly errors: Array<{ url: string; error: string }> = [];

  // 🏊 Context pool for reusing browser contexts
  private contextPool: BrowserContext[] = [];
  private readonly maxPoolSize = DEFAULT_CONCURRENCY;

  // 🤖 Robots.txt rules
  private robotsRules: RobotsRules | null = null;

  // Constructor
  constructor({
    baseUrl,
    config,
    crawlId,
  }: {
    baseUrl: string;
    config: Partial<CrawlConfig>;
    crawlId: string;
  }) {
    this.baseUrl = baseUrl;
    this.baseOrigin = new URL(baseUrl).origin;
    this.crawlId = crawlId;
    this.config = {
      //🐇 Concurrency
      concurrency: config.concurrency ?? DEFAULT_CONCURRENCY,

      // ⏳ Delay between requests
      delayBetweenRequests:
        config.delayBetweenRequests ?? DEFAULT_DELAY_BETWEEN_REQUESTS,

      // 🛣️ Paths patterns
      excludePaths: config.excludePaths,
      includePaths: config.includePaths,

      // 🔢 Pages and depth
      maxDepth: config.maxDepth ?? DEFAULT_MAX_DEPTH,
      maxPages: config.maxPages ?? DEFAULT_MAX_PAGES,

      // 🤖 Respect bots
      respectRobotsTxt: config.respectRobotsTxt ?? true,

      // 📸 Take screenshots
      useLocalScreenshots: config.useLocalScreenshots ?? false,
    };
  }

  // 🏁 Start crawling
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Crawler logic requires sequential checks
  async crawl({
    onProgress,
  }: {
    onProgress?: CrawlProgressCallback;
  }): Promise<CrawlResult> {
    const concurrency = this.config.concurrency ?? DEFAULT_CONCURRENCY;

    try {
      // 1️⃣ 🌐 Init browser
      this.browser = await chromium.launch();

      // 2️⃣ 🤖 Fetch robots.txt (if enabled)
      if (this.config.respectRobotsTxt) {
        this.robotsRules = await fetchRobotsTxt(this.baseOrigin);

        // Apply crawl-delay if specified
        if (this.robotsRules?.crawlDelay) {
          this.config.delayBetweenRequests = Math.max(
            this.config.delayBetweenRequests,
            this.robotsRules.crawlDelay
          );
        }
      }

      // 3️⃣ 🏡 Add homepage
      const normalizedBaseUrl = normalizeUrl({
        baseUrl: this.baseUrl,
        url: this.baseUrl,
      });

      this.queue.push({ depth: 0, url: normalizedBaseUrl });
      this.pending.add(normalizedBaseUrl);

      // 4️⃣ 🔄 Streaming concurrency - process pages as slots become available
      const inFlight = new Map<Promise<void>, QueueItem>();

      while (
        (this.queue.length > 0 || inFlight.size > 0) &&
        this.pages.length < this.config.maxPages
      ) {
        // Start new tasks while we have queue items and available slots
        while (
          this.queue.length > 0 &&
          inFlight.size < concurrency &&
          this.pages.length + inFlight.size < this.config.maxPages
        ) {
          const item = this.queue.shift();
          if (!item) break;

          const normalizedUrl = normalizeUrl({
            baseUrl: this.baseUrl,
            url: item.url,
          });

          // Skip checks
          if (this.visited.has(normalizedUrl)) {
            this.pending.delete(normalizedUrl);
            continue;
          }
          if (item.depth > this.config.maxDepth) continue;
          if (!shouldCrawlUrl({ config: this.config, url: item.url })) continue;
          if (!this.isAllowedByRobots(normalizedUrl)) continue;

          // Mark as visited before processing
          this.visited.add(normalizedUrl);
          this.pending.delete(normalizedUrl);

          const taskItem = { ...item, url: normalizedUrl };

          // Start crawl task
          const task = this.processSinglePage(taskItem, onProgress);
          inFlight.set(task, taskItem);
          task.finally(() => inFlight.delete(task));
        }

        // Wait for at least one task to complete if we have in-flight tasks
        if (inFlight.size > 0) {
          await Promise.race(inFlight.keys());
        }

        // Small yield to prevent tight loop
        if (this.queue.length === 0 && inFlight.size > 0) {
          await this.delay(10);
        }
      }

      // Wait for remaining in-flight tasks
      if (inFlight.size > 0) {
        await Promise.all(inFlight.keys());
      }
      console.log("errors", this.errors);
      return { errors: this.errors, pages: this.pages };
    } finally {
      await this.cleanup();
    }
  }

  /**
   * 🕷️ Process a single page (used by streaming concurrency)
   */
  private async processSinglePage(
    item: QueueItem,
    onProgress?: CrawlProgressCallback
  ): Promise<void> {
    const context = await this.getContext();
    try {
      const result = await this.crawlPage({
        context,
        depth: item.depth,
        normalizedUrl: item.url,
        url: item.url,
      });

      if (!result) return;

      // Notify progress
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

          if (
            !(
              this.visited.has(normalizedLink) ||
              this.pending.has(normalizedLink)
            )
          ) {
            this.pending.add(normalizedLink);
            this.queue.push({ depth: item.depth + 1, url: normalizedLink });
          }
        }

        // Sort queue by depth (lowest first) to prioritize shallow pages
        this.queue.sort((a, b) => a.depth - b.depth);
      }

      // Apply delay between requests
      if (this.config.delayBetweenRequests > 0) {
        await this.delay(this.config.delayBetweenRequests);
      }
    } finally {
      await this.returnContext(context);
    }
  }

  /**
   * 🌐 Create a new browser context with optional resource blocking
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

    return context;
  }

  /**
   * 🏊 Get a context from pool or create new one
   */
  private async getContext(): Promise<BrowserContext> {
    const pooledContext = this.contextPool.pop();
    if (pooledContext) {
      return pooledContext;
    }
    return await this.createContext();
  }

  /**
   * 🏊 Return context to pool or close if full
   */
  private async returnContext(context: BrowserContext): Promise<void> {
    if (this.contextPool.length < this.maxPoolSize) {
      await context.clearCookies();
      this.contextPool.push(context);
    } else {
      await context.close();
    }
  }

  /**
   * 🕷️ Crawl page
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
      // Start time
      const startTime = Date.now();

      // Go to page
      const response = await page.goto(url, {
        timeout: 30_000,
        waitUntil: "domcontentloaded",
      });

      const responseTime = Date.now() - startTime;

      if (!response) {
        this.errors.push({ error: "No response received", url });
        return null;
      }

      // 🛡️ Track final URL after redirects to prevent duplicate crawls
      const finalUrl = page.url();
      const normalizedFinalUrl = normalizeUrl({
        baseUrl: this.baseUrl,
        url: finalUrl,
      });

      if (normalizedFinalUrl !== normalizedUrl) {
        this.visited.add(normalizedFinalUrl);
        this.pending.delete(normalizedFinalUrl);
      }

      const httpStatus = response.status();
      const contentType = response.headers()["content-type"] || "";

      // Skip non-HTML pages
      if (!contentType.includes("text/html")) {
        return null;
      }

      // Wait for SPA content to load
      await waitForSpaLoad(page);

      // Get title
      const title = await page.title();

      // Skip pages with file extension in title (e.g., ".pdf", ".doc", etc.)
      if (hasFileExtensionInTitle(title)) {
        return null;
      }

      // Get category
      const { category, confidence, characteristics } =
        await detectCategoryPage({ page, url });

      // Detect technologies (only on homepage / depth 0)
      let technologies: TechnologyDetectionResult | undefined;
      if (depth === 0) {
        const responseHeaders = response.headers();
        technologies = await detectTechnologies({
          page,
          responseHeaders,
          url,
        });
      }

      // Detect author/signature (only on homepage / depth 0)
      let author: AuthorDetectionResult | undefined;
      if (depth === 0) {
        author = await detectAuthor({ page });
      }

      // Meta description (all pages)
      const description = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="description"]');
        return meta?.getAttribute("content") || undefined;
      });

      // RSS, Newsletter & Social detection (only on homepage / depth 0)
      let rssFeed: RssFeedDetectionResult | undefined;
      let newsletter: NewsletterDetectionResult | undefined;
      let socialLinks: SocialLinksResult | undefined;
      if (depth === 0) {
        rssFeed = await detectRssFeed({ page });
        newsletter = await detectNewsletter({ page });
        socialLinks = await detectSocialLinks({ page });
      }

      // Contact info detection (only on homepage / depth 0)
      let contactInfo: ContactInfoDetectionResult | undefined;
      if (depth === 0) {
        contactInfo = await detectContactInfo({ page });
      }

      // SEO detection (only on homepage / depth 0)
      let seo: SeoDetectionResult | undefined;
      if (depth === 0) {
        seo = await detectSeo({ page });
      }

      // Language detection (only on homepage / depth 0)
      let languageInfo: LanguageDetectionResult | undefined;
      if (depth === 0) {
        languageInfo = await detectLanguages({ page });
      }

      // Extract links
      const links = await this.extractLinksFromPage(page);

      // Dismiss cookie banner before screenshot
      await this.dismissCookieBanner(page);

      // Take screenshot and upload to Vercel Blob (always take screenshots)
      const screenshotUrl = await this.takeAndUploadScreenshot({
        normalizedUrl,
        page,
      });

      // Result
      const nowString = new Date().toISOString();
      return {
        author,
        category,
        categoryConfidence: confidence,
        characteristics,
        contactInfo,
        contentType,
        createdAt: nowString,
        depth,
        description,
        httpStatus,
        languageInfo,
        links,
        newsletter,
        normalizedUrl,
        responseTime,
        rssFeed,
        screenshotUrl,
        seo,
        socialLinks,
        technologies,
        title,
        url,
      };
    } catch (error) {
      // Errors
      const message = error instanceof Error ? error.message : String(error);
      this.errors.push({ error: message, url });
      return null;
    } finally {
      // Close page
      await page.close();
    }
  }

  /**
   * 🔗 Extract links from page
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
   * 🍪 Dismiss cookie consent banner if present
   */
  private async dismissCookieBanner(page: Page): Promise<void> {
    const acceptSelectors = [
      // Common French accept buttons
      'button:has-text("Accepter tout")',
      '[role="button"]:has-text("Accepter tout")',
      'button:has-text("Tout accepter")',
      '[role="button"]:has-text("Tout accepter")',
      'button:has-text("Ok, tout accepter")',
      '[role="button"]:has-text("Ok, tout accepter")',
      'button:has-text("Accepter")',
      '[role="button"]:has-text("Accepter")',
      'button:has-text("J\'accepte")',
      '[role="button"]:has-text("J\'accepte")',
      // Common English accept buttons
      'button:has-text("Accept all")',
      '[role="button"]:has-text("Accept all")',
      'button:has-text("Accept")',
      '[role="button"]:has-text("Accept")',
      // Common consent libraries
      ".tarteaucitronAllow",
      "#onetrust-accept-btn-handler",
      "#CybsearchotBtnAllowAll",
      '[data-testid="cookie-accept"]',
      '[id*="cookie"] button[id*="accept"]',
      '[class*="cookie"] button[class*="accept"]',
      '[class*="consent"] button[class*="accept"]',
    ];

    try {
      for (const selector of acceptSelectors) {
        const button = page.locator(selector).first();
        if (await button.isVisible({ timeout: 200 })) {
          await button.click();
          await page.waitForTimeout(300);
          return;
        }
      }
    } catch {
      // No banner found or click failed - continue anyway
    }
  }

  /**
   * 📸 Take screenshot and upload to Vercel Blob or save locally
   */
  private async takeAndUploadScreenshot({
    page,
    normalizedUrl,
  }: {
    page: Page;
    normalizedUrl: string;
  }): Promise<string | undefined> {
    try {
      const screenshot = await page.screenshot({
        fullPage: false,
        quality: 80,
        type: "jpeg",
      });

      // Convert to WebP for better compression
      const webpBuffer = await sharp(screenshot)
        .webp({ quality: 80 })
        .toBuffer();

      // Create a safe filename from the URL
      const safeFilename = normalizedUrl
        .replace(httpRegex, "")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .slice(0, 100);

      // Branch based on config: local or Vercel Blob
      if (this.config.useLocalScreenshots) {
        return await this.saveScreenshotLocally({
          safeFilename,
          screenshot: webpBuffer,
        });
      }

      // Check for token for Vercel Blob - fall back to local if missing
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn(
          "BLOB_READ_WRITE_TOKEN not set, falling back to local storage"
        );
        return await this.saveScreenshotLocally({
          safeFilename,
          screenshot: webpBuffer,
        });
      }

      // Try Vercel Blob upload
      try {
        const filename = `screenshots/${this.crawlId}/${safeFilename}.webp`;
        const blob = await put(filename, webpBuffer, { access: "public" });
        return blob.url;
      } catch (blobError) {
        // Vercel Blob failed - fall back to local storage
        console.warn(
          "Vercel Blob upload failed, falling back to local storage:",
          blobError
        );
        return await this.saveScreenshotLocally({
          safeFilename,
          screenshot: webpBuffer,
        });
      }
    } catch (error) {
      // Screenshot capture itself failed
      console.error(`Screenshot failed for ${normalizedUrl}:`, error);
      return undefined;
    }
  }

  /**
   * 📸⬇️ Save screenshot locally to filesystem
   */
  private async saveScreenshotLocally({
    screenshot,
    safeFilename,
  }: {
    screenshot: Buffer;
    safeFilename: string;
  }): Promise<string | undefined> {
    try {
      const screenshotsDir = join(process.cwd(), "screenshots", this.crawlId);
      await mkdir(screenshotsDir, { recursive: true });

      const filename = `${safeFilename}.webp`;
      const filePath = join(screenshotsDir, filename);

      await writeFile(filePath, screenshot);

      // Return URL that will be served by our API route
      return `/api/screenshots/${this.crawlId}/${filename}`;
    } catch (error) {
      console.error("Failed to save screenshot locally:", error);
      return undefined;
    }
  }

  /**
   * ⏳ Delay between requests
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 🤖 Check if URL is allowed by robots.txt
   */
  private isAllowedByRobots(url: string): boolean {
    if (!this.robotsRules) return true;

    try {
      const urlObj = new URL(url);
      return isPathAllowed(urlObj.pathname, this.robotsRules.rules);
    } catch {
      return true;
    }
  }

  /**
   * 🧹 Clean up resources
   */
  private async cleanup(): Promise<void> {
    // Close all pooled contexts
    await Promise.all(this.contextPool.map((ctx) => ctx.close()));
    this.contextPool = [];

    if (this.browser) await this.browser.close();
  }
}

// =================================================
// Utils

// ⌚ Tiered SPA loading strategy - fast first, thorough only when needed
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

  // Fast path: content already present, skip expensive waits
  if (hasContent) {
    // Brief stabilization only (200ms)
    await page.waitForTimeout(200);
    return;
  }

  // Slow path: SPA that needs JS rendering
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

// ⌚ Wait for DOM stable
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

// 📄 Check if title ends with a file extension
const FILE_EXTENSION_REGEX =
  /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|tar|gz|7z|exe|dmg|iso|mp3|mp4|avi|mov|wmv|flv|wav|ogg|jpg|jpeg|png|gif|bmp|svg|webp|ico|txt|csv|xml|json|rtf|odt|ods|odp)$/i;

function hasFileExtensionInTitle(title: string): boolean {
  if (!title) return false;
  const trimmedTitle = title.trim();
  return FILE_EXTENSION_REGEX.test(trimmedTitle);
}

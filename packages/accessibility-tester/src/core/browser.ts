import * as chromeLauncher from "chrome-launcher";
import puppeteer, { type Browser, type Page } from "puppeteer";

type ChromeInstance = Awaited<ReturnType<typeof chromeLauncher.launch>>;

class BrowserManager {
  private browser: Browser | null = null;
  private chrome: ChromeInstance | null = null;
  private pageCount = 0;
  private maxPages = 5;

  async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
        headless: true,
      });
    }
    return this.browser;
  }

  async getPage(): Promise<Page> {
    const browser = await this.getBrowser();
    this.pageCount++;
    return browser.newPage();
  }

  async releasePage(page: Page): Promise<void> {
    try {
      await page.close();
      this.pageCount--;
    } catch {
      // Page already closed
    }
  }

  async getChromeForLighthouse(): Promise<{ port: number }> {
    if (!this.chrome) {
      this.chrome = await chromeLauncher.launch({
        chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
      });
    }
    return { port: this.chrome.port };
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    if (this.chrome) {
      await this.chrome.kill();
      this.chrome = null;
    }
    this.pageCount = 0;
  }

  getActivePageCount(): number {
    return this.pageCount;
  }
}

// Singleton export
export const browserManager = new BrowserManager();

// Convenience function for single page operations
export async function withPage<T>(fn: (page: Page) => Promise<T>): Promise<T> {
  const page = await browserManager.getPage();
  try {
    return await fn(page);
  } finally {
    await browserManager.releasePage(page);
  }
}

// Cleanup on process exit
process.on("exit", () => {
  browserManager.close();
});

process.on("SIGINT", async () => {
  await browserManager.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await browserManager.close();
  process.exit(0);
});

/**
 * 📸 Captures fresh screenshots of live sites shown in mockups (e.g. the
 * Safari browser frame on /communes-test-securite).
 *
 * Runs before every `next build`. A committed screenshot is kept as fallback:
 * if the capture fails (site down, no browser available…), the build goes on
 * with the previous image instead of failing.
 */
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { type Browser, chromium } from "playwright";

interface Target {
  output: string;
  /** Pixels to scroll down before the capture (CSS pixels) */
  scrollY?: number;
  url: string;
}

const TARGETS: Target[] = [
  {
    output:
      "app/(tests)/communes-test-securite/_assets/screenshots/cagnolhes.jpg",
    scrollY: 150,
    url: "https://cagnolhes.dev-oc.fr/",
  },
];

// Same ratio as the Safari mockup content area (1200×700), rendered as a large
// desktop screen so more than the hero fits. Output stays 2400×1400 (retina).
const VIEWPORT = { height: 1120, width: 1920 };
const DEVICE_SCALE_FACTOR = 1.25;
const SETTLE_DELAY_MS = 2500;
const NAVIGATION_TIMEOUT_MS = 30_000;

const ROOT = join(import.meta.dirname, "..");

/**
 * On Vercel (Amazon Linux), Playwright's Chromium lacks system libraries, so
 * we use @sparticuz/chromium which bundles them. Locally, we use Playwright's
 * own browser and install it on first run.
 */
async function launchBrowser(): Promise<Browser> {
  if (process.platform === "linux") {
    const { default: sparticuz } = await import("@sparticuz/chromium");
    return chromium.launch({
      args: sparticuz.args,
      executablePath: await sparticuz.executablePath(),
    });
  }

  try {
    return await chromium.launch();
  } catch {
    console.log("📦 Installing Playwright Chromium…");
    spawnSync("bun", ["x", "playwright", "install", "chromium"], {
      stdio: "inherit",
    });
    return chromium.launch();
  }
}

async function capture(browser: Browser, { url, output, scrollY = 0 }: Target) {
  const page = await browser.newPage({
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    reducedMotion: "reduce",
    viewport: VIEWPORT,
  });

  try {
    await page.goto(url, {
      timeout: NAVIGATION_TIMEOUT_MS,
      waitUntil: "networkidle",
    });
    await page.evaluate(
      (y) => window.scrollTo({ behavior: "instant", top: y }),
      scrollY
    );
    await page.waitForTimeout(SETTLE_DELAY_MS);
    await page.screenshot({
      path: join(ROOT, output),
      quality: 82,
      type: "jpeg",
    });
    console.log(`✅ ${url} → ${output}`);
  } finally {
    await page.close();
  }
}

async function main() {
  let browser: Browser | undefined;

  try {
    const launched = await launchBrowser();
    browser = launched;
    const results = await Promise.allSettled(
      TARGETS.map((target) => capture(launched, target))
    );
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.warn(
          `⚠️ Could not capture ${TARGETS[index]?.url}, keeping previous screenshot.`,
          result.reason
        );
      }
    });
  } catch (error) {
    console.warn(
      "⚠️ Could not launch a browser, keeping previous screenshots.",
      error
    );
  } finally {
    await browser?.close();
  }
}

await main();

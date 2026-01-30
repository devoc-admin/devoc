import type { Page } from "playwright";
import type { PerformanceDetectionResult } from "../types";

const LCP_TIMEOUT_MS = 5000;

/**
 * Detects key performance metrics for a page using browser Performance APIs.
 * Captures:
 * - TTFB (Time to First Byte)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - DOM Content Loaded time
 * - Full page load time
 * - Total page size and request count
 * - Resource breakdown by type (scripts, stylesheets, images, fonts)
 */
export async function detectPerformance({
  page,
  url,
}: {
  page: Page;
  url: string;
}): Promise<PerformanceDetectionResult> {
  // Wait for page to fully load before measuring
  await page.waitForLoadState("load");

  // Collect LCP using PerformanceObserver with timeout
  const lcp = await collectLcp(page);

  // Collect all other metrics via page.evaluate
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: exception
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    // Navigation timing metrics
    const ttfb = navigation
      ? navigation.responseStart - navigation.requestStart
      : 0;
    const domContentLoaded = navigation
      ? navigation.domContentLoadedEventEnd - navigation.startTime
      : 0;
    const pageLoadTime = navigation
      ? navigation.loadEventEnd - navigation.startTime
      : 0;

    // First Contentful Paint from paint timing
    const paintEntries = performance.getEntriesByType("paint");
    const fcpEntry = paintEntries.find(
      (entry) => entry.name === "first-contentful-paint"
    );
    const fcp = fcpEntry ? fcpEntry.startTime : null;

    // Resource timing for size and count
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    let totalSize = 0;
    const breakdown = {
      fonts: 0,
      images: 0,
      other: 0,
      scripts: 0,
      stylesheets: 0,
    };

    for (const resource of resources) {
      const size = resource.transferSize || 0;
      totalSize += size;

      // Categorize by initiator type
      switch (resource.initiatorType) {
        case "script":
          breakdown.scripts += size;
          break;
        case "link":
        case "css":
          // Check if it's a stylesheet or font
          if (
            resource.name.includes(".css") ||
            resource.name.includes("stylesheet")
          ) {
            breakdown.stylesheets += size;
          } else if (
            resource.name.includes(".woff") ||
            resource.name.includes(".woff2") ||
            resource.name.includes(".ttf") ||
            resource.name.includes(".otf") ||
            resource.name.includes("fonts.")
          ) {
            breakdown.fonts += size;
          } else {
            breakdown.other += size;
          }
          break;
        case "img":
          breakdown.images += size;
          break;
        case "font":
          breakdown.fonts += size;
          break;
        default:
          breakdown.other += size;
      }
    }

    // Convert bytes to KB
    const bytesToKb = (bytes: number) => Math.round((bytes / 1024) * 100) / 100;

    return {
      domContentLoaded: Math.round(domContentLoaded),
      fcp: fcp !== null ? Math.round(fcp) : null,
      pageLoadTime: Math.round(pageLoadTime),
      pageSizeKb: bytesToKb(totalSize),
      requestCount: resources.length,
      resourceBreakdown: {
        fonts: bytesToKb(breakdown.fonts),
        images: bytesToKb(breakdown.images),
        other: bytesToKb(breakdown.other),
        scripts: bytesToKb(breakdown.scripts),
        stylesheets: bytesToKb(breakdown.stylesheets),
      },
      ttfb: Math.round(ttfb),
    };
  });

  return {
    ...metrics,
    detectedAt: new Date().toISOString(),
    detectedOnUrl: url,
    lcp,
  };
}

/**
 * Collects Largest Contentful Paint using PerformanceObserver.
 * Uses a timeout fallback since LCP may not fire on all pages.
 */
async function collectLcp(page: Page): Promise<number | null> {
  try {
    const lcp = await page.evaluate((timeout) => {
      return new Promise<number | null>((resolve) => {
        let lcpValue: number | null = null;

        // Timeout fallback
        const timeoutId = setTimeout(() => {
          resolve(lcpValue);
        }, timeout);

        // Check if PerformanceObserver is available
        if (typeof PerformanceObserver === "undefined") {
          clearTimeout(timeoutId);
          resolve(null);
          return;
        }

        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            // LCP is the last entry reported
            const lastEntry = entries.at(entries.length - 1);
            if (lastEntry) {
              lcpValue = Math.round(lastEntry.startTime);
            }
          });

          observer.observe({
            buffered: true,
            type: "largest-contentful-paint",
          });

          // Give a brief window for LCP to be reported, then resolve
          setTimeout(() => {
            observer.disconnect();
            clearTimeout(timeoutId);
            resolve(lcpValue);
          }, 1000);
        } catch {
          // PerformanceObserver for LCP not supported
          clearTimeout(timeoutId);
          resolve(null);
        }
      });
    }, LCP_TIMEOUT_MS);

    return lcp;
  } catch {
    return null;
  }
}

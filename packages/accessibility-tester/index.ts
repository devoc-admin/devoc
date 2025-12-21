import * as chromeLauncher from "chrome-launcher";
import fs from "fs";
import lighthouse from "lighthouse";
import path from "path";
import { runRgpdAudit } from "./rgpd";

// Helper to ensure the output directory exists
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

interface AuditResult {
  url: string;
  lighthouseScores: {
    accessibility: number | null;
    bestPractices: number | null;
    performance: number | null;
    seo: number | null;
  };
  rgpd: {
    cookiesDetected: number;
    bannerDetected: boolean;
    httpsSecure: boolean;
  };
  reportPath: string;
}

export async function runAudit(
  url: string,
  outputDir = "./reports"
): Promise<AuditResult> {
  console.log(`🚀 Starting comprehensive audit for: ${url}\n`);

  ensureDirectoryExists(outputDir);

  // --- Step 1: RGPD Audit ---
  console.log("--- Phase 1: RGPD & Privacy ---");
  let rgpdResult;
  try {
    rgpdResult = await runRgpdAudit(url);
  } catch (e) {
    console.error("RGPD Audit skipped due to error.");
    rgpdResult = {
      consentBannerDetected: false,
      cookiesDetected: [],
      httpsSecure: url.startsWith("https"),
      localStorageDetected: [],
      sessionStorageDetected: [],
    };
  }
  console.log("\n");

  // --- Step 2: Lighthouse Audit ---
  console.log("--- Phase 2: Lighthouse (Accessibility, Performance, etc.) ---");

  // Launch Chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options = {
    logLevel: "info",
    onlyCategories: ["accessibility", "best-practices", "performance", "seo"],
    output: "html",
    port: chrome.port,
  };

  try {
    // Run Lighthouse
    const runnerResult = await lighthouse(
      url,
      options as Parameters<typeof lighthouse>[1]
    );

    if (!runnerResult) {
      throw new Error("Lighthouse returned no result");
    }

    // Generate Report
    const reportHtml = Array.isArray(runnerResult.report)
      ? runnerResult.report.join("")
      : runnerResult.report;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const hostname = new URL(url).hostname;
    const reportFilename = `report-${hostname}-${timestamp}.html`;
    const reportPath = path.join(outputDir, reportFilename);

    fs.writeFileSync(reportPath, reportHtml);

    // Extract Scores
    const lhr = runnerResult.lhr;
    const lighthouseScores = {
      accessibility: lhr.categories.accessibility
        ? lhr.categories.accessibility.score
        : null,
      bestPractices: lhr.categories["best-practices"]
        ? lhr.categories["best-practices"].score
        : null,
      performance: lhr.categories.performance
        ? lhr.categories.performance.score
        : null,
      seo: lhr.categories.seo ? lhr.categories.seo.score : null,
    };

    console.log("\n✅ Audit complete!");
    console.log(`📄 Lighthouse Report saved to: ${reportPath}`);

    console.log("\n📊 Summary Results:");
    console.log("  --- Privacy (RGPD) ---");
    console.log(
      `   - Secure (HTTPS): ${rgpdResult.httpsSecure ? "Yes" : "No"}`
    );
    console.log(
      `   - Initial Cookies: ${rgpdResult.cookiesDetected.length} (Should be 0 ideally)`
    );
    console.log(
      `   - Consent Banner: ${rgpdResult.consentBannerDetected ? "Detected" : "Not detected"}`
    );

    console.log("  --- Quality (Lighthouse) ---");
    console.log(
      `   - Accessibility: ${lighthouseScores.accessibility !== null ? (lighthouseScores.accessibility * 100).toFixed(0) : "N/A"}`
    );
    console.log(
      `   - Best Practices: ${lighthouseScores.bestPractices !== null ? (lighthouseScores.bestPractices * 100).toFixed(0) : "N/A"}`
    );
    console.log(
      `   - Performance: ${lighthouseScores.performance !== null ? (lighthouseScores.performance * 100).toFixed(0) : "N/A"}`
    );
    console.log(
      `   - SEO: ${lighthouseScores.seo !== null ? (lighthouseScores.seo * 100).toFixed(0) : "N/A"}`
    );

    return {
      lighthouseScores,
      reportPath,
      rgpd: {
        bannerDetected: rgpdResult.consentBannerDetected,
        cookiesDetected: rgpdResult.cookiesDetected.length,
        httpsSecure: rgpdResult.httpsSecure,
      },
      url,
    };
  } catch (error) {
    console.error("❌ Lighthouse audit failed:", error);
    throw error;
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// CLI Entry point
if (import.meta.main) {
  const url = process.argv[2];
  if (!url) {
    console.error("Please provide a URL to audit.");
    console.error("Usage: bun run index.ts <url>");
    process.exit(1);
  }

  runAudit(url).catch(() => process.exit(1));
}

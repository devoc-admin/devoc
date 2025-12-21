import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "fs";
import lighthouse from "lighthouse";
import path from "path";
// Load RGAA reference data
import rgaaData from "../../data/rgaa.json";
import { detectTechnology, runRgpdAudit } from "../auditors/rgpd";
import { browserManager, withPage } from "../core/browser";
import type {
  AuditPriority,
  BatchAuditOptions,
  FullAuditResult,
  LighthouseScores,
  RgaaAuditResult,
  RgaaData,
  RgaaViolation,
} from "../core/types";
import {
  calculatePriority,
  calculateRgaaScore,
  calculateRgpdScore,
} from "../scoring/rgaa-score";
import {
  filterProspectsForAudit,
  getAuditStats,
  readProspectsCSV,
  updateProspectWithAudit,
  writeProspectsCSV,
} from "./csv-processor";

async function runRgaaAudit(url: string): Promise<RgaaAuditResult> {
  return withPage(async (page) => {
    try {
      await page.goto(url, { timeout: 30_000, waitUntil: "networkidle2" });

      const results = await new AxePuppeteer(page)
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();

      // Map Axe violations to RGAA criteria
      const violations: RgaaViolation[] = [];
      const data = rgaaData as RgaaData;

      for (const violation of results.violations) {
        // Extract WCAG tags
        const wcagTags = violation.tags.filter((t) => t.startsWith("wcag"));

        // Try to map to RGAA criteria via WCAG references
        for (const topic of data.topics) {
          for (const entry of topic.criteria) {
            const crit = entry.criterium;
            const critId = `${topic.number}.${crit.number}`;

            let matched = false;

            // Check WCAG references
            if (crit.references) {
              for (const ref of crit.references) {
                if (ref.wcag) {
                  for (const wcagStr of ref.wcag) {
                    const match = wcagStr.match(/^(\d+\.\d+\.\d+)/);
                    if (match && match[1]) {
                      const wcagId = match[1];
                      const axeTag = "wcag" + wcagId.replace(/\./g, "");
                      if (violation.tags.includes(axeTag)) {
                        matched = true;
                        break;
                      }
                    }
                  }
                }
                if (matched) break;
              }
            }

            if (matched) {
              // Avoid duplicate criterion entries
              if (
                !violations.find(
                  (v) =>
                    v.criterionId === critId && v.axeRuleId === violation.id
                )
              ) {
                violations.push({
                  axeRuleId: violation.id,
                  criterionId: critId,
                  criterionTitle: crit.title,
                  description: violation.description,
                  help: violation.help,
                  helpUrl: violation.helpUrl,
                  impact: violation.impact as RgaaViolation["impact"],
                  nodes: violation.nodes.length,
                  wcagTags,
                });
              }
            }
          }
        }

        // If no RGAA mapping found, still record it
        if (!violations.find((v) => v.axeRuleId === violation.id)) {
          violations.push({
            axeRuleId: violation.id,
            criterionId: "N/A",
            criterionTitle: "Non mapppe RGAA",
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            impact: violation.impact as RgaaViolation["impact"],
            nodes: violation.nodes.length,
            wcagTags,
          });
        }
      }

      const scoring = calculateRgaaScore(violations);

      return {
        failedCriteria: scoring.failedCriteria,
        passedCriteria: scoring.passedCriteria,
        score: scoring.score,
        status: scoring.status,
        timestamp: new Date().toISOString(),
        totalCriteria: 106,
        url,
        violations,
      };
    } catch (error) {
      console.error(
        `    Erreur RGAA: ${error instanceof Error ? error.message : "Unknown"}`
      );
      return {
        failedCriteria: 0,
        passedCriteria: 0,
        score: 0,
        status: "erreur_audit",
        timestamp: new Date().toISOString(),
        totalCriteria: 106,
        url,
        violations: [],
      };
    }
  });
}

async function runLighthouseAudit(url: string): Promise<LighthouseScores> {
  try {
    const chrome = await browserManager.getChromeForLighthouse();

    const options = {
      logLevel: "error" as const,
      onlyCategories: ["accessibility", "best-practices", "performance", "seo"],
      output: "json" as const,
      port: chrome.port,
    };

    const runnerResult = await lighthouse(
      url,
      options as Parameters<typeof lighthouse>[1]
    );
    if (!runnerResult) {
      throw new Error("Lighthouse returned no result");
    }
    const lhr = runnerResult.lhr;

    return {
      accessibility: lhr.categories.accessibility?.score ?? null,
      bestPractices: lhr.categories["best-practices"]?.score ?? null,
      performance: lhr.categories.performance?.score ?? null,
      seo: lhr.categories.seo?.score ?? null,
    };
  } catch (error) {
    console.error(
      `    Erreur Lighthouse: ${error instanceof Error ? error.message : "Unknown"}`
    );
    return {
      accessibility: null,
      bestPractices: null,
      performance: null,
      seo: null,
    };
  }
}

export async function auditSingleUrl(
  url: string,
  outputDir = "./reports"
): Promise<FullAuditResult> {
  console.log(`\nAudit: ${url}`);

  // Run all audits
  const [rgpd, rgaa, lighthouse, technology] = await Promise.all([
    runRgpdAudit(url),
    runRgaaAudit(url),
    runLighthouseAudit(url),
    detectTechnology(url),
  ]);

  // Calculate scores
  const rgpdScore = calculateRgpdScore(
    rgpd.cookiesDetected.length,
    rgpd.trackersBeforeConsent.length,
    rgpd.consentBannerDetected,
    rgpd.httpsSecure
  );

  const hasViolationsCnil =
    rgpd.trackersBeforeConsent.length > 0 && !rgpd.consentBannerDetected;

  // Extract problems
  const rgaaProblems = rgaa.violations
    .filter((v) => v.impact === "critical" || v.impact === "serious")
    .slice(0, 10)
    .map((v) => v.help);

  const rgpdProblems: string[] = [];
  if (!rgpd.httpsSecure) rgpdProblems.push("Site non HTTPS");
  if (rgpd.cookiesDetected.length > 0)
    rgpdProblems.push(
      `${rgpd.cookiesDetected.length} cookies avant consentement`
    );
  if (!rgpd.consentBannerDetected)
    rgpdProblems.push("Banniere cookies absente");
  if (rgpd.trackersBeforeConsent.length > 0) {
    rgpdProblems.push(
      `Trackers sans consentement: ${rgpd.trackersBeforeConsent.map((t) => t.name).join(", ")}`
    );
  }

  // Calculate priority
  const priority = calculatePriority(
    rgaa.score,
    rgpdScore,
    0,
    hasViolationsCnil
  );

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate report path
  const hostname = new URL(url).hostname;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = path.join(
    outputDir,
    `audit-${hostname}-${timestamp}.json`
  );

  const result: FullAuditResult = {
    lighthouse,
    priority,
    problems: {
      rgaa: rgaaProblems,
      rgpd: rgpdProblems,
    },
    reportPath,
    rgaa,
    rgpd,
    technology,
    timestamp: new Date().toISOString(),
    url,
  };

  // Save JSON report
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));

  // Print summary
  console.log(`  RGAA: ${rgaa.score}% (${rgaa.status})`);
  console.log(`  RGPD: ${rgpdScore}%`);
  console.log(
    `  Lighthouse Accessibilite: ${lighthouse.accessibility !== null ? Math.round(lighthouse.accessibility * 100) : "N/A"}%`
  );
  console.log(`  Technologies: ${technology.cms || "Non detecte"}`);
  console.log(`  Priorite: ${priority}`);

  return result;
}

export async function batchAudit(options: BatchAuditOptions): Promise<{
  audited: number;
  failed: number;
  results: FullAuditResult[];
}> {
  console.log(`\nBatch Audit - ${options.csvPath}`);
  console.log("=".repeat(50));

  // Read CSV
  const prospects = await readProspectsCSV(options.csvPath);
  console.log(`Total prospects: ${prospects.length}`);

  // Filter prospects to audit
  const toAudit = filterProspectsForAudit(prospects, {
    onlyWithUrl: true,
    priorityFilter: options.priorityFilter,
    skipAudited: options.skipAudited,
  });
  console.log(`A auditer: ${toAudit.length}`);

  if (toAudit.length === 0) {
    console.log("Aucun prospect a auditer.");
    return { audited: 0, failed: 0, results: [] };
  }

  // Show initial stats
  const statsBefore = getAuditStats(prospects);
  console.log("\nStatistiques initiales:");
  console.log(`  - Avec URL: ${statsBefore.withUrl}`);
  console.log(`  - Deja audites: ${statsBefore.audited}`);
  console.log(`  - En attente: ${statsBefore.pending}`);

  // Ensure output directory exists
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir, { recursive: true });
  }

  const results: FullAuditResult[] = [];
  let audited = 0;
  let failed = 0;
  const updatedProspects = [...prospects];

  // Process in batches for concurrency control
  for (let i = 0; i < toAudit.length; i += options.concurrency) {
    const batch = toAudit.slice(i, i + options.concurrency);
    console.log(
      `\nBatch ${Math.floor(i / options.concurrency) + 1}/${Math.ceil(toAudit.length / options.concurrency)}`
    );

    const batchResults = await Promise.allSettled(
      batch.map(async (prospect) => {
        try {
          const result = await auditSingleUrl(
            prospect.Site_web,
            options.outputDir
          );
          return { prospect, result };
        } catch (error) {
          console.error(
            `  Echec: ${prospect.Site_web} - ${error instanceof Error ? error.message : "Unknown"}`
          );
          throw error;
        }
      })
    );

    // Process results
    for (const settledResult of batchResults) {
      if (settledResult.status === "fulfilled") {
        const { prospect, result } = settledResult.value;
        results.push(result);
        audited++;

        // Update prospect in array
        if (options.updateCsv) {
          const idx = updatedProspects.findIndex(
            (p) => p.Site_web === prospect.Site_web
          );
          if (idx !== -1) {
            updatedProspects[idx] = updateProspectWithAudit(prospect, result);
          }
        }
      } else {
        failed++;
      }
    }

    // Save progress after each batch
    if (options.updateCsv) {
      await writeProspectsCSV(options.csvPath, updatedProspects);
      console.log("  CSV mis a jour");
    }
  }

  // Final stats
  const statsAfter = getAuditStats(updatedProspects);
  console.log(`\n${"=".repeat(50)}`);
  console.log("Audit termine!");
  console.log(`  - Audites: ${audited}`);
  console.log(`  - Echecs: ${failed}`);
  console.log("\nStatistiques finales:");
  console.log(`  - Non conforme: ${statsAfter.byStatus.non_conforme}`);
  console.log(`  - Partiellement conforme: ${statsAfter.byStatus.partiel}`);
  console.log(`  - Conforme: ${statsAfter.byStatus.conforme}`);
  console.log("\nPar priorite:");
  console.log(`  - Prio 5 (Critique): ${statsAfter.byPriority[5]}`);
  console.log(`  - Prio 4 (Haute): ${statsAfter.byPriority[4]}`);
  console.log(`  - Prio 3 (Moyenne): ${statsAfter.byPriority[3]}`);

  // Cleanup browser
  await browserManager.close();

  return { audited, failed, results };
}

// CLI Entry point
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Usage:
  bun run batch-auditor.ts <csv-path> [options]

Options:
  --output-dir <dir>     Output directory for reports (default: ./reports)
  --concurrency <n>      Number of parallel audits (default: 3)
  --skip-audited         Skip already audited prospects
  --update-csv           Update CSV with results (default: true)
  --priority <1-5>       Only audit specific priority levels (can repeat)

Examples:
  bun run batch-auditor.ts prospects.csv
  bun run batch-auditor.ts prospects.csv --concurrency 5 --skip-audited
  bun run batch-auditor.ts prospects.csv --priority 5 --priority 4
`);
    process.exit(0);
  }

  const csvPath = args[0] ?? "";
  let outputDir = "./reports";
  let concurrency = 3;
  let skipAudited = false;
  let updateCsv = true;
  const priorityFilter: AuditPriority[] = [];

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--output-dir":
        outputDir = args[++i] ?? "./reports";
        break;
      case "--concurrency":
        concurrency = Number.parseInt(args[++i] ?? "3") || 3;
        break;
      case "--skip-audited":
        skipAudited = true;
        break;
      case "--no-update-csv":
        updateCsv = false;
        break;
      case "--priority": {
        const p = Number.parseInt(args[++i] ?? "0") as AuditPriority;
        if (p >= 1 && p <= 5) priorityFilter.push(p);
        break;
      }
    }
  }

  batchAudit({
    concurrency,
    csvPath,
    generateReports: true,
    outputDir,
    priorityFilter: priorityFilter.length > 0 ? priorityFilter : undefined,
    skipAudited,
    updateCsv,
  }).catch((error) => {
    console.error("Erreur:", error);
    process.exit(1);
  });
}

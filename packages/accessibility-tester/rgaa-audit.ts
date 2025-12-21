import { AxePuppeteer } from "@axe-core/puppeteer";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

// Load RGAA Data
// Bun can import JSON directly
import rgaaData from "./data/rgaa.json";

interface RgaaCriterion {
  number: number;
  title: string;
  tests: Record<string, string[]>;
  references?: { wcag?: string[] }[];
}

interface RgaaTopic {
  topic: string;
  number: number;
  criteria: { criterium: RgaaCriterion }[];
}

interface RgaaData {
  topics: RgaaTopic[];
}

// Helper to normalize strings for comparison
const normalize = (str: string) => str.toLowerCase().trim();

export async function runRgaaAudit(url: string, outputDir = "./reports") {
  console.log(`🇫🇷 Starting RGAA 4.1 Audit for: ${url}`);

  // 1. Launch Browser & Run Axe
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Inject and run Axe-core with RGAA tags if available, plus standard WCAG
    const results = await new AxePuppeteer(page)
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      // Note: 'rgaa' tags might be available depending on axe-core version and locale,
      // but standard WCAG tags are the most reliable way to link back using the json references.
      .analyze();

    // 2. Map Violations to RGAA
    // We create a map of "RGAA Criterion ID" -> "List of Axe Violations"
    const violationsMap = new Map<string, any[]>();

    // We also keep track of all unique WCAG violations
    const wcagViolationsMap = new Map<string, any[]>();

    for (const violation of results.violations) {
      // Check tags for explicit RGAA references (e.g. "RGAA-1.1.1")
      // Based on research, tags might look like 'rgaa-4-1-1'
      const rgaaTags = violation.tags.filter((t) =>
        t.toUpperCase().includes("RGAA")
      );

      if (rgaaTags.length > 0) {
        // Direct mapping found in Axe tags
        rgaaTags.forEach((tag) => {
          // Format seen: "RGAA-1.1.1" or "RGAA-11.1.1"
          const parts = tag.split("-");
          const firstPart = parts[0];
          const secondPart = parts[1];
          if (
            parts.length === 2 &&
            firstPart &&
            firstPart.toUpperCase() === "RGAA" &&
            secondPart
          ) {
            const numbers = secondPart.split(".");
            const num0 = numbers[0];
            const num1 = numbers[1];
            if (numbers.length >= 2 && num0 && num1) {
              // Topic.Criterion (e.g. 1.1 from 1.1.1)
              const critId = `${num0}.${num1}`;
              if (!violationsMap.has(critId)) violationsMap.set(critId, []);

              // Avoid duplicates
              const list = violationsMap.get(critId);
              if (list && !list.includes(violation)) {
                list.push(violation);
              }
            }
          }
        });
      }

      // Also map via WCAG Tags
      // violation.tags includes things like 'wcag111', 'wcag121' (Axe format)
      // rgaa.json references use "1.1.1 Non-text Content (A)" format.
      // We need a way to link them.
      // Simplest way: Store violations by their WCAG SC (Success Criterion) derived from tags or helpUrl.
      // Axe tags for WCAG are usually 'wcag2a', 'wcag111'.
      // Let's store the violation for every relevant WCAG tag.
      violation.tags.forEach((tag) => {
        if (tag.startsWith("wcag") && /\d/.test(tag)) {
          // e.g. wcag143 -> 1.4.3
          // This is fuzzy. Better to use the rule ID or `wcag` metadata if available.
          // Actually, looking at rgaa.json, it references "1.1.1".
          // Axe violation doesn't always strictly say "1.1.1".
          // But let's proceed with a general "Violations List" for now.
          wcagViolationsMap.set(
            tag,
            (wcagViolationsMap.get(tag) || []).concat(violation)
          );
        }
      });
    }

    // 3. Generate Report
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const hostname = new URL(url).hostname;
    const filename = path.join(
      outputDir,
      `RGAA-Report-${hostname}-${timestamp}.md`
    );

    let md = `# Rapport d'Audit RGAA 4.1\n\n`;
    md += `**URL Auditée:** ${url}\n`;
    md += `**Date:** ${new Date().toLocaleString()}\n`;
    md += "**Outil:** Automated Script (Puppeteer + Axe-core)\n\n";

    md += `> ⚠️ **Attention:** Ce rapport est généré automatiquement. Il ne remplace pas un audit humain complet. L'outil peut détecter des non-conformités, mais ne peut pas valider la conformité totale (beaucoup de critères RGAA nécessitent un jugement humain).\n\n`;

    md += "## Résumé des Non-Conformités Détectées (Axe-core)\n";
    if (results.violations.length === 0) {
      md += "✅ Aucune violation automatique détectée.\n";
    } else {
      md += `🔴 **${results.violations.length} types de violations détectés.**\n\n`;
    }

    // Iterate over RGAA Topics
    (rgaaData as RgaaData).topics.forEach((topic) => {
      let topicHasIssues = false;
      let topicMd = `### Thématique ${topic.number}: ${topic.topic}\n\n`;

      topic.criteria.forEach((entry) => {
        const crit = entry.criterium;
        const critId = `${topic.number}.${crit.number}`;

        // Check if we have mapped violations for this specific RGAA criterion
        // (If we implemented the tag mapping logic perfectly)
        const directViolations = violationsMap.get(critId) || [];

        // Also check if any Axe violation tags match the WCAG references of this criterion
        // This is the "Smart Mapping" part
        const matchedViolations: any[] = [...directViolations];

        if (crit.references) {
          crit.references.forEach((ref) => {
            if (ref.wcag) {
              ref.wcag.forEach((wcagStr) => {
                // wcagStr is like "1.1.1 Non-text Content (A)"
                // Extract "1.1.1"
                const match = wcagStr.match(/^(\d+\.\d+\.\d+)/);
                if (match && match[1]) {
                  const wcagId = match[1]; // "1.1.1"
                  const axeTag = "wcag" + wcagId.replace(/\./g, ""); // "wcag111"

                  // Check if any *violation* has this tag
                  results.violations.forEach((v) => {
                    if (
                      v.tags.includes(axeTag) &&
                      !matchedViolations.includes(v)
                    ) {
                      matchedViolations.push(v);
                    }
                  });
                }
              });
            }
          });
        }

        if (matchedViolations.length > 0) {
          topicHasIssues = true;
          topicMd += `#### 🔴 Critère ${critId}: ${crit.title}\n`;
          topicMd += "**Non-conformités automatiques relevées :**\n";

          matchedViolations.forEach((v) => {
            topicMd += `- **[${v.impact.toUpperCase()}]** ${v.help} (${v.id})\n`;
            topicMd += `  - *Description:* ${v.description}\n`;
            topicMd += `  - *Noeuds concernés:* ${v.nodes.length}\n`;
            // Only show first 3 nodes to keep report readable
            v.nodes.slice(0, 3).forEach((n: any) => {
              topicMd += `    - \`${n.html}\`\n`;
            });
            if (v.nodes.length > 3)
              topicMd += `    - ... (+ ${v.nodes.length - 3} autres)\n`;
          });
          topicMd += `\n[Voir la fiche RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#${critId.replace(".", "-")})\n\n`;
        } else {
          // No issues found for this criterion
        }
      });

      if (topicHasIssues) {
        md += topicMd;
        md += "---\n";
      }
    });

    if (!md.includes("#### 🔴")) {
      md += `\n*Aucune violation ne correspond directement à un critère RGAA via le mapping automatique. Veuillez consulter le rapport brut Axe ci-dessous pour plus de détails.*
`;
    }

    md += "\n## Détail Complet des Violations Axe (Non classées)\n";
    results.violations.forEach((v) => {
      md += `- **${v.id}** (${v.impact}): ${v.help}\n`;
    });

    // Save Report
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(filename, md);

    console.log("✅ RGAA Audit complete!");
    console.log(`📄 Report saved to: ${filename}`);
  } catch (error) {
    console.error("❌ RGAA Audit failed:", error);
  } finally {
    await browser.close();
  }
}

// CLI Entry
if (import.meta.main) {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: bun run rgaa-audit.ts <url>");
    process.exit(1);
  }
  runRgaaAudit(url);
}

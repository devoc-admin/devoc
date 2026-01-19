import { eq } from "drizzle-orm";
import { WebCrawler } from "@/lib/crawler";
import type { TechnologyDetectionResult } from "@/lib/crawler/types";
import { db } from "@/lib/db";
import {
  crawledPage,
  crawlJob,
  crawlJobTechnology,
  technology,
} from "@/lib/db/schema";
import { inngest } from "../client";

type CrawlRequestEvent = {
  data: {
    crawlJobId: string;
    url: string;
    config: {
      maxDepth: number;
      maxPages: number;
      delayBetweenRequests: number;
      respectRobotsTxt: boolean;
      skipResources?: boolean;
      skipScreenshots?: boolean;
      useLocalScreenshots?: boolean;
      concurrency?: number;
      includePaths?: string[];
      excludePaths?: string[];
    };
  };
};

export const crawlWebsite = inngest.createFunction(
  {
    cancelOn: [
      {
        event: "crawl/crawl.cancelled",
        match: "data.crawlJobId",
      },
    ],
    id: "crawl-website",
    name: "Crawl Website for audit",
    retries: 2,
  },
  { event: "crawl/crawl.requested" },
  async ({ event, step, logger }) => {
    const { crawlJobId, url, config } = event.data as CrawlRequestEvent["data"];

    // 1️⃣ 🏃 Mark as running
    await step.run("mark-job-running", async () => {
      const nowString = new Date().toISOString();
      await db
        .update(crawlJob)
        .set({
          startedAt: nowString,
          status: "running",
          updatedAt: nowString,
        })
        .where(eq(crawlJob.id, crawlJobId));
    });

    // 2️⃣ 🏃 Running
    const result = await step.run("execute-crawl", async () => {
      const crawler = new WebCrawler({
        baseUrl: url,
        config,
        crawlJobId,
      });

      // ⏳ Update progress
      return await crawler.crawl({
        onProgress: async (progress) => {
          // 👁️📝 Logs
          const nowString = new Date().toISOString();

          // Update crawl job
          await db
            .update(crawlJob)
            .set({
              pagesCrawled: progress.crawled,
              pagesDiscovered: progress.discovered,
              updatedAt: nowString,
            })
            .where(eq(crawlJob.id, crawlJobId));

          // ➕ Add result
          const pageToInsert = {
            category: progress.crawledPage.category,
            categoryConfidence: progress.crawledPage.categoryConfidence,
            contentType: progress.crawledPage.contentType,
            crawlJobId,
            depth: progress.crawledPage.depth,
            description: progress.crawledPage.description,
            hasAuthentication:
              progress.crawledPage.characteristics.hasAuthentication,
            hasDocuments: progress.crawledPage.characteristics.hasDocuments,
            hasForm: progress.crawledPage.characteristics.hasForm,
            hasMultimedia: progress.crawledPage.characteristics.hasMultimedia,
            hasTable: progress.crawledPage.characteristics.hasTable,
            httpStatus: progress.crawledPage.httpStatus,
            layoutSignature:
              progress.crawledPage.characteristics.layoutSignature,
            normalizedUrl: progress.crawledPage.normalizedUrl,
            responseTime: progress.crawledPage.responseTime,
            screenshotUrl: progress.crawledPage.screenshotUrl,
            selectedForAudit: false,
            title: progress.crawledPage.title,
            url: progress.crawledPage.url,
          };

          // Use onConflictDoNothing to silently skip duplicates (safety net for race conditions)
          await db
            .insert(crawledPage)
            .values(pageToInsert)
            .onConflictDoNothing({
              target: [crawledPage.crawlJobId, crawledPage.normalizedUrl],
            });

          // 🔍 Save detected technologies (only for homepage / depth 0)
          if (progress.crawledPage.technologies?.technologies?.length) {
            await saveTechnologies(
              crawlJobId,
              progress.crawledPage.technologies
            );
          }

          // 🏢 Save detected author/signature (only for homepage / depth 0)
          if (progress.crawledPage.author) {
            await db
              .update(crawlJob)
              .set({
                author: progress.crawledPage.author.name,
                authorUrl: progress.crawledPage.author.url,
                updatedAt: nowString,
              })
              .where(eq(crawlJob.id, crawlJobId));
          }

          // 📡 Save RSS feed detection (only for homepage / depth 0)
          if (progress.crawledPage.rssFeed?.hasRssFeed) {
            await db
              .update(crawlJob)
              .set({
                hasRssFeed: true,
                updatedAt: nowString,
              })
              .where(eq(crawlJob.id, crawlJobId));
          }

          // 📰 Save newsletter detection (only for homepage / depth 0)
          if (progress.crawledPage.newsletter?.hasNewsletter) {
            await db
              .update(crawlJob)
              .set({
                hasNewsletter: true,
                newsletterProvider:
                  progress.crawledPage.newsletter.provider ?? null,
                updatedAt: nowString,
              })
              .where(eq(crawlJob.id, crawlJobId));
          }

          // 🔗 Save social links (only for homepage / depth 0)
          if (
            progress.crawledPage.socialLinks &&
            Object.keys(progress.crawledPage.socialLinks).length > 0
          ) {
            await db
              .update(crawlJob)
              .set({
                socialLinks: progress.crawledPage.socialLinks,
                updatedAt: nowString,
              })
              .where(eq(crawlJob.id, crawlJobId));
          }
        },
      });
    });

    for (const error of result.errors ?? []) {
      logger.error("🚫 Error during crawl", {
        error,
      });
    }

    // 3️⃣ Select pages for RGAA audit
    await step.run("select-pages-for-audit", async () => {
      // Helper to check if page has successful HTTP status (2xx)
      const isSuccessfulPage = (page: { httpStatus: number }) =>
        page.httpStatus >= 200 && page.httpStatus < 300;

      const mandatoryCategories = [
        "homepage",
        "contact",
        "legal_notices",
        "accessibility",
        "sitemap",
        "help",
        "authentication",
      ] as const;

      // Select first page for each mandatory category (only 2xx pages)
      const selectedMandatory: string[] = [];
      for (const mandatoryCategory of mandatoryCategories) {
        const selectedPage = result.pages.find(
          (page) =>
            page.category === mandatoryCategory && isSuccessfulPage(page)
        );
        if (selectedPage) {
          selectedMandatory.push(mandatoryCategory);
          await db
            .update(crawledPage)
            .set({ selectedForAudit: true })
            .where(eq(crawledPage.normalizedUrl, selectedPage.normalizedUrl));
        }
      }

      // ✨ Select pages with unique characteristics (only 2xx pages)
      const specialPages = result.pages.filter(
        (page) =>
          isSuccessfulPage(page) &&
          (page.characteristics.hasMultimedia ||
            page.characteristics.hasTable ||
            page.characteristics.hasForm ||
            page.characteristics.hasDocuments)
      );

      const maxSpecialPages = 15;
      const selectedSpecial = specialPages.slice(0, maxSpecialPages);

      for (const page of selectedSpecial) {
        await db
          .update(crawledPage)
          .set({ selectedForAudit: true })
          .where(eq(crawledPage.normalizedUrl, page.normalizedUrl));
      }
    });

    //5️⃣ 🎉 Mark job as completed
    await step.run("mark-job-completed", async () => {
      const nowString = new Date().toISOString();
      await db
        .update(crawlJob)
        .set({
          completedAt: nowString,
          pagesCrawled: result.pages.length,
          pagesDiscovered: result.pages.length,
          status: "completed",
          updatedAt: nowString,
        })
        .where(eq(crawlJob.id, crawlJobId));
    });

    return {
      errorsCount: result.errors?.length ?? 0,
      pagesDiscovered: result.pages.length,
      success: true,
    };
  }
);

/**
 * Save detected technologies to database
 */
async function saveTechnologies(
  crawlJobId: string,
  detectionResult: TechnologyDetectionResult
) {
  const techs = detectionResult.technologies;
  if (!techs.length) return;

  // Track summary data
  let primaryCms: string | undefined;
  let primaryFramework: string | undefined;
  const analyticsToolsList: string[] = [];

  for (const tech of techs) {
    // 1. Upsert technology to master table
    const [insertedTech] = await db
      .insert(technology)
      .values({
        category: tech.category,
        icon: tech.icon,
        name: tech.name,
        slug: tech.slug,
        website: tech.website,
      })
      .onConflictDoUpdate({
        set: {
          category: tech.category,
          icon: tech.icon,
          name: tech.name,
          website: tech.website,
        },
        target: technology.slug,
      })
      .returning({ id: technology.id });

    if (!insertedTech) continue;

    // 2. Link to crawl job via junction table
    await db
      .insert(crawlJobTechnology)
      .values({
        confidence: tech.confidence,
        crawlJobId,
        technologyId: insertedTech.id,
        version: tech.version,
      })
      .onConflictDoNothing({
        target: [
          crawlJobTechnology.crawlJobId,
          crawlJobTechnology.technologyId,
        ],
      });

    // 3. Track summary data
    const categoryLower = tech.category.toLowerCase();
    if (categoryLower === "cms" && !primaryCms) {
      primaryCms = tech.name;
    }
    if (
      (categoryLower.includes("framework") ||
        categoryLower.includes("javascript")) &&
      !primaryFramework
    ) {
      primaryFramework = tech.name;
    }
    if (categoryLower.includes("analytics")) {
      analyticsToolsList.push(tech.name);
    }
  }

  // 4. Update crawl job summary columns (including French tech)
  const { frenchTech } = detectionResult;
  const nowString = new Date().toISOString();
  await db
    .update(crawlJob)
    .set({
      accessibilityTool: frenchTech.accessibilityTool ?? null,
      analyticsTools: analyticsToolsList.length ? analyticsToolsList : null,
      consentManager: frenchTech.consentManager ?? null,
      detectedTechCount: techs.length,
      hostingProvider: frenchTech.hostingProvider ?? null,
      primaryCms: primaryCms ?? null,
      primaryFramework: primaryFramework ?? null,
      updatedAt: nowString,
      usesDsfr: frenchTech.usesDsfr,
    })
    .where(eq(crawlJob.id, crawlJobId));
}

import { eq } from "drizzle-orm";
import { WebCrawler } from "@/lib/crawler";
import { db } from "@/lib/db";
import { crawledPage, crawlJob } from "@/lib/db/schema";
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
      includePaths?: string[];
      excludePaths?: string[];
    };
  };
};

export const crawlWebsite = inngest.createFunction(
  {
    id: "crawl-website",
    name: "Crawl Website for audit",
    retries: 2,
  },
  { event: "audit/crawl.requested" },
  async ({ event, step, logger }) => {
    const { crawlJobId, url, config } = event.data as CrawlRequestEvent["data"];

    logger.info("🚀 Starting crawl job", {
      crawlJobId,
      maxDepth: config.maxDepth,
      maxPages: config.maxPages,
      url,
    });

    // 1️⃣ 🏃 Mark as running
    await step.run("mark-job-running", async () => {
      const nowString = new Date().toISOString();
      logger.info("📝 Marking job as running", { crawlJobId });
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
    logger.info(`🕷️ Starting crawler execution for website : ${url}`);
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
          logger.info(
            `🔬 ${progress.crawledPage.title ? `${progress.crawledPage.title} (${progress.crawledPage.normalizedUrl})` : progress.crawledPage.normalizedUrl}  has been parsed`
          );
          logger.info("");
          logger.info(
            `📊 ${progress.crawled}/${progress.discovered} pages crawled (${Math.round(
              (progress.crawled / config.maxPages) * 100
            )}%)`
          );

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

          await db.insert(crawledPage).values(pageToInsert);
        },
      });
    });

    logger.info("✅ Crawl execution completed", {
      errorsCount: result.errors?.length ?? 0,
      pagesFound: result.pages.length,
    });

    for (const error of result.errors ?? []) {
      logger.error("🚫 Error during crawl", {
        error,
      });
    }

    // 3️⃣ Select pages for RGAA audit
    await step.run("select-pages-for-audit", async () => {
      logger.info("🎯 Selecting pages for RGAA audit");

      const mandatoryCategories = [
        "homepage",
        "contact",
        "legal_notices",
        "accessibility",
        "sitemap",
        "help",
        "authentication",
      ] as const;

      // Select first page for each mandatory category
      const selectedMandatory: string[] = [];
      for (const mandatoryCategory of mandatoryCategories) {
        const selectedPage = result.pages.find(
          (page) => page.category === mandatoryCategory
        );
        if (selectedPage) {
          selectedMandatory.push(mandatoryCategory);
          await db
            .update(crawledPage)
            .set({ selectedForAudit: true })
            .where(eq(crawledPage.normalizedUrl, selectedPage.normalizedUrl));
        }
      }

      logger.info("📋 Mandatory categories selected", {
        found: selectedMandatory,
        missing: mandatoryCategories.filter(
          (c) => !selectedMandatory.includes(c)
        ),
      });

      // ✨ Select pages with unique characteristics
      const specialPages = result.pages.filter(
        (page) =>
          page.characteristics.hasMultimedia ||
          page.characteristics.hasTable ||
          page.characteristics.hasForm ||
          page.characteristics.hasDocuments
      );

      const maxSpecialPages = 15;
      const selectedSpecial = specialPages.slice(0, maxSpecialPages);

      for (const page of selectedSpecial) {
        await db
          .update(crawledPage)
          .set({ selectedForAudit: true })
          .where(eq(crawledPage.normalizedUrl, page.normalizedUrl));
      }

      logger.info("✨ Special pages selected", {
        characteristics: selectedSpecial.map((p) => ({
          hasDocuments: p.characteristics.hasDocuments,
          hasForm: p.characteristics.hasForm,
          hasMultimedia: p.characteristics.hasMultimedia,
          hasTable: p.characteristics.hasTable,
          url: p.normalizedUrl,
        })),
        selected: selectedSpecial.length,
        totalSpecialFound: specialPages.length,
      });
    });

    //5️⃣ 🎉 Mark job as completed
    await step.run("mark-job-completed", async () => {
      logger.info(`🎉 Marking job as completed (crawl job id: ${crawlJobId}`);

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

    logger.info("🏁 Crawl job finished successfully", {
      crawlJobId,
      errorsCount: result.errors?.length ?? 0,
      pagesDiscovered: result.pages.length,
      url,
    });

    return {
      errorsCount: result.errors?.length ?? 0,
      pagesDiscovered: result.pages.length,
      success: true,
    };
  }
);

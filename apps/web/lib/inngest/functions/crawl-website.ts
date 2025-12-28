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
  async ({ event, step }) => {
    const { crawlJobId, url, config } = event.data as CrawlRequestEvent["data"];

    // 1️⃣ 🏃 Mark as running
    await step.run("mark-job-running", async () => {
      await db
        .update(crawlJob)
        .set({
          startedAt: new Date().toISOString(),
          status: "running",
          updatedAt: new Date().toISOString(),
        })
        .where(eq(crawlJob.id, crawlJobId));
    });

    // 2️⃣ 🏃 Running
    const result = await step.run("execute-crawl", async () => {
      const crawler = new WebCrawler({
        baseUrl: url,
        config,
      });

      // ⏳ Update progress
      return await crawler.crawl({
        onProgress: async (progress) => {
          await db
            .update(crawlJob)
            .set({
              pagesCrawled: progress.crawled,
              pagesDiscovered: progress.discovered,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(crawlJob.id, crawlJobId));
        },
      });
    });

    // 3️⃣ 💾 📄 Store crawled pages
    await step.run("save-pages", async () => {
      if (result.pages.length === 0) return;

      const pagesToInsert = result.pages.map((page) => ({
        category: page.category,
        categoryConfidence: page.categoryConfidence,
        contentType: page.contentType,
        crawlJobId,
        depth: page.depth,
        hasAuthentication: page.characteristics.hasAuthentication,
        hasDocuments: page.characteristics.hasDocuments,
        hasForm: page.characteristics.hasForm,
        hasMultimedia: page.characteristics.hasMultimedia,
        hasTable: page.characteristics.hasTable,
        httpStatus: page.httpStatus,
        layoutSignature: page.characteristics.layoutSignature,
        normalizedUrl: page.normalizedUrl,
        responseTime: page.responseTime,
        selectedForAudit: false,
        title: page.title,
        url: page.url,
      }));

      await db.insert(crawledPage).values(pagesToInsert);
    });

    // 4️⃣ Select pages for RGAA audit
    await step.run("select-pages-for-audit", async () => {
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
      for (const mandatoryCategory of mandatoryCategories) {
        const selectedPage = result.pages.find(
          (page) => page.category === mandatoryCategory
        );
        if (selectedPage) {
          await db
            .update(crawledPage)
            .set({ selectedForAudit: true })
            .where(eq(crawledPage.normalizedUrl, selectedPage.normalizedUrl));
        }
      }

      // Select pages with unique characteristics
      const specialPages = result.pages.filter(
        (page) =>
          page.characteristics.hasMultimedia ||
          page.characteristics.hasTable ||
          page.characteristics.hasForm ||
          page.characteristics.hasDocuments
      );

      const maxSpecialPages = 5;
      for (const page of specialPages.slice(0, maxSpecialPages)) {
        await db
          .update(crawledPage)
          .set({ selectedForAudit: true })
          .where(eq(crawledPage.normalizedUrl, page.normalizedUrl));
      }
    });

    //5️⃣ 🎉 Mark job as completed
    await step.run("mark-job-completed", async () => {
      await db
        .update(crawlJob)
        .set({
          completedAt: new Date().toISOString(),
          pagesCrawled: result.pages.length,
          pagesDiscovered: result.pages.length,
          status: "completed",
          updatedAt: new Date().toISOString(),
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

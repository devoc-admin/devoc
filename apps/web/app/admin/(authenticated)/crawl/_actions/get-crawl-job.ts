"use server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { crawl, crawledPage, crawlJob } from "@/lib/db/schema";

const crawlJobQuery = db
  .select({
    crawlUrl: crawl.url,
    errorMessage: crawlJob.errorMessage,
    pagesCrawled: crawlJob.pagesCrawled,
    pagesDiscovered: crawlJob.pagesDiscovered,
    status: crawlJob.status,
  })
  .from(crawlJob)
  .leftJoin(crawl, eq(crawlJob.crawlId, crawl.id))
  .$dynamic();

const latestPageQuery = db
  .select({
    category: crawledPage.category,
    createdAt: crawledPage.createdAt,
    depth: crawledPage.depth,
    httpStatus: crawledPage.httpStatus,
    id: crawledPage.id,
    screenshotUrl: crawledPage.screenshotUrl,
    title: crawledPage.title,
    url: crawledPage.url,
  })
  .from(crawledPage)
  .$dynamic();

type CrawlJobQueryResult = Awaited<typeof crawlJobQuery>[number];
type LatestPageResult = Awaited<typeof latestPageQuery>[number];

type CrawlJobResult =
  | (Omit<CrawlJobQueryResult, "crawlUrl"> & {
      success: true;
      crawlUrl: string | null;
      latestPage: LatestPageResult | null;
    })
  | { success: false; error: string };

export async function getCrawlJob(crawlJobId: string): Promise<CrawlJobResult> {
  try {
    // 🐝 Fetch crawl job status
    const [job] = await crawlJobQuery.where(eq(crawlJob.id, crawlJobId));

    if (!job) return { error: "Crawl job not found", success: false };

    // ⬇️ Fetch the latest crawled page
    const [latestPage] = await latestPageQuery
      .where(eq(crawledPage.crawlJobId, crawlJobId))
      .orderBy(desc(crawledPage.createdAt))
      .limit(1);

    return {
      crawlUrl: job.crawlUrl,
      errorMessage: job.errorMessage,
      latestPage: latestPage ?? null,
      pagesCrawled: job.pagesCrawled,
      pagesDiscovered: job.pagesDiscovered,
      status: job.status,
      success: true,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error fetching crawl status:", message);
    return { error: message, success: false };
  }
}

// ------------------------------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
}

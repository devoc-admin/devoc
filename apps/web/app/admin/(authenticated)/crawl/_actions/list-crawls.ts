"use server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { crawl, crawledPage, crawlJob } from "@/lib/db/schema";

const crawlsQuery = db
  .select({
    createdAt: crawl.createdAt,
    id: crawl.id,
    pagesCrawled: crawlJob.pagesCrawled,
    pagesDiscovered: crawlJob.pagesDiscovered,
    screenshotUrl: crawledPage.screenshotUrl,
    title: crawledPage.title,
    url: crawl.url,
  })
  .from(crawl)
  .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
  .leftJoin(crawledPage, eq(crawlJob.id, crawledPage.crawlJobId))
  .where(and(eq(crawlJob.status, "completed"), eq(crawledPage.url, crawl.url)))
  .orderBy(desc(crawlJob.createdAt))
  .limit(10);

export type CrawlResult = Awaited<typeof crawlsQuery>[number];

type ListCrawlResult =
  | { success: true; crawls: CrawlResult[] }
  | { success: false; error: string };

export async function listCrawls(): Promise<ListCrawlResult> {
  try {
    const crawls = await crawlsQuery;
    console.log("crawls1", crawls);
    return { crawls, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
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

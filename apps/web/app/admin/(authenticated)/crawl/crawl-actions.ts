"use server";
import { del, list } from "@vercel/blob";
import { db } from "@/lib/db";
import {
  type Crawl,
  type CrawlJob,
  crawl,
  crawledPage,
  crawlJob,
} from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

// ═══════════════════════════════════════════════════════════════════════════
// 🏁 Start crawl

export async function upsertCrawl({
  url,
  maxDepth,
  maxPages,
}: UpsertCrawlParams): Promise<UpsertCrawlResult> {
  // ✅🌐 Validation de l'URL
  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    return { error: "URL invalide", success: false };
  }

  // 1️⃣ Register the website in database
  let crawlResult: Crawl[];
  try {
    crawlResult = await db
      .insert(crawl)
      .values({ url: origin })
      .onConflictDoUpdate({
        set: { url: origin },
        target: crawl.url,
      })
      .returning();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur upsert crawl:", message);
    return { error: message, success: false };
  }

  const insertedCrawl = crawlResult[0];
  if (!insertedCrawl) {
    return { error: "Échec de l'insertion du crawl", success: false };
  }

  // 2️⃣ Register the crawl job in database
  let crawlJobsResult: CrawlJob[] = [];
  const nowString = new Date().toISOString();
  try {
    crawlJobsResult = await db
      .insert(crawlJob)
      .values({
        crawlId: insertedCrawl.id,
        createdAt: nowString,
        id: crypto.randomUUID(),
        maxDepth,
        maxPages,
        status: "pending",
        updatedAt: nowString,
      })
      .returning();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur creation crawl job:", message);
    return { error: message, success: false };
  }

  const insertedCrawlJob = crawlJobsResult[0];
  if (!insertedCrawlJob) {
    return { error: "Error while trying to insert crawl job", success: false };
  }

  // 3️⃣ Execute the crawler as a background job
  try {
    await inngest.send({
      data: {
        config: {
          maxDepth: maxDepth ?? 1,
          maxPages: maxPages ?? 5,
        },
        crawlJobId: insertedCrawlJob.id,
        url: origin,
      },
      name: "crawl/crawl.requested",
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error triggering Inngest job:", message);
    return { error: "Error while triggering crawl job", success: false };
  }

  return {
    crawlId: insertedCrawl.id,
    crawlJobId: insertedCrawlJob.id,
    success: true,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚮 Erase crawls

type DeleteAllCrawlsResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteAllCrawls(): Promise<DeleteAllCrawlsResult> {
  try {
    // 1️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteAllScreenshots();

    // 2️⃣ Delete all database records
    await db.delete(crawledPage).execute();
    await db.delete(crawlJob).execute();
    await db.delete(crawl).execute();

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error erasing crawls:", message);
    return { error: "Error while erasing crawls", success: false };
  }
}

async function deleteAllScreenshots(): Promise<void> {
  let cursor: string | undefined;

  do {
    const response = await list({
      cursor,
      prefix: "screenshots/",
    });

    if (response.blobs.length > 0) {
      const urls = response.blobs.map((blob) => blob.url);
      await del(urls);
      console.log(`🗑️ Deleted ${urls.length} screenshots`);
    }

    cursor = response.cursor;
  } while (cursor);
}

// -------------------------------------------------
export async function isValidWebsite(url: string): Promise<boolean> {
  try {
    // Validate URL format first
    const urlObject = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObject.protocol)) {
      return false;
    }

    // Make a HEAD request (lighter than GET)
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    // Consider 2xx and 3xx as valid
    return response.ok || (response.status >= 300 && response.status < 400);
  } catch {
    return false;
  }
}

type UpsertCrawlParams = {
  url: string;
  maxDepth: number;
  maxPages: number;
};

type UpsertCrawlResult =
  | { success: true; crawlId: number; crawlJobId: string }
  | { success: false; error: string };

// ═══════════════════════════════════════════════════════════════════════════
// 📊 Get crawl status (for polling)

export async function getCrawlJob(crawlJobId: string): Promise<CrawlJobResult> {
  try {
    const { desc, eq } = await import("drizzle-orm");

    // 🐝 Fetch crawl job status
    const [job] = await db
      .select({
        crawlUrl: crawl.url,
        errorMessage: crawlJob.errorMessage,
        pagesCrawled: crawlJob.pagesCrawled,
        pagesDiscovered: crawlJob.pagesDiscovered,
        status: crawlJob.status,
      })
      .from(crawlJob)
      .where(eq(crawlJob.id, crawlJobId))
      .leftJoin(crawl, eq(crawlJob.crawlId, crawl.id))
      .limit(1);

    if (!job) {
      return { error: "Crawl job not found", success: false };
    }

    // ⬇️ Fetch the latest crawled page
    const [latestPage] = await db
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

type CrawlJobResult =
  | {
      success: true;
      status: "pending" | "running" | "completed" | "failed" | "cancelled";
      pagesCrawled: number;
      pagesDiscovered: number;
      errorMessage: string | null;
      crawlUrl: string | null;
      latestPage: {
        id: string;
        url: string;
        title: string | null;
        category: string;
        screenshotUrl: string | null;
        depth: number;
        httpStatus: number | null;
        createdAt: string;
      } | null;
    }
  | { success: false; error: string };

// ------------------------------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
}

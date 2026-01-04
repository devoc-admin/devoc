"use server";
import { del, list } from "@vercel/blob";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type Crawl,
  type CrawlJob,
  crawl,
  crawledPage,
  crawlJob,
} from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
//➕ Upsert a crawl

export async function upsertCrawl({
  url,
  maxDepth,
  maxPages,
  skipResources,
}: UpsertCrawlParams): Promise<ActionResult<UpsertCrawlResult>> {
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
    const message = getErrorMessage(error);
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
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }

  const insertedCrawlJob = crawlJobsResult[0];
  if (!insertedCrawlJob) {
    return {
      error: "Echec de l'enregistrement du job pour le crawl ",
      success: false,
    };
  }

  // 3️⃣ Launch the crawler as a background job
  try {
    await inngest.send({
      data: {
        config: {
          maxDepth: maxDepth ?? 1,
          maxPages: maxPages ?? 5,
          skipResources: skipResources ?? false,
        },
        crawlJobId: insertedCrawlJob.id,
        url: origin,
      },
      name: "crawl/crawl.requested",
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: `Echec lors du lancement du job pour le crawl : ${message}`,
      success: false,
    };
  }

  return {
    response: {
      crawlId: insertedCrawl.id,
      crawlJobId: insertedCrawlJob.id,
    },
    success: true,
  };
}

type UpsertCrawlParams = {
  url: string;
  maxDepth: number;
  maxPages: number;
  skipResources: boolean;
};

export type UpsertCrawlResult = { crawlId: number; crawlJobId: string };

// --------------------------------------
// 🔁 Get crawl job

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

export type CrawlJobQueryResult = Awaited<typeof crawlJobQuery>[number] & {
  latestPage: LatestPageResult;
};
type LatestPageResult = Awaited<typeof latestPageQuery>[number];

export async function getCrawlJob(
  crawlJobId: string
): Promise<ActionResult<CrawlJobQueryResult>> {
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
      response: {
        crawlUrl: job.crawlUrl,
        errorMessage: job.errorMessage,
        latestPage: latestPage ?? null,
        pagesCrawled: job.pagesCrawled,
        pagesDiscovered: job.pagesDiscovered,
        status: job.status,
      },
      success: true,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error fetching crawl status:", message);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 📝 List crawls
const crawlsQuery = db
  .select({
    completedAt: crawlJob.completedAt,
    createdAt: crawl.createdAt,
    id: crawl.id,
    pagesCrawled: crawlJob.pagesCrawled,
    pagesDiscovered: crawlJob.pagesDiscovered,
    screenshotUrl: crawledPage.screenshotUrl,
    startedAt: crawlJob.startedAt,
    title: crawledPage.title,
    url: crawl.url,
  })
  .from(crawl)
  .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
  .leftJoin(crawledPage, eq(crawlJob.id, crawledPage.crawlJobId))
  .where(and(eq(crawlJob.status, "completed"), eq(crawledPage.url, crawl.url)))
  .orderBy(desc(crawlJob.createdAt))
  .limit(10);

export type ListCrawlsResult = Awaited<typeof crawlsQuery>;
export type CrawlResult = ListCrawlsResult[number];

export async function listCrawls(): Promise<ActionResult<ListCrawlsResult>> {
  try {
    const crawls = await crawlsQuery;
    return { response: crawls, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🚮 Delete a crawl job

export async function deleteCrawlJob(
  crawlJobId: string
): Promise<ActionResult> {
  try {
    // 1️⃣ Send cancellation event to Inngest to stop the running job
    await inngest.send({
      data: { crawlJobId },
      name: "crawl/crawl.cancelled",
    });

    // 2️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteScreenshotsForCrawlJob(crawlJobId);

    // 3️⃣ Delete records for this crawl job
    await db.delete(crawlJob).where(eq(crawlJob.id, crawlJobId));

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

async function deleteScreenshotsForCrawlJob(crawlJobId: string): Promise<void> {
  const allScreenshotUrls = (
    await db
      .select({
        screenshotUrl: crawledPage.screenshotUrl,
      })
      .from(crawlJob)
      .leftJoin(crawledPage, eq(crawledPage.crawlJobId, crawlJob.id))
  )
    .map((row) => row.screenshotUrl)
    .filter(Boolean) as string[];

  await del(allScreenshotUrls);
  console.log(
    `🗑️ Deleted ${allScreenshotUrls.length} screenshots for the crawl job ${crawlJobId}`
  );
}

// --------------------------------------
// 🚮 Delete a crawl

export async function deleteCrawl(crawlId: number): Promise<ActionResult> {
  try {
    // 1️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteScreenshotsForCrawl(crawlId);

    // 2️⃣ Delete records for this crawl
    await db.delete(crawl).where(eq(crawl.id, crawlId)).execute();

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: `Error erasing crawl ${crawlId}: ${message}`,
      success: false,
    };
  }
}

async function deleteScreenshotsForCrawl(crawlId: number): Promise<void> {
  const allScreenshotUrls = (
    await db
      .select({
        screenshotUrl: crawledPage.screenshotUrl,
      })
      .from(crawl)
      .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
      .leftJoin(crawledPage, eq(crawledPage.crawlJobId, crawlJob.id))
  )
    .map((row) => row.screenshotUrl)
    .filter(Boolean) as string[];

  await del(allScreenshotUrls);
  console.log(
    `🗑️ Deleted ${allScreenshotUrls.length} screenshots for the crawl ${crawlId}`
  );
}

// --------------------------------------
// 🚮🚮🚮 Delete all crawls

export async function deleteAllCrawls(): Promise<ActionResult> {
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
// ------------------------------------------------------------
type ActionSuccess<T = void> = T extends void
  ? { success: true }
  : { success: true; response: T };

type ActionFailure = { success: false; error: string };

type ActionResult<T = void> = ActionSuccess<T> | ActionFailure;

// ------------------------------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
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

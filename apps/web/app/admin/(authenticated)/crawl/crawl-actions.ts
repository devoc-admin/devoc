"use server";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { del, list } from "@vercel/blob";
import { and, desc, eq } from "drizzle-orm";
import { type ActionResult, getErrorMessage } from "@/lib/api";
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
  skipScreenshots,
  useLocalScreenshots,
  concurrency,
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
        skipResources,
        skipScreenshots,
        status: "pending",
        updatedAt: nowString,
        useLocalScreenshots,
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
          concurrency: concurrency ?? 5,
          maxDepth: maxDepth ?? 1,
          maxPages: maxPages ?? 5,
          skipResources: skipResources ?? false,
          skipScreenshots: skipScreenshots ?? false,
          useLocalScreenshots: useLocalScreenshots ?? false,
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
  skipScreenshots: boolean;
  useLocalScreenshots: boolean;
  concurrency: number;
};

export type UpsertCrawlResult = { crawlId: number; crawlJobId: string };

// --------------------------------------
// 🔁 Get crawl job

const crawlJobQuery = db
  .select({
    author: crawlJob.author,
    authorUrl: crawlJob.authorUrl,
    crawlUrl: crawl.url,
    errorMessage: crawlJob.errorMessage,
    maxPages: crawlJob.maxPages,
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
    const [selectedCrawlJob] = await crawlJobQuery.where(
      eq(crawlJob.id, crawlJobId)
    );

    if (!selectedCrawlJob)
      return { error: "Crawl job not found", success: false };

    // ⬇️ Fetch the latest crawled page
    const [latestPage] = await latestPageQuery
      .where(eq(crawledPage.crawlJobId, crawlJobId))
      .orderBy(desc(crawledPage.createdAt))
      .limit(1);

    return {
      response: {
        author: selectedCrawlJob.author,
        authorUrl: selectedCrawlJob.authorUrl,
        crawlUrl: selectedCrawlJob.crawlUrl,
        errorMessage: selectedCrawlJob.errorMessage,
        latestPage: latestPage ?? null,
        maxPages: selectedCrawlJob.maxPages,
        pagesCrawled: selectedCrawlJob.pagesCrawled,
        pagesDiscovered: selectedCrawlJob.pagesDiscovered,
        status: selectedCrawlJob.status,
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
const listCrawlsQuery = db
  .select({
    author: crawlJob.author,
    authorUrl: crawlJob.authorUrl,
    completedAt: crawlJob.completedAt,
    createdAt: crawl.createdAt,
    id: crawl.id,
    pagesCrawled: crawlJob.pagesCrawled,
    pagesDiscovered: crawlJob.pagesDiscovered,
    screenshotUrl: crawledPage.screenshotUrl,
    skipResources: crawlJob.skipResources,
    skipScreenshots: crawlJob.skipScreenshots,
    startedAt: crawlJob.startedAt,
    title: crawledPage.title,
    url: crawl.url,
    useLocalScreenshots: crawlJob.useLocalScreenshots,
  })
  .from(crawl)
  .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
  .leftJoin(crawledPage, eq(crawlJob.id, crawledPage.crawlJobId))
  .where(and(eq(crawlJob.status, "completed"), eq(crawledPage.url, crawl.url)))
  .orderBy(desc(crawlJob.createdAt));

export type ListCrawlsResult = Awaited<typeof listCrawlsQuery>;
export type CrawlResult = ListCrawlsResult[number];

export async function listCrawls(): Promise<ActionResult<ListCrawlsResult>> {
  try {
    const crawls = await listCrawlsQuery;
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
    // 1️⃣ Send cancellation event to Inngest to stop the running job (if still running)
    // This may fail if the job already completed - that's OK, we continue anyway
    try {
      await inngest.send({
        data: { crawlJobId },
        name: "crawl/crawl.cancelled",
      });
    } catch {
      // Ignore cancellation errors - job may have already finished
    }

    // 2️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteScreenshotsForCrawlJob({ crawlJobId });

    // 3️⃣ Delete records for this crawl job
    await db.delete(crawlJob).where(eq(crawlJob.id, crawlJobId));

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

async function deleteScreenshotsForCrawlJob({
  crawlJobId,
}: {
  crawlJobId: string;
}): Promise<void> {
  const allScreenshotUrls = (
    await db
      .select({
        screenshotUrl: crawledPage.screenshotUrl,
      })
      .from(crawlJob)
      .leftJoin(crawledPage, eq(crawledPage.crawlJobId, crawlJob.id))
      .where(eq(crawlJob.id, crawlJobId))
  )
    .map((row) => row.screenshotUrl)
    .filter(Boolean) as string[];

  // Check if screenshots are stored locally (URL starts with /api/screenshots/)
  const hasLocalScreenshots = allScreenshotUrls.some((url) =>
    url.startsWith("/api/screenshots/")
  );

  if (hasLocalScreenshots) {
    // Delete local screenshots folder
    try {
      const screenshotsDir = join(process.cwd(), "screenshots", crawlJobId);
      await rm(screenshotsDir, { force: true, recursive: true });
    } catch {
      // Folder may not exist, ignore errors
    }
  } else if (allScreenshotUrls.length > 0) {
    // Delete from Vercel Blob
    await del(allScreenshotUrls);
  }
}

// --------------------------------------
// 🚮 Delete a crawl

export async function deleteCrawl(crawlId: number): Promise<ActionResult> {
  try {
    // 1️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteScreenshotsForCrawl({ crawlId });

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

async function deleteScreenshotsForCrawl({
  crawlId,
}: {
  crawlId: number;
}): Promise<void> {
  const rows = await db
    .select({
      crawlJobId: crawlJob.id,
      screenshotUrl: crawledPage.screenshotUrl,
    })
    .from(crawl)
    .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
    .leftJoin(crawledPage, eq(crawledPage.crawlJobId, crawlJob.id))
    .where(eq(crawl.id, crawlId));

  const allScreenshotUrls = rows
    .map((row) => row.screenshotUrl)
    .filter(Boolean) as string[];

  // Check if screenshots are stored locally
  const hasLocalScreenshots = allScreenshotUrls.some((url) =>
    url.startsWith("/api/screenshots/")
  );

  if (hasLocalScreenshots) {
    // Get unique crawl job IDs for local screenshot deletion
    const crawlJobIds = [...new Set(rows.map((row) => row.crawlJobId))].filter(
      Boolean
    ) as string[];

    for (const jobId of crawlJobIds) {
      try {
        const screenshotsDir = join(process.cwd(), "screenshots", jobId);
        await rm(screenshotsDir, { force: true, recursive: true });
      } catch {
        // Folder may not exist, ignore errors
      }
    }
  } else if (allScreenshotUrls.length > 0) {
    // Delete from Vercel Blob
    await del(allScreenshotUrls);
  }
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
    }

    cursor = response.cursor;
  } while (cursor);
}

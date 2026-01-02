"use server";
import { del, list } from "@vercel/blob";
import { db } from "@/lib/db";
import {
  type Audit,
  audit,
  type CrawlJob,
  crawledPage,
  crawlJob,
} from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

// ═══════════════════════════════════════════════════════════════════════════
// 🏁 Start audit

export async function upsertAudit({
  url,
  maxDepth,
  maxPages,
}: UpsertAuditParams): Promise<UpsertAuditResult> {
  // ✅🌐 Validation de l'URL
  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    return { error: "URL invalide", success: false };
  }

  // 1️⃣ Register the website in database
  let auditResult: Audit[];
  try {
    auditResult = await db
      .insert(audit)
      .values({ url: origin })
      .onConflictDoUpdate({
        set: { url: origin },
        target: audit.url,
      })
      .returning();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur upsert audit:", message);
    return { error: message, success: false };
  }

  const insertedAudit = auditResult[0];
  if (!insertedAudit) {
    return { error: "Échec de l'insertion de l'audit", success: false };
  }

  // 2️⃣ Register the crawl job in database
  let crawlJobsResult: CrawlJob[] = [];
  const nowString = new Date().toISOString();
  try {
    crawlJobsResult = await db
      .insert(crawlJob)
      .values({
        auditId: insertedAudit.id,
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
      name: "audit/crawl.requested",
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error triggering Inngest job:", message);
    return { error: "Error while triggering crawl job", success: false };
  }

  return {
    auditId: insertedAudit.id,
    crawlJobId: insertedCrawlJob.id,
    success: true,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Erase audits

type DeleteAllAuditsResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteAllAudits(): Promise<DeleteAllAuditsResult> {
  try {
    // 1️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteAllScreenshots();

    // 2️⃣ Delete all database records
    await db.delete(crawledPage).execute();
    await db.delete(crawlJob).execute();
    await db.delete(audit).execute();

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error erasing audits:", message);
    return { error: "Error while erasing audits", success: false };
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

type UpsertAuditParams = {
  url: string;
  maxDepth: number;
  maxPages: number;
};

type UpsertAuditResult =
  | { success: true; auditId: number; crawlJobId: string }
  | { success: false; error: string };

// ═══════════════════════════════════════════════════════════════════════════
// 📊 Get crawl status (for polling)

export async function getCrawlStatus(
  crawlJobId: string
): Promise<CrawlStatusResult> {
  try {
    const { desc, eq } = await import("drizzle-orm");

    // Fetch crawl job status
    const [job] = await db
      .select({
        errorMessage: crawlJob.errorMessage,
        pagesCrawled: crawlJob.pagesCrawled,
        pagesDiscovered: crawlJob.pagesDiscovered,
        status: crawlJob.status,
      })
      .from(crawlJob)
      .where(eq(crawlJob.id, crawlJobId))
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

type CrawlStatusResult =
  | {
      success: true;
      status: "pending" | "running" | "completed" | "failed" | "cancelled";
      pagesCrawled: number;
      pagesDiscovered: number;
      errorMessage: string | null;
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

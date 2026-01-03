"use server";
import { db } from "@/lib/db";
import { type Crawl, type CrawlJob, crawl, crawlJob } from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

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

type UpsertCrawlParams = {
  url: string;
  maxDepth: number;
  maxPages: number;
};

type UpsertCrawlResult =
  | { success: true; crawlId: number; crawlJobId: string }
  | { success: false; error: string };

// ------------------------------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
}

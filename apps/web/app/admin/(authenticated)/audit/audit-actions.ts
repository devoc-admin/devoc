"use server";
import { db } from "@/lib/db";
import { type Audit, audit, type CrawlJob, crawlJob } from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

// 1️⃣ Typage des paramètres d'entrée
type UpsertAuditParams = {
  url: string;
};

// 2️⃣ Typage du retour - Union discriminée (Discriminated Union)
// C'est le pattern recommandé pour les server actions
type UpsertAuditResult =
  | { success: true; auditId: number; crawlJobId: string }
  | { success: false; error: string };

export async function upsertAudit({
  url,
}: UpsertAuditParams): Promise<UpsertAuditResult> {
  // ✅ Validation de l'URL
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

  const crawlConfig = {
    maxDepth: 1,
    maxPages: 50,
  };

  let crawlJobsResult: CrawlJob[] = [];
  try {
    crawlJobsResult = await db
      .insert(crawlJob)
      .values({
        auditId: auditResult[0].id,
        createdAt: new Date().toISOString(),
        id: crypto.randomUUID(),
        ...crawlConfig,
        status: "pending",
        updatedAt: new Date().toISOString(),
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
          maxDepth: 1,
          maxPages: 5,
        },
        crawlJobId: insertedCrawlJob.id,
        url: origin,
      },
      name: "audit/crawl.requested",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error triggering Inngest job:", message);
    return { error: "Error while triggering crawl job", success: false };
  }

  return {
    auditId: insertedAudit.id,
    crawlJobId: insertedCrawlJob.id,
    success: true,
  };
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

"use server";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { del, list } from "@vercel/blob";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { type ActionResult, getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { type Crawl, crawl, crawledPage, prospect } from "@/lib/db/schema";
import { inngest } from "@/lib/inngest/client";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
//➕ Create a crawl

export async function upsertCrawl({
  url,
  maxDepth,
  maxPages,
  skipResources,
  skipScreenshots,
  useLocalScreenshots,
  concurrency,
  prospectId,
}: UpsertCrawlParams): Promise<ActionResult<UpsertCrawlResult>> {
  // ✅🌐 Validation de l'URL
  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    return { error: "URL invalide", success: false };
  }

  // 1️⃣ Insert the crawl in database
  let crawlResult: Crawl[];
  const nowString = new Date().toISOString();
  try {
    crawlResult = await db
      .insert(crawl)
      .values({
        createdAt: nowString,
        id: crypto.randomUUID(),
        maxDepth,
        maxPages,
        skipResources,
        skipScreenshots,
        status: "pending",
        updatedAt: nowString,
        url: origin,
        useLocalScreenshots,
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

  // 2️⃣ Associate prospect with crawl (if provided)
  if (prospectId) {
    try {
      await db
        .update(prospect)
        .set({ crawlId: insertedCrawl.id, updatedAt: nowString })
        .where(eq(prospect.id, prospectId));
    } catch (error) {
      console.error("Erreur association prospect:", getErrorMessage(error));
      // Continue anyway - crawl is more important than prospect association
    }
  }

  // 3️⃣ Launch the crawler as a background job
  try {
    await inngest.send({
      data: {
        config: {
          concurrency: concurrency ?? 10,
          maxDepth: maxDepth ?? 1,
          maxPages: maxPages ?? 5,
          skipResources: skipResources ?? false,
          skipScreenshots: skipScreenshots ?? false,
          useLocalScreenshots: useLocalScreenshots ?? false,
        },
        crawlId: insertedCrawl.id,
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
  prospectId?: number;
};

export type UpsertCrawlResult = { crawlId: string };

// --------------------------------------
// 🔍 Get running crawl (if any)

export async function getRunningCrawl(): Promise<
  ActionResult<{ crawlId: string } | null>
> {
  try {
    const [runningCrawl] = await db
      .select({ id: crawl.id })
      .from(crawl)
      .where(eq(crawl.status, "running"))
      .limit(1);

    return {
      response: runningCrawl ? { crawlId: runningCrawl.id } : null,
      success: true,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error checking for running crawl:", message);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🔁 Get crawl

const crawlQuery = db
  .select({
    author: crawl.author,
    authorUrl: crawl.authorUrl,
    crawlUrl: crawl.url,
    errorMessage: crawl.errorMessage,
    homepageScreenshotUrl: crawl.homepageScreenshotUrl,
    maxPages: crawl.maxPages,
    pagesCrawled: crawl.pagesCrawled,
    pagesDiscovered: crawl.pagesDiscovered,
    status: crawl.status,
  })
  .from(crawl)
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

export type CrawlQueryResult = Awaited<typeof crawlQuery>[number] & {
  latestPage: LatestPageResult;
};
type LatestPageResult = Awaited<typeof latestPageQuery>[number];

export async function getCrawl(
  crawlId: string
): Promise<ActionResult<CrawlQueryResult>> {
  try {
    // 🐝 Fetch crawl status
    const [selectedCrawl] = await crawlQuery.where(eq(crawl.id, crawlId));

    if (!selectedCrawl) return { error: "Crawl not found", success: false };

    // ⬇️ Fetch the latest crawled page
    const [latestPage] = await latestPageQuery
      .where(eq(crawledPage.crawlId, crawlId))
      .orderBy(desc(crawledPage.createdAt))
      .limit(1);

    return {
      response: {
        author: selectedCrawl.author,
        authorUrl: selectedCrawl.authorUrl,
        crawlUrl: selectedCrawl.crawlUrl,
        errorMessage: selectedCrawl.errorMessage,
        homepageScreenshotUrl: selectedCrawl.homepageScreenshotUrl,
        latestPage: latestPage ?? null,
        maxPages: selectedCrawl.maxPages,
        pagesCrawled: selectedCrawl.pagesCrawled,
        pagesDiscovered: selectedCrawl.pagesDiscovered,
        status: selectedCrawl.status,
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
    accessibilityTool: crawl.accessibilityTool,
    analyticsTools: crawl.analyticsTools,
    author: crawl.author,
    authorUrl: crawl.authorUrl,
    availableLanguages: crawl.availableLanguages,
    completedAt: crawl.completedAt,
    consentManager: crawl.consentManager,
    contactAddresses: crawl.contactAddresses,
    contactEmails: crawl.contactEmails,
    contactPhones: crawl.contactPhones,
    createdAt: crawl.createdAt,
    detectedTechCount: crawl.detectedTechCount,
    hasMultipleLanguages: crawl.hasMultipleLanguages,
    hostingProvider: crawl.hostingProvider,
    id: crawl.id,
    pagesCrawled: crawl.pagesCrawled,
    pagesDiscovered: crawl.pagesDiscovered,
    primaryCms: crawl.primaryCms,
    primaryFramework: crawl.primaryFramework,
    primaryLanguage: crawl.primaryLanguage,
    prospectId: prospect.id,
    prospectName: prospect.name,
    prospectType: prospect.type,
    screenshotUrl: crawledPage.screenshotUrl,
    skipResources: crawl.skipResources,
    skipScreenshots: crawl.skipScreenshots,
    socialLinks: crawl.socialLinks,
    startedAt: crawl.startedAt,
    title: crawledPage.title,
    url: crawl.url,
    useLocalScreenshots: crawl.useLocalScreenshots,
    usesDsfr: crawl.usesDsfr,
  })
  .from(crawl)
  .leftJoin(crawledPage, eq(crawl.id, crawledPage.crawlId))
  .leftJoin(prospect, eq(crawl.id, prospect.crawlId))
  .where(and(eq(crawl.status, "completed"), eq(crawledPage.url, crawl.url)))
  .orderBy(desc(crawl.createdAt));

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
// 🚮 Delete a crawl

export async function deleteCrawl(crawlId: string): Promise<ActionResult> {
  try {
    // 1️⃣ Send cancellation event to Inngest to stop the running job (if still running)
    // This may fail if the job already completed - that's OK, we continue anyway
    try {
      await inngest.send({
        data: { crawlId },
        name: "crawl/crawl.cancelled",
      });
    } catch {
      // Ignore cancellation errors - job may have already finished
    }

    // 2️⃣ Clear crawlId from any associated prospect
    await db
      .update(prospect)
      .set({ crawlId: null, updatedAt: new Date().toISOString() })
      .where(eq(prospect.crawlId, crawlId));

    // 3️⃣ Delete all screenshots from storage
    await deleteScreenshotsForCrawl({ crawlId });

    // 4️⃣ Delete records for this crawl
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
  crawlId: string;
}): Promise<void> {
  const allScreenshotUrls = (
    await db
      .select({
        screenshotUrl: crawledPage.screenshotUrl,
      })
      .from(crawledPage)
      .where(eq(crawledPage.crawlId, crawlId))
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
      const screenshotsDir = join(process.cwd(), "screenshots", crawlId);
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
// 🚮🚮🚮 Delete all crawls

export async function deleteAllCrawls(): Promise<ActionResult> {
  try {
    // 1️⃣ Delete all screenshots from Vercel Blob storage (recursively)
    await deleteAllScreenshots();

    // 2️⃣ Delete all database records
    await db.delete(crawledPage).execute();
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

// --------------------------------------
// 🔄 Retry a crawl

export async function retryCrawl(
  crawlId: string
): Promise<ActionResult<UpsertCrawlResult>> {
  try {
    // 1️⃣ Get the crawl config
    const [existingCrawl] = await db
      .select({
        config: crawl.config,
        maxDepth: crawl.maxDepth,
        maxPages: crawl.maxPages,
        skipResources: crawl.skipResources,
        skipScreenshots: crawl.skipScreenshots,
        url: crawl.url,
        useLocalScreenshots: crawl.useLocalScreenshots,
      })
      .from(crawl)
      .where(eq(crawl.id, crawlId))
      .limit(1);

    if (!existingCrawl) {
      return { error: "Crawl not found", success: false };
    }

    // 2️⃣ Delete the old crawl
    const deleteResult = await deleteCrawl(crawlId);
    if (!deleteResult.success) {
      return { error: deleteResult.error, success: false };
    }

    // 3️⃣ Create a new crawl with the same config
    return await upsertCrawl({
      concurrency: existingCrawl.config?.concurrency ?? 10,
      maxDepth: existingCrawl.maxDepth ?? 3,
      maxPages: existingCrawl.maxPages ?? 100,
      skipResources: existingCrawl.skipResources ?? false,
      skipScreenshots: existingCrawl.skipScreenshots ?? false,
      url: existingCrawl.url,
      useLocalScreenshots: existingCrawl.useLocalScreenshots ?? false,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🏢 List prospects with websites not yet crawled

const uncrawledProspectsQuery = db
  .select({
    id: prospect.id,
    name: prospect.name,
    website: prospect.website,
  })
  .from(prospect)
  .orderBy(desc(prospect.name))
  .$dynamic();

export type UncrawledProspectResult = {
  id: number;
  name: string;
  website: string;
};

export async function listUncrawledProspects(): Promise<
  ActionResult<UncrawledProspectResult[]>
> {
  try {
    // Get all crawled URLs
    const crawledUrls = await db
      .select({ url: crawl.url })
      .from(crawl)
      .execute();
    const crawledUrlSet = new Set(crawledUrls.map((c) => c.url));

    // Get prospects with websites
    const prospects = await uncrawledProspectsQuery
      .where(isNotNull(prospect.website))
      .execute();

    // Filter out prospects whose website has already been crawled
    const uncrawledProspects = prospects.filter((p) => {
      if (!p.website) return false;
      try {
        const origin = new URL(p.website).origin;
        return !crawledUrlSet.has(origin);
      } catch {
        return false;
      }
    }) as UncrawledProspectResult[];

    return { response: uncrawledProspects, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🏢 List available prospects for a crawl (unassigned + current)

export type AvailableProspect = {
  id: number;
  name: string;
  type:
    | "city"
    | "administration"
    | "cultural_establishment"
    | "epci"
    | "territorial_collectivity"
    | "sme"
    | "other";
};

export async function listAvailableProspectsForCrawl(
  crawlId: string
): Promise<ActionResult<AvailableProspect[]>> {
  try {
    // Get all prospects and filter for unassigned or assigned to this crawl
    const allProspects = await db
      .select({
        crawlId: prospect.crawlId,
        id: prospect.id,
        name: prospect.name,
        type: prospect.type,
      })
      .from(prospect)
      .orderBy(prospect.name);

    const result = allProspects
      .filter((p) => !p.crawlId || p.crawlId === crawlId)
      .map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
      }));

    return { response: result, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🔗 Assign a prospect to a crawl

export async function assignProspectToCrawl(
  crawlId: string,
  prospectId: number | null
): Promise<ActionResult> {
  try {
    if (prospectId === null) {
      // Unassign: set crawlId to null for any prospect that has this crawlId
      await db
        .update(prospect)
        .set({ crawlId: null, updatedAt: new Date().toISOString() })
        .where(eq(prospect.crawlId, crawlId));
    } else {
      // First, unassign any existing prospect from this crawl
      await db
        .update(prospect)
        .set({ crawlId: null, updatedAt: new Date().toISOString() })
        .where(eq(prospect.crawlId, crawlId));

      // Then assign the new prospect
      await db
        .update(prospect)
        .set({ crawlId, updatedAt: new Date().toISOString() })
        .where(eq(prospect.id, prospectId));
    }

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// ➕ Add prospect and assign to crawl

export type AddProspectForCrawlParams = {
  crawlId: string;
  name: string;
  type:
    | "city"
    | "administration"
    | "cultural_establishment"
    | "epci"
    | "territorial_collectivity"
    | "sme"
    | "other";
  location: string;
  website?: string;
  latitude?: string;
  longitude?: string;
};

export async function addProspectForCrawl({
  crawlId,
  name,
  type,
  location,
  website,
  latitude,
  longitude,
}: AddProspectForCrawlParams): Promise<ActionResult<{ prospectId: number }>> {
  try {
    const nowString = new Date().toISOString();

    // First, unassign any existing prospect from this crawl
    await db
      .update(prospect)
      .set({ crawlId: null, updatedAt: nowString })
      .where(eq(prospect.crawlId, crawlId));

    // Create the new prospect with the crawlId
    const [newProspect] = await db
      .insert(prospect)
      .values({
        crawlId,
        createdAt: nowString,
        latitude,
        location,
        longitude,
        name,
        type,
        updatedAt: nowString,
        website: website || null,
      })
      .returning({ id: prospect.id });

    if (!newProspect) {
      return { error: "Échec de la création du prospect", success: false };
    }

    return { response: { prospectId: newProspect.id }, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

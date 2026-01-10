"use server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  type CrawledPage,
  crawl,
  crawledPage,
  crawlJob,
  type pageCategoryEnum,
} from "@/lib/db/schema";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
// 📖 Get crawl details

const crawlDetailsQuery = db
  .select({
    completedAt: crawlJob.completedAt,
    crawlCreatedAt: crawl.createdAt,
    crawlId: crawl.id,
    crawlJobId: crawlJob.id,
    crawlUrl: crawl.url,
    maxDepth: crawlJob.maxDepth,
    maxPages: crawlJob.maxPages,
    pagesCrawled: crawlJob.pagesCrawled,
    pagesDiscovered: crawlJob.pagesDiscovered,
    startedAt: crawlJob.startedAt,
    status: crawlJob.status,
  })
  .from(crawl)
  .leftJoin(crawlJob, eq(crawl.id, crawlJob.crawlId))
  .$dynamic();

export type CrawlDetailsResult = {
  crawl: Awaited<typeof crawlDetailsQuery>[number];
  crawledPages: CrawledPage[];
};

export async function getCrawlDetails(
  crawlId: number
): Promise<ActionResult<CrawlDetailsResult>> {
  try {
    // 🐝 Fetch crawl with latest completed job
    const [crawlDetails] = await crawlDetailsQuery
      .where(and(eq(crawl.id, crawlId), eq(crawlJob.status, "completed")))
      .orderBy(desc(crawlJob.createdAt))
      .limit(1);

    if (!crawlDetails) {
      return { error: "Ce crawl n'a pas été trouvé", success: false };
    }

    if (!crawlDetails.crawlJobId) {
      return { error: "Aucun crawl terminé trouvé", success: false };
    }

    // 🐝🐝🐝 Fetch all pages for this crawl job
    const crawledPages = await db
      .select()
      .from(crawledPage)
      .where(eq(crawledPage.crawlJobId, crawlDetails.crawlJobId))
      .orderBy(crawledPage.createdAt);

    return {
      response: {
        crawl: crawlDetails,
        crawledPages,
      },
      success: true,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(
      "Il y a eu une erreur lors de la récupération des détails du crawl :",
      message
    );
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🏷️ Update page category

export type PageCategory = (typeof pageCategoryEnum.enumValues)[number];

export async function updatePageCategory(
  pageId: string,
  category: PageCategory
): Promise<ActionResult> {
  try {
    await db
      .update(crawledPage)
      .set({ category })
      .where(eq(crawledPage.id, pageId));

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Error updating page category:", message);
    return { error: message, success: false };
  }
}

// --------------------------------------
// ✅ Update page audit selection

export async function updatePageAuditSelection(
  pageId: string,
  selectedForAudit: boolean
): Promise<ActionResult> {
  try {
    await db
      .update(crawledPage)
      .set({ selectedForAudit })
      .where(eq(crawledPage.id, pageId));

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(
      "Il y a eu une erreur lors de la mise à jour de la sélection de l'audit de la page :",
      message
    );
    return { error: message, success: false };
  }
}

// --------------------------------------
// Export category enum values for UI

// --------------------------------------
type ActionSuccess<T = void> = T extends void
  ? { success: true }
  : { success: true; response: T };

type ActionFailure = { success: false; error: string };

type ActionResult<T = void> = ActionSuccess<T> | ActionFailure;

// --------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Erreur inconnue";
}

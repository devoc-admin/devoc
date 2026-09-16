"use server";
import { db } from "@dev-oc/db";
import {
  type CrawledPage,
  crawl,
  crawledPage,
  type pageCategoryEnum,
} from "@dev-oc/db/schema";
import { and, eq } from "drizzle-orm";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
// 📖 Get crawl details

const crawlDetailsQuery = db
  .select({
    completedAt: crawl.completedAt,
    crawlCreatedAt: crawl.createdAt,
    crawlId: crawl.id,
    crawlUrl: crawl.url,
    maxDepth: crawl.maxDepth,
    maxPages: crawl.maxPages,
    pagesCrawled: crawl.pagesCrawled,
    pagesDiscovered: crawl.pagesDiscovered,
    startedAt: crawl.startedAt,
    status: crawl.status,
  })
  .from(crawl)
  .$dynamic();

export type CrawlDetailsResult = {
  crawl: Awaited<typeof crawlDetailsQuery>[number];
  crawledPages: CrawledPage[];
};

export async function getCrawlDetails(
  crawlId: string
): Promise<ActionResult<CrawlDetailsResult>> {
  try {
    // 🐝 Fetch crawl with completed status
    const [crawlDetails] = await crawlDetailsQuery
      .where(and(eq(crawl.id, crawlId), eq(crawl.status, "completed")))
      .limit(1);

    if (!crawlDetails) {
      return { error: "Ce crawl n'a pas été trouvé", success: false };
    }

    // 🐝🐝🐝 Fetch all pages for this crawl
    const crawledPages = await db
      .select()
      .from(crawledPage)
      .where(eq(crawledPage.crawlId, crawlId))
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
// 🗑️ Delete crawled page

export async function deleteCrawledPage(
  crawledPageId: string
): Promise<ActionResult> {
  try {
    await db.delete(crawledPage).where(eq(crawledPage.id, crawledPageId));

    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(
      "Il y a eu une erreur lors de la suppression de la page :",
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

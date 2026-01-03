"use server";
import { del, list } from "@vercel/blob";
import { db } from "@/lib/db";
import { crawl, crawledPage, crawlJob } from "@/lib/db/schema";

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

// ------------------------------------------------------------
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Erreur inconnue";
}

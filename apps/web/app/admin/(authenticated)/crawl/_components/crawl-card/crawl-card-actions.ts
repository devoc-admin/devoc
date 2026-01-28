"use server";
import { asc, eq } from "drizzle-orm";
import { type ActionResult, getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { prospect } from "@/lib/db/schema";

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
      .orderBy(asc(prospect.name));

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

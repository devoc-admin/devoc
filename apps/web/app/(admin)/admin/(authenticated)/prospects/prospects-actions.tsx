"use server";
import { desc, eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { crawl, type Prospect, prospect } from "@/lib/db/schema";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
// 📝 Get prospects

const prospectsQuery = db
  .select({
    crawlId: prospect.crawlId,
    crawlStatus: crawl.status,
    createdAt: prospect.createdAt,
    distanceFrom: prospect.distanceFrom,
    estimatedOpportunity: prospect.estimatedOpportunity,
    hasAccessibilitySettings: prospect.hasAccessibilitySettings,
    hasSite: prospect.hasSite,
    id: prospect.id,
    inhabitants: prospect.inhabitants,
    latitude: prospect.latitude,
    location: prospect.location,
    longitude: prospect.longitude,
    name: prospect.name,
    siteEditor: prospect.siteEditor,
    siteEditorUrl: prospect.siteEditorUrl,
    siteLaunchedAt: prospect.siteLaunchedAt,
    type: prospect.type,
    updatedAt: prospect.updatedAt,
    website: prospect.website,
  })
  .from(prospect)
  .leftJoin(crawl, eq(prospect.crawlId, crawl.id))
  .orderBy(desc(prospect.createdAt));

export type ListProspectsResult = Awaited<typeof prospectsQuery>;
export type ProspectResult = ListProspectsResult[number];

export async function listProspects() {
  try {
    const prospects = await prospectsQuery.execute();
    return { response: prospects, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// ➕ Add prospect

export async function addProspect({
  name,
  type,
  website,
  location,
  latitude,
  longitude,
  hasSite,
  estimatedOpportunity,
  inhabitants,
  distanceFrom,
  siteLaunchedAt,
  siteEditor,
  siteEditorUrl,
  hasAccessibilitySettings,
}: {
  name: string;
  type: Prospect["type"];
  website: string;
  location: string;
  latitude?: string;
  longitude?: string;
  hasSite?: boolean;
  estimatedOpportunity?: Prospect["estimatedOpportunity"];
  inhabitants?: number | null;
  distanceFrom?: number | null;
  siteLaunchedAt?: string | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
}) {
  try {
    const prospectResult = await db
      .insert(prospect)
      .values({
        distanceFrom,
        estimatedOpportunity,
        hasAccessibilitySettings,
        hasSite,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        siteEditor,
        siteEditorUrl,
        siteLaunchedAt,
        type,
        website,
      })
      .returning();
    return { response: prospectResult, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// ✏️ Edit prospect

export async function editProspect({
  id,
  name,
  type,
  website,
  location,
  latitude,
  longitude,
  estimatedOpportunity,
  inhabitants,
  distanceFrom,
  siteLaunchedAt,
  siteEditor,
  siteEditorUrl,
  hasAccessibilitySettings,
}: {
  id: number;
  name: string;
  type: Prospect["type"];
  website: string;
  location: string;
  latitude?: string;
  longitude?: string;
  estimatedOpportunity?: Prospect["estimatedOpportunity"];
  inhabitants?: number | null;
  distanceFrom?: number | null;
  siteLaunchedAt?: string | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
}) {
  try {
    const prospectResult = await db
      .update(prospect)
      .set({
        distanceFrom,
        estimatedOpportunity,
        hasAccessibilitySettings,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        siteEditor,
        siteEditorUrl,
        siteLaunchedAt,
        type,
        website,
      })
      .where(eq(prospect.id, id))
      .returning();
    return { response: prospectResult, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🗑️ Delete prospect

export async function deleteProspect(prospectId: number) {
  try {
    await db.delete(prospect).where(eq(prospect.id, prospectId)).execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🔗 Update prospect website

export async function updateProspectWebsite({
  prospectId,
  website,
}: {
  prospectId: number;
  website: string;
}) {
  try {
    await db
      .update(prospect)
      .set({ website })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🎯 Update estimated opportunity

export async function updateEstimatedOpportunity({
  prospectId,
  estimatedOpportunity,
}: {
  prospectId: number;
  estimatedOpportunity: Prospect["estimatedOpportunity"];
}) {
  try {
    await db
      .update(prospect)
      .set({ estimatedOpportunity })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🛠️ Update site editor

export async function updateSiteEditor({
  prospectId,
  siteEditor,
}: {
  prospectId: number;
  siteEditor: string | null;
}) {
  try {
    await db
      .update(prospect)
      .set({ siteEditor })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// ♿ Update accessibility settings flag

export async function updateHasAccessibilitySettings({
  prospectId,
  hasAccessibilitySettings,
}: {
  prospectId: number;
  hasAccessibilitySettings: boolean | null;
}) {
  try {
    await db
      .update(prospect)
      .set({ hasAccessibilitySettings })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 📅 Update site launched date

export async function updateSiteLaunchedAt({
  prospectId,
  siteLaunchedAt,
}: {
  prospectId: number;
  siteLaunchedAt: string | null;
}) {
  try {
    await db
      .update(prospect)
      .set({ siteLaunchedAt })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🌐 Toggle hasSite

export async function toggleHasSite({
  prospectId,
  hasSite,
}: {
  prospectId: number;
  hasSite: boolean;
}) {
  try {
    await db
      .update(prospect)
      .set({
        hasSite,
        // Si hasSite devient false, on met estimatedOpportunity à "strong"
        ...(hasSite === false && { estimatedOpportunity: "strong" }),
      })
      .where(eq(prospect.id, prospectId))
      .execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

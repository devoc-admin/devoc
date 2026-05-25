"use server";
import { desc, eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { crawl, dpo, type Prospect, prospect } from "@/lib/db/schema";

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
    dpoId: prospect.dpoId,
    dpoName: dpo.name,
    dpoUrl: dpo.url,
    estimatedOpportunity: prospect.estimatedOpportunity,
    hasAccessibilitySettings: prospect.hasAccessibilitySettings,
    hasDpo: prospect.hasDpo,
    hasSite: prospect.hasSite,
    id: prospect.id,
    inhabitants: prospect.inhabitants,
    latitude: prospect.latitude,
    location: prospect.location,
    longitude: prospect.longitude,
    name: prospect.name,
    siteEditor: prospect.siteEditor,
    siteEditorUrl: prospect.siteEditorUrl,
    siteLaunchYear: prospect.siteLaunchYear,
    type: prospect.type,
    updatedAt: prospect.updatedAt,
    usesPanneauPocket: prospect.usesPanneauPocket,
    website: prospect.website,
  })
  .from(prospect)
  .leftJoin(crawl, eq(prospect.crawlId, crawl.id))
  .leftJoin(dpo, eq(prospect.dpoId, dpo.id))
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

// Upserts a DPO by name; if a row already exists with that name, optionally
// updates its URL when a non-undefined value is passed. Returns the row id.
async function upsertDpoByName(
  name: string,
  url: string | null | undefined
): Promise<number> {
  const trimmedName = name.trim();
  const existing = await db
    .select({ id: dpo.id, url: dpo.url })
    .from(dpo)
    .where(eq(dpo.name, trimmedName))
    .limit(1)
    .execute();
  if (existing.length > 0) {
    const row = existing[0];
    if (url !== undefined && url !== row.url) {
      await db.update(dpo).set({ url }).where(eq(dpo.id, row.id)).execute();
    }
    return row.id;
  }
  const inserted = await db
    .insert(dpo)
    .values({ name: trimmedName, url: url ?? null })
    .returning({ id: dpo.id })
    .execute();
  return inserted[0].id;
}

async function resolveDpoId(
  hasDpo: boolean | null | undefined,
  dpoName: string | null | undefined,
  dpoUrl: string | null | undefined
): Promise<number | null> {
  if (hasDpo !== true) return null;
  const trimmedName = dpoName?.trim();
  if (!trimmedName) return null;
  return await upsertDpoByName(trimmedName, dpoUrl);
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
  siteLaunchYear,
  siteEditor,
  siteEditorUrl,
  hasAccessibilitySettings,
  usesPanneauPocket,
  hasDpo,
  dpoName,
  dpoUrl,
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
  siteLaunchYear?: number | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
  usesPanneauPocket?: boolean | null;
  hasDpo?: boolean | null;
  dpoName?: string | null;
  dpoUrl?: string | null;
}) {
  try {
    const dpoId = await resolveDpoId(hasDpo, dpoName, dpoUrl);
    const prospectResult = await db
      .insert(prospect)
      .values({
        distanceFrom,
        dpoId,
        estimatedOpportunity,
        hasAccessibilitySettings,
        hasDpo,
        hasSite,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        siteEditor,
        siteEditorUrl,
        siteLaunchYear,
        type,
        usesPanneauPocket,
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
  siteLaunchYear,
  siteEditor,
  siteEditorUrl,
  hasAccessibilitySettings,
  usesPanneauPocket,
  hasDpo,
  dpoName,
  dpoUrl,
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
  siteLaunchYear?: number | null;
  siteEditor?: string | null;
  siteEditorUrl?: string | null;
  hasAccessibilitySettings?: boolean | null;
  usesPanneauPocket?: boolean | null;
  hasDpo?: boolean | null;
  dpoName?: string | null;
  dpoUrl?: string | null;
}) {
  try {
    const dpoId = await resolveDpoId(hasDpo, dpoName, dpoUrl);
    const prospectResult = await db
      .update(prospect)
      .set({
        distanceFrom,
        dpoId,
        estimatedOpportunity,
        hasAccessibilitySettings,
        hasDpo,
        inhabitants,
        latitude,
        location,
        longitude,
        name,
        siteEditor,
        siteEditorUrl,
        siteLaunchYear,
        type,
        usesPanneauPocket,
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

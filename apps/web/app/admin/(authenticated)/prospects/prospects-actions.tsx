"use server";
import { desc, eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { prospect } from "@/lib/db/schema";
import type { EstimatedOpportunity, ProspectType } from "./prospects-types";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
// 📝 Get prospects

const prospectsQuery = db
  .select()
  .from(prospect)
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
}: {
  name: string;
  type: ProspectType;
  website: string;
  location: string;
  latitude?: string;
  longitude?: string;
}) {
  try {
    const prospectResult = await db
      .insert(prospect)
      .values({
        latitude,
        location,
        longitude,
        name,
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
}: {
  id: number;
  name: string;
  type: ProspectType;
  website: string;
  location: string;
  latitude?: string;
  longitude?: string;
  estimatedOpportunity?: EstimatedOpportunity;
}) {
  try {
    const prospectResult = await db
      .update(prospect)
      .set({
        estimatedOpportunity,
        latitude,
        location,
        longitude,
        name,
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
  estimatedOpportunity: EstimatedOpportunity;
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

"use server";
import { db } from "@dev-oc/db";
import { type Audit, audit } from "@dev-oc/db/schema";
import { desc, eq } from "drizzle-orm";
import { type ActionResult, getErrorMessage } from "@/lib/api";

// --------------------------------------
// 💥 ACTIONS
// --------------------------------------

// --------------------------------------
// ➕ Create an audit

export async function createAudit({
  url,
  name,
  type,
}: CreateAuditParams): Promise<ActionResult<CreateAuditResult>> {
  // ✅🌐 Validation de l'URL
  let origin: string;
  try {
    ({ origin } = new URL(url));
  } catch {
    return { error: "URL invalide", success: false };
  }

  // 1️⃣ Insert the audit in database
  let auditResult: Audit[];
  const nowString = new Date().toISOString();
  try {
    auditResult = await db
      .insert(audit)
      .values({
        createdAt: nowString,
        id: crypto.randomUUID(),
        name: name || null,
        status: "pending",
        type,
        updatedAt: nowString,
        url: origin,
      })
      .returning();
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Erreur création audit:", message);
    return { error: message, success: false };
  }

  const [insertedAudit] = auditResult;
  if (!insertedAudit) {
    return { error: "Échec de l'insertion de l'audit", success: false };
  }

  return {
    response: {
      auditId: insertedAudit.id,
    },
    success: true,
  };
}

type CreateAuditParams = {
  url: string;
  name?: string;
  type: "rgaa" | "wcag";
};

export type CreateAuditResult = { auditId: string };

// --------------------------------------
// 📝 List audits

const listAuditsQuery = db
  .select({
    completedAt: audit.completedAt,
    complianceRate: audit.complianceRate,
    compliantCount: audit.compliantCount,
    createdAt: audit.createdAt,
    errorMessage: audit.errorMessage,
    id: audit.id,
    name: audit.name,
    nonCompliantCount: audit.nonCompliantCount,
    notApplicableCount: audit.notApplicableCount,
    notTestedCount: audit.notTestedCount,
    startedAt: audit.startedAt,
    status: audit.status,
    totalCriteria: audit.totalCriteria,
    type: audit.type,
    url: audit.url,
  })
  .from(audit)
  .orderBy(desc(audit.createdAt));

export type ListAuditsResult = Awaited<typeof listAuditsQuery>;
export type AuditResult = ListAuditsResult[number];

export async function listAudits(): Promise<ActionResult<ListAuditsResult>> {
  try {
    const audits = await listAuditsQuery;
    return { response: audits, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}

// --------------------------------------
// 🚮 Delete an audit

export async function deleteAudit(auditId: string): Promise<ActionResult> {
  try {
    await db.delete(audit).where(eq(audit.id, auditId)).execute();
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: `Error deleting audit ${auditId}: ${message}`,
      success: false,
    };
  }
}

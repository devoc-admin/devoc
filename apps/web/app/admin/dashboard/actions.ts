"use server";
import { db } from "@/lib/db";
import { audit } from "@/lib/db/schema";

type AuditProps = {
  url: string;
};

export async function upsertAudit({ url }: AuditProps) {
  const [result] = await db
    .insert(audit)
    .values({ url })
    .onConflictDoUpdate({ set: { url }, target: audit.url })
    .returning();

  return result;
}

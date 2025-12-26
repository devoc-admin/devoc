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

  return { success: true };
}

// -------------------------------------------------
export async function isValidWebsite(url: string): Promise<boolean> {
  try {
    // Validate URL format first
    const urlObject = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObject.protocol)) {
      return false;
    }

    // Make a HEAD request (lighter than GET)
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    // Consider 2xx and 3xx as valid
    return response.ok || (response.status >= 300 && response.status < 400);
  } catch (error) {
    return false;
  }
}

import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { audit } from "@/lib/db/schema";
import { SitesList } from "./_components/sites-list";

export default async function SitesPage() {
  const allAuditedSites = await db
    .select()
    .from(audit)
    .orderBy(desc(audit.createdAt));

  return <SitesList sites={allAuditedSites} />;
}

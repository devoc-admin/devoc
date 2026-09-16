import { db } from "@dev-oc/db";
import { crawl } from "@dev-oc/db/schema";
import { desc } from "drizzle-orm";
import { SitesList } from "./_components/sites-list";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const allCrawledSites = await db
    .select()
    .from(crawl)
    .orderBy(desc(crawl.createdAt));

  return <SitesList sites={allCrawledSites} />;
}

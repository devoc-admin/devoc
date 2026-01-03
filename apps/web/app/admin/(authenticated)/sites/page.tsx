import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { crawl } from "@/lib/db/schema";
import { SitesList } from "./_components/sites-list";

export default async function SitesPage() {
  const allCrawledSites = await db
    .select()
    .from(crawl)
    .orderBy(desc(crawl.createdAt));

  return <SitesList sites={allCrawledSites} />;
}

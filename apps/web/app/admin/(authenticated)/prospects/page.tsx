import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { prospect } from "@/lib/db/schema";
import { ProspectsList } from "./_components/prospects-list";

export default async function ProspectsPage() {
  const allProspects = await db
    .select()
    .from(prospect)
    .orderBy(desc(prospect.createdAt));

  return <ProspectsList prospects={allProspects} />;
}

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// biome-ignore lint/performance/noNamespaceImport: Drizzle ORM requires all schema exports as namespace
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL ?? "");
export const db = drizzle(sql, { schema });

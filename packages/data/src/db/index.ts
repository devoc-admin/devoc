import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// biome-ignore lint/performance/noNamespaceImport: Drizzle ORM requires all schema exports as namespace
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let instance: Db | undefined;

function getInstance(): Db {
  if (!instance) {
    // biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is required at runtime and guaranteed by environment
    instance = drizzle(neon(process.env.DATABASE_URL!), { schema });
  }
  return instance;
}

export const db = new Proxy({} as Db, {
  get(_, prop: string | symbol) {
    return getInstance()[prop as keyof Db];
  },
});

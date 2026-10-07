import { db } from "@dev-oc/data/db";
import { users } from "@dev-oc/data/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  const customer = await db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(users.id, userId),
  });
  return customer;
}

import { db } from "@dev-oc/data/db";
import { users } from "@dev-oc/data/db/schema";
import { get } from "@vercel/blob";
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

// 🖼️
export async function getUserProfilePictureById(
  userId: string,
  { ifNoneMatch }: { ifNoneMatch?: string } = {}
) {
  return await get(`users/${userId}/logo.png`, {
    access: "private",
    ifNoneMatch,
  });
}

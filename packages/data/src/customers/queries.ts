import { db } from "@dev-oc/data/db";
import { customers } from "@dev-oc/data/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomerById(customerId: number) {
  const customer = await db.query.customers.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(customers.id, customerId),
  });
  return customer;
}

import { db } from "@dev-oc/data/db";
import { customers, usersToCustomers } from "@dev-oc/data/db/schema";
import { and, asc, eq } from "drizzle-orm";

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

export async function getAllCustomers() {
  return await db
    .select({ id: customers.id, name: customers.name })
    .from(customers)
    .orderBy(asc(customers.name));
}

export async function getCustomersByUserId(userId: string) {
  return await db
    .select({ id: customers.id, name: customers.name })
    .from(customers)
    .innerJoin(usersToCustomers, eq(usersToCustomers.customerId, customers.id))
    .where(eq(usersToCustomers.userId, userId))
    .orderBy(asc(customers.name));
}

export async function getUserCustomerById(userId: string, customerId: number) {
  const [customer] = await db
    .select({ id: customers.id, name: customers.name })
    .from(customers)
    .innerJoin(usersToCustomers, eq(usersToCustomers.customerId, customers.id))
    .where(
      and(eq(usersToCustomers.userId, userId), eq(customers.id, customerId))
    )
    .limit(1);
  return customer;
}

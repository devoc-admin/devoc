import { getCustomerById } from "@dev-oc/data/customers";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth/auth";

export const getCustomer = cache(async (customerId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const id = Number(customerId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return customer;
});

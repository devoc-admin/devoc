import {
  getAllCustomers,
  getCustomerById,
  getCustomersByUserId,
  getUserCustomerById,
} from "@dev-oc/data/customers";
import { getProjectsByCustomerId } from "@dev-oc/data/projects";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth/session";

export const getMyCustomers = cache(async () => {
  const user = await getCurrentUser();

  if (user.type === "admin") {
    return await getAllCustomers();
  }

  return await getCustomersByUserId(user.id);
});

export const getCustomer = cache(async (customerId: string) => {
  const user = await getCurrentUser();
  const id = Number(customerId);

  if (!Number.isInteger(id) || id <= 0) notFound();

  const [customer, projects] = await Promise.all([
    user.type === "admin"
      ? getCustomerById(id)
      : getUserCustomerById(user.id, id),
    getProjectsByCustomerId(id),
  ]);

  // Projects are fetched in parallel but only returned once access is checked
  if (!customer) notFound();

  return { ...customer, projects };
});

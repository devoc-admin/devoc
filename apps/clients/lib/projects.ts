import { getCustomerProjectById } from "@dev-oc/data/projects";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getCustomer } from "@/lib/customers";

export const getProject = cache(
  async (customerId: string, projectId: string) => {
    const customer = await getCustomer(customerId);
    const id = Number(projectId);

    if (!Number.isInteger(id) || id <= 0) {
      notFound();
    }

    const project = await getCustomerProjectById(customer.id, id);

    if (!project) {
      notFound();
    }

    return { customer, project };
  }
);

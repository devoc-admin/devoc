import {
  getCustomerProjectById,
  getLinksByProjectId,
} from "@dev-oc/data/projects";
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

// Goes through getProject so links are only returned for an accessible project
export const getProjectLinks = cache(
  async (customerId: string, projectId: string) => {
    const { project } = await getProject(customerId, projectId);
    return await getLinksByProjectId(project.id);
  }
);

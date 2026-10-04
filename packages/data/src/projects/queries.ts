import { db } from "@dev-oc/data/db";
import { projects } from "@dev-oc/data/db/schema";
import { get } from "@vercel/blob";
import { and, eq } from "drizzle-orm";

export async function getProjectById(projectId: number) {
  const project = await db.query.projects.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(projects.id, projectId),
  });
  return project;
}

// Returns undefined when the project doesn't belong to this customer
export async function getCustomerProjectById(
  customerId: number,
  projectId: number
) {
  const project = await db.query.projects.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: and(eq(projects.id, projectId), eq(projects.customerId, customerId)),
  });
  return project;
}

// Returns null when the project has no logo; statusCode 304 when `ifNoneMatch` matches
export async function getProjectLogoById(
  projectId: number,
  { ifNoneMatch }: { ifNoneMatch?: string } = {}
) {
  return await get(`projects/${projectId}/logo.png`, {
    access: "private",
    ifNoneMatch,
  });
}

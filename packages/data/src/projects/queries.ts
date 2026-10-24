import { db } from "@dev-oc/data/db";
import { links, projects } from "@dev-oc/data/db/schema";
import { get } from "@vercel/blob";
import { and, asc, eq } from "drizzle-orm";

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

export async function getProjectsByCustomerId(customerId: number) {
  return await db
    .select({ id: projects.id, name: projects.name })
    .from(projects)
    .where(eq(projects.customerId, customerId))
    .orderBy(asc(projects.name));
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

export async function getLinksByProjectId(projectId: number) {
  return await db
    .select({ id: links.id, name: links.name, url: links.url })
    .from(links)
    .where(eq(links.projectId, projectId))
    .orderBy(asc(links.name));
}

// 🖼️
export async function getProjectLogoById(
  projectId: number,
  { ifNoneMatch }: { ifNoneMatch?: string } = {}
) {
  return await get(`projects/${projectId}/logo.png`, {
    access: "private",
    ifNoneMatch,
  });
}

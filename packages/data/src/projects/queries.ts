import { db } from "@dev-oc/data/db";
import { links, projectSteps, projects } from "@dev-oc/data/db/schema";
import { get } from "@vercel/blob";
import { and, asc, eq } from "drizzle-orm";

export async function getProjectById(projectId: number) {
  const project = await db.query.projects.findFirst({
    columns: {
      createdAt: true,
      customerId: true,
      dueDate: true,
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

export async function getCustomerProjectById(
  customerId: number,
  projectId: number
) {
  const project = await db.query.projects.findFirst({
    columns: {
      createdAt: true,
      dueDate: true,
      githubUrl: true,
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

// 👣 ============================================

const projectStepColumns = {
  completedAt: projectSteps.completedAt,
  description: projectSteps.description,
  dueDate: projectSteps.dueDate,
  id: projectSteps.id,
  name: projectSteps.name,
  position: projectSteps.position,
  startDate: projectSteps.startDate,
  status: projectSteps.status,
};

export async function getProjectStepsByProjectId(projectId: number) {
  return await db
    .select(projectStepColumns)
    .from(projectSteps)
    .where(eq(projectSteps.projectId, projectId))
    .orderBy(asc(projectSteps.position), asc(projectSteps.id));
}

export async function getProjectStepById(projectId: number, stepId: number) {
  const [step] = await db
    .select(projectStepColumns)
    .from(projectSteps)
    .where(
      and(eq(projectSteps.id, stepId), eq(projectSteps.projectId, projectId))
    )
    .limit(1);
  return step;
}

// 🖼️ ============================================
export async function getProjectLogoById(
  projectId: number,
  { ifNoneMatch }: { ifNoneMatch?: string } = {}
) {
  return await get(`projects/${projectId}/logo.png`, {
    access: "private",
    ifNoneMatch,
  });
}

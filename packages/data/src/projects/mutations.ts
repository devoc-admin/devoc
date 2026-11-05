import { db } from "@dev-oc/data/db";
import { type NewProjectStep, projectSteps } from "@dev-oc/data/db/schema";
import { eq, sql } from "drizzle-orm";

type CreateProjectStepInput = Omit<
  NewProjectStep,
  "id" | "createdAt" | "updatedAt"
>;

// Without a position, the step is appended after the project's last step
export async function createProjectStep({
  position,
  ...input
}: CreateProjectStepInput) {
  const nextPosition = db
    .select({
      value: sql<number>`coalesce(max(${projectSteps.position}), 0) + 1`,
    })
    .from(projectSteps)
    .where(eq(projectSteps.projectId, input.projectId));

  const [step] = await db
    .insert(projectSteps)
    .values({ ...input, position: position ?? sql`(${nextPosition})` })
    .returning({
      completedAt: projectSteps.completedAt,
      description: projectSteps.description,
      dueDate: projectSteps.dueDate,
      id: projectSteps.id,
      name: projectSteps.name,
      position: projectSteps.position,
      startDate: projectSteps.startDate,
      status: projectSteps.status,
    });
  return step;
}

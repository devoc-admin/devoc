import { getProject } from "@/lib/projects";

export default async function ProjectTitle({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;
  const { customer, project } = await getProject(customerId, projectId);

  return (
    <span className="font-medium">
      {customer.name} / {project.name}
    </span>
  );
}

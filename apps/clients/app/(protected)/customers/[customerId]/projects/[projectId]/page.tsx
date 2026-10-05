import { getProject } from "@/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;
  const {
    project: { name: projectName },
  } = await getProject(customerId, projectId);

  return (
    <div className="flex items-center gap-4">
      <h1 className="font-semibold text-2xl">{projectName}</h1>
    </div>
  );
}

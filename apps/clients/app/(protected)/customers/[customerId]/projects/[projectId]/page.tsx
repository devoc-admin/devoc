import { getProject } from "@/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;
  const { customer, project } = await getProject(customerId, projectId);

  return (
    <div className="flex items-center gap-4">
      {/* Plain <img>: next/image's optimizer fetches without the session cookie */}
      {/* biome-ignore lint/performance/noImgElement: private blob served through an authenticated route */}
      <img
        alt={project.name}
        height={64}
        src={`/api/customers/${customer.id}/projects/${project.id}/logo`}
        width={64}
      />
      <h1 className="font-semibold text-2xl">{project.name}</h1>
    </div>
  );
}

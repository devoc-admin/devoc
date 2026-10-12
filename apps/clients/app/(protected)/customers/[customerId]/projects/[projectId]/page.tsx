import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject, getProjectLinks } from "@/lib/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;

  // 🐝
  const [
    {
      project: { name: projectName },
    },
    links,
  ] = await Promise.all([
    getProject(customerId, projectId),
    getProjectLinks(customerId, projectId),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-2xl">{projectName}</h1>
      <ul className="space-y-1">
        {links.map(({ id, name, url }) => (
          <ProjectLinkCard key={id} url={url}>
            {name}
          </ProjectLinkCard>
        ))}
      </ul>
    </div>
  );
}

export function ProjectLinkCard({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <li>
      <a href={url} rel="noopener noreferrer" target="_blank">
        <Card className="max-w-80">
          <CardHeader>
            <CardTitle>{children}</CardTitle>
          </CardHeader>
          <CardContent className="truncate text-gray-400">{url}</CardContent>
        </Card>
      </a>
    </li>
  );
}

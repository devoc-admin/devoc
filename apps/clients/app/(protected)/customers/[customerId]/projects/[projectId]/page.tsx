import { cn } from "cn";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject, getProjectLinks } from "@/lib/projects";
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;

  // 🐝
  const links = await getProjectLinks(customerId, projectId);

  return (
    <Container>
      {/* 🆎 */}
      <ProjectHeader customerId={customerId} projectId={projectId} />
      {/* 🃏🃏🃏 */}
      <CardsContainer>
        {links.map(({ id, name, url }) => (
          <ProjectLinkCard key={id} url={url}>
            {name}
          </ProjectLinkCard>
        ))}
      </CardsContainer>
    </Container>
  );
}

// 📦 ===================================================
function Container({ children }: { children: React.ReactNode }) {
  return <div className={cn("space-y-8")}>{children}</div>;
}

// 📦🃏 ===================================================
function CardsContainer({ children }: { children: React.ReactNode }) {
  return <ul className="list-none space-y-1">{children}</ul>;
}

// 🆎 ===================================================
async function ProjectHeader({
  customerId,
  projectId,
}: {
  customerId: string;
  projectId: string;
}) {
  const {
    project: { name: projectName },
  } = await getProject(customerId, projectId);

  return (
    <div className="flex items-center gap-x-6 border-b pb-6">
      <ProjectLogo customerId={customerId} projectId={projectId} />
      <ProjectTitle projectName={projectName} />
    </div>
  );
}

function ProjectLogo({
  customerId,
  projectId,
}: {
  customerId: string;
  projectId: string;
}) {
  const imageSrc = `/api/customers/${customerId}/projects/${projectId}/logo`;
  return (
    <Image
      alt=""
      className="size-16 rounded-sm object-contain"
      height={64}
      src={imageSrc}
      unoptimized
      width={64}
    />
  );
}

function ProjectTitle({ projectName }: { projectName: string }) {
  return <h1 className="text-2xl font-semibold">{projectName}</h1>;
}

// 🃏 ===================================================
function ProjectLinkCard({
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

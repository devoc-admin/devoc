import type { Project } from "@dev-oc/data/db/schema";
import { IconBrandGithubFilled as GithubIcon } from "@tabler/icons-react";
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
    project: { name: projectName, githubUrl },
  } = await getProject(customerId, projectId);

  return (
    <div className="flex items-center gap-x-6 border-b pb-6">
      <ProjectLogo customerId={customerId} projectId={projectId} />
      <div className="space-y-1.5">
        <ProjectTitle projectName={projectName} />
        <GithubLink url={githubUrl} />
      </div>
    </div>
  );
}

// 🖼️
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

// 🆎
function ProjectTitle({ projectName }: { projectName: string }) {
  return <h1 className="text-2xl font-medium">{projectName}</h1>;
}

// 🔗
const newLocal = /^https?:\/\/github\.com\//u;
export function GithubLink({ url }: { url: Project["githubUrl"] }) {
  if (url === "" || url === null) return null;
  const githubName = url.replace(newLocal, "");
  return (
    <a
      className="flex w-fit items-center gap-x-1 rounded-full bg-[#F0F0F3] px-2 py-0.5 text-xs font-normal text-[#60646C]"
      href={url}
      rel="noopener"
      target="_blank"
    >
      <GithubIcon size={12} />
      <span className="text-[0.8rem]">{githubName}</span>
    </a>
  );
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

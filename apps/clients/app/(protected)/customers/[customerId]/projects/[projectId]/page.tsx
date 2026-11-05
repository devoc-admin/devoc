import { cn } from "cn";
import { getProjectLinks } from "@/lib/projects";
import { ProjectHeader } from "./_components/project-header";
import { ProjectLinkCard } from "./_components/project-link-card";
import { ProgressLine } from "./_components/project-progress";

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
      {/* 🏗️ */}
      <ProgressLine projectId={projectId} />
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

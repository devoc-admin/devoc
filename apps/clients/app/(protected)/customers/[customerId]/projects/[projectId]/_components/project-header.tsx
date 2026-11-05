/** biome-ignore-all lint/style/noNestedTernary: exception */
import type { Project } from "@dev-oc/data/db/schema";
import { IconBrandGithubFilled as GithubIcon } from "@tabler/icons-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getProject } from "@/lib/projects";
import { ProjectDetailsSidebar } from "./project-details-sidebar";

export async function ProjectHeader({
  customerId,
  projectId,
}: {
  customerId: string;
  projectId: string;
}) {
  const {
    project: { name: projectName, githubUrl, dueDate, createdAt },
  } = await getProject(customerId, projectId);

  return (
    <div className="flex items-center gap-x-6 border-b pb-6">
      <ProjectLogo customerId={customerId} projectId={projectId} />
      <div className="space-y-1.5">
        <ProjectTitle
          createdAt={createdAt}
          dueDate={dueDate}
          projectName={projectName}
        />
        <GithubLink url={githubUrl} />
      </div>
      {/* 📝 */}
      <div className="ml-auto self-start">
        <ProjectDetailsSidebar projectId={projectId} />
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
function ProjectTitle({
  projectName,
  dueDate,
  createdAt,
}: {
  projectName: string;
  dueDate: string | null;
  createdAt: string;
}) {
  const isInProgress =
    createdAt && dueDate
      ? new Date(dueDate) > new Date(createdAt) ||
        new Date() > new Date(createdAt)
      : false;

  const isFinished = dueDate ? new Date(dueDate) < new Date() : false;
  const isUpcoming = createdAt ? new Date(createdAt) > new Date() : false;

  return (
    <div className="flex items-center gap-x-4">
      <h1 className="text-2xl font-medium">{projectName}</h1>
      {isInProgress && <Badge className="mt-1">En cours</Badge>}
      {isFinished && (
        <Badge className="mt-1" variant="secondary">
          Terminé
        </Badge>
      )}
      {isUpcoming && (
        <Badge className="mt-1" variant="secondary">
          À venir
        </Badge>
      )}
    </div>
  );
}

// 🔗
const newLocal = /^https?:\/\/github\.com\//u;
export function GithubLink({ url }: { url: Project["githubUrl"] }) {
  if (url === "" || url === null) return null;
  const githubName = url.replace(newLocal, "");
  return (
    <a
      className="flex w-fit items-center gap-x-1 rounded-full bg-[#F0F0F3] px-2.5 py-[0.15rem] text-[0.75rem] font-normal text-[#60646C]"
      href={url}
      rel="noopener"
      target="_blank"
    >
      <GithubIcon size={12} />
      <span className="text-[0.75rem]">{githubName}</span>
    </a>
  );
}

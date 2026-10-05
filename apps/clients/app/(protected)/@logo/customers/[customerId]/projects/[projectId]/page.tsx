// import { cn } from "cn";
// import Link from "next/link";

import Image from "next/image";
import { getProject } from "@/lib/projects";
export default async function Breadcrumbs({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;
  const {
    project: { name: projectName },
  } = await getProject(customerId, projectId);
  return (
    <Container>
      {" "}
      <ProjectLogo
        customerId={customerId}
        projectId={projectId}
        projectName={projectName}
      />
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// 🖼️
function ProjectLogo({
  projectId,
  projectName,
  customerId,
}: {
  projectId: string;
  projectName: string;
  customerId: string;
}) {
  return (
    <Image
      alt={projectName}
      className="h-full"
      height={86}
      src={`/api/customers/${customerId}/projects/${projectId}/logo`}
      // 🔒 The optimizer fetches server-side without cookies, so the auth-gated route 401s
      unoptimized
      width={86}
    />
  );
}

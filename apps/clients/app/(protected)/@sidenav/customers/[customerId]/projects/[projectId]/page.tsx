import { Sidenav } from "@/app/(protected)/_components/sidebar/index";

export default async function ProjectSidenav({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;

  return (
    <Sidenav className="w-60" customerId={customerId} projectId={projectId} />
  );
}

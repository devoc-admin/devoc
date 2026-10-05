import { cn } from "cn";
import Link from "next/link";
import { IconChevronRightFill12 } from "nucleo-ui-essential-fill-12";
import { getProject } from "@/lib/projects";
export default async function Breadcrumbs({
  params,
}: {
  params: Promise<{ customerId: string; projectId: string }>;
}) {
  const { customerId, projectId } = await params;
  const { customer, project } = await getProject(customerId, projectId);

  return (
    <Container>
      <Link className="hover:underline" href={`/customers/${customerId}`}>
        {customer.name}
      </Link>
      <Separator />
      <Link
        className="hover:underline"
        href={`/customers/${customerId}/projects/${projectId}`}
      >
        {project.name}
      </Link>
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center gap-x-1.5 font-medium")}>
      {children}
    </div>
  );
}

function Separator() {
  return <IconChevronRightFill12 />;
}

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

  if (customer.projects.length === 1) {
    return (
      <BreadcrumbsLink href={`/customers/${customerId}/projects/${projectId}`}>
        {project.name}
      </BreadcrumbsLink>
    );
  }

  return (
    <Container>
      <BreadcrumbsLink href={`/customers/${customerId}`}>
        {customer.name}
      </BreadcrumbsLink>
      <Separator />
      <BreadcrumbsLink href={`/customers/${customerId}/projects/${projectId}`}>
        {project.name}
      </BreadcrumbsLink>
    </Container>
  );
}

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center gap-x-1.5")}>{children}</div>
  );
}

// ―
function Separator() {
  return <IconChevronRightFill12 />;
}

// 🔗
function BreadcrumbsLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link className="font-medium hover:underline" href={href}>
      {children}
    </Link>
  );
}

import { cn } from "cn";
import {
  UserRoundGroup as AllOrganizationsIcon,
  FolderIcon as AllProjectsIcon,
  ArrowLeft as BackToOrganizationIcon,
  Grid2X2 as OverviewIcon,
  Cog as SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { getCustomer, getMyCustomers } from "@/lib/customers";
import { LogoutButton } from "./_components/logout-button";
import { NavSelect, type NavSelectOption } from "./_components/nav-select";
import { SidenavHeader } from "./_components/sidenav-header";
import { SidenavItem } from "./_components/sidenav-item";
import { SidenavLabel } from "./_components/sidenav-label";
export function Sidenav({
  customerId,
  projectId,
}: {
  customerId?: string;
  projectId?: string;
}) {
  const projectHref =
    customerId && projectId
      ? `/customers/${customerId}/projects/${projectId}`
      : null;

  return (
    <Container>
      {/* 🌼 */}
      <SidenavHeader />
      {/* 👥📦 */}
      <ContainerSelect>
        <CustomerSelect customerId={customerId} />
        <ProjectSelect customerId={customerId} projectId={projectId} />
      </ContainerSelect>

      {/* ⬅️ */}
      <BackToOrganization customerId={customerId} projectId={projectId} />

      {/* 📝 */}
      {projectHref && (
        <ContainerProject>
          <Overview href={projectHref} />
          <Settings href={`${projectHref}/settings`} />
        </ContainerProject>
      )}

      <LogoutButton />
    </Container>
  );
}

// 📦 ===================================================
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-sidenav-background text-sidenav-foreground",
        "flex flex-col",
        "space-y-3",
        "w-65",
        "pt-2"
      )}
    >
      {children}
    </div>
  );
}

export function ContainerSelect({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function ContainerProject({ children }: { children: React.ReactNode }) {
  return <ul className="list-none space-y-1">{children}</ul>;
}

// 👥 ===================================================
async function CustomerSelect({ customerId }: { customerId?: string }) {
  const customers = await getMyCustomers();

  return (
    <NavSelect
      label="Organisations"
      options={toCustomerOptions(customers)}
      placeholder="Sélectionner une organisation"
      value={customerId ? `/customers/${customerId}` : null}
    />
  );
}

function toCustomerOptions(
  customers: Awaited<ReturnType<typeof getMyCustomers>>
): NavSelectOption[] {
  const options: NavSelectOption[] = customers.map(({ id, name }) => ({
    href: `/customers/${id}`,
    imageSrc: `/api/customers/${id}/logo`,
    label: name,
  }));

  if (options.length > 1) {
    options.push({
      href: "/",
      icon: <AllOrganizationsIcon className="size-4" />,
      label: "Toutes les organisations",
    });
  }

  return options;
}

// 📦 ===================================================
type Customer = Awaited<ReturnType<typeof getCustomer>>;

async function ProjectSelect({
  customerId,
  projectId,
}: {
  customerId?: string;
  projectId?: string;
}) {
  // 🔁 `getCustomer` is wrapped in React `cache`, so repeated calls in one request hit the DB once
  const customer = customerId ? await getCustomer(customerId) : null;

  return (
    <NavSelect
      label="Projets"
      options={toProjectOptions(customer)}
      placeholder="Sélectionner un projet"
      value={
        customerId && projectId
          ? `/customers/${customerId}/projects/${projectId}`
          : null
      }
    />
  );
}

function toProjectOptions(customer: Customer | null): NavSelectOption[] {
  if (!customer) {
    return [];
  }

  const options: NavSelectOption[] = customer.projects.map(({ id, name }) => ({
    href: `/customers/${customer.id}/projects/${id}`,
    imageSrc: `/api/customers/${customer.id}/projects/${id}/logo`,
    label: name,
  }));

  if (options.length > 1) {
    options.push({
      href: `/customers/${customer.id}`,
      icon: <AllProjectsIcon className="size-4.5" />,
      label: "Tous les projets",
    });
  }

  return options;
}

// ⬅️ ===================================================
export function BackToOrganization({
  customerId,
  projectId,
}: {
  customerId?: string;
  projectId?: string;
}) {
  if (!projectId) return null;
  return (
    <Link
      className={cn(
        "flex items-center gap-x-2",
        "transition-colors",
        "text-sm font-light",
        "text-muted-foreground",
        "hover:bg-muted-background",
        "px-3 py-2",
        "rounded-lg"
      )}
      href={`/customers/${customerId}`}
    >
      <BackToOrganizationIcon size={16} />
      <span>Organisation</span>
    </Link>
  );
}

// 👁️ ===================================================
export function Overview({ href }: { href: string }) {
  return (
    <SidenavItem href={href}>
      <OverviewIcon size={18} />
      <SidenavLabel>Vue générale</SidenavLabel>
    </SidenavItem>
  );
}

// ⚙️ ===================================================
export function Settings({ href }: { href: string }) {
  return (
    <SidenavItem href={href}>
      <SettingsIcon size={18} />
      <SidenavLabel>Réglages</SidenavLabel>
    </SidenavItem>
  );
}

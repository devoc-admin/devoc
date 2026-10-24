import { cn } from "cn";
import {
  UserRoundGroup as AllOrganizationsIcon,
  FolderIcon as AllProjectsIcon,
} from "lucide-react";
import { IconHouse as OverviewIcon } from "nucleo-glass";
import { getCustomer, getMyCustomers } from "@/lib/customers";
import { LogoutButton } from "./_components/logout-button";
import { NavSelect, type NavSelectOption } from "./_components/nav-select";
import { SidenavItem } from "./_components/sidenav-item";
import { SidenavLabel } from "./_components/sidenav-label";

export async function Sidenav({
  customerId,
  projectId,
  className,
}: {
  customerId?: string;
  projectId?: string;
  className?: string;
}) {
  // 👥
  const [customers, customer] = await Promise.all([
    getMyCustomers(),
    customerId ? getCustomer(customerId) : null,
  ]);

  const customerHref = customerId ? `/customers/${customerId}` : null;
  const customersOptions: NavSelectOption[] = customers.map((c) => ({
    href: `/customers/${c.id}`,
    imageSrc: `/api/customers/${customer?.id}/logo`,
    label: c.name,
  }));

  if (customersOptions.length >= 1) {
    customersOptions.push({
      href: "/",
      icon: <AllOrganizationsIcon className="size-4" />,
      label: "Toutes les organisations",
    });
  }

  // 📦
  const projectHref =
    customerHref && projectId ? `${customerHref}/projects/${projectId}` : null;
  const projectsOptions: NavSelectOption[] = (customer?.projects ?? []).map(
    (p) => ({
      href: `/customers/${customer?.id}/projects/${p.id}`,
      imageSrc: `/api/customers/${customer?.id}/projects/${p.id}/logo`,
      label: p.name,
    })
  );

  if (projectsOptions.length >= 1) {
    projectsOptions.push({
      href: `/customers/${customer?.id}`,
      icon: <AllProjectsIcon className="size-4.5" />,
      label: "Tous les projets",
    });
  }

  return (
    <ul
      className={cn(
        "bg-sidebar-background text-sidebar-foreground",
        "flex flex-col",
        className
      )}
    >
      {/* 👥📦 */}
      <div className="space-y-2">
        {/* 👥 */}
        <NavSelect
          label="Organisations"
          options={customersOptions}
          placeholder="Sélectionner une organisation"
          value={customerHref}
        />
        {/* 📦 */}
        <NavSelect
          label="Projets"
          options={projectsOptions}
          placeholder="Sélectionner un projet"
          value={projectHref}
        />
      </div>

      {/* 📝 */}
      <SidenavItem>
        <OverviewIcon size={20} />
        <SidenavLabel>Overview</SidenavLabel>
      </SidenavItem>

      <LogoutButton />
    </ul>
  );
}

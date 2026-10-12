import { cn } from "cn";
import { IconHouse } from "nucleo-glass";
import { LogoutButton } from "./logout-button";

export function Sidenav({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "bg-sidebar-background text-sidebar-foreground",
        "flex flex-col",
        "px-3 py-5",
        "border-border border-r",
        className
      )}
    >
      <SidenavItem>
        <IconHouse />
        <SidenavLabel>Accueil</SidenavLabel>
      </SidenavItem>

      <LogoutButton />
    </ul>
  );
}

export function SidenavItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "flex items-center gap-x-2.5 px-4 py-2.5",
        "rounded-md bg-gray-100"
      )}
    >
      {children}
    </li>
  );
}

export function SidenavLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-1 font-semibold leading-none", className)}>
      {children}
    </div>
  );
}

"use client";
import {
  DoorOpenIcon,
  FileScanIcon,
  type LucideIcon,
  UsersIcon,
  WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        /* ⬇️ Layout */ "flex flex-col",
        /* 🔤 Color */ "text-foreground",
        /* 🖼️ Background */ "bg-transparent",
        /* ↔️ Size */ "h-full w-48",
        /* ⭕ Radius */ "rounded-md",
        /*🫸 Padding*/ "py-1"
      )}
    >
      {/* 🔗 Links */}
      <div className="mt-4 w-full space-y-2 text-base text-zinc-200">
        <SidebarLink
          icon={WaypointsIcon}
          isActive={pathname.startsWith("/admin/crawl")}
          pathname="/admin/crawl"
        >
          Crawls
        </SidebarLink>
        <SidebarLink
          icon={FileScanIcon}
          isActive={pathname.startsWith("/admin/sites")}
          pathname="/admin/sites"
        >
          Audits
        </SidebarLink>
        <SidebarLink
          icon={UsersIcon}
          isActive={pathname.startsWith("/admin/prospects")}
          pathname="/admin/prospects"
        >
          Prospects
        </SidebarLink>
      </div>
      {/* ⬇️ Footer */}
      <div className="mt-auto flex gap-x-2">
        <SignOutButton />
        <ModeToggle />
      </div>
    </div>
  );
}
// ------------------------------
function SignOutButton() {
  return (
    <Button
      className="grow cursor-pointer"
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/admin/login");
            },
          },
        })
      }
      size="icon"
      variant="outline"
    >
      <DoorOpenIcon size={16} />
      <span>Déconnexion</span>
    </Button>
  );
}

// ------------------------------
function SidebarLink({
  pathname,
  isActive,
  icon: Icon,
  children,
}: {
  pathname: string;
  isActive: boolean;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={cn(
        /* ⬇️ Layout */ "flex items-center gap-x-3",
        /* 🔤 Text */ "text-foreground",
        /* 🔲 Border */ "border-none dark:border dark:border-input",
        /* ⭕ Radius */ "rounded-lg",
        /* 🫷 Padding */ "px-5 py-2.5",
        /* 🤹 Transition */ "transition-colors",
        "hover:bg-accent",
        /* 👁️ Hover */ "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        /* 🔆 */ isActive && "bg-muted"
      )}
      href={pathname}
      prefetch
    >
      <Icon size={18} />
      {children}
    </Link>
  );
}
export { Sidebar };

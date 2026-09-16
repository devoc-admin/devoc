"use client";
import { useSignOut } from "@dev-oc/auth/client";
import {
  ClipboardCheckIcon,
  DoorOpenIcon,
  type LucideIcon,
  UsersIcon,
  WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
          icon={UsersIcon}
          isActive={pathname.startsWith("/prospects")}
          pathname="/prospects"
        >
          Prospects
        </SidebarLink>
        <SidebarLink
          icon={WaypointsIcon}
          isActive={pathname.startsWith("/crawl")}
          pathname="/crawls"
        >
          Crawls
        </SidebarLink>
        <SidebarLink
          icon={ClipboardCheckIcon}
          isActive={pathname.startsWith("/audit")}
          pathname="/audits"
        >
          Audits
        </SidebarLink>
      </div>
      {/* ⬇️ Footer */}
      <div className="mt-auto flex gap-x-2">
        <SignOutButton />
      </div>
    </div>
  );
}
// ------------------------------
function SignOutButton() {
  const signOut = useSignOut({ redirectTo: "/login" });
  return (
    <Button
      className="grow cursor-pointer"
      onClick={signOut}
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
        /* 🔲 Border */ "border-none",
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

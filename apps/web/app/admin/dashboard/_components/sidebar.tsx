"use client";
import { DoorOpenIcon, FileScanIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        /* ⬇️ Layout */ "flex flex-col",
        /* 🔤 Color */ "text-foreground",
        /* 🖼️ Background */ "bg-transparent",
        /* ↔️ Size */ "h-full w-62.5",
        /* ⭕ Radius */ "rounded-md",
        /*🫸 Padding*/ "px-4 py-1"
      )}
    >
      {/* 🔗 Links */}
      <div className="mt-4 w-full text-base text-zinc-200">
        <SidebarLink
          icon={FileScanIcon}
          isActive={pathname === "/admin/dashboard"}
          pathname="/admin/dashboard"
        >
          Analyse
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
        /* 🔆 */ isActive && "bg-muted text-muted-foreground"
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

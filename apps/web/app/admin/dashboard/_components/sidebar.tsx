"use client";
import { AppWindowIcon, DoorOpenIcon } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex h-full w-[250px] flex-col rounded-md bg-transparent px-4 py-1 text-white">
      {/* 🔗 Links */}
      <div className="mt-4 w-full text-base text-zinc-200">
        <Link
          className={cn(
            "flex items-center gap-x-3 rounded-lg px-5 py-2.5",
            pathname === "/admin/dashboard" && "bg-sidebar-accent"
          )}
          href="/admin/dashboard"
          prefetch
        >
          <AppWindowIcon size={18} />
          <span>Vue globale</span>
        </Link>
      </div>
      {/* ⬇️ Footer */}
      <div className="mt-auto flex gap-x-2">
        <SignOutButton />
        <ModeToggle />
      </div>
    </div>
  );
}

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

export { Sidebar };

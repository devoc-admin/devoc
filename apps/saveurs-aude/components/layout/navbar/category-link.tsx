"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavbarCategoryLink({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive =
    pathname === "/boutique" && searchParams.get("category") === slug;

  return (
    <Link
      className={cn(
        "underline-offset-4",
        "hover:underline",
        isActive && "underline"
      )}
      href={{ pathname: "/boutique", query: { category: slug } }}
    >
      {children}
    </Link>
  );
}

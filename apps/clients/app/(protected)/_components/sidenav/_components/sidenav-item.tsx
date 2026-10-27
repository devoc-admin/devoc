"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidenavItem({
  children,
  href,
  exact = true,
}: {
  children: React.ReactNode;
  href: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <li>
      <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-x-2.5",
          "px-4 py-2.5",
          "rounded-md hover:bg-gray-200",
          isActive && "bg-gray-200 font-medium"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

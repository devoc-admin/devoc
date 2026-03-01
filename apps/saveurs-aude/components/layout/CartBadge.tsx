"use client";

import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartBadge({ label }: { label: string }) {
  // 🛒
  const { totalItems } = useCart();

  return (
    <Link
      aria-label={label}
      className={cn(
        "relative",
        "rounded-full",
        "p-2",
        "text-foreground/70",
        "transition-colors hover:bg-secondary hover:text-primary"
      )}
      href="/panier"
    >
      <ShoppingBag className="size-5" />
      {totalItems > 0 && <Badge count={totalItems} />}
    </Link>
  );
}

// ==============================================
// 🔴
function Badge({ count }: { count: number }) {
  return (
    <span
      className={cn(
        "absolute -top-0.5 -right-0.5",
        "flex size-4 items-center justify-center",
        "rounded-full",
        "bg-accent",
        "font-bold text-[10px] text-accent-foreground"
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

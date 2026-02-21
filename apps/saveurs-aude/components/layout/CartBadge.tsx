"use client";

import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";

export function CartBadge({ label }: { label: string }) {
  const { totalItems } = useCart();

  return (
    <Link
      aria-label={label}
      className="relative rounded-full p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
      href="/panier"
    >
      <ShoppingBag className="size-5" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-accent font-bold text-[10px] text-accent-foreground">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}

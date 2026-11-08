"use client";

import { ShoppingBag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartBadge({ label }: { label: string }) {
  // 🛒
  const { totalItems } = useCart();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          aria-label={label}
          className={cn(
            "relative",
            "rounded-full",
            "p-2",
            "text-foreground/70",
            "hover:bg-secondary hover:text-primary transition-colors"
          )}
          href="/panier"
        >
          <ShoppingBag className="size-5" />
          {totalItems > 0 && <Badge count={totalItems} />}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
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
        "text-accent-foreground text-[10px] font-bold"
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

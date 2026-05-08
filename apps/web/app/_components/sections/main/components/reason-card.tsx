import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function ReasonCard({
  title,
  description,
  index,
  Icon,
}: {
  title: string;
  description: string;
  index: number;
  Icon: LucideIcon;
}) {
  return (
    <article
      className={cn(
        "flex flex-col",
        "h-full",
        "p-8",
        "bg-surface-dark",
        "rounded-3xl",
        "border border-foreground-dark/10"
      )}
    >
      {/* 1️⃣ */}
      <div className="grid size-12 place-items-center rounded-full border border-foreground-dark/10 bg-foreground-dark/3">
        <Icon color="#AEABA4" size={18} />
      </div>
      {/* 2️⃣ */}
      <div className="mt-8 space-y-3">
        <div className="flex gap-x-3 font-fraunces text-2xl">
          <span>#{index + 1}</span>
          <span>{title}</span>
        </div>
        <p className="text-foreground-dark/50 text-lg">{description}</p>
      </div>
    </article>
  );
}

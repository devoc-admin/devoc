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
        "relative",
        "flex flex-col",
        "h-full",
        "bg-surface-dark",
        "rounded-3xl",
        "border border-foreground-dark/10",
        // ↔️
        "p-5",
        "2xl:p-8"
      )}
    >
      {/* 1️⃣ 🖼️ */}
      <div
        className={cn(
          "grid place-items-center rounded-full border border-foreground-dark/10 bg-foreground-dark/3",
          "size-12",
          // ↔️
          "absolute top-4 right-4",
          "lg:static"
        )}
      >
        <Icon color="#AEABA4" size={18} />
      </div>
      {/* 2️⃣ 🔢🔤 */}
      <div className="mt-8 flex flex-col gap-y-3">
        <div
          className={cn(
            "flex font-fraunces",
            // ↔️
            "flex-col items-center text-xl",
            "lg:flex-row lg:items-start lg:gap-x-3 lg:text-2xl"
          )}
        >
          <span>#{index + 1}</span>
          <span
            className={cn(
              // ↔️
              "text-center",
              "lg:text-left"
            )}
          >
            {title}
          </span>
        </div>
        <p
          className={cn(
            "text-foreground-dark/50",
            "mt-auto",
            // ↔️
            "text-md",
            "lg:text-lg"
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

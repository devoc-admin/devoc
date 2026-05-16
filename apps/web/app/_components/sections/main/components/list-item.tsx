import { cn } from "@/lib/utils";
import { SupNumber } from "./sup-number";

export function ListItem({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "flex",
        "border-t group-last-of-type:border-b",
        "bg-linear-to-r from-transparent to-transparent",
        "hover:via-foreground-dark/5",
        "transition-colors",
        "items-start justify-between",
        // ↔️
        "flex-col gap-5 px-2 py-6",
        "md:flex-row md:gap-8 md:px-6 md:py-12"
      )}
      style={{
        borderImage:
          "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1",
      }}
    >
      <SupNumber
        className="pt-1 text-[0.6rem] text-foreground-dark/60"
        prefix="#  "
      >
        {index}
      </SupNumber>
      <div
        className={cn(
          "max-w-[18ch] font-fraunces text-foreground-dark leading-[1.15]!",
          // ↔️
          "text-2xl",
          "sm:text-3xl",
          "md:text-2xl",
          "lg:text-2xl",
          "xl:text-3xl"
        )}
      >
        {title}
      </div>
      <p
        className={cn(
          "text-foreground-dark/50",
          // ↔️
          "max-w-[50ch] text-sm",
          "sm:max-w-[50ch] sm:text-base",
          "md:max-w-[50ch] md:text-sm",
          "lg:max-w-[50ch] lg:text-sm",
          "xl:max-w-[60ch] xl:text-base"
        )}
      >
        {description}
      </p>
    </div>
  );
}

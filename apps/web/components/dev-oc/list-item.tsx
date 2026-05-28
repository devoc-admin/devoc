import { cn } from "@/lib/utils";
import { SupNumber } from "./sup-number";

export function ListItem({
  index,
  title,
  description,
  variant = "dark",
}: {
  index: number;
  title: string;
  description: string;
  variant: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex",
        "border-t group-last-of-type:border-b",
        "bg-linear-to-r from-transparent to-transparent",
        "transition-colors",
        "items-start",
        // ↔️
        "flex-col gap-5",
        "md:flex-row md:gap-8",
        "px-2 py-6",
        "md:px-6 md:py-12",
        // 🌙☀️
        variant === "dark" && "hover:via-foreground-dark/5",
        variant === "light" && "hover:via-foreground/2"
      )}
      style={{
        borderImage:
          variant === "dark"
            ? // 🌙
              "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1"
            : // ☀️
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 10%, transparent) 20%,  color-mix(in oklab, var(--foreground) 10%, transparent) 80%, transparent) 1",
      }}
    >
      <SupNumber
        className={cn(
          "pt-1 text-[0.6rem]",
          variant === "dark" && "text-foreground-dark/60",
          variant === "light" && "font-bold text-foreground/50"
        )}
        prefix="#  "
      >
        {index}
      </SupNumber>
      <div
        className={cn(
          "font-fraunces leading-[1.15]!",
          "grow",
          // ↔️
          "text-2xl",
          "sm:text-3xl",
          "md:text-2xl",
          "lg:text-2xl",
          "xl:text-3xl",
          // 🌙☀️
          variant === "dark" && "text-foreground-dark",
          variant === "light" && "font-medium text-foreground"
        )}
      >
        {title}
      </div>
      <p
        className={cn(
          // ↔️
          "max-w-[50ch] text-sm",
          "sm:max-w-[50ch] sm:text-base",
          "md:max-w-[50ch] md:text-sm",
          "lg:max-w-[50ch] lg:text-sm",
          "xl:max-w-[60ch] xl:text-base",
          // 🌙☀️
          variant === "dark" && "text-foreground-dark/50",
          variant === "light" && "text-foreground/60"
        )}
      >
        {description}
      </p>
    </div>
  );
}

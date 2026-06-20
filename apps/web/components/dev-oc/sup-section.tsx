import { cn } from "@/lib/utils";
import { SupNumber } from "./sup-number";
export function SupSection({
  number,
  children,
  variant = "dark",
}: {
  number: number;
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <div className="flex items-center gap-x-2">
      <SupNumber className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-semibold text-transparent">
        {number}
      </SupNumber>
      <div
        className={cn(
          "h-px w-8",
          variant === "dark" && "bg-foreground-dark/30",
          variant === "light" && "bg-foreground/30"
        )}
      />
      <span
        className={cn(
          "font-geist-mono uppercase tracking-[0.15rem]",
          // ↔️
          "text-[0.6rem]",
          "xs:text-[0.6rem]",
          "sm:text-[0.7rem]",
          "md:text-[0.7rem]",
          "lg:text-[0.7rem]",
          "xl:text-[0.7rem]",
          "2xl:text-[0.7rem]",
          //🌙☀️
          variant === "dark" && "font-normal text-foreground-dark/60",
          variant === "light" && "font-semibold text-foreground/60"
        )}
      >
        {children}
      </span>
    </div>
  );
}

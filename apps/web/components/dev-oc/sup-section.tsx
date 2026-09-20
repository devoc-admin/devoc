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
      <CustomNumber>{number}</CustomNumber>
      <Separator variant={variant} />
      <Title variant={variant}>{children}</Title>
    </div>
  );
}

// 🔢
function CustomNumber({ children }: { children: number }) {
  return (
    <SupNumber className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-semibold text-[0.85rem] text-transparent">
      {children}
    </SupNumber>
  );
}

// ―
function Separator({ variant }: { variant: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "h-px w-8",
        variant === "dark" && "bg-foreground-dark/30",
        variant === "light" && "bg-foreground/30"
      )}
    />
  );
}

// 🆎
function Title({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "font-geist-mono uppercase tracking-[0.15rem]",
        // ↔️
        "text-[0.85rem]",
        "xs:text-[0.85rem]",
        "sm:text-[0.85rem]",
        "md:text-[0.85rem]",
        "lg:text-[0.85rem]",
        "xl:text-[0.85rem]",
        "2xl:text-[0.85rem]",
        //🌙☀️
        variant === "dark" && "font-normal text-foreground-dark/60",
        variant === "light" && "font-semibold text-foreground/60"
      )}
    >
      {children}
    </span>
  );
}

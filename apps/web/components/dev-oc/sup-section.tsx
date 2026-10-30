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
    <SupNumber className="from-orange-red to-primary-lighter bg-linear-to-r bg-clip-text text-[0.85rem] font-semibold text-transparent">
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
        "font-geist-mono tracking-[0.15rem] uppercase",
        // ↔️
        "text-[0.85rem]",
        "xs:text-[0.85rem]",
        "sm:text-[0.85rem]",
        "md:text-[0.85rem]",
        "lg:text-[0.85rem]",
        "xl:text-[0.85rem]",
        "2xl:text-[0.85rem]",
        //🌙☀️
        variant === "dark" && "text-foreground-dark/60 font-normal",
        variant === "light" && "text-foreground/60 font-semibold"
      )}
    >
      {children}
    </span>
  );
}

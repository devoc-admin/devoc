import { ArrowUpRightIcon, CheckIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brick({
  variant,
  children,
}: {
  variant: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-t group-last-of-type:border-b",
        "transition-colors",
        "grid grid-cols-12 gap-x-24",
        // ↔️
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
      {children}
    </div>
  );
}

export function BrickNumber({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid size-12 place-items-center rounded-full border-2 border-primary-strong bg-primary-strong/5 font-fraunces font-semibold text-2xl text-primary-strong">
      {children}
    </div>
  );
}
export function BrickDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-geist text-foreground/50 text-lg leading-snug">
      {children}
    </p>
  );
}

export function BrickTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-fraunces font-semibold text-5xl text-foreground leading-none!">
      {children}
    </h3>
  );
}

export function GuaranteesTitle() {
  return (
    <h4 className="font-geist-mono font-semibold text-foreground/40 text-xs uppercase tracking-[0.15rem]">
      Vos garanties
    </h4>
  );
}

export function GuaranteeItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-x-4">
      {/* ✅ */}
      <div className="mt-[3px] grid place-items-center rounded-full bg-primary-strong p-1">
        <CheckIcon className="text-white" size={12} strokeWidth={3} />
      </div>
      {/* 🔤 */}
      <span className="text-base">{children}</span>
    </li>
  );
}

export function SmallCard({
  children,
  title,
  Icon,
}: {
  children: React.ReactNode;
  title: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-foreground/10 p-3">
      <div className="flex items-center gap-x-1.5">
        <Icon className="text-foreground/40" size={14} />
        <span className="font-geist-mono text-[0.63rem] text-foreground/60 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <p className="text-[0.82rem] tracking-tight">{children}</p>
    </div>
  );
}

export function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-x-3">
      {children}
    </div>
  );
}

export function PlusDevOc({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-start gap-x-6",
        "rounded-3xl",
        "border border-primary-strong/50",
        "bg-linear-to-tr from-bg-primary-strong/4 to-primary-strong/7",
        "p-6"
      )}
    >
      {/* 🔠 */}
      <div className="space-y-1">
        <h4
          className={cn(
            "font-geist-mono font-medium",
            "text-primary-strong text-xs uppercase tracking-widest"
          )}
        >
          <span>Le + Dev'Oc</span>
        </h4>
        <p className="font-foreground text-[0.9rem] text-base">{children}</p>
      </div>
      {/* 🖼️ */}
      <div className="text-primary-strong">
        <ArrowUpRightIcon size={22} />
      </div>
    </div>
  );
}

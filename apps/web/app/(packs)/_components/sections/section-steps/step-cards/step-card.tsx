import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "group",
        "h-full",
        "p-6",
        "transition-colors",
        "rounded-3xl",
        "border border-foreground/10 hover:border-primary-strong/60",
        // ↔️
        "space-y-0 p-4",
        "xs:space-y-0 xs:p-4",
        "xl:space-y-6 xl:p-6",
        "2xl:space-y-6 2xl:p-6"
      )}
    >
      {children}
    </div>
  );
}

export function StepCardContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function StepCardNumber({ value }: { value: number }) {
  return (
    <span className="font-geist-mono text-[0.7rem] text-foreground/60 uppercase tracking-widest">
      Étape {value}
    </span>
  );
}

export function StepCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-fraunces font-medium text-2xl transition group-hover:text-primary-strong">
      {children}
    </h4>
  );
}

export function StepCardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-foreground/80 text-sm">{children}</p>;
}

export function StepCardIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "grid place-items-center",
        "rounded-full",
        "transition-colors",
        "border border-foreground/20 group-hover:border-primary-strong/60",
        "bg-foreground/2 group-hover:bg-primary-strong/5",
        "p-2"
      )}
    >
      <Icon
        className="text-foreground/60 transition group-hover:text-primary-strong"
        size={18}
      />
    </div>
  );
}

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "group",
        "h-full",
        "space-y-6",
        "p-6",
        "transition",
        "rounded-3xl",
        "border border-foreground/10 hover:border-primary-strong/60"
      )}
    >
      {children}
    </div>
  );
}

export function StepCardContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
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

export function StepCardNumber({ value }: { value: number }) {
  return (
    <span className="font-geist-mono text-[0.7rem] text-foreground/60 uppercase tracking-widest">
      Étape {value}
    </span>
  );
}

export function StepCardIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "place grid place-items-center",
        "rounded-full",
        "transition",
        "border border-foreground/20 group-hover:border-primary-strong/60",
        "bg-foreground/2 group-hover:bg-primary-strong/10",
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

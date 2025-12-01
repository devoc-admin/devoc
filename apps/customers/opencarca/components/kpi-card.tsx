import { cn } from "@/lib/utils";

export function KpiCard({
  title,
  value,
  subtitle,
  className,
}: {
  title: string;
  value: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-xs backdrop-blur-sm",
        className
      )}
    >
      <div className="text-muted-foreground text-sm">{title}</div>
      <div className="mt-2 font-bold font-kanit text-5xl text-foreground">
        {value}
      </div>
      {subtitle ? (
        <div className="mt-3 text-muted-foreground">{subtitle}</div>
      ) : null}
    </div>
  );
}

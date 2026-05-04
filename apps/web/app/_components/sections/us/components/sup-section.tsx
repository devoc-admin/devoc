import { cn } from "@/lib/utils";

export function SupSection({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex items-center gap-x-2">
      <span
        className={cn(
          "font-geist-mono font-semibold text-[0.7rem] text-xs tracking-[.15rem]",
          "bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent"
        )}
      >
        {number.toString().padStart(2, "0")}
      </span>
      <div className="h-px w-8 bg-foreground-dark/30" />
      <span className="font-geist-mono text-[0.7rem] text-foreground-dark/60 uppercase tracking-[0.15rem]">
        {children}
      </span>
    </div>
  );
}

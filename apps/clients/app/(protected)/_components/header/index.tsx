import { cn } from "cn";

export function Header({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-header-background text-header-foreground",
        "p-6",
        "border-border border-b",
        className
      )}
    >
      Header
    </div>
  );
}

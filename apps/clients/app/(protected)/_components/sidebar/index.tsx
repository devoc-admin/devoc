import { cn } from "cn";

export function Sidenav({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-sidebar-background text-sidebar-foreground",
        "p-6",
        "border-border border-r",
        className
      )}
    >
      Sidenav
    </div>
  );
}

import { cn } from "@/lib/utils";

export function LI({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-x-3">
      <div
        className={cn(
          "bg-foreground-dark/20 mt-2.5 h-px min-w-4",
          // ↔️
          "hidden",
          "sm:inline-flex"
        )}
      />
      <div
        className={cn(
          "flex gap-x-1",
          // ↔️
          "flex-col",
          "sm:inline"
        )}
      >
        <span className="text-foreground-dark/85 text-nowrap empty:hidden">
          {label}
        </span>
        <span
          className={cn(
            // ↔️
            "hidden",
            label && "sm:inline"
          )}
        >
          {" "}
          :{" "}
        </span>
        <span className="text-foreground-dark/50">{children}</span>
      </div>
    </li>
  );
}

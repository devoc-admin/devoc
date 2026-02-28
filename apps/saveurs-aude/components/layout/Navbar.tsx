import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <div
      className={cn(
        "flex items-center gap-x-4",
        "py-2",
        "w-full",
        "bg-primary",
        "text-primary-foreground"
      )}
    >
      Navbar
    </div>
  );
}

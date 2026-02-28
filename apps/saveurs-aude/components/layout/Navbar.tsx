import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <div
      className={cn(
        "flex gap-x-4",
        "w-full",
        "bg-primary",
        "text-primary-foreground"
      )}
    >
      Navbar
    </div>
  );
}

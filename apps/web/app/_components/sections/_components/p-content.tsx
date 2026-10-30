import { cn } from "@/lib/utils";

export function PContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-geist text-foreground-dark/75 max-w-[60ch]",
        // ↔️
        "text-xl lg:text-2xl",
        className
      )}
    >
      {children}
    </p>
  );
}

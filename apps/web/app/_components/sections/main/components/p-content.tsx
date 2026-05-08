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
        "max-w-[60ch] font-geist text-foreground-dark/60",
        // ↔️
        "text-base",
        "xs:text-base",
        "sm:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

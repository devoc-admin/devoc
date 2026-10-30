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
        "font-geist text-foreground/60 max-w-[60ch] font-medium",
        // ↔️
        // "text-base",
        // "xs:text-base",
        // "sm:text-lg",
        // "md:text-lg",
        // "lg:text-lg",
        // "xl:text-lg",
        "2xl:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

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
        className
      )}
    >
      {children}
    </p>
  );
}

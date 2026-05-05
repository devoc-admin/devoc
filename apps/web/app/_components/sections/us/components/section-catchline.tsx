import { cn } from "@/lib/utils";

export function SectionCatchline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("w-110 font-fraunces font-light text-6xl", className)}>
      {children}
    </h3>
  );
}

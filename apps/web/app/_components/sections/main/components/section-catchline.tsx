import { cn } from "@/lib/utils";

export function SectionCatchline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-fraunces font-light",
        "max-w-[20ch]",
        "text-balance",
        // ↔️
        "text-4xl",
        "xs:text-4xl",
        "sm:text-5xl",
        "md:text-5xl",
        "lg:text-5xl",
        "xl:text-6xl",
        "2xl:text-6xl",
        className
      )}
    >
      {children}
    </h3>
  );
}

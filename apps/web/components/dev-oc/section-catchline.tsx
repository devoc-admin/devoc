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
        "font-fraunces",
        "max-w-[20ch]",
        "text-balance",
        // ↔️
        "font-medium text-4xl",
        "xs:font-medium xs:text-4xl",
        "sm:font-light sm:text-5xl",
        "md:font-light md:text-5xl",
        "lg:font-light lg:text-5xl",
        "xl:font-light xl:text-6xl",
        "2xl:font-light 2xl:text-7xl",
        className
      )}
    >
      {children}
    </h3>
  );
}

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
        "max-w-[13ch]",
        "text-balance",
        // ↔️
        "font-medium text-[2.6rem] leading-none",
        "xs:font-medium xs:text-5xl",
        "sm:font-light sm:text-6xl",
        "md:font-light md:text-5xl",
        "lg:font-light lg:text-6xl",
        "xl:font-light xl:text-7xl",
        "2xl:font-light 2xl:text-7xl",
        className
      )}
    >
      {children}
    </h3>
  );
}

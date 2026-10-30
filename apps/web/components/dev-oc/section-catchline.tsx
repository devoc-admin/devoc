import { cn } from "@/lib/utils";

export function SectionCatchline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-fraunces",
        "max-w-[13ch]",
        "text-balance",
        // ↔️
        "text-[2.6rem] leading-none font-medium",
        "sm:text-5xl sm:font-light",
        "md:text-5xl md:font-light",
        "lg:text-6xl lg:font-light",
        "xl:text-[3.5rem] xl:font-light",
        "2xl:text-7xl 2xl:font-light",
        className
      )}
    >
      {children}
    </h2>
  );
}

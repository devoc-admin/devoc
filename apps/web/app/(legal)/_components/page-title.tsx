import { cn } from "@/lib/utils";

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "text-balance font-fraunces font-normal text-white leading-[0.9]!",
        // ↔️
        "text-left text-5xl",
        "xs:text-left xs:text-5xl",
        "sm:text-left sm:text-6xl",
        "md:text-left md:text-7xl",
        "lg:text-right lg:text-7xl",
        "xl:text-right xl:text-8xl",
        "2xl:text-right 2xl:text-8xl"
      )}
    >
      {children}
    </h1>
  );
}

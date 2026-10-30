import { cn } from "@/lib/utils";

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "font-fraunces leading-[0.9]! font-normal text-balance text-white",
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

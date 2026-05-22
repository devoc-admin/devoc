import { cn } from "@/lib/utils";

export function PIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "max-w-[60ch] text-balance font-fraunces text-foreground-dark",
        // ↔️
        "text-xl",
        "xs:text-xl",
        "sm:text-2xl",
        "md:text-2xl",
        "lg:text-2xl",
        "xl:text-3xl",
        "2xl:text-3xl"
      )}
    >
      {children}
    </p>
  );
}

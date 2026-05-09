import { cn } from "@/lib/utils";

export function PIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-fraunces",
        "max-w-[50ch]",
        // ↔️
        "text-lg",
        "xs:text-lg",
        "sm:text-xl",
        "md:text-xl",
        "lg:text-xl",
        "xl:text-2xl",
        "2xl:text-3xl"
      )}
    >
      {children}
    </p>
  );
}

import { cn } from "@/lib/utils";

export function PIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-fraunces",
        "max-w-[40ch]",
        // ↔️
        "text-2xl md:text-3xl lg:text-4xl"
      )}
    >
      {children}
    </p>
  );
}

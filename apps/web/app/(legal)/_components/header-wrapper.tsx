import { cn } from "@/lib/utils";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-x-6 pr-[10%]",
        // ↔️
        "flex-col gap-y-4",
        "xs:flex-col xs:gap-y-4",
        "sm:flex-col sm:gap-y-4",
        "md:flex-col md:gap-y-4",
        "lg:flex-row lg:gap-y-0",
        "xl:flex-row xl:gap-y-0",
        "2xl:flex-row 2xl:gap-y-0"
      )}
    >
      {children}
    </div>
  );
}

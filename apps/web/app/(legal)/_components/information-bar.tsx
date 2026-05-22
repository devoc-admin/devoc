import { cn } from "@/lib/utils";
export function InformationBar({
  informationBarItems,
}: {
  informationBarItems: { type: string; value: string; id: string }[];
}) {
  return (
    <div>
      <div className="h-px bg-linear-to-r from-transparent via-foreground-dark/20 to-transparent" />
      <div
        className={cn(
          "flex gap-x-10", // ↔️
          "flex-col items-start gap-y-1.5 py-6 pl-2",
          "xs:flex-col xs:items-start xs:gap-y-1.5 xs:py-6 xs:pl-2",
          "sm:flex-row sm:items-start sm:gap-y-1.5 sm:py-6 sm:pl-2",
          "md:flex-row md:items-start md:gap-y-1.5 md:py-6 md:pl-2",
          "lg:flex-row lg:items-start lg:gap-y-1.5 lg:py-6 lg:pl-2",
          "xl:flex-row xl:items-start xl:gap-y-1.5 xl:py-6 xl:pl-2",
          "2xl:flex-row 2xl:py-8"
        )}
      >
        {informationBarItems.map(({ id, ...props }) => (
          <InformationItem key={id} {...props} />
        ))}
      </div>
      <div
        className="h-px"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent)",
        }}
      />
    </div>
  );
}

function InformationItem({ type, value }: { type: string; value: string }) {
  return (
    <div
      className={cn(
        "flex items-center text-[0.7rem]",
        // ↔️
        "gap-x-2",
        "xs:gap-x-3",
        "sm:gap-x-3",
        "md:gap-x-3",
        "lg:gap-x-3",
        "xl:gap-x-3",
        "2xl:gap-x-3"
      )}
    >
      <span className="font-geist-mono font-thin text-foreground-dark/40 uppercase tracking-[0.18em]">
        {type}
      </span>
      <span className="text-[0.82rem] text-foreground-dark">{value}</span>
    </div>
  );
}

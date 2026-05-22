import { cn } from "@/lib/utils";

export function ListItems({
  items,
}: {
  items: { content: React.ReactNode; id: string; title: string }[];
}) {
  return (
    <div
      className={cn(
        "text-foreground-dark",
        // ↔️
        "flex flex-col",
        "2xl:grid 2xl:grid-cols-2"
      )}
    >
      {items.map(({ content, title, id }) => (
        <div
          className={cn(
            // ↔️
            "2xl:col-span-full 2xl:grid 2xl:grid-cols-subgrid"
          )}
        >
          <div
            className="col-span-full h-px"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent)",
            }}
          />
          <div
            className={cn(
              // ↔️
              "space-y-6 py-12",
              "2xl:col-span-full 2xl:grid 2xl:grid-cols-subgrid 2xl:py-16"
            )}
            key={id}
          >
            <h3 className="font-fraunces text-3xl">{title}</h3>
            <div
              className={cn("space-y-4 text-[0.93rem] text-foreground-dark/60")}
            >
              {content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

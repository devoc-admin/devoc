import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div
      className={cn(
        "space-y-8",
        "max-w-6xl",
        "mx-auto",
        "px-4 py-8",
        "sm:px-6"
      )}
    >
      {/* 🆎 */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </div>

      {/* 🔍 */}
      <div className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              className="h-8 w-30 animate-pulse rounded-full bg-muted"
              key={i}
            />
          ))}
        </div>
      </div>

      {/* 🪴🪴🪴 */}
      <div
        className={cn(
          "grid",
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "gap-4 sm:gap-6"
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="space-y-3" key={i}>
            <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

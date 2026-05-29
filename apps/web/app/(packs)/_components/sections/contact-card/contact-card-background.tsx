import { cn } from "@/lib/utils";

export function ContactCardBackground() {
  return (
    <div className="absolute inset-0 size-full opacity-30">
      {/* 🟡 */}
      <div
        className={cn(
          "absolute bottom-0 left-0",
          "aspect-square h-[80%]",
          "rounded-full",
          "-translate-x-1/2 translate-y-1/2",
          "bg-radial from-primary-strong to-80% to-transparent",
          "blur-2xl"
        )}
      />
      {/* 🟠 */}
      <div
        className={cn(
          "absolute top-0 right-0",
          "aspect-square h-full",
          "translate-x-1/4 -translate-y-1/4",
          "rounded-full",
          "bg-radial from-primary-strong to-80% to-transparent",
          "blur-2xl"
        )}
      />
    </div>
  );
}

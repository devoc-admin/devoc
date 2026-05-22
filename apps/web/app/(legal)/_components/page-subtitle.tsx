import { cn } from "@/lib/utils";

export function PageSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-x-4">
      {/* ― */}
      <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent">
        -
      </span>
      {/* ― */}
      <div className="h-px w-10 bg-foreground-dark/20" />
      {/*🔠*/}
      <div
        className={cn(
          "text-nowrap font-geist-mono text-foreground-dark/60 uppercase leading-normal! tracking-widest",
          // ↔️
          "text-[0.65rem]",
          "xs:text-xs"
        )}
        style={{
          textBoxTrim: "trim-end",
        }}
      >
        {children}
      </div>
    </div>
  );
}

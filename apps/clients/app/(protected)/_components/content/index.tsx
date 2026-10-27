import { cn } from "cn";

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={cn(
        "grow",
        "rounded-md",
        "bg-main-background",
        "px-8 py-10",
        "border"
      )}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.08) 0px 3px 6px 0px, rgba(0, 0, 0, 0.07) 0px 2px 4px 0px",
      }}
    >
      {children}
    </main>
  );
}

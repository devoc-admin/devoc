import { cn } from "@/lib/utils";

export function AuroraText({
  children,
  colors = ["#FFC731", "#FF5709", "#FFC731", "#FF5709"],
  className,
}: {
  children: React.ReactNode;
  colors?: string[];
  className?: string;
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "[animation:aurora-text-background_8s_ease-in-out_infinite_alternate] [background-size:200%_200%]",
        className
      )}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}

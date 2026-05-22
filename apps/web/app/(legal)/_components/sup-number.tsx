import { cn } from "@/lib/utils";

export function SupNumber({
  children,
  prefix,
  className,
}: {
  children: number;
  prefix?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "whitespace-nowrap font-geist-mono text-[0.7rem] text-xs",
        className
      )}
    >
      {prefix}
      <span className="tracking-[.15rem]">
        {children.toString().padStart(2, "0")}
      </span>
    </span>
  );
}

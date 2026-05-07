import { cn } from "@/lib/utils";
import { SupNumber } from "./sup-number";

export function ListItem({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-row items-start justify-between",
        "px-6 py-12",
        "border-t group-last-of-type:border-b",
        "bg-linear-to-r from-transparent to-transparent",
        "hover:via-foreground-dark/5",
        "transition-colors"
      )}
      style={{
        borderImage:
          "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1",
      }}
    >
      <SupNumber className="text-[0.6rem] text-foreground-dark/60" prefix="#  ">
        {index}
      </SupNumber>
      <div className="w-[18ch] font-fraunces text-3xl text-foreground-dark">
        {title}
      </div>
      <p className="max-w-[60ch] text-foreground-dark/50">{description}</p>
    </div>
  );
}

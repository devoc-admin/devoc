import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export const ESTIMATED_OPPORTUNITY: Record<
  Exclude<Prospect["estimatedOpportunity"], null>,
  string
> = {
  medium: "Moyenne",
  strong: "Forte",
  weak: "Faible",
};

export const ESTIMATED_OPPORTUNITY_COLORS: Record<
  Exclude<Prospect["estimatedOpportunity"], null>,
  string
> = {
  medium: "bg-yellow-500/10 text-yellow-500",
  strong: "bg-red-500/10 text-red-500",
  weak: "bg-green-500/10 text-green-500",
};

export function EstimatedOpportunityBadge({
  value,
}: {
  value: Exclude<Prospect["estimatedOpportunity"], null>;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 font-medium text-xs",
        ESTIMATED_OPPORTUNITY_COLORS[value]
      )}
    >
      {ESTIMATED_OPPORTUNITY[value]}
    </span>
  );
}

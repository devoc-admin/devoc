"use client";
import { ChevronDownIcon, LoaderIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Prospect } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";
import {
  ESTIMATED_OPPORTUNITY,
  ESTIMATED_OPPORTUNITY_COLORS,
} from "../buttons/estimated-opportunity-button";

export function EstimatedOpportunitySelect({
  prospectId,
  value,
}: {
  prospectId: number;
  value: Exclude<Prospect["estimatedOpportunity"], null>;
}) {
  const {
    updateEstimatedOpportunityMutate,
    updatingEstimatedOpportunityProspectId,
    isUpdatingEstimatedOpportunity,
  } = useProspectsContext();

  const isPending =
    isUpdatingEstimatedOpportunity &&
    updatingEstimatedOpportunityProspectId === prospectId;

  function handleChange(newValue: string) {
    updateEstimatedOpportunityMutate({
      estimatedOpportunity: newValue as Exclude<
        Prospect["estimatedOpportunity"],
        null
      >,
      prospectId,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-22.5",
            "flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1 font-medium text-xs transition-colors",
            ESTIMATED_OPPORTUNITY_COLORS[value],
            "hover:opacity-80"
          )}
          disabled={isPending}
          type="button"
        >
          {isPending && <LoaderIcon className="size-3 animate-spin" />}
          <span>{ESTIMATED_OPPORTUNITY[value]}</span>
          <ChevronDownIcon className="ml-auto" size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup onValueChange={handleChange} value={value}>
          {(
            Object.keys(ESTIMATED_OPPORTUNITY) as Exclude<
              Prospect["estimatedOpportunity"],
              null
            >[]
          ).map((opportunity) => (
            <DropdownMenuRadioItem key={opportunity} value={opportunity}>
              {ESTIMATED_OPPORTUNITY[opportunity]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

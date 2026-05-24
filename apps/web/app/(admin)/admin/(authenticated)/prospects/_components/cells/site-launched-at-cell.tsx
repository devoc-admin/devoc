"use client";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";

export function SiteLaunchedAtCell({
  prospectId,
  value,
}: {
  prospectId: number;
  value: string | null;
}) {
  const {
    updateSiteLaunchedAtMutate,
    updatingSiteLaunchedAtProspectId,
    isUpdatingSiteLaunchedAt,
  } = useProspectsContext();

  const isPending =
    isUpdatingSiteLaunchedAt && updatingSiteLaunchedAtProspectId === prospectId;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value.trim() || null;
    if (next === (value ?? null)) return;
    updateSiteLaunchedAtMutate({ prospectId, siteLaunchedAt: next });
  }

  return (
    <div className="flex items-center gap-x-1.5">
      <input
        className={cn(
          "h-8 w-36 cursor-pointer rounded-md border bg-transparent px-2 text-sm",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isPending && "opacity-60"
        )}
        disabled={isPending}
        onChange={handleChange}
        type="date"
        value={value ?? ""}
      />
      {isPending && <LoaderIcon className="size-3 animate-spin" />}
    </div>
  );
}

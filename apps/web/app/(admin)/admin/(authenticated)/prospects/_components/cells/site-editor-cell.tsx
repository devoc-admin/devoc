"use client";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";

export function SiteEditorCell({
  prospectId,
  value,
}: {
  prospectId: number;
  value: string | null;
}) {
  const {
    updateSiteEditorMutate,
    updatingSiteEditorProspectId,
    isUpdatingSiteEditor,
  } = useProspectsContext();
  const [draft, setDraft] = useState(value ?? "");

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  const isPending =
    isUpdatingSiteEditor && updatingSiteEditorProspectId === prospectId;

  function commit() {
    const next = draft.trim() || null;
    if (next === (value ?? null)) return;
    updateSiteEditorMutate({ prospectId, siteEditor: next });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    } else if (event.key === "Escape") {
      setDraft(value ?? "");
      event.currentTarget.blur();
    }
  }

  return (
    <div className="flex items-center gap-x-1.5">
      <input
        className={cn(
          "h-8 w-40 rounded-md border bg-transparent px-2 text-sm",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isPending && "opacity-60"
        )}
        disabled={isPending}
        onBlur={commit}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="—"
        value={draft}
      />
      {isPending && <LoaderIcon className="size-3 animate-spin" />}
    </div>
  );
}

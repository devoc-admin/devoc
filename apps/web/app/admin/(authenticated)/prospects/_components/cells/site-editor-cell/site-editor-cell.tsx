"use client";
import { ExternalLinkIcon, LoaderIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../../prospects-context";
import { EditorCombobox } from "../../combobox/editor/editor-combobox";

export function SiteEditorCell({
  prospectId,
  value,
  url,
}: {
  prospectId: number;
  value: string | null;
  url: string | null;
}) {
  const {
    updateSiteEditorMutate,
    updatingSiteEditorProspectId,
    isUpdatingSiteEditor,
  } = useProspectsContext();

  const [isEditing, setIsEditing] = useState(false);

  //⏳
  const isPending =
    isUpdatingSiteEditor && updatingSiteEditorProspectId === prospectId;

  function handleCommit(next: string) {
    setIsEditing(false);
    const trimmed = next.trim() || null;
    if (trimmed === (value ?? null)) return;
    updateSiteEditorMutate({ prospectId, siteEditor: trimmed });
  }

  if (isEditing) {
    return (
      <EditorCombobox
        autoFocus
        className="w-48"
        closeCallback={() => setIsEditing(false)}
        inputClassName="h-8"
        onCommit={handleCommit}
        value={value ?? ""}
      />
    );
  }

  return (
    <div className="flex w-48 items-center gap-x-1.5">
      <SiteEditorDisplay url={url} value={value} />
      <EditButton isPending={isPending} onClick={() => setIsEditing(true)} />
    </div>
  );
}

function EditButton({
  isPending,
  onClick,
}: {
  isPending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label="Modifier l'éditeur"
      className={cn(
        "cursor-pointer",
        "rounded-md",
        "p-1",
        "text-muted-foreground",
        "hover:bg-accent hover:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )}
      disabled={isPending}
      onClick={onClick}
      type="button"
    >
      {isPending ? (
        <LoaderIcon className="size-3 animate-spin" />
      ) : (
        <PencilIcon className="size-3" />
      )}
    </button>
  );
}

function SiteEditorDisplay({
  url,
  value,
}: {
  url: string | null;
  value: string | null;
}) {
  if (!value) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }
  if (url) {
    return (
      <a
        className="flex items-center gap-x-1 truncate text-blue-500 text-sm hover:underline"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="truncate">{value}</span>
        <ExternalLinkIcon className="shrink-0" size={12} />
      </a>
    );
  }
  return <span className="truncate text-sm">{value}</span>;
}

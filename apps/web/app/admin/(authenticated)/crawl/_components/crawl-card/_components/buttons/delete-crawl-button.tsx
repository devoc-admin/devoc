"use client";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useCrawlContext } from "../../../../crawl-context";
import { useCrawlCardContext } from "../../crawl-card-context";
export function DeleteCrawlButton() {
  const { crawl } = useCrawlCardContext();

  const {
    crawlDeletionIsPending,
    deleteCrawlMutate,
    deletingCrawlId,
    lockActions,
  } = useCrawlContext();
  const [open, setOpen] = useState(false);

  if (!crawl) return null;

  const isPending = crawlDeletionIsPending && deletingCrawlId === crawl.id;

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            "flex basis-1/3 cursor-pointer items-center justify-center gap-x-2",
            "rounded-md",
            "py-3",
            "h-11",
            "bg-destructive hover:bg-red-500 dark:bg-destructive/60",
            "text-primary-foreground dark:text-white",
            "text-center font-semibold text-sm",
            "transition-colors",
            (lockActions || open) && "opacity-50"
          )}
          disabled={lockActions || open}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
          type="button"
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" size={16} strokeWidth={2} />
          ) : (
            <Trash2Icon size={16} strokeWidth={2} />
          )}
          <span>Supprimer</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer ce crawl ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le crawl et toutes ses données seront
            supprimés définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              deleteCrawlMutate(crawl.id);
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

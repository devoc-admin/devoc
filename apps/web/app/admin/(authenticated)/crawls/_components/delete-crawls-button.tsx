"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCrawlsContext } from "../crawls-context";

export function DeleteCrawlsButton() {
  const {
    deleteAllCrawlsMutate,
    allCrawlsDeletionIsPending,
    allCrawlsDeletionIsError,
    allCrawlsDeletionIsSuccess,
    lockActions,
  } = useCrawlsContext();
  const [open, setOpen] = useState(false);

  // 🍞 Toast actions
  useEffect(() => {
    if (allCrawlsDeletionIsSuccess) {
      toast.success("Tous les crawls ont été supprimés avec succès !");
    }

    if (allCrawlsDeletionIsError) {
      toast.error("Une erreur est survenue lors de la suppression des crawls.");
    }
  }, [allCrawlsDeletionIsError, allCrawlsDeletionIsSuccess]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <DeleteButton
          disabled={open || lockActions}
          loading={allCrawlsDeletionIsPending}
          onClick={() => setOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer tous les crawls ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Tous les crawls seront supprimés
            définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={allCrawlsDeletionIsPending}
            onClick={(e) => {
              e.preventDefault(); // Prevent default close behavior
              setOpen(false);
              deleteAllCrawlsMutate();
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ----------------------------------------
function DeleteButton({ ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        "w-full",
        "gap-x-2 font-semibold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        props.disabled && "pointer-events-none"
      )}
      disabled={props.disabled}
      size="lg"
      variant="destructive"
    >
      <span>Effacer tous les crawls</span>
    </Button>
  );
}

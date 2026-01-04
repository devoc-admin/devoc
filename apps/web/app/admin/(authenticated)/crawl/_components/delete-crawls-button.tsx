"use client";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCrawlContext } from "@/app/admin/(authenticated)/crawl/crawl-context";
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

export function DeleteCrawlsButton() {
  const {
    deleteAllCrawlsMutate,
    allCrawlsDeletionIsPending,
    allCrawlsDeletionIsError,
    allCrawlsDeletionIsSuccess,
  } = useCrawlContext();
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
        <ButtonTrigger
          disabled={open || allCrawlsDeletionIsPending}
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
function ButtonTrigger({ ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        "absolute right-4 bottom-4 gap-x-2",
        props.disabled && "pointer-events-none"
      )}
      disabled={props.disabled}
      variant="destructive"
    >
      {props.loading ? <LoaderIcon className="animate-spin" /> : <Trash2Icon />}
      <span>Effacer tous les crawls</span>
    </Button>
  );
}

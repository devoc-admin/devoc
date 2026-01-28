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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useProspectsContext } from "../../prospects-context";

export function DeleteProspectButton({ prospectId }: { prospectId: number }) {
  const { deleteProspectMutate, deletingProspectId, isDeletingProspect } =
    useProspectsContext();
  const [open, setOpen] = useState(false);

  const isPending = isDeletingProspect && deletingProspectId === prospectId;

  return (
    <AlertDialog open={open}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <button
              className={cn(
                "rounded-full p-2 transition-colors",
                "cursor-pointer text-red-500",
                "hover:bg-red-500/10",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              disabled={isPending}
              onClick={() => setOpen(true)}
              type="button"
            >
              {isPending ? (
                <LoaderIcon
                  className="animate-spin"
                  size={22}
                  strokeWidth={2}
                />
              ) : (
                <Trash2Icon size={16} strokeWidth={2} />
              )}
            </button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Supprimer ce prospect</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer ce prospect ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le prospect sera supprimé
            définitivement.
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
              deleteProspectMutate(prospectId);
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

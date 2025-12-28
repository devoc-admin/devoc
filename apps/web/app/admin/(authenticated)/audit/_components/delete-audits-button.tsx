"use client";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
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
import { deleteAllAudits } from "../audit-actions";

export function DeleteAuditsButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deleteAllAudits();
    setIsLoading(false);
    if (result.success) {
      setOpen(false);
      toast.success("Tous les audits ont été supprimés avec succès !");
    } else {
      toast.error("Une erreur est survenue lors de la suppression des audits.");
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <ButtonTrigger disabled={open} onClick={() => setOpen(true)} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer tous les audits ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Tous les audits seront supprimés
            définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault(); // Prevent default close behavior
              handleDelete();
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
      className="absolute right-4 bottom-4"
      variant="destructive"
    >
      <Trash2Icon />
      <span>Effacer tous les audits</span>
    </Button>
  );
}

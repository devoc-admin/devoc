"use client";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const projectsPreviews = new Map([
  ["opencarca2025", "https://devoc-opencarca.vercel.app/"],
]);

function ProjetPreviewForm() {
  const [projectPassword, setProjectPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // --------------
  const handleChangeProjectPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectPassword(e.target.value);
    setError(null);
  };

  // --------------
  const handleRedirectProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    // ❌ No password
    if (!projectPassword) {
      setError("Veuillez entrer votre mot de passe de projet.");
      return;
    }

    const projectPreviewExists = projectsPreviews.has(projectPassword);

    // ❌ Invalid password
    if (!projectPreviewExists) {
      setError(
        "Ce projet n'existe pas ou a été supprimé. Vérifiez votre mot de passe."
      );
      setProjectPassword("");
      return;
    }

    const urlToRedirect = projectsPreviews.get(projectPassword);
    if (!urlToRedirect) return;
    try {
      const res = await fetch(urlToRedirect, {
        method: "HEAD",
      });
      if (res.ok) {
        router.push(urlToRedirect);
      } else {
        setError(
          "Ce projet n'existe pas ou a été supprimé. Vérifiez votre mot de passe."
        );
        setProjectPassword("");
      }
    } catch {
      setError("Erreur lors de la vérification du projet.");
      setProjectPassword("");
    }
  };

  return (
    <form
      className="relative flex flex-col items-center justify-center gap-4 px-4"
      onSubmit={handleRedirectProject}
    >
      <div className="w-[300px]">
        <Input
          className="h-12 border-primary bg-white px-4 text-lg! ring-3 ring-white"
          maxLength={15}
          onChange={handleChangeProjectPassword}
          placeholder="Entrez ici votre mot de passe"
          value={projectPassword}
        />
      </div>
      <div
        className={cn(
          "flex items-center gap-2 text-pretty rounded-lg bg-red-50 px-4 py-2 font-kanit text-red-500 leading-tight has-[span:empty]:hidden",
          "flex-col text-center",
          "xs:flex-row xs:text-left"
        )}
      >
        <AlertCircleIcon className="xs:block hidden size-5 shrink-0" />
        <span>{error}</span>
      </div>
      <Button
        className="cursor-pointer bg-linear-to-r from-primary to-primary-lighter font-kanit text-primary-foreground focus:ring-primary/40!"
        size="xl"
        type="submit"
      >
        Accéder à votre projet
      </Button>
    </form>
  );
}

export default ProjetPreviewForm;

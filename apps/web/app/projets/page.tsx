"use client";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Doodle from "../components/doodle";

const urlToRedirect = "https://lasbordes-modern-revamp.vercel.app/";
export default function Page() {
  const [projectPassword, setProjectPassword] = useState<string>("");

  const router = useRouter();

  const handleChangeProjectPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectPassword(e.target.value);
    setError(null);
  };
  const [error, setError] = useState<string | null>(null);

  const handleRedirectProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    if (!projectPassword) {
      setError("Veuillez entrer votre mot de passe de projet.");
      return;
    }

    if (projectPassword !== "lasbordes") {
      setError(
        "Ce projet n'existe pas ou a été supprimé. Vérifiez votre mot de passe."
      );
      setProjectPassword("");
      return;
    }

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="relative flex flex-col items-center justify-center gap-4 px-4"
        onSubmit={handleRedirectProject}
      >
        <h1
          className={cn(
            "relative flex select-none items-center gap-2 leading-none!",
            "text-[5.5rem]",
            "xs:text-8xl",
            "sm:text-9xl"
          )}
        >
          <div className="-z-1 absolute top-1/2 left-1/2 w-full translate-x-[-50%] translate-y-[-50%]">
            <Doodle color="var(--primary)" />
          </div>
          <div className="relative font-bold tracking-tighter">
            <span className="white-letters-border absolute text-transparent">
              Dev'
            </span>
            <AuroraText
              colors={["#FFD166", "#fbbf24", "#f59e0b", "#F48C06"]}
              speed={3}
            >
              Dev'
            </AuroraText>
          </div>
          <div className="white-letters-border relative font-bold text-foreground tracking-tighter">
            Oc
          </div>
        </h1>
        <div
          className={cn(
            "white-letters-border text-center font-bold font-kanit text-xl leading-tight",
            "xs:text-2xl"
          )}
        >
          Pour accéder à votre projet, entrez votre mot de passe
        </div>
        <div className="w-[300px]">
          <Input
            className="h-12 border-primary bg-white px-4 text-lg! ring-3 ring-white"
            maxLength={10}
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
      <BackgroundBeams className="hidden lg:block" />
    </div>
  );
}

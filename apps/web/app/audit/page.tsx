"use client";
import React from "react";
import { checkIfValidUrl } from "@/app/audit/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Audit = () => {
  const [url, setUrl] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url || (url && !checkIfValidUrl(url))) {
      setError("Veuillez entrer une URL valide");
    }
  };

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-y-10">
      {/* 🆎 Rechercher */}
      <h2 className="max-w-[900px] text-pretty text-center font-bold text-5xl leading-tight">
        Entrez l'adresse de votre site pour bénéficier d'un audit gratuit 🎁
      </h2>
      <form
        className="flex w-full flex-col items-center justify-center gap-y-6"
        onSubmit={handleSubmit}
      >
        {/* 🔍 Searchbar */}
        <div className="w-full max-w-150">
          <Input
            className="w-full text-lg!"
            onChange={(e) => {
              setUrl(e.target.value);
              setError(undefined);
            }}
            placeholder="Rechercher..."
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
        {/* 🚀 Button */}
        <Button
          className="cursor-pointer"
          disabled={!url || url.length <= 3}
          name="url"
          size="xl"
          type="submit"
        >
          Lancer l'audit !
        </Button>
      </form>
    </div>
  );
};

export default Audit;

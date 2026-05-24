import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import { Reserver1hGratuit, VoirLesPacks } from "../_components/pack-button";

export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-12 py-24"
      )}
    >
      <PackTitle />
      <div className="flex items-end justify-between gap-x-6">
        <PackDescription />
        <PackButtons />
      </div>
      <Separator />
    </div>
  );
}

function PackTitle() {
  return (
    <h1
      className={cn(
        "font-fraunces font-medium! text-foreground",
        "leading-[0.9]!",
        // ↔️
        "text-[6.5rem]"
      )}
    >
      La transformation{" "}
      <span className="text-foreground/60 italic">numérique</span> de votre
      commune, <CustomGradientText>clé en main</CustomGradientText>
    </h1>
  );
}

function PackButtons() {
  return (
    <div className="mb-2 flex gap-x-4">
      <Reserver1hGratuit />
      <VoirLesPacks />
    </div>
  );
}

function PackDescription() {
  return (
    <p
      className={cn(
        "max-w-[40ch] font-fraunces font-medium",
        "leading-snug!",
        // ↔️
        "text-2xl"
      )}
    >
      Six briques modulaires, trois packs à tarifs encadrés — tous{" "}
      <CustomGradientText>sous le seuil MAPA</CustomGradientText> pour vous
      éviter la lourdeur d'un appel d'offres. Conçu pour les communes de l'Aude,
      en collaboration avec le Réseau des Maisons de l'Innovation.
    </p>
  );
}

function Separator() {
  return (
    <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
  );
}

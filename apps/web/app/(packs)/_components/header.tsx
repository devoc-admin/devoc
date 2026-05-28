"use client";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import {
  BadgeCarcassonne,
  BadgeReferentiels,
  BadgeSouverain,
} from "../_components/badge-header";
import { Reserver1hGratuit, VoirLesPacks } from "../_components/pack-button";
import { Separator } from "./separator";

export function Header() {
  return (
    <div
      className={cn(
        "min-h-screen",
        // ↔️
        "space-y-12 py-24"
      )}
    >
      <FadeUp dir="down">
        <PackTitle />
      </FadeUp>
      <FadeUp delay={0.1} dir="down">
        <div className="flex items-end justify-between gap-x-6">
          <PackDescription />
          <PackButtons />
        </div>
      </FadeUp>
      <Separator />
      <div className="flex items-center justify-between">
        <FadeUp delay={0.2} dir="down">
          <BadgeSouverain />
        </FadeUp>
        <FadeUp delay={0.2} dir="down">
          <BadgeReferentiels />
        </FadeUp>
        <FadeUp delay={0.2} dir="down">
          <BadgeCarcassonne />
        </FadeUp>
      </div>
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
      avec le soutien du Réseau des Maisons de l'Innovation, du Numérique et de
      l'Entrepreunariat de Carcassonne Agglo.
    </p>
  );
}

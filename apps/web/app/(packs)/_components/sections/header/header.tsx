"use client";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import { Reserver1hGratuit, VoirLesPacks } from "../../pack-button";
import { Separator } from "../../separator";
import {
  BadgeCarcassonne,
  BadgeReferentiels,
  BadgeSouverain,
} from "./badge/badge-header";

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
      commune, <CustomGradientText>tout compris</CustomGradientText>
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
    <div className="space-y-2">
      <P>
        Conçu pour{" "}
        <CustomGradientText>les communes de l'Aude</CustomGradientText>, avec le
        soutien du{" "}
        <a href="https://www.rmine.fr/" rel="noopener" target="_blank">
          Réseau des Maisons de l'Innovation, du Numérique et de
          l'Entrepreunariat de Carcassonne Agglo
        </a>
        .
      </P>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "max-w-[40ch] font-fraunces font-medium",
        "leading-snug!",
        // ↔️
        "text-2xl"
      )}
    >
      {children}
    </p>
  );
}

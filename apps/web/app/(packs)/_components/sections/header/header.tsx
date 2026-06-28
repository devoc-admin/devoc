"use client";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";
import { Separator } from "../../separator";
import {
  BadgeCarcassonne,
  BadgeReferentiels,
  BadgeSouverain,
} from "./badge/badge-header";
import { AgirMaintenant, VoirLesPacks } from "./button/pack-button";
import { HighlightText } from "./overlay/highlighted-text";
export function Header() {
  return (
    <div
      className={cn(
        "",
        // ↔️
        "h-auto space-y-8 py-0",
        "xs:h-auto xs:space-y-8 xs:py-0",
        "xl:min-h-screen xl:space-y-12 xl:py-24",
        "2xl:min-h-screen 2xl:space-y-12 2xl:py-24"
      )}
    >
      <FadeUp dir="down">
        <PackTitle />
      </FadeUp>
      <FadeUp delay={0.1} dir="down">
        <DescriptionAndButtons />
      </FadeUp>
      <FadeUp delay={0.2} dir="down">
        <P>
          Conçus pour les communes de l'Aude, avec le soutien du{" "}
          <a href="https://www.rmine.fr/" rel="noopener" target="_blank">
            Réseau des Maisons de l'Innovation de Carcassonne
          </a>
          .
        </P>
      </FadeUp>
      <Separator />
      <div
        className={cn(
          //↔️
          "flex flex-col gap-y-4",
          "xs:flex xs:flex-col xs:gap-y-4",
          "xl:flex xl:flex-row xl:items-center xl:justify-between xl:gap-0",
          "2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-0"
        )}
      >
        <FadeUp delay={0.2} dir="down" disableOnMobile>
          <BadgeSouverain />
        </FadeUp>
        <FadeUp delay={0.2} dir="down" disableOnMobile>
          <BadgeReferentiels />
        </FadeUp>
        <FadeUp delay={0.2} dir="down" disableOnMobile>
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
        "max-w-[15ch]",
        "leading-[0.9]!",
        // ↔️
        "text-[2.35rem]",
        "xs:text-5xl",
        "sm:text-7xl",
        "md:text-7xl",
        "lg:text-8xl",
        "xl:text-[6.5rem]",
        "2xl:text-[7rem]"
      )}
    >
      <CustomGradientText>RGPD, accessibilité,</CustomGradientText>{" "}
      <CustomGradientText>cybersécurité</CustomGradientText> : votre commune
      est-elle <span className="text-foreground/60 italic">protégée</span> ?
    </h1>
  );
}

function DescriptionAndButtons() {
  return (
    <div
      className={cn(
        "flex",
        "justify-between",
        //↔️
        "flex-col items-start gap-6",
        "xs:flex-col xs:items-start xs:gap-6",
        "sm:flex-col sm:items-start sm:gap-6",
        "md:flex-col md:items-start md:gap-6",
        "lg:flex-col lg:items-start lg:gap-6",
        "xl:flex-row xl:items-end xl:gap-20",
        "2xl:flex-row 2xl:items-end 2xl:gap-24"
      )}
    >
      <PackDescription />
      <PackButtons />
    </div>
  );
}

function PackDescription() {
  return (
    <div
      className={cn(
        "space-y-4",
        // ↔️
        "text-base",
        "xs:text-lg",
        "sm:text-lg",
        "md:text-lg",
        "lg:text-lg",
        "xl:text-2xl",
        "2xl:text-2xl"
      )}
    >
      <P>
        Face aux <HighlightText>cyberattaques</HighlightText> et à la{" "}
        <HighlightText>pression réglementaire</HighlightText>, beaucoup de
        communes connaissent des difficultés pour s'adapter à ces changements.
      </P>
      <P>
        Nos solutions <HighlightText>sécurisent votre système</HighlightText> et
        vous assurent de votre <HighlightText>mise en conformité</HighlightText>
        avec les référentiels français et européens.
      </P>
    </div>
  );
}

function PackButtons() {
  return (
    <div
      className={cn(
        "flex",

        // ↔️
        "flex-col gap-3",
        "xs:flex-col gap-3",
        "xl:flex-row xl:gap-4",
        "2xl:flex-row 2xl:gap-4"
      )}
    >
      <AgirMaintenant />
      <VoirLesPacks />
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn("max-w-[40ch] font-fraunces font-medium", "leading-snug!")}
    >
      {children}
    </p>
  );
}

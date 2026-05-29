"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../../p-content";
import { PIntro } from "../../p-intro";
import { Quote } from "../../quote";

export function SectionIntro() {
  return (
    <section
      className={cn(
        "flex",
        // ↔️
        "flex-col gap-y-12",
        "xs:flex-col xs:gap-y-12",
        "sm:flex-col sm:gap-y-12",
        "md:flex-row md:gap-x-12",
        "2xl:flew-row 2xl:gap-x-18"
      )}
    >
      <div
        className={cn(
          // ↔️
          "space-y-6",
          "2xl:space-y-10"
        )}
      >
        <FadeUp disableOnMobile>
          <SupSection number={1} variant="light">
            Contexte
          </SupSection>
        </FadeUp>
        <FadeUp delay={0.1} disableOnMobile>
          <SectionCatchline className="font-normal!">
            Un guichet unique pour votre{" "}
            <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
              offre numérique
            </span>
          </SectionCatchline>
        </FadeUp>
      </div>

      <div
        className={cn(
          // ↔️
          "space-y-8",
          "2xl:grow 2xl:space-y-10"
        )}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <PIntro>
            Vous venez d'être élu ou reconduit et beaucoup de dossiers vont
            solliciter votre énergie ! Parmi eux, la modernisation numérique de
            vos services devrait tenir une place majeure.
          </PIntro>
        </FadeUp>

        <FadeUp delay={0.2} disableOnMobile>
          <PContent>
            Site internet conforme, dématérialisation des procédures, archivage
            numérique, sécurité du système informatique, formation des agents,
            communication efficace : les chantiers sont nombreux, et requièrent
            des compétences techniques fortes dont ne disposent pas la plupart
            des communes.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.3} disableOnMobile>
          <Quote
            author="David Amiel"
            source="Ministre de l'Action et des Comptes publics"
          >
            La souveraineté numérique n'est plus une option.
          </Quote>
        </FadeUp>

        <FadeUp delay={0.4} disableOnMobile>
          <PContent>
            Avec le Réseau des Maisons de l'Innovation, du Numérique et de
            l'Entrepreneuriat de Carcassonne Agglo, nous avons élaboré une offre
            globale et clé en main pour aider les communes de l'Aude et du reste
            de l'Occitanie à réaliser cette transformation numérique exigée par
            les cadres réglementaires français et européens.
          </PContent>
        </FadeUp>
      </div>
    </section>
  );
}

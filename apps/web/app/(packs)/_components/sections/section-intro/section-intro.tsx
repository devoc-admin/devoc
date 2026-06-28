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
        "flex-col gap-y-10",
        "xs:flex-col xs:gap-y-10",
        "sm:flex-col sm:gap-y-12",
        "md:flex-row md:gap-x-12",
        "2xl:flew-row 2xl:gap-x-18"
      )}
    >
      <div
        className={cn(
          // ↔️
          "space-y-6",
          "xs:space-y-6",
          "xl:space-y-10",
          "2xl:space-y-10"
        )}
      >
        <SupSection number={1} variant="light">
          Tout-en-un
        </SupSection>
        <SectionCatchline className="font-normal!">
          Un guichet unique pour toute votre{" "}
          <span className="bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-medium text-transparent italic">
            offre numérique
          </span>
        </SectionCatchline>
      </div>

      <div
        className={cn(
          // ↔️
          "space-y-6",
          "xs:space-y-6",
          "xl:grow xl:space-y-10",
          "2xl:grow 2xl:space-y-10"
        )}
      >
        <FadeUp delay={0.1} disableOnMobile>
          <PIntro>
            Vous venez d'être élu ou reconduit et beaucoup de dossiers vont
            solliciter votre énergie ! Parmi eux, la modernisation de vos
            services numériques devrait tenir une place majeure.
          </PIntro>
        </FadeUp>

        <FadeUp delay={0.2} disableOnMobile>
          <PContent>
            Site internet conforme, dématérialisation des procédures, archivage
            numérique, sécurité du système informatique, technologies
            souveraines, formation des agents, communication efficace : les
            chantiers sont nombreux, et requièrent des compétences techniques
            dont ne disposent pas la plupart des communes.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.4} disableOnMobile>
          <PContent>
            Avec le{" "}
            <a
              className="italic"
              href="https://www.rmine.fr/"
              rel="noopener"
              target="_blank"
            >
              Réseau des Maisons de l'Innovation, du Numérique et de
              l'Entrepreneuriat de Carcassonne Agglo
            </a>
            , nous avons élaboré une offre globale et clé en main pour aider les
            communes de l'Aude et du reste de l'Occitanie à réaliser cette
            transformation numérique attendue par les cadres réglementaires
            français et européens.
          </PContent>
        </FadeUp>

        <FadeUp delay={0.3} disableOnMobile>
          <a
            className="inline-block"
            href="https://www.numerique.gouv.fr/sinformer/espace-presse/souverainete-numerique-reduction-dependances-extra-europeennes/"
            rel="noopener"
            target="_blank"
          >
            <Quote
              author="David Amiel"
              source="Ministre de l'Action et des Comptes publics"
            >
              Nous devons nous désensibiliser des outils américains et reprendre
              le contrôle de notre destin numérique (...) La souveraineté
              numérique n'est plus une option.
            </Quote>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

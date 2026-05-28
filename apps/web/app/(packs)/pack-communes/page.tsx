"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { ListItem } from "@/components/dev-oc/list-item";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { Brick1Website } from "../_components/brick";
import { Header } from "../_components/header";
import { PContent } from "../_components/p-content";
import { PIntro } from "../_components/p-intro";
import { Quote } from "../_components/quote";
import {
  RiskCybersecurity,
  RiskEconomic,
  RiskReglementaire,
} from "../_components/risk-card";
import { Separator } from "../_components/separator";
export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-20"
      )}
    >
      <Header />
      <div className="flex flex-col gap-y-50">
        <SectionIntro />
        <SectionRisques />
        <SectionReasons />
        <SectionBricks />
      </div>
    </div>
  );
}

// ============================================
// 0️⃣
function SectionIntro() {
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

// 1️⃣
function SectionRisques() {
  return (
    <section className="space-y-24">
      <div
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
            <SupSection number={2} variant="light">
              Le coût de l'inaction
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Les risques que vous prenez{" "}
              <span className="font-medium text-foreground/60 italic">
                aujourd'hui
              </span>
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Trois familles de risques s'accumulent quand la dette technologique
            des communes n'est pas traitée : sanctions financières, attaques
            cyber, défiance des administrés. Sans traitement immédiat, la
            fenêtre d'action se referme plus vite qu'on ne le pense.
          </PContent>
        </FadeUp>
      </div>
      <div
        className="grid grid-cols-[1fr_auto] gap-y-12"
        style={{ columnGap: "64px" }}
      >
        <Separator className="col-span-2" />
        <RiskReglementaire />
        <Separator className="col-span-2" />
        <RiskEconomic />
        <Separator className="col-span-2" />
        <RiskCybersecurity />
      </div>
    </section>
  );
}

// 2️⃣
function SectionReasons() {
  return (
    <section className="space-y-24">
      <div
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
            "w-1/2 space-y-6",
            "2xl:space-y-10"
          )}
        >
          <FadeUp disableOnMobile>
            <SupSection number={3} variant="light">
              Pourquoi maintenant
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Cinq raisons d'engager cette transformation{" "}
              <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-medium text-transparent italic">
                dès ce mandat
              </span>
            </SectionCatchline>
          </FadeUp>
        </div>
      </div>
      <div>
        {values.map(({ id, ...props }, index) => (
          <FadeUp
            className="group w-full"
            delay={0.1 * index}
            disableOnMobile
            key={id}
          >
            <ListItem {...props} index={index + 1} variant="light" />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

const values = [
  {
    description:
      "RGPD (protection des données), RGAA (accessibilité numérique), directive NIS2 (cybersécurité), RGESN (éco-conception). Ces textes ne sont pas optionnels — ils s'appliquent à toutes les collectivités, quelle que soit leur taille.",
    id: "reglementations",
    title: "Faire face à la convergence d'obligations réglementaires",
  },
  {
    description:
      "La France renouvelle son parc logiciel pour réduire sa dépendance aux entreprises américaines, en promouvant des alternatives libres ou des suites éditées par l'État. Nous vous aidons à anticiper et à vous aligner sur ces nouveaux standards.",
    id: "souverainete-numerique",
    title: "Regagner sa souveraineté numérique",
  },
  {
    description:
      "Les cyberattaques contre les mairies ont explosé : rançongiciels, phishing, usurpation. Une collectivité sur cinq a subi une attaque en 2023. Coût moyen : 25 000 € par incident — sans compter la paralysie des services et l'atteinte à la confiance.",
    id: "contre-cyberattaques",
    title: "Contrer la prochaine vague de cyberattaques",
  },
  {
    description:
      "Nous dimensionnons vos outils à vos usages réels pour éviter les sur-facturations courantes du secteur. L'automatisation soulage vos agents des corvées administratives et leur permet de se consacrer à des tâches à haute valeur ajoutée.",
    id: "economies",
    title: "Économiser du temps... et de l'argent !",
  },
  {
    description:
      "Résidant entre Carcassonne et Castelnaudary, nous avons à cœur de développer l'attractivité de notre région. Toutes nos offres sont complétées par de la formation en présentiel et un suivi pour assurer la montée en compétences de vos agents.",
    id: "accompagnement-local",
    title: "Bénéficier d'un accompagnement local",
  },
];

// 3️⃣
function SectionBricks() {
  return (
    <section className="space-y-24">
      <div
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
            <SupSection number={4} variant="light">
              Couvrir votre chaîne numérique
            </SupSection>
          </FadeUp>
          <FadeUp delay={0.1} disableOnMobile>
            <SectionCatchline className="font-normal!">
              Six briques{" "}
              <span className="font-medium text-foreground/60 italic">
                complémentaires
              </span>{" "}
              à composer selon vos besoins
            </SectionCatchline>
          </FadeUp>
        </div>

        <FadeUp disableOnMobile>
          <PContent>
            Chaque brique est conçue pour vous rendre{" "}
            <span className="text-foreground">autonome</span>,{" "}
            <span className="text-foreground">conforme</span> et{" "}
            <span className="text-foreground">efficace</span> — sans enfermement
            technologique, sans dépendance, sans surcoût caché.
          </PContent>
        </FadeUp>
      </div>
      <div>
        <Brick1Website />
        <Brick1Website />
        <Brick1Website />
      </div>
    </section>
  );
}

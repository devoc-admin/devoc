"use client";

import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { ListItem } from "@/components/dev-oc/list-item";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";

export function SectionReasons() {
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
        {reasons.map(({ id, ...props }, index) => (
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

const reasons = [
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

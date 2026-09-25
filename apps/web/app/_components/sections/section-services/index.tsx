import {
  WandIcon as AuditIcon,
  BotIcon as AutomatisationIcon,
  GraduationCapIcon as FormationIcon,
  ServerIcon as InfrastructureIcon,
  MonitorIcon as SitesWebIcon,
} from "lucide-react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { cn } from "@/lib/utils";
import { PContent } from "../_components/p-content";
import { PIntro } from "../_components/p-intro";
import { SectionTitle } from "../_components/section-title";
import { VariableFont } from "../_components/variable-font";
import { ServiceCard } from "./service-card";

export function SectionServices() {
  return (
    <Container>
      <HeaderContainer>
        <div className="space-y-12">
          <SectionTitle>
            Nos <br /> services
          </SectionTitle>
          <Subtitle />
        </div>
        <Description />
      </HeaderContainer>

      {/* 🃏🃏🃏 */}
      <Services />
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "mx-auto",
        // ↔️
        "overflow-hidden md:overflow-visible",
        "space-y-14 md:space-y-20 lg:space-y-24"
      )}
    >
      {children}
    </section>
  );
}

// 📦
function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex w-full",
        // ↔️
        "flex-col xl:flex-row",
        "gap-y-12 xl:gap-x-16 2xl:gap-x-20"
      )}
    >
      {children}
    </div>
  );
}

// 🔠
function Subtitle() {
  return (
    <FadeUp disableOnMobile>
      <SectionCatchline className="hidden sm:inline-block">
        Une chaîne de valeur{" "}
        <VariableFont className="text-foreground-dark/60 italic">
          complète
        </VariableFont>{" "}
        de la conception à la livraison
      </SectionCatchline>
    </FadeUp>
  );
}

// 🔤
function Description() {
  return (
    <FadeUp amount={0.5} dir="down" disableOnMobile>
      <div
        className={cn(
          "w-fit max-w-[60ch] space-y-4",
          "md:text-right xl:text-left",
          "md:self-end xl:self-start"
        )}
      >
        <PIntro>
          Plusieurs pôles d'expertise que nous mobilisons selon vos besoins, vos
          délais et votre budget.
        </PIntro>
        <PContent>
          Pas de surcoût ou de dépendance cachée et des services toujours
          dimensionnés à votre usage réel.
        </PContent>
      </div>
    </FadeUp>
  );
}

//📦
function ServicesContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-6">{children}</div>;
}

const services = [
  {
    features: [
      "Versions mobile & tablette",
      "Référencement optimisé",
      "Logo et charte graphique",
    ],
    href: "#",
    Icon: SitesWebIcon,
    subtitle:
      "Identités numériques modernes, rapides, accessibles et pensées pour convertir.",
    title: "Site web",
  },
  {
    features: [
      "Hébergement souverain",
      "Déploiement & monitoring",
      "Sauvegardes",
    ],
    href: "#",
    Icon: InfrastructureIcon,
    subtitle:
      "Des fondations numériques solides et locales tout en conservant le contrôle de vos données.",
    title: "Infrastructure",
  },
  {
    features: [
      "Audit SEO & performance",
      "Conformité RGAA 4.1",
      "Conformité RGPD & RGS",
    ],
    href: "#",
    Icon: AuditIcon,
    subtitle:
      "Audits complets et optimisations ciblées pour la performance, la sécurité et l'accessibilité.",
    title: "Audit & conformité",
  },
  {
    features: ["Intégration de l'IA", "Productivité accrue", "Coûts réduits"],
    href: "#",
    Icon: AutomatisationIcon,
    subtitle:
      "Automatisez les tâches répétitives et libérez du temps pour ce qui compte.",
    title: "Automatisations",
  },
  {
    features: [
      "Formation en présentiel",
      "Support réactif",
      "Maintenance continue",
    ],
    href: "#",
    Icon: FormationIcon,
    subtitle:
      "Formations et accompagnement pour rendre vos équipes autonomes et sereines dans la durée.",
    title: "Formation & support",
  },
];

// 🃏🃏🃏
function Services() {
  return (
    <FadeUp amount={0.2} className="w-full" dir="down" disableOnMobile>
      <ServicesContainer>
        <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-7">
          <ServiceCard {...services[0]} />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5">
          <ServiceCard {...services[1]} />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <ServiceCard {...services[2]} />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-8">
          <ServiceCard {...services[3]} />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-12">
          <ServiceCard {...services[4]} />
        </div>
      </ServicesContainer>
    </FadeUp>
  );
}

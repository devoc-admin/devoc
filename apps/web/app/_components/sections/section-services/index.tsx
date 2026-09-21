import {
  WandIcon as AuditIcon,
  BotIcon as AutomatisationIcon,
  GraduationCapIcon as FormationIcon,
  ServerIcon as InfrastructureIcon,
  MonitorIcon as SitesWebIcon,
} from "lucide-react";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import { cn } from "@/lib/utils";
import { PContent } from "../_components/p-content";
import { ServiceCard } from "./service-card";

export function SectionServices() {
  return (
    <Container>
      {/* 🆎 */}
      <HeaderContainer>
        <Title />
        <Description />
      </HeaderContainer>
      {/* 🃏🃏🃏 */}
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
        "flex-col gap-y-12 2xl:flex-row 2xl:gap-x-42"
      )}
    >
      {children}
    </div>
  );
}

// 🆎
function Title() {
  return (
    <div className="space-y-6 2xl:space-y-10">
      <SupSection number={2}>Nos services</SupSection>
      <SectionCatchline>
        Une chaîne de valeur{" "}
        <span className="font-light text-foreground-dark/60 italic">
          complète
        </span>
        , de la conception à la livraison
      </SectionCatchline>
    </div>
  );
}

// 🔤
function Description() {
  return (
    <div className={cn("w-fit max-w-[70ch] space-y-4", "md:self-end")}>
      <PContent>
        Nous disposons de plusieurs pôles d'expertise complémentaires que nous
        mobilisons à la carte selon vos besoins, vos délais et votre budget.
      </PContent>
      <PContent>
        Avec nous, pas de surcoût caché, pas de dépendance inutile et des
        services toujours dimensionnés à votre usage réel.
      </PContent>
    </div>
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
      "Identités numériques modernes, ultra rapides, accessibles et pensées pour convertir.",
    title: "Site web sur-mesure",
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
      "Des fondations numériques solides et locales pour reprendre le contrôle de vos données.",
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
    title: "Automatisation & IA",
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

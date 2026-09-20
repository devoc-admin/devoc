"use client";
import {
  WandIcon as AuditIcon,
  BotIcon as AutomatisationIcon,
  Scale as ExpertiseIcon,
  GraduationCapIcon as FormationIcon,
  Earth as ImpactIcon,
  ServerIcon as InfrastructureIcon,
  UserCheck as InterlocuteurIcon,
  Award as ReconnaissanceIcon,
  MonitorIcon as SitesWebIcon,
} from "lucide-react";
import Image from "next/image";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { ListItem } from "@/components/dev-oc/list-item";
import { SectionCatchline } from "@/components/dev-oc/section-catchline";
import { SupSection } from "@/components/dev-oc/sup-section";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
import { ContactCard } from "../_components/contact-card";
import { PContent } from "../_components/p-content";
import { ReasonCard } from "../_components/reason-card";
import { ServiceCard } from "../_components/service-card";
import { SectionCollectif } from "../section-collectif";
import { SectionPortraits } from "../section-portraits";
import PhotoGroupe from "./assets/photo-groupe.webp";
import TextureImage from "./assets/texture.webp";

export function Main() {
  return (
    <Container>
      <TopLine />
      <SectionCollectif />
      <SectionPortraits />
      <PortraitGroupe />
      <SectionServices />
      <SectionValues />
      <SectionReasons />
      <ContactCard />
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative z-1",
        "overflow-hidden",
        "bg-background-dark text-white",
        "min-h-400"
      )}
    >
      <TexturedBackground />
      <div
        className={cn(
          "max-w-430",
          "mx-auto",
          // ↔️
          "space-y-14 xs:space-y-14 sm:space-y-20 md:space-y-24 lg:space-y-28 xl:space-y-44 2xl:space-y-52",
          "px-5 md:px-8 lg:px-10 xl:px-14",
          "py-24 sm:py-38 md:py-40 lg:py-48 xl:py-54 2xl:py-62"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TexturedBackground() {
  return (
    <div
      className="absolute inset-0 -z-1 size-full opacity-20"
      style={{ backgroundImage: `url(${TextureImage.src})` }}
    />
  );
}

// ―
function TopLine() {
  return (
    <GlowLine
      className={cn("left-0", "xs:block hidden")}
      color="orange"
      orientation="horizontal"
      position="0px"
    />
  );
}

// 3️⃣📸
function PortraitGroupe() {
  return (
    <div className="space-y-8">
      <FadeUp className="w-full" disableOnMobile>
        <div
          className={cn(
            "relative",
            "aspect-16/7 w-full",
            "rounded-3xl",
            "overflow-hidden",
            "after:absolute after:inset-0 after:size-full after:bg-linear-to-b after:from-transparent after:via-transparent after:to-black/50 after:content-['']",
            // ↔️
            "hidden",
            "xs:hidden",
            "sm:block",
            "md:block"
          )}
        >
          <Image
            alt="Photo de groupe du collectif Dev'Oc travaillant devant un ordinateur"
            className="size-full object-cover"
            height="788"
            src={PhotoGroupe.src}
            width="1206"
          />
        </div>
      </FadeUp>
      <FadeUp disableOnMobile>
        <p
          className={cn(
            "max-w-[34ch]",
            "font-fraunces font-light leading-snug",
            // ↔️
            "text-3xl",
            "xs:text-3xl",
            "sm:text-3xl",
            "md:text-3xl",
            "lg:text-3xl",
            "xl:text-3xl",
            "2xl:text-4xl"
          )}
        >
          Un binôme complémentaire : là où l'un construit la mécanique, l'autre
          soigne l'expérience. Deux regards, une même exigence.
        </p>
      </FadeUp>
    </div>
  );
}

// 4️⃣💁‍♀️🔤
function SectionServices() {
  return (
    <section
      className={cn(
        "mx-auto",
        // ↔️
        "overflow-hidden md:overflow-visible",
        "space-y-14 md:space-y-20 lg:space-y-24"
      )}
    >
      {/* 🔠 */}
      <div
        className={cn(
          "flex w-full",
          // ↔️
          "flex-col gap-y-12",
          "xs:flex-col xs:gap-y-12",
          "sm:flex-col sm:gap-y-12",
          "md:flex-row md:gap-x-12",
          "2xl:flew-row 2xl:gap-x-42"
        )}
      >
        <div
          className={cn(
            // ↔️
            "space-y-6",
            "2xl:space-y-10"
          )}
        >
          <SupSection number={2}>Services</SupSection>
          <SectionCatchline>
            Une chaîne de valeur{" "}
            <span className="font-extralight text-foreground-dark/60 italic">
              complète
            </span>
            , de la conception à l'hébergement.
          </SectionCatchline>
        </div>

        <div className={cn("space-y-10", "md:self-end")}>
          <PContent className="w-fit max-w-[50ch]">
            Cinq pôles d'expertise complémentaires que nous mobilisons à la
            carte selon vos besoins, vos délais et votre budget. Pas de surcoût
            caché, pas de dépendance inutile à une plateforme externe et des
            produits toujours dimensionnés à votre usage.
          </PContent>
        </div>
      </div>
      {/* 🃏🃏🃏 */}
      <div className="grid grid-cols-12 gap-6">
        <div
          className={cn(
            "col-span-12",
            "xs:col-span-12",
            "sm:col-span-6",
            "md:col-span-6",
            "lg:col-span-5",
            "xl:col-span-7",
            "2xl:col-span-7"
          )}
        >
          <ServiceCard {...services[0]} index={1} />
        </div>

        <div
          className={cn(
            "col-span-12",
            "xs:col-span-12",
            "sm:col-span-6",
            "md:col-span-6",
            "lg:col-span-7",
            "xl:col-span-5",
            "2xl:col-span-5"
          )}
        >
          <ServiceCard {...services[1]} index={2} />
        </div>

        <div
          className={cn(
            "col-span-12",
            "xs:col-span-12",
            "sm:col-span-12",
            "md:col-span-12",
            "lg:col-span-12",
            "xl:col-span-4",
            "2xl:col-span-4"
          )}
        >
          <ServiceCard {...services[2]} index={3} />
        </div>

        <div
          className={cn(
            "col-span-12",
            "xs:col-span-12",
            "sm:col-span-6",
            "md:col-span-6",
            "lg:col-span-7",
            "xl:col-span-8",
            "2xl:col-span-8"
          )}
        >
          <ServiceCard {...services[3]} index={4} />
        </div>

        <div
          className={cn(
            "col-span-12",
            "xs:col-span-12",
            "sm:col-span-6",
            "md:col-span-6",
            "lg:col-span-5",
            "xl:col-span-12",
            "2xl:col-span-12"
          )}
        >
          <ServiceCard {...services[4]} index={5} />
        </div>
      </div>
    </section>
  );
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
      "Identités numériques modernes, ultra rapides, accessibles, pensées pour convertir.",
    title: "Sites web sur-mesure",
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

// 5️⃣⭐🔤
function SectionValues() {
  return (
    <section
      className={cn(
        "mx-auto",
        // ↔️
        "space-y-12",
        "lg:space-y-28"
      )}
    >
      {/* 🔠 */}
      <div className="space-y-10">
        <SupSection number={3}>Nos valeurs</SupSection>
        <SectionCatchline>
          Trois{" "}
          <span className="font-extralight text-foreground-dark/60 italic">
            principes
          </span>{" "}
          qui guident chaque décision
        </SectionCatchline>
      </div>
      {/* 🪗🪗🪗 */}
      <div>
        {values.map(({ id, ...props }, index) => (
          <ListItem key={id} variant="dark" {...props} index={index + 1} />
        ))}
      </div>
    </section>
  );
}

const values = [
  {
    description:
      "Les meilleurs projets se construisent en face-à-face. Nous nous déplaçons volontiers dans vos locaux, vos mairies et vos bureaux à travers toute l'Occitanie pour comprendre vos réalités concrètes et vous former à vos outils — sans appliquer mécaniquement la même recette de client en client.",
    id: "proximite",
    title: "Proximité géographique et humaine",
  },
  {
    description:
      "Vos données sont votre patrimoine. Nous privilégions les solutions open source et l'hébergement souverain pour garantir votre indépendance, en vous donnant les moyens de construire votre autonomie par la formation continue et la fourniture de guides d'utilisation de vos outils.",
    id: "autonomie",
    title: "Autonomie et protection des données",
  },
  {
    description:
      "Notre objectif : trouver les meilleures combinaisons technologiques adaptées à vos besoins, à un coût compétitif. Issus du monde professionnel et des grands groupes, nous en importons les méthodes et la rigueur, mises au service des TPE, PME et collectivités locales qui n'ont pas toujours les ressources internes pour faire face à leurs défis techniques.",
    id: "esprit-ingenieur",
    title: "L'esprit ingénieur à votre service",
  },
];

// 6️⃣🤙
function SectionReasons() {
  return (
    <section
      className={cn(
        "mx-auto",
        // ↔️
        "space-y-12",
        "lg:space-y-28"
      )}
    >
      {/* 🔠 */}
      <div className="space-y-10">
        <SupSection number={4}>Pourquoi Dev'Oc</SupSection>
        <SectionCatchline>
          Quatre{" "}
          <span className="font-normal text-foreground-dark/60 italic">
            raisons
          </span>{" "}
          de nous confier votre projet
        </SectionCatchline>
      </div>
      {/* 👆👆👆👆 */}
      <div className={cn("grid gap-6", "grid-cols-1", "sm:grid-cols-2")}>
        {reasons.map(({ id, ...props }, index) => (
          <ReasonCard key={id} {...props} index={index} />
        ))}
      </div>
    </section>
  );
}

const reasons = [
  {
    description:
      "Vous parlez directement aux personnes qui réalisent le travail. Pas à un commercial qui transmet à une équipe offshore ou à un service d'assistance en ligne anonyme.",
    Icon: InterlocuteurIcon,
    id: "interlocuteur-unique",
    title: "Un interlocuteur unique, pas une agence anonyme",
  },
  {
    description:
      "RGPD, RGAA, NIS2, facturation électronique : nous anticipons les obligations qui s'imposent à vous. Vos produits numériques sont conformes dès la conception, avec une totale sérénité juridique.",
    Icon: ExpertiseIcon,
    id: "expertise-reglementaire",
    title: "Une expertise réglementaire intégrée",
  },
  {
    description:
      "Travailler avec Dev'Oc, c'est réinjecter de la valeur dans l'économie de votre territoire — faire rayonner ses acteurs et participer à la montée en puissance numérique de la région.",
    Icon: ImpactIcon,
    id: "impact-territorial",
    title: "L'impact territorial",
  },
  {
    description:
      "Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo, notre approche a été reconnue par les acteurs économiques du territoire que nous servons.",
    Icon: ReconnaissanceIcon,
    id: "reconnaissance",
    title: "Une reconnaissance indépendante",
  },
];

"use client";
import {
  ArrowRightIcon,
  WandIcon as AuditIcon,
  BotIcon as AutomatisationIcon,
  Scale as ExpertiseIcon,
  GraduationCapIcon as FormationIcon,
  Earth as ImpactIcon,
  ServerIcon as InfrastructureIcon,
  UserCheck as InterlocuteurIcon,
  MapPin as LocalisationIcon,
  type LucideIcon,
  Mail as MailIcon,
  Smartphone as PhoneIcon,
  Award as ReconnaissanceIcon,
  MonitorIcon as SitesWebIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
import PhotoGroupe from "./assets/photo-groupe.webp";
import { ListItem } from "./components/list-item";
import { PContent } from "./components/p-content";
import { PIntro } from "./components/p-intro";
import { Portrait } from "./components/portrait";
import { ReasonCard } from "./components/reason-card";
import { SectionCatchline } from "./components/section-catchline";
import { SectionSeparator } from "./components/section-separator";
import { ServiceCard } from "./components/service-card";
import { SupSection } from "./components/sup-section";

export function Main() {
  return (
    <div
      className={cn(
        "relative",
        "z-1",
        "bg-background-dark text-white",
        "min-h-400"
      )}
    >
      <div className={cn("max-w-430", "mx-auto", "p-46", "space-y-78")}>
        <TopLine />
        <SectionCollectif />
        <Portraits />
        {/* <PortraitGroupe />
        <SectionServices />
        <SectionValues />
        <SectionReasons />
        <ContactCard />*/}
      </div>
    </div>
  );
}

function TopLine() {
  return (
    <GlowLine
      className="left-0"
      color="orange"
      orientation="horizontal"
      position="0px"
    />
  );
}

// 1️⃣🔤
function SectionCollectif() {
  return (
    <section className="mx-auto space-y-36">
      <div className="flex gap-x-42">
        <div className="space-y-10">
          <FadeUp>
            <SupSection number={1}>Le collectif</SupSection>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionCatchline>
              Remettre la transmission et l'autonomie au{" "}
              <span className="font-extralight text-foreground-dark/60 italic">
                centre
              </span>
              .
            </SectionCatchline>
          </FadeUp>
        </div>

        <div className="grow space-y-10">
          <FadeUp delay={0.1}>
            <PIntro>
              Dev'Oc est né d'une conviction simple : la proximité, la clarté et
              l'exigence technique sont compatibles avec les budgets des TPE,
              PME et collectivités locales.
            </PIntro>
          </FadeUp>

          <FadeUp delay={0.2}>
            <PContent>
              Nous accompagnons les acteurs d'Occitanie dans leur transformation
              numérique — création de sites web, mise en conformité
              réglementaire, automatisation de processus, sécurisation des
              infrastructures — avec la proximité et l'exigence comme boussole.
            </PContent>
          </FadeUp>

          <FadeUp delay={0.3}>
            <PContent>
              À la transformation, nous joignons la transmission. Nous animons
              des formations à destination des entrepreneurs et des élus pour
              démystifier ces sujets, révéler des pistes d'action et diffuser
              largement les bonnes pratiques, dans un langage clair et
              accessible.
            </PContent>
          </FadeUp>

          <FadeUp delay={0.4}>
            <PContent>
              Notre conviction : améliorer l'empreinte numérique d'un
              territoire, c'est l'aider à grandir.
            </PContent>
          </FadeUp>
        </div>
      </div>
      <SectionSeparator />
    </section>
  );
}

// 2️⃣📸📸
const founders = [
  {
    color: "#F56E0F",
    description:
      "L'architecte de l'invisible. Bases de données, interconnexions de systèmes, automatisation des tâches répétitives, infrastructure et déploiement: il conçoit les fondations sur lesquelles reposent vos outils numériques.Avec toujours comme maîtres mots l'efficacité et la résilience.",
    key: "clement",
    name: "Clément",
    src: "./clement-portrait.webp",
  },
  {
    color: "#FFC731",
    description:
      "L'interface entre vous et vos utilisateurs. Il traduit vos besoins en expériences numériques claires, accessibles et efficaces. Expert en développement web, conformité RGPD et accessibilité, il s'assure que vos interfaces restent modernes, conformes et durables.",
    key: "thibaut",
    name: "Thibaut",
    src: "./thibaut-portrait.webp",
  },
];

function Portraits() {
  return (
    <FadeUp>
      <div className="-mt-52 flex gap-x-18">
        {founders.map(({ key, ...props }) => (
          <Portrait key={key} {...props} />
        ))}
      </div>
    </FadeUp>
  );
}

// 3️⃣📸
// biome-ignore lint/correctness/noUnusedVariables: temporarily disabled while iterating on main section
function PortraitGroupe() {
  return (
    <div className="space-y-8">
      <FadeUp>
        <div
          className={cn(
            "relative",
            "aspect-16/7 w-full",
            "rounded-3xl",
            "overflow-hidden",
            "after:absolute after:inset-0 after:size-full after:bg-linear-to-b after:from-transparent after:via-transparent after:to-black/50 after:content-['']"
          )}
        >
          <Image
            alt="Photo de groupe du collectif Dev'Oc travaillant devant un ordinateur"
            className="h-full w-full object-cover"
            height="788"
            src={PhotoGroupe.src}
            width="1206"
          />
        </div>
      </FadeUp>
      <FadeUp>
        <p className="max-w-[34ch] font-fraunces font-light text-4xl leading-snug">
          Un binôme complémentaire : là où l'un construit la mécanique, l'autre
          soigne l'expérience. Deux regards, une même exigence.
        </p>
      </FadeUp>
    </div>
  );
}

// 4️⃣💁‍♀️🔤
// biome-ignore lint/correctness/noUnusedVariables: temporarily disabled while iterating on main section
function SectionServices() {
  return (
    <section className="mx-auto space-y-16">
      {/* 🔠 */}
      <div className="flex w-full justify-between">
        <div className="space-y-10">
          <FadeUp>
            <SupSection number={2}>Services</SupSection>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionCatchline>
              Une chaîne de valeur{" "}
              <span className="font-extralight text-foreground-dark/60 italic">
                complète
              </span>
              , de la conception à l'hébergement.
            </SectionCatchline>
          </FadeUp>
        </div>

        <div className="space-y-10 self-end">
          <FadeUp delay={0.2}>
            <PContent className="w-fit max-w-[50ch]">
              Cinq pôles d'expertise complémentaires que nous mobilisons à la
              carte selon vos besoins, vos délais et votre budget. Pas de
              surcoût caché, pas de dépendance inutile à une plateforme externe
              et des produits dimensionnés à votre usage.
            </PContent>
          </FadeUp>
        </div>
      </div>
      {/* 🃏🃏🃏 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <FadeUp className="size-full">
            <ServiceCard {...services[0]} index={1} />
          </FadeUp>
        </div>

        <div className="col-span-5">
          <FadeUp className="size-full" delay={0.1}>
            <ServiceCard {...services[1]} index={2} />
          </FadeUp>
        </div>

        <div className="col-span-4">
          <FadeUp className="size-full" delay={0.2}>
            <ServiceCard {...services[2]} index={3} />
          </FadeUp>
        </div>

        <div className="col-span-8">
          <FadeUp className="size-full" delay={0.3}>
            <ServiceCard {...services[3]} index={4} />
          </FadeUp>
        </div>

        <div className="col-span-12">
          <FadeUp className="size-full" delay={0.4}>
            <ServiceCard {...services[4]} index={5} />
          </FadeUp>
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
    features: ["Intégration de l'IA", "Productivité accrue", "Coûts réduits"],
    href: "#",
    Icon: AutomatisationIcon,
    subtitle:
      "Automatisez les tâches répétitives et libérez du temps pour ce qui compte.",
    title: "Automatisation & IA",
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
// biome-ignore lint/correctness/noUnusedVariables: temporarily disabled while iterating on main section
function SectionValues() {
  return (
    <section className="mx-auto space-y-28">
      {/* 🔠 */}
      <div className="space-y-10">
        <FadeUp>
          <SupSection number={3}>Nos valeurs</SupSection>
        </FadeUp>
        <FadeUp delay={0.1}>
          <SectionCatchline>
            Trois{" "}
            <span className="font-extralight text-foreground-dark/60 italic">
              principes
            </span>{" "}
            qui guident chaque décision
          </SectionCatchline>
        </FadeUp>
      </div>
      {/* 🪗🪗🪗 */}
      <div>
        {values.map(({ id, ...props }, index) => (
          <FadeUp className="group w-full" delay={0.1} key={id}>
            <ListItem {...props} index={index + 1} />
          </FadeUp>
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
    title: "Autonomie et protection des donnée",
  },
  {
    description:
      "Notre objectif : trouver les meilleures combinaisons technologiques adaptées à vos besoins, à un coût compétitif. Issus du monde professionnel et des grands groupes, nous en importons les méthodes et la rigueur, mises au service des TPE, PME et collectivités locales qui n'ont pas toujours les ressources internes pour faire face à leurs défis techniques.",
    id: "esprit-ingenieur",
    title: "L'esprit ingénieur à votre service",
  },
];

// 6️⃣🤙
// biome-ignore lint/correctness/noUnusedVariables: temporarily disabled while iterating on main section
function SectionReasons() {
  return (
    <section className="mx-auto space-y-28">
      {/* 🔠 */}
      <div className="space-y-10">
        <FadeUp>
          <SupSection number={4}>Pourquoi Dev'Oc</SupSection>
        </FadeUp>
        <FadeUp delay={0.1}>
          <SectionCatchline>
            Quatre{" "}
            <span className="font-extralight text-foreground-dark/60 italic">
              raisons
            </span>{" "}
            de nous confier votre projet
          </SectionCatchline>
        </FadeUp>
      </div>
      {/* 👆👆👆👆 */}
      <div className="grid grid-cols-2 gap-6">
        {reasons.map(({ id, ...props }, index) => (
          <FadeUp className="w-fit" delay={0.1 * index} key={id}>
            <ReasonCard {...props} index={index} />
          </FadeUp>
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

// 7️⃣📞
// biome-ignore lint/correctness/noUnusedVariables: temporarily disabled while iterating on main section
function ContactCard() {
  return (
    <FadeUp>
      <div
        className={cn(
          "flex justify-between gap-x-24",
          "relative",
          "rounded-3xl",
          "border border-foreground-dark/10",
          "px-22 py-32",
          "bg-surface-dark",
          "overflow-hidden"
        )}
      >
        {/* 🔙 */}
        <div className="absolute inset-0 size-full opacity-30">
          {/* 🟡 */}
          <div
            className={cn(
              "absolute bottom-0 left-0",
              "aspect-square h-[80%]",
              "rounded-full",
              "-translate-x-1/2 translate-y-1/2",
              "bg-radial from-primary-lighter to-80% to-transparent",
              "blur-2xl"
            )}
          />
          {/* 🟠 */}
          <div
            className={cn(
              "absolute top-0 right-0",
              "aspect-square h-full",
              "translate-x-1/4 -translate-y-1/4",
              "rounded-full",
              "bg-radial from-primary-strong to-80% to-transparent",
              "blur-2xl"
            )}
          />
        </div>
        {/* 1️⃣ */}
        <div className="relative max-w-[55ch]">
          <div className="space-y-10">
            <SupSection number={5}>Contact</SupSection>
            <SectionCatchline className="font-normal text-7xl">
              Parlons de votre{" "}
              <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent">
                projet
              </span>
              .
            </SectionCatchline>
            <p className="text-foreground-dark/60 text-lg">
              Décrivez-nous votre besoin en quelques lignes. Nous vous répondons
              sous 24h ouvrées avec une première grille de lecture — sans
              engagement, sans jargon.
            </p>
          </div>
        </div>
        {/* 2️⃣ */}
        <div className="relative min-w-110">
          {itemContacts.map(({ id, ...props }) => (
            <ListItemContact {...props} key={id} />
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

function ListItemContact({
  Icon,
  label,
  value,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      className={cn(
        "group",
        "flex items-center gap-x-4",
        "py-4",
        "border-t last-of-type:border-b"
      )}
      href={href}
      style={{
        borderImage:
          "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.40) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1",
      }}
    >
      {/* 1️⃣ */}
      <div
        className={cn(
          "grid place-items-center",
          "size-10",
          "rounded-full",
          "border border-foreground-dark/10 bg-foreground-dark/3"
        )}
      >
        <Icon color="#AEABA4" size={16} />
      </div>
      {/* 2️⃣ */}
      <div>
        <div className="font-geist-mono text-[0.6rem] text-foreground-dark/50 uppercase tracking-[0.15rem]">
          {label}
        </div>
        <div className="font-light text-sm">{value}</div>
      </div>
      {/* 3️⃣ */}
      <div className="ml-auto transition-transform group-hover:translate-x-1">
        <ArrowRightIcon size={14} />
      </div>
    </a>
  );
}

const itemContacts = [
  {
    href: "",
    Icon: MailIcon,
    id: "email",
    label: "Email",
    value: "contact@dev-oc.fr",
  },
  {
    href: "",
    Icon: PhoneIcon,
    id: "tel-1",
    label: "Téléphone — Thibaut",
    value: "+33 6 20 23 98 38",
  },
  {
    href: "",
    Icon: PhoneIcon,
    id: "tel-2",
    label: "Téléphone — Clément",
    value: "+33 6 58 88 97 01",
  },
  {
    href: "",
    Icon: LocalisationIcon,
    id: "localisation",
    label: "Localisation",
    value: "Carcassonne, France",
  },
];

// 🎬
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("w-fit", className)}
      initial={{ opacity: 0, y: 28 }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

// ==============================
// 2️⃣ Founders
// function Founders() {
//   return (
//     <div className="relative">
//       <H3>Les fondateurs</H3>
//       <div
//         className={cn(
//           "grid justify-items-center gap-4",
//           // 📱
//           "grid-cols-1",
//           // 💻
//           "xl:grid-cols-[1fr_1fr]"
//         )}
//       >
//         <div className="relative">
//           <DeveloperName className="from-primary-strong to-primary">
//             Clément
//           </DeveloperName>
//           <P>
//             L'architecte de l'invisible. Bases de données, interconnexions entre
//             systèmes, automatisation des tâches répétitives, infrastructure et
//             déploiement : il conçoit les fondations sur lesquelles reposent vos
//             outils numériques. Avec toujours comme maîtres mots l'efficacité et
//             la résilience.
//           </P>{" "}
//           {/*<Portrait
//             className={cn(
//               // 📱
//               "mx-auto my-10",
//               // 🖥️
//               "xl:top-0 xl:left-0 xl:my-0 xl:-translate-x-[calc(100%+40px)]",
//               "scale-x-[1]"
//             )}
//             color="#F56E0F"
//             src="./clement-portrait.webp"
//           />*/}
//         </div>
//         <div className="relative">
//           <DeveloperName
//             className={cn("from-primary to-primary-lighter", "xl:ml-auto")}
//           >
//             Thibaut
//           </DeveloperName>
//           <P className="xl:text-right">
//             L'interface entre vous et vos utilisateurs. Il traduit vos besoins
//             en expériences numériques claires, accessibles et efficaces. Expert
//             en développement web, conformité RGPD, accessibilité, il s'assure
//             que vos interfaces restent modernes avec une identité forte mais
//             également conformes et durables.
//           </P>{" "}
//           {/*<Portrait
//             className={cn(
//               "scale-x-[-1]",
//               // 📱
//               "mx-auto my-10",
//               // 🖥️
//               "xl:top-0 xl:right-0 xl:my-0 xl:translate-x-full"
//             )}
//             color="#FFC731"
//             src="./thibaut-portrait.webp"
//           />*/}
//         </div>
//       </div>
//       <div className={cn("mt-24 mb-0", "md:mt-24 md:mb-16")}>
//         <div className="h-px w-full bg-linear-to-r from-primary-strong to-primary-lighter" />
//         <P className="mt-8 text-pretty text-center font-medium text-2xl">
//           Ensemble, ils forment un binôme complémentaire : là où l'un construit
//           la mécanique, l'autre soigne l'expérience. Deux regards, une même
//           exigence.
//
//          </P>
//           className="mx-auto mt-14 rotate-180"
//           gradient={["var(--primary-lighter)", "var(--primary-strong)"]}
//         />
//         <CustomRubiksCube />
//       </div>
// import { Portrait} from "./components/
// portrait"
//     </div>
//   );
// }

//🧊
// function CustomRubiksCube() {
//   return (
//     <RubiksCube
//       className={cn(
//         "hidden",
//         "md:block",
//         "-my-20",
//         "h-96 w-full",
//         "translate-y-[15%]",
//         "opacity-70"
//       )}
//       fresnelConfig={{
//         color: "#09090B",
//         rimColor: "#FC6B08",
//       }}
//       size={1.6}
//     />
//   );
// }

// ==============================
// 3️⃣ Values
// function Values() {
//   return (
//     <div>
//       <H3>Nos valeurs</H3>
//       <ul className="mb-0! space-y-6">
//         <li>
//           <H4>#1 La proximité géographique et humaine</H4>
//           <P>
//             Les meilleurs projets se construisent en face-à-face. Nous nous
//             déplaçons volontiers dans vos locaux, vos mairies et vos bureaux à
//             travers toute l'Occitanie pour comprendre vos réalités concrètes et
//             vous former à vos outils, sans chercher à appliquer mécaniquement la
//             même recette de client en client.
//           </P>
//         </li>
//         <li>
//           <H4>#2 L'autonomie des utilisateurs et la protection des données</H4>
//           <P>
//             Vos données sont votre patrimoine. Nous privilégions les solutions{" "}
//             <i>open source</i> et l'hébergement souverain pour garantir votre
//             indépendance tout en vous donnant les moyens de construire votre
//             autonomie par la formation continue et la fourniture de guides
//             d'utilisation de vos outils.
//           </P>
//         </li>
//         <li>
//           <H4>#3 L'esprit ingénieur à votre service</H4>
//           <P>
//             Notre objectif est de trouver les meilleures solutions avec des
//             combinaisons technologiques adaptées à vos besoins et à un coût
//             compétitif. Issus du monde professionnel et des grands groupes, nous
//             en importons les méthodes et la rigueur pour les mettre au service
//             des TPE, PME et collectivités locales qui n'ont pas toujours les
//             ressources internes nécessaires pour faire face à certains défis
//             techniques.
//           </P>
//         </li>
//       </ul>
//     </div>
//   );
// }

// ==============================
// 🖼️
// function BannerImage() {
//   return (
//     <div
//       className={cn(
//         "ml-[calc(-50vw+50%)] w-screen",
//         "overflow-hidden",
//         "h-30 md:h-50"
//       )}
//     >
//       <DitheredImage
//         backgroundColor="#09090b"
//         className="h-full w-full"
//         color="#F56E0F"
//         ditherMap="voidAndCluster"
//         pixelSize={1}
//         src="./photo-groupe.webp"
//         threshold={0.05}
//       />
//     </div>
//   );
// }

// ==============================
// 4️⃣ Why us
// function WhyUs() {
//   return (
//     <div>
//       <H3>Pourquoi choisir Dev'Oc ?</H3>
//       <ul className="space-y-6">
//         <li>
//           <H4>Un interlocuteur unique, pas une agence anonyme</H4>
//           <P>
//             Vous parlez directement aux personnes qui effectuent le travail
//             commandé et qui apprennent ainsi à vous connaître pour construire
//             une relation de confiance au fil du temps, pas à un commercial qui
//             transmet à une équipe <i>offshore</i> ou à un service d'assistance
//             en ligne.
//           </P>
//         </li>
//         <li>
//           <H4>Une expertise réglementaire intégrée</H4>
//           <P>
//             RGPD, RGAA, NIS2, facturation électronique : nous anticipons les
//             obligations qui s'imposent à vous dans le cadre français ou européen
//             en vous évitant de vous embarquer avec des outils inadaptés qui
//             finissent par vous coûter cher et dont il devient ensuite difficile
//             de se séparer. En nous confiant vos besoins, vos produits numériques
//             sont conformes dès leur conception et passent tous les caps
//             réglementaires afin de vous assurer une totale sérénité et vous
//             garantir contre tout risque juridique.
//           </P>
//         </li>
//         <li>
//           <H4>L'impact territorial</H4>
//           <P>
//             Travailler avec Dev'Oc, c'est choisir de réinjecter de la valeur
//             dans l'économie de votre territoire pour en faire rayonner les
//             acteurs et participer de la montée en puissance numérique de la
//             région.
//           </P>
//         </li>
//         <li>
//           <H4>Une reconnaissance indépendante</H4>
//           <P>
//             Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo,
//             notre approche a été reconnue par les acteurs économiques du
//             territoire que nous servons.
//           </P>
//         </li>
//       </ul>
//     </div>
//   );
// }

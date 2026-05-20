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
import { useMediaQuery } from "usehooks-ts";
import RubiksCube from "@/components/motion-core/rubiks-cube/rubiks-cube";
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
      <div
        className={cn(
          "max-w-430",
          "mx-auto",
          // ↔️
          "space-y-14 px-5 py-34",
          "xs:space-y-14 xs:px-5 xs:py-34",
          "sm:space-y-20 sm:px-5 sm:py-38",
          "md:space-y-24 md:px-8 md:py-40",
          "lg:space-y-28 lg:px-10 lg:py-48",
          "xl:space-y-44 xl:px-14 xl:py-54",
          "2xl:space-y-52 2xl:px-14 2xl:py-62"
        )}
      >
        <TopLine />
        <SectionCollectif />
        <Portraits />
        <PortraitGroupe />
        <SectionServices />
        <SectionValues />
        <SectionReasons />
        <ContactCard />
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
    <section
      className={cn(
        "mx-auto",
        "scroll-m-12",
        // ↔️
        "space-y-14",
        "xs:space-y-14",
        "sm:space-y-20",
        "md:space-y-24",
        "lg:space-y-28",
        "xl:space-y-44",
        "2xl:space-y-52"
      )}
      id="collectif"
    >
      <div
        className={cn(
          "flex",
          // ↔️
          "flex-col gap-y-12",
          "xs:flex-col xs:gap-y-12",
          "sm:flex-col sm:gap-y-12",
          "md:flex-row md:gap-x-12",
          "2xl:flew-row 2xl:gap-x-42"
        )}
      >
        <div>
          <div
            className={cn(
              // ↔️
              "space-y-6",
              "2xl:space-y-10"
            )}
          >
            <FadeUp disableOnMobile>
              <SupSection number={1}>Le collectif</SupSection>
            </FadeUp>
            <FadeUp delay={0.1} disableOnMobile>
              <SectionCatchline>
                Remettre la transmission et l'autonomie au{" "}
                <span className="font-extralight text-foreground-dark/60 italic">
                  centre
                </span>
                .
              </SectionCatchline>
            </FadeUp>
          </div>
          <CustomCube />
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
              Dev'Oc est né d'un constat : trop d'artisans, de commerçants et de
              communes d'Occitanie naviguent seuls dans leur transformation
              numérique, faute d'un interlocuteur de confiance à leur échelle.
            </PIntro>
          </FadeUp>
          <FadeUp delay={0.2} disableOnMobile>
            <PIntro>
              Or nous sommes convaincus que l'exigence technique et la proximité
              humaine ne sont pas des luxes réservés aux grandes structures mais
              qu'elles peuvent, et doivent, être accessibles à tous les budgets.
            </PIntro>
          </FadeUp>

          <FadeUp delay={0.3} disableOnMobile>
            <PContent>
              Nous accompagnons ainsi les TPE, PME et collectivités d'Occitanie
              sur l'ensemble de leur transformation numérique : création de
              sites web, mise en conformité RGPD, cybersécurité, automatisation
              des processus ou déploiement de solutions souveraines.
            </PContent>
          </FadeUp>

          <FadeUp delay={0.4} disableOnMobile>
            <PContent>
              À la transformation, nous ajoutons la transmission. Parce qu'un
              outil numérique mal compris est un outil vite abandonné, nous
              proposons des formations concrètes à destination des dirigeants,
              des équipes et des élus. L'objectif n'est pas de tout savoir, mais
              de reprendre la main : comprendre les enjeux, poser les bonnes
              questions, et faire des choix éclairés.
            </PContent>
          </FadeUp>

          <FadeUp delay={0.5} disableOnMobile>
            <PContent>
              Un territoire qui maîtrise son numérique attire, fidélise et
              rayonne. Ce n'est pas une question de technologie mais de
              souveraineté locale. C'est ce que nous construisons, commune après
              commune, entreprise après entreprise, en Occitanie.
            </PContent>
          </FadeUp>
        </div>
      </div>
      <SectionSeparator />
    </section>
  );
}

// 🧊
function CustomCube() {
  return (
    <motion.div
      className={cn(
        "mx-auto",
        "max-md:hidden",
        "md:mt-42 md:size-60",
        "lg:mt-28 lg:size-70",
        "xl:mt-28 xl:size-80",
        "2xl:mt-14 2xl:size-100"
      )}
      initial={{
        opacity: 0,
      }}
      transition={{
        delay: 1,
        duration: 25,
      }}
      viewport={{ margin: "-100px", once: true }}
      whileInView={{ opacity: 0.7 }}
    >
      <RubiksCube />
    </motion.div>
  );
}

// 2️⃣📸📸
const founders = [
  {
    color: "#F56E0F",
    description:
      "L'architecte de l'invisible. Bases de données, interconnexions de systèmes, automatisation des tâches répétitives, infrastructure et déploiement: il conçoit les fondations sur lesquelles reposent vos outils numériques. Avec toujours comme maîtres mots l'efficacité et la résilience.",
    key: "clement",
    name: "Clément",
    src: "./clement-portrait.webp",
    title: "Co-fondateur • Backend & infrastructure",
  },
  {
    color: "#FFC731",
    description:
      "L'interface entre vous et vos utilisateurs. Il traduit vos besoins en expériences numériques claires, accessibles et efficaces. Expert en développement web, conformité RGPD et accessibilité, il s'assure que vos interfaces restent modernes, conformes et durables.",
    key: "thibaut",
    name: "Thibaut",
    src: "./thibaut-portrait.webp",
    title: "Co-fondateur • Design & accessibilité",
  },
];

function Portraits() {
  return (
    <div
      className={cn(
        "flex",
        // ↔️
        "flex-col gap-y-6",
        "xs:flex-col xs:gap-y-6",
        "sm:flex-col sm:gap-y-6",
        "md:flex-row md:gap-x-3",
        "lg:flex-row lg:gap-x-4",
        "xl:flex-row xl:gap-x-6",
        "2xl:flex-row 2xl:gap-x-8"
      )}
    >
      {founders.map(({ key, ...props }) => (
        <FadeUp key={key}>
          <Portrait {...props} />
        </FadeUp>
      ))}
    </div>
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
    <section className="mx-auto space-y-24">
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

        <div className={cn("space-y-10", "md:self-end")}>
          <FadeUp delay={0.2}>
            <PContent className="w-fit max-w-[50ch]">
              Cinq pôles d'expertise complémentaires que nous mobilisons à la
              carte selon vos besoins, vos délais et votre budget. Pas de
              surcoût caché, pas de dépendance inutile à une plateforme externe
              et des produits toujours dimensionnés à votre usage.
            </PContent>
          </FadeUp>
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
          <FadeUp className="size-full">
            <ServiceCard {...services[0]} index={1} />
          </FadeUp>
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
          <FadeUp className="size-full" delay={0.1}>
            <ServiceCard {...services[1]} index={2} />
          </FadeUp>
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
          <FadeUp className="size-full" delay={0.2}>
            <ServiceCard {...services[2]} index={3} />
          </FadeUp>
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
          <FadeUp className="size-full" delay={0.3}>
            <ServiceCard {...services[3]} index={4} />
          </FadeUp>
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
      <div className={cn("grid gap-6", "grid-cols-1", "sm:grid-cols-2")}>
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
function ContactCard() {
  return (
    <FadeUp className="w-full">
      <div
        className={cn(
          "flex justify-between gap-x-24",
          "scroll-m-12",
          "relative",
          "rounded-3xl",
          "border border-foreground-dark/10",
          "bg-surface-dark",
          "overflow-hidden",
          // ↔️
          "flex-col gap-y-12 px-6 py-10",
          "md:flex-row md:px-8",
          "2xl:flex-row 2xl:px-22 2xl:py-32"
        )}
        id="contact"
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
          <div
            className={cn(
              // ↔️
              "space-y-5",
              "2xl:space-y-10"
            )}
          >
            <SupSection number={5}>Contact</SupSection>
            <SectionCatchline className="font-normal!">
              Parlons de votre{" "}
              <span className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent">
                projet
              </span>
              .
            </SectionCatchline>
            <p
              className={cn(
                "text-foreground-dark/60",
                // ↔️
                "text-md",
                "2xl:text-lg"
              )}
            >
              Décrivez-nous votre besoin en quelques lignes. Nous vous répondons
              sous 24h ouvrées avec une première grille de lecture — sans
              engagement, sans jargon.
            </p>
          </div>
        </div>
        {/* 2️⃣ */}
        <div className={cn("relative", "w-full", "md:w-275", "")}>
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
        "border-t last-of-type:border-b",
        "py-4"
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
        <div
          className={cn(
            "font-geist-mono text-foreground-dark/50 uppercase",
            // ↔️
            "text-[0.55rem] tracking-[0.15rem]",
            "2xl:text-[0.6rem] 2xl:tracking-[0.15rem]"
          )}
        >
          {label}
        </div>
        <div className="font-light text-sm">{value}</div>
      </div>
      {/* 3️⃣ */}
      <div className="ml-auto transition-transform group-hover:-translate-x-0.5">
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
  disableOnMobile = false,
}: {
  children: React.ReactNode;
  disableOnMobile?: boolean;
  delay?: number;
  className?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (isMobile && disableOnMobile) return children;

  return (
    <motion.div
      className={cn(
        "w-fit",
        // ↔️
        className
      )}
      initial={{ opacity: 0, y: 35 }}
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

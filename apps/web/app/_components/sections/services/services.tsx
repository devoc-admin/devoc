/** biome-ignore-all lint/performance/noNamespaceImport: exception */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: exception */
/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: excepion */
"use client";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightIcon,
  BotIcon,
  HandshakeIcon,
  LaptopIcon,
  Repeat2Icon,
  ServerIcon,
  WandSparklesIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Lamp from "@/components/aceternity/lamp";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";
export default function Services() {
  return (
    <Section
      className={cn(
        "justify-between",
        // To scroll under the beam
        "sm:-scroll-m-50",
        // 🕳️ Gap
        "gap-y-16",
        "sm:gap-y-32",
        // 📱 Responsive padding
        "pt-24! pb-12",
        "sm:pt-88! sm:pb-48"
      )}
      id="services"
      theme="dark"
    >
      <Lamp className={cn("hidden", "sm:flex")} />
      <SectionTitle
        description="Une gamme complète de services pour booster votre présence numérique, de la conception à la mise en ligne et au-delà 🚀"
        title="Nos Services"
      />
      <ServiceCards />
    </Section>
  );
}

// ----------------------------------
// 🃏 Cards
type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
  subtitle?: string;
};

const services: ServiceCardProps[] = [
  {
    description:
      "Offrez-vous une identité numérique moderne et fluide ! Suivez votre audience avec nos outils et proposez facilement de nouveaux contenus pour vos visiteurs.",
    features: [
      "Versions mobile, tablette comprises",
      "Référencement optimisé",
      "Logo sur mesure",
      "Charte graphique",
    ],
    Icon: LaptopIcon,
    id: "web-design",
    subtitle:
      "Affirmez votre présence en ligne avec un site ultra rapide et moderne",
    title: "Web Design",
  },
  {
    description:
      "Besoin d'automatiser des tâches répétitives ? Nous vous aidons à créer des automatisations pour booster votre productivité.",
    features: [
      "Intégration de l'IA dans vos processus",
      "Amélioration de la productivité",
      "Réduction des coûts",
    ],
    Icon: BotIcon,
    id: "automation",
    subtitle: "Automatisez vos tâches et réduisez vos coûts.",
    title: "Automatisation",
  },
  {
    description:
      "Nous bâtissons des fondations numériques solides et locales. Reprenez le contrôle total de vos données et de vos outils de production.",
    features: [
      "Hébergement",
      "Deploiement de services",
      "Monitoring & Sauvegardes",
    ],
    Icon: ServerIcon,
    id: "infra",
    subtitle: "Construisez des infrastructures robustes et résilientes.",
    title: "Infrastructure",
  },
  {
    description:
      "Besoin d'améliorer le référencement, la performance ou l'accessibilité de votre site web ? Nous vous livrons un audit complet et une optimisation adaptée.",
    features: [
      "Audit SEO et performance",
      "Conformité RGAA 4.1 pour l'accessibilité",
      "Conformité RGPD et RGS",
    ],
    Icon: WandSparklesIcon,
    id: "audit",
    subtitle:
      "Boostez vos performances, renforcez votre sécurité et votre accessibilité",
    title: "Audit",
  },
  {
    description:
      "Appropriez-vous vos outils et devenez autonomes avec notre formation. Nous nous occupons également de la maintenance et des mises à jour de vos applications.",
    features: [
      "Formation en présentiel",
      "Support réactif",
      "Maintenance continue",
    ],
    Icon: HandshakeIcon,
    id: "support",
    subtitle: "Restez serein avec notre expertise et notre soutien continu.",
    title: "Formation",
  },
];

function ServiceCards() {
  const [hasMounted, setHasMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      className={cn("flex flex-wrap justify-center gap-8", "w-full max-w-325")}
      initial={{ opacity: 0, y: hasMounted && isDesktop ? 200 : 0 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {services.map((service, index) => (
        <ServiceCard index={index} key={service.title} {...service} />
      ))}
    </motion.div>
  );
}

// ------------------------------------
// 🃏 Card
function ServiceCard({
  title,
  description,
  features,
  Icon,
  subtitle,
  index,
}: ServiceCardProps & { index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Deterministic delay based on index to avoid hydration mismatch
  const beamDelay = ((index * 347) % 1000) + 200;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const FrontCard = (
    <div
      className={cn(
        "absolute inset-0 flex h-full flex-col gap-6",
        "py-4",
        "@xs:py-6",
        "transition-all duration-700",
        hasMounted && isDesktop && "backface-hidden rotate-y-0",
        isFlipped ? "opacity-0" : "opacity-100",
        // On mobile, hide completely when flipped
        hasMounted && isDesktop && isFlipped && "pointer-events-none"
      )}
    >
      <CardHeader>
        <div className="mb-3 flex h-7 items-center justify-between">
          {/* 👉 Progress Bar */}
          <motion.div
            className={cn(
              "h-1",
              "w-[30%]",
              "origin-right",
              "ml-auto",
              "rounded-lg",
              "bg-primary"
            )}
            initial={{ scaleX: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ amount: 0.5, once: true }}
            whileInView={{ scaleX: 1 }}
          />
        </div>
      </CardHeader>

      {/* 🔡 Description */}
      <CardContent className="grid grow place-items-center">
        <DotPattern
          className={cn(
            "z-0",
            "text-primary/70",
            "mask-[radial-gradient(60cqw_circle_at_center,white,transparent)]"
          )}
        />
        {/* 🟪 Icon */}
        <div
          className={cn(
            "animate-pulse-shadow",
            "mx-auto -mt-10 h-[40cqw]",
            "grid aspect-square place-items-center rounded-full",
            "z-1",
            "border-[3px] border-primary/3",
            "bg-linear-to-br from-[#392413] to-[#392413]"
          )}
        >
          <div className="relative size-[50%]">
            <Icon
              className="absolute h-full w-full animate-blur-glow text-primary blur-xs"
              strokeWidth={1.3}
            />
            <Icon className="h-full w-full text-primary" strokeWidth={1.3} />
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "flex items-center justify-between",
          "gap-x-4",
          "@xs:gap-x-8"
        )}
      >
        <div>
          {/* 🆎 Title */}
          <CardTitle
            className={cn(
              "mb-1 font-kanit font-semibold",
              "text-primary-foreground",
              "group-hover:text-primary",
              "text-2xl",
              "@xs:text-[2rem]",
              "@sm:text-4xl"
            )}
          >
            {title}
          </CardTitle>
          <div
            className={cn(
              "text-base text-muted-foreground leading-tight",
              "@sm:block hidden"
            )}
          >
            {subtitle}
          </div>
        </div>
        <div className="grid shrink-0 place-items-center rounded-lg bg-primary/15 p-1.5 text-primary">
          <Repeat2Icon className={cn("@lg:size-9 @md:size-8 size-7")} />
        </div>
      </CardFooter>
      {/* 🔄 Laser rotating */}
      {hasMounted && isDesktop && (
        <BorderBeam delay={beamDelay} reverse={index % 2 === 0} size={100} />
      )}
    </div>
  );

  const BackCard = (
    <div
      className={cn(
        "absolute inset-0 flex h-full flex-col",
        "transition-all duration-700",
        "gap-y-4 py-4",
        "@sm:gap-y-6 @sm:py-4",
        "@md:gap-y-6 @md:px-2 @md:py-8",
        hasMounted && isDesktop && "backface-hidden rotate-y-180",
        isFlipped ? "opacity-100" : "opacity-0",
        // On mobile, hide completely when not flipped
        hasMounted && isDesktop && !isFlipped && "pointer-events-none"
      )}
    >
      {/* 🆎 Title */}
      <CardHeader>
        <CardTitle
          className={cn(
            "font-kanit font-semibold",
            "mt-4 mb-3",
            "text-primary-foreground",
            "group-hover:text-primary",
            "underline decoration-primary underline-offset-12",
            "text-white!",
            // Responsive text-size
            "text-3xl",
            "@sm:text-4xl",
            "@md:text-5xl"
          )}
        >
          {title}
        </CardTitle>
      </CardHeader>

      {/* 🔡 Description */}
      <CardContent className="grow">
        <CardDescription className={cn("mb-2", "text-md", "@sm:text-lg")}>
          {description}
        </CardDescription>
        {/* 📝 Features list */}
        <ul
          className={cn(
            "mt-8",
            // 📱 Responsive
            "hidden",
            "@lg:block @lg:text-lg",
            "sm:@sm:block sm:@sm:text-lg"
          )}
        >
          {features.map((feature) => (
            <li className="flex items-center gap-2" key={feature}>
              <ArrowRightIcon className="text-primary" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* ⬇️ Footer */}
      <CardFooter
        className={cn("hidden", "@xs:flex @xs:flex-col", "sm:flex sm:flex-col")}
      >
        {/* ― Bar above */}
        <div
          className={cn(
            "hidden",
            "@sm:block",
            "h-px w-full",
            "mb-6",
            "bg-linear-to-r from-transparent via-primary to-transparent"
          )}
        />
        {/* 🆕 Prendre contact */}
        <a
          className={cn(
            "group",
            "flex items-center justify-between",
            "w-full",
            "px-5 py-0",
            "rounded-lg",
            "transition-colors",
            "bg-primary/10 text-primary/80",
            "hover:bg-primary/20 hover:text-primary",
            !isFlipped && "pointer-events-none",
            // 📱 Responsive
            "@xs:px-5 @xs:py-3",
            "sm:px-5 sm:py-3"
          )}
          href="#contact"
        >
          <div className="font-kanit font-light text-lg leading-none">
            Prendre contact
          </div>
          <div
            className={cn(
              "grid place-items-center rounded-lg p-1.5 transition-colors",
              "bg-primary/15 text-primary/80",
              "group-hover:bg-primary/25 group-hover:text-primary"
            )}
          >
            <ArrowRightIcon size={18} />
          </div>
        </a>
      </CardFooter>
      {/* 🔄 Laser rotating */}
      {hasMounted && isDesktop && (
        <BorderBeam delay={beamDelay} reverse={index % 2 === 0} size={100} />
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "@container relative",
        // 📱 Responsive size
        "aspect-square w-full",
        "sm:aspect-4/5 sm:w-[calc(50%-1.5rem)]",
        "lg:aspect-4/5 lg:w-[calc(33.333%-1.5rem)]",
        // Only use perspective on desktop
        hasMounted && isDesktop && "perspective-[2000px]"
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <Card
        animation={false}
        className={cn(
          "relative",
          "h-full",
          "cursor-pointer",
          "bg-linear-to-br from-zinc-950 to-zinc-900",
          // 🖥️ 3D flip on desktop
          hasMounted && isDesktop && "transform-3d transition-all duration-700",
          hasMounted && isDesktop && isFlipped && "rotate-y-180",
          hasMounted && isDesktop && !isFlipped && "rotate-y-0"
        )}
      >
        {FrontCard}
        {BackCard}
      </Card>
    </div>
  );
}

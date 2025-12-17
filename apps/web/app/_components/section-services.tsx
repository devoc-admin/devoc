/** biome-ignore-all lint/performance/noNamespaceImport: exception */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: exception */
/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: excepion */
"use client";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightIcon,
  BotIcon,
  BrushIcon,
  HandshakeIcon,
  LaptopIcon,
  Repeat2Icon,
  SmartphoneIcon,
  WandSparklesIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
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
import SectionTitle from "./section-title";

export default function Services() {
  const { ref } = useNavTheme({ sectionName: "services", theme: "dark" });

  return (
    <motion.div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-between gap-32 bg-zinc-950",
        // Pour scroller en dessous du faisceau
        "sm:-scroll-m-[200px]",
        "px-6 pt-24 pb-12",
        "sm:pt-88 sm:pb-48"
      )}
      id="services"
      ref={ref}
    >
      <Lamp className={cn("hidden", "sm:flex")} />
      <SectionTitle
        description="Une gamme complète de services pour booster votre présence numérique, de la conception à la mise en ligne et au-delà 🚀"
        title="Nos Services"
      />
      <ServiceCards />
    </motion.div>
  );
}

// ----------------------------------
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
      "Offrez-vous un site web moderne et fluide ! Suivez votre audience avec nos outils et proposez facilement de nouveaux contenus pour vos visiteurs.",
    features: [
      "Versions mobile et tablette comprises",
      "Référencement optimisé",
      "Amélioration du taux de conversion",
    ],
    Icon: LaptopIcon,
    id: "site-web",
    subtitle:
      "Affirmez votre présence en ligne avec un site ultra rapide et moderne",
    title: "Site web",
  },
  {
    description:
      "Besoin d'améliorer le référencement, la performance ou l'accessibilité de votre site web ? Nous vous livrons un audit complet et une optimisation adaptée à vos besoins.",
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
      "Créez une expérience inédite au plus proche de vos utilisateurs, donnez-leur accès à tous vos services dans la paume de leurs mains.",
    features: [
      "Compatible Android et iOS",
      "Expérience fluide et personnalisée",
      "Notifications push et accès hors-ligne",
    ],
    Icon: SmartphoneIcon,
    id: "mobile",
    subtitle: "Offrez une expérience embarquée unique à vos utilisateurs",
    title: "Mobile",
  },
  {
    description:
      "Nous vous accompagnons dans la création de votre charte graphique et la confection de vos supports de communication.",
    features: [
      "Logo sur mesure",
      "Charte graphique",
      "Supports print et web",
      "Kit communication pour les réseaux",
    ],
    Icon: BrushIcon,
    id: "design",
    subtitle:
      "Découvrez votre identité visuelle pour vous démarquer et vous imposer",
    title: "Design",
  },
  {
    description:
      "Besoin d'automatiser des tâches répétitives ? Nous vous aidons à créer des automatisations IA pour booster votre productivité.",
    features: [
      "Intégration de l'IA dans vos processus",
      "Amélioration de la productivité",
      "Réduction des coûts",
    ],
    Icon: BotIcon,
    id: "ai",
    subtitle: "Utilisez l'IA pour automatiser vos tâches et réduire vos coûts.",
    title: "IA",
  },
  {
    description:
      "Appropriez-vous vos outils et devenez complètement autonomes avec notre formation comprise. Nous nous occupons également de la maintenance et des mises à jour de vos applications.",
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
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <motion.div
      className={cn(
        "w-full max-w-[1300px]",
        "flex flex-col gap-8",
        "sm:grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] sm:gap-8"
      )}
      initial={{ opacity: 0, y: 200 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ amount: isDesktop ? 0.2 : 0, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {services.map((service, index) => (
        <ServiceCard index={index} key={service.title} {...service} />
      ))}
    </motion.div>
  );
}

function ServiceCard({
  title,
  description,
  features,
  Icon,
  subtitle,
  index,
}: ServiceCardProps & { index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const randomDelay = Math.random() * 1000;

  return (
    <div
      className={cn(
        "@container relative aspect-4/5",
        // Only use perspective on desktop
        isDesktop && "perspective-[2000px]"
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <Card
        animation={false}
        className={cn(
          "relative h-full min-h-[400px] cursor-pointer",
          // Only use 3D transforms on desktop
          isDesktop && "transform-3d transition-all duration-700",
          isDesktop && (isFlipped ? "rotate-y-180" : "rotate-y-0")
        )}
      >
        {/* 🔼 Front Face */}
        <div
          className={cn(
            "absolute inset-0 flex h-full flex-col gap-6 py-6",
            "transition-all duration-700",
            isDesktop && "backface-hidden rotate-y-0",
            isFlipped ? "opacity-0" : "opacity-100",
            // On mobile, hide completely when flipped
            isDesktop && isFlipped && "pointer-events-none"
          )}
        >
          <CardHeader>
            <div className="mb-3 flex h-7 items-center justify-between">
              {/* 👉 Progress Bar */}
              <motion.div
                className="ml-auto h-1 w-[30%] rounded-lg bg-primary"
                initial={{ width: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ amount: 0.5, once: true }}
                whileInView={{ width: "30%" }}
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
                <Icon
                  className="h-full w-full text-primary"
                  strokeWidth={1.3}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-x-8">
            <div>
              {/* 🆎 Title */}
              <CardTitle
                className={cn(
                  "mb-1 font-kanit font-semibold",
                  "text-primary-foreground",
                  "group-hover:text-primary",
                  "text-3xl",
                  "@xs:text-[2.2rem]",
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
          {isDesktop ? (
            <BorderBeam
              delay={randomDelay}
              reverse={index % 2 === 0}
              size={100}
            />
          ) : null}
        </div>

        {/* 🔼 Back Face */}
        <div
          className={cn(
            "absolute inset-0 flex h-full flex-col gap-6",
            "transition-all duration-700",
            "py-6",
            "@md:px-2 @md:py-8",
            isDesktop && "backface-hidden rotate-y-180",
            isFlipped ? "opacity-100" : "opacity-0",
            // On mobile, hide completely when not flipped
            isDesktop && !isFlipped && "pointer-events-none"
          )}
        >
          <CardHeader>
            {/* 🆎 Title */}
            <CardTitle
              className={cn(
                "font-kanit font-semibold",
                "mt-4 mb-3",
                "text-primary-foreground",
                "group-hover:text-primary",
                "underline decoration-primary underline-offset-12",
                "text-4xl",
                "@sm:text-5xl"
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          {/* 🔡 Description */}
          <CardContent className="grow">
            <CardDescription className={cn("mb-2", "text-lg", "@sm:text-lg")}>
              {description}
            </CardDescription>
            <ul className={cn("mt-8", "hidden", "@sm:block @sm:text-lg")}>
              {features.map((feature) => (
                <li className="flex items-center gap-2" key={feature}>
                  <ArrowRightIcon className="text-primary" size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="mb-6 h-[0.5px] w-full bg-linear-to-r from-transparent via-primary to-transparent" />
            <a
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-5 py-3 transition-colors",
                "bg-primary/10 text-primary/80",
                "hover:bg-primary/20 hover:text-primary",
                !isFlipped && "pointer-events-none"
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
          {isDesktop ? (
            <BorderBeam
              delay={randomDelay}
              reverse={index % 2 === 0}
              size={100}
            />
          ) : null}
        </div>
      </Card>
    </div>
  );
}

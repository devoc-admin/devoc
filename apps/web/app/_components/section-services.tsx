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
import { useEffect, useState } from "react";
import Lamp from "@/components/aceternity/lamp";
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
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-between gap-32 bg-zinc-950",
        // Pour scroller en dessous du faisceau
        "-scroll-m-[300px]",
        "px-6 pt-36 pb-12",
        "xs:pt-88 xs:pb-48"
      )}
      id="services"
    >
      <Lamp className={cn("hidden", "xs:flex")} />
      <SectionTitle
        description="Une gamme complète de services pour booster votre présence numérique, de la conception à la mise en ligne et au-delà 🚀"
        title="Nos Services"
      />
      <ServiceCards />
    </div>
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
    subtitle: "Créez ou améliorez votre présence en ligne",
    title: "Sites web",
  },
  {
    description:
      "Besoin d'améliorer le référencement, la performance ou l'accessibilité de votre site web ? Nous vous livrons un audit complet et une optimisation adaptée à vos besoins.",
    features: [
      "Audit SEO complet",
      "Optimisation et suivi des performances",
      "Amélioration de l'accessibilité",
    ],
    Icon: WandSparklesIcon,
    id: "audit",
    subtitle:
      "Boostez vos performances, renforcez votre sécurité et votre accessibilité",
    title: "Audit personnalisé",
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
    subtitle: "Offrez une expérience embarquée unique",
    title: "Applications mobiles",
  },
  {
    description:
      "Nous vous accompagnons dans la création de votre charte graphique et la confection de vos supports de communication.",
    features: [
      "Logo sur mesure",
      "Votre propre charte graphique",
      "Supports print et web",
    ],
    Icon: BrushIcon,
    id: "design",
    subtitle:
      "Affirmez votre identité visuelle pour vous démarquer de la concurrence et vous imposer",
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
    subtitle:
      "Utilisez l'intelligence artificielle pour automatiser vos tâches et réduire vos coûts.",
    title: "Automatisations IA",
  },
  {
    description:
      "Nous vous permettons de vous approprier vos outils et de devenir complètement autonomes. Nous nous occupons de la maintenance et des mises à jour.",
    features: [
      "Formation en présentiel",
      "Support réactif",
      "Maintenance continue",
    ],
    Icon: HandshakeIcon,
    id: "support",
    subtitle: "Restez serein avec notre expertise et notre soutien continu.",
    title: "Formation et support",
  },
];

function ServiceCards() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-[1300px] gap-8",
        "flex flex-col",
        "sm:grid sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
      )}
    >
      {services.map((service, index) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          key={service.id}
          transition={{
            delay: isDesktop ? index * 0.2 : 0,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <ServiceCard key={service.title} {...service} />
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({
  title,
  description,
  features,
  Icon,
  subtitle,
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="@container perspective-[2000px] relative aspect-4/5"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <Card
        animation={false}
        className={cn(
          "relative h-full cursor-pointer",
          "transform-3d",
          "transition-all duration-700",
          isFlipped ? "rotate-y-180" : "rotate-y-0"
        )}
      >
        {/* 🔼 Front Face */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex h-full rotate-y-0 flex-col gap-6 py-6",
            "transition-all duration-700",
            isFlipped ? "opacity-0" : "opacity-100"
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
                "mask-[radial-gradient(250px_circle_at_center,white,transparent)]"
              )}
              glow
            />
            {/* 🟪 Icon */}
            <div
              className={cn(
                "animate-pulse-shadow",
                "-mt-10 mx-auto h-[40cqw]",
                "grid aspect-square place-items-center rounded-full border-[3px] border-primary/3 text-primary",
                "z-1",
                "bg-[#392413]",
                "group-hover:bg-primary/20"
              )}
            >
              <Icon className="size-[50%]" strokeWidth={1.3} />
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
                  "@sm:text-3xl @xs:text-[1.5rem] text-2xl"
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
            <div className="grid place-items-center rounded-lg bg-primary/15 p-1.5 text-primary">
              <Repeat2Icon size={18} />
            </div>
          </CardFooter>
        </div>

        {/* 🔼 Back Face */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex h-full rotate-y-180 flex-col gap-6 pt-10 pb-6",
            "transition-all duration-700",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <CardHeader className="mt-6 px-10">
            {/* 🆎 Title */}
            <CardTitle
              className={cn(
                "font-kanit font-semibold text-3xl",
                "text-primary-foreground",
                "group-hover:text-primary"
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>

          {/* 🔡 Description */}
          <CardContent className="grow px-10">
            <CardDescription className="mb-2 text-base">
              {description}
            </CardDescription>
            <ul className={cn("mt-8", "@sm:block hidden")}>
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
                "hover:bg-primary/20 hover:text-primary"
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
        </div>
      </Card>
    </div>
  );
}

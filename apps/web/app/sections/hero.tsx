/** biome-ignore-all lint/style/useNamingConvention: React components as Props */
"use client";
import {
  ArrowRightIcon,
  ChevronsLeftRightIcon,
  type LucideProps,
  // Sparkles,
  UsersRoundIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import DevOcTitle from "@/app/components/dev-oc-title";
import Doodle from "@/app/components/doodle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const baseDelay = 0.5;
const extraDelay = 0.2;

type Kpi = {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<LucideProps>;
};

const kpiItems: Kpi[] = [
  {
    Icon: ChevronsLeftRightIcon,
    subtitle: "Projets réalisés",
    title: "50+",
  },
  {
    Icon: UsersRoundIcon,
    subtitle: "Clients satisfaits",
    title: "20+",
  },
  {
    Icon: ZapIcon,
    subtitle: "Années d'expérience",
    title: "10+",
  },
];

export default function Hero() {
  return (
    <div
      className={cn(
        "relative flex w-full select-none flex-col items-center justify-center gap-6 overflow-hidden p-6",
        "justify-start py-12",
        "h-screen sm:justify-center"
      )}
    >
      {/* 🟪 Badge - Agence web innovante */}
      {/* <motion.div
        animate={{ opacity: 1 }}
        className={cn(
          "back hidden items-center gap-2 rounded-full bg-primary/10 px-5 py-2 font-semibold text-primary backdrop-blur-sm",
          "text-xs",
          "xs:text-sm",
          "sm:flex"
        )}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, delay: baseDelay * 2 }}
      >
        <Sparkles size={16} />
        <span>Votre atelier innovante</span>
      </motion.div> */}
      {/* 🆎 Title */}
      <DevOcTitle />
      {/* 🔤 Subtitle */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "white-letters-border max-w-[60ch] select-none rounded-lg bg-white/90 p-2 text-center font-kanit text-secondary leading-tight!",
          "text-md",
          "xs:p-3 xs:text-md",
          "sm:font-semibold sm:text-lg"
        )}
        initial={{ opacity: 0, y: 50 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Nous créons des sites web, des applications sur mesure et des solutions
        d’automatisation IA pour propulser votre organisation vers le succès
        digital. Expertise technique, design moderne, résultats garantis
      </motion.p>
      {/* 🔤 Buttons */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 xs:gap-6 sm:flex-row"
        initial={{ opacity: 0, y: 50 }}
        transition={{ delay: baseDelay, duration: 0.5 }}
      >
        {/* 🆕 Démarrer un projet */}
        <HeroButton
          className={cn(
            "group bg-linear-to-r from-primary to-primary-lighter text-primary-foreground",
            "hover:bg-linear-to-r hover:from-primary hover:to-primary-lighter"
          )}
          href="#processus"
        >
          <div className="flex items-center gap-3">
            <span>Démarrer un projet</span>
            <ArrowRightIcon
              className={cn(
                "size-5 shrink-0 translate-x-0 transition-transform duration-300",
                "group-hover:translate-x-1"
              )}
            />
          </div>
        </HeroButton>
        {/* 👀 Voir nos réalisations */}
        <HeroButton
          className={cn(
            "border-2 border-primary bg-secondary text-secondary-foreground",
            "hidden",
            "sm:flex"
          )}
          href="#realisations"
        >
          <div className="flex items-center gap-3">Voir nos réalisations</div>
        </HeroButton>
      </motion.div>
      {/* 📊 KPIs */}
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={cn(
          "flex select-none",
          "mt-2 flex-col gap-4",
          "sm:mt-0 sm:flex-row sm:gap-12"
        )}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{
          damping: 15,
          delay: baseDelay + extraDelay,
          duration: 0.6,
          stiffness: 200,
          type: "spring",
        }}
      >
        {kpiItems.map((kpi) => (
          <Kpi {...kpi} key={kpi.title} />
        ))}
      </motion.div>
      <motion.div
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={cn(
          "-z-1 -scale-100 absolute bottom-0 left-1/2 w-89 translate-x-[-50%] translate-y-1/4",
          "block translate-x-[-25%]",
          "sm:hidden"
        )}
        initial={{ opacity: 0, x: -350, y: -350 }}
        transition={{ delay: baseDelay * 2, duration: 2.5 }}
      >
        <Doodle color="var(--primary)" />
      </motion.div>
    </div>
  );
}

// ----------------------------------

function HeroButton({
  className,
  children,
  href,
}: {
  className: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <Button
        className={cn(
          "w-full rounded-full font-bold",
          "px-7 py-5.5 text-base",
          "xs:px-8 xs:py-6 xs:text-lg",
          "hover:cursor-pointer",
          className
        )}
      >
        <div className="flex items-center gap-3">{children}</div>
      </Button>
    </Link>
  );
}

// ----------------------------------

function Kpi({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<LucideProps>;
}) {
  return (
    <div className="group flex flex-col items-center gap-1 rounded-xl p-3 backdrop-blur-xs">
      <div className="flex items-center gap-2 font-bold text-3xl">
        {/* 🔍 Icon */}
        <Icon
          className={cn(
            "text-primary transition-transform duration-300",
            "translate-y-0",
            "group-hover:-translate-y-0.5"
          )}
          size={34}
          strokeWidth={2}
        />
        {/* 🔤 Title */}
        <span className="font-secondary">{title}</span>
      </div>
      {/* 🔤 Subtitle */}
      <div className="text-base text-muted-foreground">{subtitle}</div>
    </div>
  );
}

/** biome-ignore-all lint/style/useNamingConvention: React components as Props */
"use client";
import {
  ArrowRightIcon,
  ChevronsLeftRightIcon,
  type LucideProps,
  Sparkles,
  UsersRoundIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Doodle from "@/app/sections/doodle";
import { AuroraText } from "@/components/magicui/aurora-text";
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
    title: "100+",
    subtitle: "Projets réalisés",
    Icon: ChevronsLeftRightIcon,
  },
  {
    title: "50+",
    subtitle: "Clients satisfaits",
    Icon: UsersRoundIcon,
  },
  {
    title: "10+",
    subtitle: "Années d'expérience",
    Icon: ZapIcon,
  },
];

export default function Hero() {
  return (
    <div
      className={cn(
        "relative flex w-full select-none flex-col items-center justify-center gap-6 p-6",
        "justify-start py-12",
        "h-screen sm:justify-center"
      )}
    >
      {/* 🟪 Badge - Agence web innovante */}
      <motion.div
        animate={{ opacity: 1 }}
        className={cn(
          "back hidden items-center gap-2 rounded-full bg-purple-200/50 px-5 py-2 font-semibold text-primary backdrop-blur-md",
          "text-xs",
          "xs:text-sm",
          "sm:flex"
        )}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, delay: baseDelay * 2 }}
      >
        <Sparkles size={16} />
        <span>Votre agence web innovante</span>
      </motion.div>
      {/* 🆎 Title */}
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative flex select-none items-center gap-2",
          "text-8xl",
          "xs:text-8xl",
          "sm:text-9xl"
        )}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, delay: baseDelay }}
      >
        <motion.div
          animate={{ opacity: 1, x: 0, y: 0 }}
          className="-z-1 absolute top-1/2 left-1/2 w-89 translate-x-[-50%] translate-y-[-50%]"
          initial={{ opacity: 0, x: -150, y: -150 }}
          transition={{ duration: 1.5, delay: baseDelay * 2 }}
        >
          <Doodle className="text-primary" color="#e9d5ff" />
        </motion.div>
        <AuroraText
          className="font-bold tracking-tighter"
          colors={["#a67de8", "#8951e1", "#6b26d9", "#561eae", "#401782"]}
          speed={3}
        >
          Sud
        </AuroraText>
        <span className="font-bold text-foreground tracking-tighter">Web</span>
      </motion.h1>
      {/* 🔤 Subtitle */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "max-w-[60ch] select-none rounded-lg p-2 text-center text-secondary leading-tight! backdrop-blur-sm",
          "text-md",
          "xs:p-3 xs:text-md",
          "sm:text-lg"
        )}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Nous créons des sites web, des applications sur mesure et des solutions
        d’automatisation IA pour propulser votre organisation vers le succès
        digital. Expertise technique, design moderne, résultats garantis.
      </motion.p>
      {/* 🔤 Buttons */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 xs:gap-6 sm:flex-row"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: baseDelay }}
      >
        {/* 🆕 Démarrer un projet */}
        <HeroButton
          className="group bg-gradient-to-r from-primary to-purple-300 text-primary-foreground"
          href="#contact"
        >
          <div className="flex items-center gap-3">
            <span>Démarrer un projet</span>
            <ArrowRightIcon
              className={cn(
                "h-4 w-4",
                "translate-x-0 transition-transform duration-300",
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
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={cn(
          "flex select-none",
          "mt-2 flex-col gap-4",
          "sm:mt-0 sm:flex-row sm:gap-12"
        )}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: baseDelay + extraDelay,
          type: "spring",
          stiffness: 200,
          damping: 15,
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
          "block",
          "sm:hidden"
        )}
        initial={{ opacity: 0, x: -150, y: -150 }}
        transition={{ duration: 1.5, delay: baseDelay * 2 }}
      >
        <Doodle className="text-primary" color="#e9d5ff" />
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

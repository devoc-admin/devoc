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
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ANIMATION_DELAY = 0.5;

const STATS = [
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
    <div className="flex select-none h-dvh w-full p-6 flex-col justify-center items-center gap-6">
      {/* 🟪 Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: ANIMATION_DELAY * 2 }}
        className="hidden sm:flex font-semibold items-center gap-2 text-xs xs:text-sm text-purple-600 bg-purple-100 rounded-full px-5 py-2"
      >
        <Sparkles size={16} />
        <span>Votre agence web innovante</span>
      </motion.div>
      {/* 🆎 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: ANIMATION_DELAY }}
        className="flex items-center select-none sm:text-9xl xs:text-8xl text-7xl gap-2"
      >
        <AuroraText
          colors={["#a67de8", "#8951e1", "#6b26d9", "#561eae", "#401782"]}
          className="font-bold"
          speed={3}
        >
          Sud
        </AuroraText>
        <span className="font-light text-foreground">Web</span>
      </motion.h1>
      {/* 🔤 Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-[60ch] select-none text-center text-base xs:text-lg sm:text-xl leading-tight text-zinc-400"
      >
        Nous créons des sites web et applications sur mesure pour propulser
        votre organisation vers le succès digital. Expertise technique, design
        moderne, résultats garantis.
      </motion.p>
      {/* 🔤 Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: ANIMATION_DELAY }}
        className="flex xs:gap-6 gap-3 flex-col sm:flex-row"
      >
        <HeroButton className="bg-gradient-to-r from-purple-600 to-purple-400">
          <div className="flex gap-3 items-center">
            <span>Démarrer un projet</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </HeroButton>
        <HeroButton className="bg-black border-2 border-purple-600">
          <div className="flex gap-3 items-center">
            <span>Voir nos réalisations</span>
          </div>
        </HeroButton>
      </motion.div>
      {/* 📊 Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: ANIMATION_DELAY + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="flex mt-8 sm:mt-0 sm:gap-12 gap-8 flex-col sm:flex-row select-none"
      >
        {STATS.map(({ title, subtitle, Icon }) => (
          <ItemStat key={title} title={title} subtitle={subtitle} Icon={Icon} />
        ))}
      </motion.div>
    </div>
  );
}

function HeroButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      className={cn(
        "rounded-full hover:cursor-pointer xs:px-8 xs:py-6 px-7 py-5.5 text-base xs:text-lg font-bold",
        className,
      )}
    >
      <div className="flex gap-3 items-center">{children}</div>
    </Button>
  );
}

function ItemStat({
  title,
  subtitle,
  Icon,
}: {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<LucideProps>;
}) {
  return (
    <div className="group flex flex-col items-center gap-1">
      <div className="text-3xl font-bold flex items-center gap-2">
        <Icon
          size={34}
          className="text-purple-600 group-hover:-translate-y-1 transition-all duration-300"
          strokeWidth={2}
        />
        <span className="font-black">{title}</span>
      </div>
      <div className="text-base text-gray-500">{subtitle}</div>
    </div>
  );
}

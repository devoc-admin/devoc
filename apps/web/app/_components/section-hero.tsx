/** biome-ignore-all lint/a11y/noSvgWithoutTitle: Exception */
"use client";
import {
  ArrowRightIcon,
  ChevronsLeftRightIcon,
  type LucideProps,
  UsersRoundIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "motion/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CubeShape from "@/assets/shapes/cube.png";
import DiamondShape from "@/assets/shapes/diamond.png";
import DonutShape from "@/assets/shapes/donut.png";
import SphereShape from "@/assets/shapes/sphere.png";
import { AvatarStack } from "@/components/kibo-ui/avatar-stack";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const baseDelay = 0.5;
const extraDelay = 0.2;

const intialPageDelayInMs = 1500;

export default function Hero() {
  useInitLoading();

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-12"
      )}
    >
      <Shapes />
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-xl p-4">
        <div className="flex flex-col items-center backdrop-blur-xs">
          <DevOc />
          <Subtitle />
        </div>
        <HeroButtons />
        <Kpis />
        <Founders />
      </div>
    </div>
  );
}

// ----------------------------------

function useInitLoading() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setShowLoader(false),
      intialPageDelayInMs
    );
    return () => clearTimeout(timeoutId);
  }, []);

  return {
    showLoader,
  };
}

// ----------------------------------

function Shapes() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const effectiveParallaxOffset = parallaxOffset * 0.5;

  // 📱 Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ⇅ Parallax effect (disabled on mobile)
  useEffect(() => {
    if (isMobile) return; // Skip parallax on mobile

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const displacement = scrollY * -0.3;
          setParallaxOffset(displacement);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="-z-1 absolute h-full w-full max-w-[1400px]">
      <Shape
        className={cn(
          "-translate-x-1/2 -translate-y-1/2",
          "top-[9%] left-[28%]",
          "xs:top-[13%] xs:left-[28%]",
          "sm:top-[13%] sm:left-[16%]",
          "md:top-[17%] md:left-[15%]",
          "lg:top-[19%] lg:left-[19%]",
          "lg:left-[19%] xl:top-[25%]"
        )}
        parallaxOffset={effectiveParallaxOffset}
        src={CubeShape}
      />
      <Shape
        className={cn(
          "-translate-y-1/2 translate-x-1/2",
          "top-[17%] right-[23%]",
          "xs:top-[22%] xs:right-[18%]",
          "sm:top-[28%] sm:right-[15%]",
          "md:top-[28%] md:right-[16%]",
          "lg:top-[33%] lg:right-[16%]",
          "xl:top-[36%] xl:right-[23%]"
        )}
        parallaxOffset={effectiveParallaxOffset}
        src={DiamondShape}
      />
      <Shape
        className={cn(
          "-translate-x-1/2 translate-y-1/2",
          "bottom-[12%] left-[22%]",
          "xs:bottom-[17%] xs:left-[24%]",
          "sm:bottom-[13%] sm:left-[20%]",
          "md:bottom-[16%] md:left-[22%]",
          "lg:bottom-[16%] lg:left-[22%]",
          "xl:bottom-[24%] xl:left-[19%]"
        )}
        parallaxOffset={effectiveParallaxOffset}
        src={DonutShape}
      />
      <Shape
        className={cn(
          "translate-x-1/2 translate-y-1/2",
          "right-[22%] bottom-[20%]",
          "xs:right-[22%] xs:bottom-[20%]",
          "sm:right-[24%] sm:bottom-[18%]",
          "md:right-[24%] md:bottom-[22%]",
          "lg:right-[14%] lg:bottom-[22%]",
          "xl:right-[20%] xl:bottom-[18%]"
        )}
        parallaxOffset={effectiveParallaxOffset}
        src={SphereShape}
      />
    </div>
  );
}

function Shape({
  src,
  className,
  parallaxOffset,
}: {
  src: StaticImageData;
  parallaxOffset: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: [0, 3, -2, 4, 0, -1, 0],
        y: [
          parallaxOffset,
          parallaxOffset - 8,
          parallaxOffset - 5,
          parallaxOffset - 10,
          parallaxOffset - 15,
          parallaxOffset - 8,
          parallaxOffset,
        ],
      }}
      className={cn(
        className,
        "absolute",
        "w-[200px]",
        "xs:w-[250px]",
        "sm:w-[275px]",
        "md:w-[300px]",
        "lg:w-[350px]",
        "xl:w-[400px]"
      )}
      initial={{ opacity: 0 }}
      style={{ y: parallaxOffset }}
      transition={{
        delay: Math.random(),
        duration: 9 + Math.random() * 3,
        ease: "easeInOut",
        opacity: {
          duration: 1,
          ease: "easeInOut",
        },
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <Image alt="shape" height={400} src={src} width={400} />
    </motion.div>
  );
}

// ----------------------------------
function DevOc() {
  return (
    <motion.h1
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative flex select-none items-center p-6 pb-1",
        "text-8xl",
        "xs:text-9xl",
        "sm:text-[9rem]",
        "md:text-[10rem]",
        "lg:text-[11rem]",
        "xl:text-[12rem]"
      )}
      initial={{ opacity: 0, y: -50 }}
      transition={{ delay: baseDelay, duration: 0.5 }}
    >
      {/*<DoodleTop/>*/}
      <div className={cn("font-style-script", "pt-4")}>Dev'</div>
      <AuroraText
        className="font-extrabold font-geist text-transparent tracking-tighter"
        colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
      >
        Oc
      </AuroraText>
    </motion.h1>
  );
}

// ----------------------------------
function Subtitle() {
  return (
    <motion.p
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-[45ch] max-w-[90vw] text-center font-kanit font-semibold text-secondary leading-tight!",
        "text-sm",
        "xs:text-lg"
      )}
      initial={{ opacity: 0, y: 50 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <span>
        Nous créons des sites web, des applications sur mesure et des solutions
        d’automatisation IA pour propulser votre organisation vers le succès
        digital.
      </span>
    </motion.p>
  );
}

// ----------------------------------
function HeroButtons() {
  return (
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
  );
}

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

function Kpis() {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        "select-none",
        "hidden",
        "sm:flex",
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
  );
}

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
    <div className="group flex flex-col items-center justify-center gap-1 whitespace-nowrap rounded-xl p-6 text-center backdrop-blur-xs">
      <div className="flex items-center gap-2 font-bold text-3xl">
        {/* 🔍 Icon */}
        <svg className="size-0">
          <defs>
            <linearGradient
              id={`icon-gradient-${title}`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
        <Icon
          className={cn(
            "transition-transform duration-300",
            "translate-y-0",
            "group-hover:-translate-y-0.5"
          )}
          size={34}
          stroke={`url(#icon-gradient-${title})`}
          strokeWidth={2}
        />
        {/* 🔤 Title */}
        <span className="text-secondary">{title}</span>
      </div>
      {/* 🔤 Subtitle */}
      <div className="font-semibold text-base text-zinc-800">{subtitle}</div>
    </div>
  );
}

// ----------------------------------
function Founders() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg px-6 py-4 font-fira-code">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ delay: 0.7, duration: 0.25 }}
      >
        <div>Fondateurs</div>
      </motion.div>
      <AvatarStack>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.5, duration: 0.25 }}
        >
          <Avatar>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://github.com/cdubos-fr"
                  rel="noopener"
                  target="_blank"
                >
                  <AvatarImage src="https://avatars.githubusercontent.com/u/52322202" />
                  <AvatarFallback>CB</AvatarFallback>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>Clément Dubos</TooltipContent>
            </Tooltip>
          </Avatar>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.6, duration: 0.25 }}
        >
          <Avatar>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/thibautizard"
                  rel="noopener"
                  target="_blank"
                >
                  <AvatarImage src="https://avatars.githubusercontent.com/u/8688023" />
                  <AvatarFallback>TI</AvatarFallback>
                </a>
              </TooltipTrigger>
              <TooltipContent>Thibaut Izard</TooltipContent>
            </Tooltip>
          </Avatar>
        </motion.div>
      </AvatarStack>
    </div>
  );
}

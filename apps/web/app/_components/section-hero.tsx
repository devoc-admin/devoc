"use client";
import { motion } from "motion/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import CubeShape from "@/assets/shapes/cube.png";
import DiamondShape from "@/assets/shapes/diamond.png";
import DonutShape from "@/assets/shapes/donut.png";
import SphereShape from "@/assets/shapes/sphere.png";
import { ContainerTextFlip } from "@/components/aceternity/container-text-flip";
import { AvatarStack } from "@/components/kibo-ui/avatar-stack";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RatingBadge } from "@/components/untitledui/rating-badge";
import { cn } from "@/lib/utils";

const heroEntryDelay = 0.5;
const heroEntryDuration = 0.5;

export default function Hero() {
  return (
    <WithNavbar>
      <Shapes />
      <div className="flex flex-col items-center gap-y-6">
        <DevOc />
        <KeywordsRotating />
        <Description />
        <OpenCarcaWinner />
      </div>
      <div className={cn("absolute", "bottom-6")}>
        <SeeOurProjects />
        <Founders />
      </div>
    </WithNavbar>
  );
}

// ----------------------------------
function WithNavbar({ children }: { children: React.ReactNode }) {
  const { ref: sectionRef } = useNavTheme({
    sectionName: "home",
    theme: "light",
  });

  return (
    <div
      className={cn(
        "min-h-svh w-full",
        "relative flex grow items-center justify-center overflow-hidden px-6 py-12"
      )}
      ref={sectionRef}
    >
      {children}
    </div>
  );
}

// ----------------------------------
// 🌿 Wreaths
function OpenCarcaWinner() {
  return (
    <FadeScaleEntry>
      <a
        href="https://www.carcassonne-agglo.fr/actualite/carcassonne-agglo-apporte-son-concours-2/#:~:text=prix%20revient%20%C3%A0%20Cl%C3%A9ment%20Dubos%20et%20Thibaut%20Izard%20pour%20%C2%AB%20Dev%E2%80%99Oc%20%C2%BB,%20un%20collectif%20de%20d%C3%A9veloppeurs%20informatique%20qui%20souhaitent%20proposer%20des%20services%20de%20mise%20en%20conformit%C3%A9%20de%20sites%20Internet%20aux%20collectivit%C3%A9s%20territoriales"
        rel="noopener"
        target="_blank"
        title="Lien vers la page d'annnonce des résultats du concours OpenCarca 2025"
      >
        <RatingBadge
          className={cn(
            "mx-auto text-amber-400",
            "[@media(max-height:850px)]:hidden" // Hide if viewport height is too small
          )}
        >
          <div
            className={cn(
              "mt-4 flex flex-col gap-y-1.5",
              "max-w-50",
              "text-center font-bold text-base leading-none",
              "bg-linear-to-br from-primary-strong via-primary-lighter to-primary bg-clip-text text-transparent"
            )}
          >
            <span>Lauréats concours Open Carca 2025</span>
            <span className="text-[0.6rem] uppercase">Catégorie émergence</span>
          </div>
        </RatingBadge>
      </a>
    </FadeScaleEntry>
  );
}

// ----------------------------------
// 🔲 Shapes
function Shapes() {
  const { effectiveParallaxOffset } = useShapesParallaxEffect();
  return (
    <div
      className={cn(
        "absolute -z-1",
        "h-full w-full max-w-350",
        "opacity-50 blur-xs",
        "sm:opacity-100 sm:blur-none"
      )}
    >
      <Shape
        className={cn(
          "-translate-x-1/2 -translate-y-1/2",
          "top-[25%] left-[28%]",
          "xs:top-[13%] xs:left-[28%]",
          "sm:top-[13%] sm:left-[16%]",
          "md:top-[17%] md:left-[15%]",
          "lg:top-[19%] lg:left-[19%]",
          "lg:left-[19%] xl:top-[25%]"
        )}
        parallaxCoeff={4}
        parallaxOffset={effectiveParallaxOffset}
        src={CubeShape}
      />
      <Shape
        className={cn(
          "translate-x-1/2 -translate-y-1/2",
          "top-[12%] right-[23%]",
          "xs:top-[22%] xs:right-[18%]",
          "sm:top-[28%] sm:right-[15%]",
          "md:top-[28%] md:right-[16%]",
          "lg:top-[33%] lg:right-[16%]",
          "xl:top-[36%] xl:right-[19%]"
        )}
        parallaxCoeff={3}
        parallaxOffset={effectiveParallaxOffset}
        src={DiamondShape}
      />
      <Shape
        className={cn(
          "-translate-x-1/2 translate-y-1/2",
          "bottom-[20%] left-[22%]",
          "xs:bottom-[17%] xs:left-[24%]",
          "sm:bottom-[13%] sm:left-[20%]",
          "md:bottom-[16%] md:left-[22%]",
          "lg:bottom-[16%] lg:left-[22%]",
          "xl:bottom-[24%] xl:left-[19%]"
        )}
        parallaxCoeff={2}
        parallaxOffset={effectiveParallaxOffset}
        src={DonutShape}
      />
      <Shape
        className={cn(
          "translate-x-1/2 translate-y-1/2",
          "right-[16%] bottom-[27%]",
          "xs:right-[22%] xs:bottom-[20%]",
          "sm:right-[24%] sm:bottom-[18%]",
          "md:right-[24%] md:bottom-[22%]",
          "lg:right-[14%] lg:bottom-[22%]",
          "xl:right-[20%] xl:bottom-[18%]"
        )}
        parallaxCoeff={1}
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
  parallaxCoeff,
}: {
  src: StaticImageData;
  parallaxOffset: number;
  parallaxCoeff: number;
  className?: string;
}) {
  const { isMobile } = useMobile();
  const parallaxValue = parallaxOffset * parallaxCoeff;
  return (
    <motion.div
      animate={{
        opacity: 1,
        // 📱 Simplified animation on mobile: only 3 keyframes instead of 7
        x: isMobile ? [0, 2, 0] : [0, 3, -2, 4, 0, -1, 0],
        y: isMobile
          ? [parallaxValue, parallaxValue - 5, parallaxValue]
          : [
              parallaxValue,
              parallaxValue - 8,
              parallaxValue - 5,
              parallaxValue - 10,
              parallaxValue - 15,
              parallaxValue - 8,
              parallaxValue,
            ],
      }}
      className={cn(
        className,
        "absolute",
        "w-60",
        "xs:w-68.75",
        "sm:w-75",
        "md:w-75",
        "lg:w-75",
        "xl:w-100"
      )}
      initial={{ opacity: 0 }}
      style={{ y: parallaxValue }}
      transition={{
        delay: Math.random(),
        // Slower animation on mobile (12-18s instead of 9-12s)
        duration: isMobile ? 12 + Math.random() * 6 : 9 + Math.random() * 3,
        ease: "easeInOut",
        opacity: {
          duration: 1,
          ease: "easeInOut",
        },
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <Image alt="" aria-hidden="true" height={400} src={src} width={400} />
    </motion.div>
  );
}

function useShapesParallaxEffect() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const effectiveParallaxOffset = parallaxOffset * 0.5;

  const isMobile = useMediaQuery("(max-width: 768px)");

  // ⇅ Parallax effect (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;
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

  return {
    effectiveParallaxOffset,
  };
}

// ----------------------------------
const keywords = [
  "🔒 Sécurité",
  "👁️ Accessibilité",
  "⚡ Performance",
  "🎨 Design",
];

function KeywordsRotating() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      <div className={cn("flex flex-col gap-y-1", "-mt-8", "xs:-mt-10")}>
        <div className="text-center font-kanit font-normal text-base">
          Votre expert de proximité en
        </div>
        <ContainerTextFlip words={keywords} />
      </div>
    </motion.div>
  );
}

// ----------------------------------
function DevOc() {
  return (
    <FadeMoveDown>
      <h1
        className={cn(
          "relative flex select-none items-center px-6",
          "text-8xl",
          "xs:text-9xl",
          "sm:text-[9rem]",
          "md:text-[10rem]",
          "lg:text-[11rem]",
          "xl:text-[12rem]"
        )}
      >
        <div className={cn("font-style-script", "pt-4")}>Dev'</div>
        <AuroraText
          className="font-extrabold font-geist text-transparent tracking-tighter"
          colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
        >
          Oc
        </AuroraText>
      </h1>
    </FadeMoveDown>
  );
}

function FadeMoveDown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -50 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------
function Description() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      <div
        className={cn(
          "mx-auto",
          "w-[45ch] max-w-[90vw] text-center font-kanit font-semibold text-secondary leading-tight!",
          "text-base",
          "xs:text-lg"
        )}
      >
        Nous créons des sites web, des applications sur mesure et des solutions
        d’automatisation IA pour propulser votre organisation vers le succès
        digital.
      </div>
    </motion.div>
  );
}

// ----------------------------------
// 📂 See our projects
function SeeOurProjects() {
  return (
    <FadeMoveUp>
      <Link href="#realisations">
        <ShimmerButton
          className={cn(
            "font-kanit",
            "h-12 px-8 text-md",
            "xs:h-13 xs:px-12 xs:text-lg",
            "sm:h-13 sm:px-12 sm:text-xl"
          )}
          shimmerSize="2px"
        >
          Voir nos réalisations
        </ShimmerButton>
      </Link>
    </FadeMoveUp>
  );
}

function FadeMoveUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------
// 👑 Founders
function Founders() {
  return (
    <div
      className={cn(
        "hidden",
        "sm:flex",
        "flex-col items-center gap-2 rounded-lg px-6 py-4 font-fira-code"
      )}
    >
      <FadeScaleEntry>
        <div className={cn("text-sm", "xs:text-base")}>Fondateurs</div>
      </FadeScaleEntry>
      <AvatarStack>
        <PopEntry>
          <AvatarWithTooltip
            fallback="CB"
            name="Clément Dubos"
            url="https://github.com/cdubos-fr"
            urlImage="https://avatars.githubusercontent.com/u/52322202"
          />
        </PopEntry>
        <PopEntry extraDelay={0.25}>
          <AvatarWithTooltip
            fallback="TI"
            name="Thibaut Izard"
            url="https://github.com/thibautizard"
            urlImage="https://avatars.githubusercontent.com/u/8688023"
          />
        </PopEntry>
      </AvatarStack>
    </div>
  );
}

function AvatarWithTooltip({
  name,
  fallback,
  url,
  urlImage,
}: {
  name: string;
  fallback: string;
  url: string;
  urlImage: string;
}) {
  return (
    <Avatar>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            aria-label={`Profil GitHub de ${name} (ouvre dans une nouvelle fenêtre)`}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            title={`Visiter le profil GitHub de ${name}`}
          >
            <AvatarImage
              alt={`Photo de profil de ${name}`}
              role="img"
              src={urlImage}
            />
            <AvatarFallback aria-label={`Initiales de ${name}`}>
              {fallback}
            </AvatarFallback>
          </a>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </Avatar>
  );
}

// ------------------------------------------------------
// 🤹 Animations
function FadeScaleEntry({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        delay: heroEntryDelay * 3,
        duration: heroEntryDuration / 2,
      }}
    >
      {children}
    </motion.div>
  );
}

function PopEntry({
  children,
  extraDelay = 0,
}: {
  children: React.ReactNode;
  extraDelay?: number;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        delay: heroEntryDelay * 4 + extraDelay,
        duration: heroEntryDuration / 2,
      }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------
// 📱 Mobile
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    let timeoutId: NodeJS.Timeout;
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedCheckMobile);
    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
      clearTimeout(timeoutId);
    };
  }, []);
  return { isMobile };
}

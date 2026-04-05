"use client";
import { motion } from "motion/react";
import Link from "next/link";
import useNavTheme from "@/app/_hooks/use-nav-theme.ts";
import { ContainerTextFlip } from "@/components/aceternity/container-text-flip.tsx";
import { AvatarStack } from "@/components/kibo-ui/avatar-stack/index.tsx";
import { AuroraText } from "@/components/magicui/aurora-text.tsx";
import { ShimmerButton } from "@/components/magicui/shimmer-button.tsx";
import SpecularBandsBackground from "@/components/motion-core/specular-band/specular-band-background.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { RatingBadge } from "@/components/untitledui/rating-badge.tsx";
import { OPEN_CARCA_WINNER_URL } from "@/constants";
import { cn } from "@/lib/utils.ts";

const heroEntryDelay = 0.5;
const heroEntryDuration = 0.5;

export default function Hero() {
  return (
    <WithNavbar>
      <Background />
      <div className={cn("flex flex-col items-center gap-y-6")}>
        <DevOc />
        <Keywords />
        <OpenCarcaWinner />
      </div>
      <div className={cn("absolute", "bottom-10")}>
        <SeeOurProjects />
        <Founders />
      </div>
    </WithNavbar>
  );
}

// ----------------------------------
// 🖼️ Background
function Background() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={cn(
        "absolute -z-1 h-full w-full opacity-40",
        "mask-b-from-80% mask-b-to-100%"
      )}
      initial={{ opacity: 0 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      <SpecularBandsBackground
        backgroundColor="#ffffff"
        className="h-full w-full"
        speed={0.5}
      />
    </motion.div>
  );
}

// ----------------------------------
// 🧭
function WithNavbar({ children }: { children: React.ReactNode }) {
  const { ref: sectionRef } = useNavTheme({
    sectionName: "home",
    theme: "light",
  });

  return (
    <div
      className={cn(
        "relative",
        "flex grow items-center justify-center",
        "min-h-svh w-full",
        "overflow-hidden",
        "px-6 py-12"
      )}
      ref={sectionRef}
    >
      {children}
    </div>
  );
}

// ----------------------------------
// 🏢
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
const keywords = [
  "🔒 Sécurité",
  "👁️ Accessibilité",
  "⚡ Performance",
  "🎨 Design",
];

function Keywords() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: heroEntryDelay, duration: heroEntryDuration }}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-y-1",
          "-mt-8 xs:-mt-10"
        )}
      >
        <div className="text-center font-kanit font-normal text-base">
          Votre expert de proximité en
        </div>
        <ContainerTextFlip words={keywords} />
      </div>
    </motion.div>
  );
}

// ----------------------------------
// 🌿

function OpenCarcaWinner() {
  return (
    <FadeScaleEntry>
      <a
        href={OPEN_CARCA_WINNER_URL}
        rel="noopener"
        target="_blank"
        title="Lien vers la page d'annnonce des résultats du concours OpenCarca 2025"
      >
        <RatingBadge
          className={cn(
            "mx-auto text-amber-400",
            "hidden",
            "[@media(min-height:625px)]:flex" // Hide if viewport height is too small
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
// 📂 See our projects
function SeeOurProjects() {
  return (
    <FadeMoveUp>
      <Link href="#realisations">
        <ShimmerButton
          className={cn(
            "hidden",
            "[@media(min-height:500px)]:block",
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
// 👑
function Founders() {
  return (
    <div
      className={cn(
        "hidden",
        "[@media(min-height:750px)]:flex",
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

// ==================================================================
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

// ==================================================================
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

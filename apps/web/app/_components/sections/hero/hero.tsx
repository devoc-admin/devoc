"use client";
import { cn } from "@/lib/utils.ts";
import { useFontsReady } from "../../../_hooks/use-font-ready";
import { BadgePackCommunes } from "./components/badge-pack-communes";
import { CSSEntryAnimation } from "./components/css-entry-animation";
import { HeroBackground as Background } from "./components/hero-background";
import {
  DecouvrirLeCollectifButton,
  DemarrerUnProjetButton,
} from "./components/hero-buttons";
import { HeroFounders } from "./components/hero-founders";
import { HeroKeywords as Keywords } from "./components/hero-keywords";
import { HeroSubtitle as Description } from "./components/hero-subtitle";
import { DevOc } from "./components/hero-title";

export function Hero() {
  return (
    <GlobalContainer>
      <Background />
      <ContentContainer>
        <DevOc />
        <Description />
        <Keywords />

        <BadgePackCommunes />

        <BottomContainer>
          <ButtonsContainer>
            <DemarrerUnProjetButton />
            <DecouvrirLeCollectifButton />
          </ButtonsContainer>
          <HeroFounders />
        </BottomContainer>
      </ContentContainer>
    </GlobalContainer>
  );
}

// 📦
function GlobalContainer({ children }: { children: React.ReactNode }) {
  const fontsReady = useFontsReady();
  return (
    <div
      className={cn(
        "grid",
        "min-h-svh",
        // ↔️
        "justify-items-center lg:justify-items-start",
        "items-end"
      )}
    >
      {fontsReady ? children : null}
    </div>
  );
}

// 📦
function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "w-full",
        "max-w-550",
        "mx-auto",
        // ↔️
        "px-10 lg:px-16 xl:px-22 2xl:px-32",
        "py-6 lg:py-10 2xl:py-12"
      )}
    >
      {children}
    </div>
  );
}

// 📦
function BottomContainer({ children }: { children: React.ReactNode }) {
  return (
    <CSSEntryAnimation
      className={cn(
        "flex items-center",
        // ↔️
        "flex-col lg:flex-row",
        "justify-between",
        "mt-12 lg:mt-14 xl:mt-16 2xl:mt-18",
        "gap-10 xs:gap-8 md:gap-12"
      )}
      position={5}
    >
      {children}
    </CSSEntryAnimation>
  );
}

// 📦
function ButtonsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex",
        // ↔️
        "flex-col sm:flex-row",
        "gap-3 sm:gap-4 md:gap-5"
      )}
    >
      {children}
    </div>
  );
}

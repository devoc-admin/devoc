"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme.ts";
import { cn } from "@/lib/utils.ts";
import { useFontsReady } from "../../../_hooks/use-font-ready";
import { BadgePackCommunes } from "./components/badge-pack-communes";
import { CSSEntryAnimation } from "./components/css-entry-animation";
import { DevOcHeroTitle } from "./components/dev-oc-hero-title";
import { HeroBackground } from "./components/hero-background";
import {
  DecouvrirLeCollectifButton,
  DemarrerUnProjetButton,
} from "./components/hero-buttons";
import { HeroFounders } from "./components/hero-founders";
import { HeroKeywords } from "./components/hero-keywords";
import { HeroSubtitle } from "./components/hero-subtitle";

export function Hero() {
  const fontsReady = useFontsReady();
  return (
    <WithNavbar>
      {fontsReady && (
        <>
          <HeroBackground />
          {/* 🆎🔠 */}
          <GlobalContainer>
            {/* 🆎 */}
            <DevOcHeroTitle />

            {/* 🔠 */}
            <HeroSubtitle />

            {/* 🔤 */}
            <HeroKeywords />

            {/* 🟡 */}
            <BadgePackCommunes />

            {/* 🆕🆕 | 🐵🐵*/}
            <BottomContainer>
              {/* 🆕🆕 */}
              <ButtonsContainer>
                <DemarrerUnProjetButton />
                <DecouvrirLeCollectifButton />
              </ButtonsContainer>

              {/* 🐵🐵 */}
              <HeroFounders />
            </BottomContainer>
          </GlobalContainer>
        </>
      )}
    </WithNavbar>
  );
}

// 📦
function GlobalContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0",
        "w-full",
        // ↔️
        "px-10 py-6",
        "xs:px-10 xs:py-6",
        "sm:px-10 sm:py-6",
        "md:px-10 md:py-6",
        "lg:px-16 lg:py-10",
        "xl:px-22 xl:py-10",
        "2xl:px-32 2xl:py-12"
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
        "flex",
        // ↔️
        "mt-12 flex-col items-center gap-y-10",
        "xs:mt-12 xs:flex-col xs:items-center xs:gap-y-8",
        "sm:mt-12 sm:flex-col sm:items-center sm:justify-between sm:gap-y-8",
        "md:mt-12 md:flex-col md:items-center md:justify-between md:gap-y-12",
        "lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:gap-y-12",
        "xl:mt-16 xl:flex-row xl:items-center xl:justify-between xl:gap-y-12",
        "2xl:mt-18 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-y-12"
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
        "flex-col gap-y-3",
        "xs:flex-col xs:gap-y-3",
        "sm:flex-row sm:gap-x-4",
        "md:flex-row md:gap-x-5"
      )}
    >
      {children}
    </div>
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
        "relative z-10",
        "bg-white",
        "flex grow",
        "items-center justify-center",
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

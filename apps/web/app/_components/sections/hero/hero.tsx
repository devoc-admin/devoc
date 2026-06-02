"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme.ts";
import { cn } from "@/lib/utils.ts";
import { useFontsReady } from "../../../_hooks/use-font-ready";
import { BadgePackCommunes } from "./components/badge-pack-communes";
import { DevOcHeroTitle } from "./components/dev-oc-hero-title";
import { HeroBackground } from "./components/hero-background";
import {
  DecouvrirLeCollectifButton,
  DemarrerUnProjetButton,
} from "./components/hero-buttons";
import { HeroFounders } from "./components/hero-founders";
import { HeroKeywords } from "./components/hero-keywords";
import { HeroSubtitle } from "./components/hero-subtitle";
import s from "./components/styles.module.css";
export function Hero() {
  const fontsReady = useFontsReady();
  return (
    <WithNavbar>
      {fontsReady && (
        <>
          <HeroBackground />
          {/* 🆎🔠 */}
          <div
            className={cn(
              "absolute bottom-0 left-0",
              "w-full",
              // ↔️
              "px-6 py-6",
              "xs:px-6 xs:py-6",
              "sm:px-10 sm:py-6",
              "md:px-10 md:py-6",
              "lg:px-16 lg:py-10",
              "xl:px-22 xl:py-10",
              "2xl:px-32 2xl:py-12"
            )}
          >
            {/* 🆎 */}
            <CSSEntryAnimation
              className={cn(
                // ↔️
                "mb-0",
                "xs:mb-0",
                "sm:mb-0",
                "md:mb-0",
                "lg:mb-2",
                "xl:mb-4",
                "2xl:mb-6"
              )}
              position={1}
            >
              <DevOcHeroTitle />
            </CSSEntryAnimation>

            {/* 🔠 */}
            <CSSEntryAnimation className="max-w-220" position={2}>
              <HeroSubtitle />
            </CSSEntryAnimation>

            {/* 🔤 */}
            <CSSEntryAnimation
              className={cn(
                // ↔️
                "mt-4",
                "xs:mt-4",
                "sm:mt-2",
                "md:mt-2",
                "lg:mt-3",
                "xl:mt-3"
              )}
              position={3}
            >
              <HeroKeywords />
            </CSSEntryAnimation>

            {/* 🟡 */}
            <CSSEntryAnimation position={4}>
              <BadgePackCommunes
                className={cn(
                  // ↔️
                  "hidden",
                  "xs:mx-auto xs:mt-5 xs:flex",
                  "sm:mx-auto sm:mt-5 sm:flex",
                  "md:mx-auto md:mt-6 md:flex",
                  "lg:mx-0 lg:mt-6 lg:flex",
                  "xl:mx-0 xl:mt-7 xl:flex",
                  "2xl:mx-0 2xl:mt-7 2xl:flex"
                )}
              />
            </CSSEntryAnimation>

            {/* 🆕🆕 | 🐵🐵*/}
            <CSSEntryAnimation
              className={cn(
                "flex",
                // ↔️
                "mt-12 flex-col items-start gap-y-10",
                "xs:mt-12 xs:flex-col xs:items-center xs:gap-y-8",
                "sm:mt-12 sm:flex-col sm:items-center sm:justify-between sm:gap-y-8",
                "md:mt-12 md:flex-col md:items-center md:justify-between md:gap-y-12",
                "lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:gap-y-12",
                "xl:mt-16 xl:flex-row xl:items-center xl:justify-between xl:gap-y-12",
                "2xl:mt-18 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-y-12"
              )}
              position={5}
            >
              {/* 🆕🆕 */}
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
                <DemarrerUnProjetButton />
                <DecouvrirLeCollectifButton />
              </div>

              {/* 🐵🐵 */}
              <HeroFounders />
            </CSSEntryAnimation>
          </div>
        </>
      )}
    </WithNavbar>
  );
}

// ✨
function CSSEntryAnimation({
  children,
  className,
  position,
}: {
  children: React.ReactNode;
  className?: string;
  position: number;
}) {
  return (
    <div
      className={cn(s.heroEntry, className)}
      style={
        {
          "--position": position,
        } as React.CSSProperties
      }
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

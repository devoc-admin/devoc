"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme.ts";
import { cn } from "@/lib/utils.ts";
import { useFontsReady } from "../../../_hooks/use-font-ready";
import { DevOcHeroTitle } from "./components/dev-oc-hero-title";
import { HeroBackground } from "./components/hero-background";
import {
  DecouvrirLeCollectifButton,
  DemarrerUnProjetButton,
} from "./components/hero-buttons";
import { HeroFounders } from "./components/hero-founders";
import { HeroKeywords } from "./components/hero-keywords";
import { HeroSubtitle } from "./components/hero-subtitle";
import { OpenCarcaWinner } from "./components/open-carca-winner";
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
              "px-6 py-2",
              "xs:px-6 xs:py-4",
              "sm:px-10 sm:py-4",
              "md:px-10 md:py-6",
              "lg:px-12 lg:py-10",
              "xl:px-22 xl:py-10",
              "2xl:px-34 2xl:py-24"
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

            {/* 🌿 */}
            <CSSEntryAnimation
              className={cn(
                "grid",
                // ↔️
                "mx-0 mt-4 place-items-start",
                "xs:mx-auto xs:mt-8 xs:place-items-center",
                "sm:mx-auto sm:mt-8 sm:place-items-center",
                "md:mx-auto md:mt-12 md:place-items-center",
                "lg:mx-auto lg:mt-12 lg:place-items-start"
              )}
              position={4}
            >
              <OpenCarcaWinner />
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
                "lg:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-y-12",
                "xl:mt-16 xl:flex-row xl:items-end xl:justify-between xl:gap-y-12",
                "2xl:mt-18 2xl:flex-row 2xl:items-end 2xl:justify-between 2xl:gap-y-12"
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

  // biome-ignore lint/correctness/noUnreachable: kept for quick toggle while iterating on hero background
  return (
    <WithNavbar>
      {fontsReady && (
        <>
          {/* 🖼️*/}
          <HeroBackground />
          {/* 🆎🔠 */}
          <div
            className={cn("absolute bottom-0 left-0", "w-full", "px-30 py-24")}
          >
            {/* 🆎 */}
            <CSSEntryAnimation className="mb-10" position={1}>
              <DevOcHeroTitle />
            </CSSEntryAnimation>

            {/* 🔠 */}
            <CSSEntryAnimation className="max-w-250" position={2}>
              <HeroSubtitle />
            </CSSEntryAnimation>

            {/* 🔤 */}
            <CSSEntryAnimation className="mt-2" position={3}>
              <HeroKeywords />
            </CSSEntryAnimation>

            {/* 🌿 */}
            <CSSEntryAnimation className="mt-8" position={4}>
              <OpenCarcaWinner />
            </CSSEntryAnimation>

            {/* 🆕🆕 | 🐵🐵*/}
            <CSSEntryAnimation
              className="mt-12 flex items-center justify-between"
              position={5}
            >
              {/* 🆕🆕 */}
              <div className={cn("flex gap-x-3")}>
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

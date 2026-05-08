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
          {/* 🖼️*/}
          <HeroBackground />
          {/* 🆎🔠 */}
          <div
            className={cn("absolute bottom-0 left-0", "w-full", "px-30 py-24")}
          >
            {/* 🆎 */}
            <div
              className={cn(s.heroEntry, "mb-10")}
              style={
                {
                  "--position": 1,
                } as React.CSSProperties
              }
            >
              <DevOcHeroTitle />
            </div>

            {/* 🔠 */}
            <div
              className={cn(s.heroEntry, "max-w-250")}
              style={
                {
                  "--position": 2,
                } as React.CSSProperties
              }
            >
              <HeroSubtitle />
            </div>

            {/* 🔤 */}
            <div
              className={cn(s.heroEntry, "mt-2")}
              style={
                {
                  "--position": 3,
                } as React.CSSProperties
              }
            >
              <HeroKeywords />
            </div>

            {/* 🌿 */}
            <div
              className={cn(s.heroEntry, "mt-8")}
              style={
                {
                  "--position": 4,
                } as React.CSSProperties
              }
            >
              <OpenCarcaWinner />
            </div>

            {/* 🆕🆕 | 🐵🐵*/}
            <div
              className={cn(
                s.heroEntry,
                "mt-12 flex items-center justify-between"
              )}
              style={
                {
                  "--position": 5,
                } as React.CSSProperties
              }
            >
              {/* 🆕🆕 */}
              <div className={cn("flex gap-x-3")}>
                <DemarrerUnProjetButton />
                <DecouvrirLeCollectifButton />
              </div>
              {/* 🐵🐵 */}
              <HeroFounders />
            </div>
          </div>
        </>
      )}
    </WithNavbar>
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

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

  return <WithNavbar>{fontsReady && <HeroBackground />}</WithNavbar>;

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

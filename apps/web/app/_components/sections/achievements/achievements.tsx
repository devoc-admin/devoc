"use client";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";
import { AchievementsDesktop } from "./components/achievements-desktop";
import { AchievementsMobile } from "./components/achievements-mobile";

// Lazy load Three.js Beams component to reduce initial bundle (~580KB)
const Beams = dynamic(() => import("@/components/react-bits/beams"), {
  ssr: false,
});

export default function Realisations() {
  return (
    <Section id="realisations" theme="dark">
      <BackgroundWithBeams />
      <TopBar />
      <SectionTitle
        className={cn("z-10", "mb-8 xs:mb-12 sm:mb-16 md:mb-24")}
        description="Nos derniers projets qui illustrent notre approche orientée résultats ✨"
        title="Découvrez nos réalisations"
      />
      <div className="3xl:hidden">
        <AchievementsMobile />
      </div>
      <div className="3xl:block hidden">
        <AchievementsDesktop />
      </div>
    </Section>
  );
}

// ----------------------------------
// 🖼️ Background with beams
function BackgroundWithBeams() {
  return (
    <div className={cn("absolute inset-0 z-0", "size-full")}>
      <Beams
        beamHeight={15}
        beamNumber={12}
        beamWidth={2}
        lightColor="#f59e0b"
        noiseIntensity={1.75}
        rotation={30}
        scale={0.2}
        speed={2}
      />
    </div>
  );
}

// ----------------------------------
// 🟧 Top bar
function TopBar() {
  return (
    <div
      className={cn(
        "absolute top-0",
        "h-1 w-full",
        "bg-linear-to-r from-transparent via-primary to-transparent"
      )}
    />
  );
}

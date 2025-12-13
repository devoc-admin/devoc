"use client";
import { useWindowSize } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import Beams from "@/components/react-bits/beams";
import { cn } from "@/lib/utils";
import { AchievementsDesktop } from "./achievements/achievements-desktop";
import { AchievementsMobile } from "./achievements/achievements-mobile";
import SectionTitle from "./section-title";

export default function Realisations() {
  const { ref } = useNavTheme({ sectionName: "realisations", theme: "dark" });
  const { width = 0 } = useWindowSize();
  const isLargeEnough = width >= 1400;

  if (width === 0) return null;

  return (
    <div
      className={cn(
        "bg-black",
        "relative min-h-screen w-full px-6 py-24",
        "flex flex-col items-center justify-center gap-2"
      )}
      id="realisations"
      ref={ref}
    >
      <BackgroundWithBeams />
      <TopBar />
      <SectionTitle
        className="z-10 mb-24"
        description="Nos derniers projets qui illustrent notre approche orientée résultats"
        title="Découvrez nos réalisations"
      />
      {isLargeEnough ? <AchievementsDesktop /> : <AchievementsMobile />}
    </div>
  );
}

// ----------------------------------
function BackgroundWithBeams() {
  return (
    <div className="absolute top-0 z-0 h-full w-full">
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
function TopBar() {
  return (
    <div className="absolute top-0 h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent" />
  );
}

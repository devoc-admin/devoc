"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import Beams from "@/components/react-bits/beams";
import { cn } from "@/lib/utils";
import SectionTitle from "../_components/section-title";
import { AchievementsDesktop } from "./components/achievements-desktop";
import { AchievementsMobile } from "./components/achievements-mobile";

export default function Realisations() {
  const [hasMounted, setHasMounted] = useState(false);
  const { ref } = useNavTheme({ sectionName: "realisations", theme: "dark" });
  const { width = 0 } = useWindowSize();
  const isLargeEnough = width >= 1400;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Always render container with ref so useScroll can attach to it
  return (
    <div
      className={cn(
        "relative",
        "bg-black",
        "flex flex-col items-center justify-center",
        "min-h-screen w-full",
        "px-4 py-14",
        "xs:px-6 xs:py-24",
        "sm:px-6 sm:py-24",
        "gap-2"
      )}
      id="realisations"
      ref={ref}
    >
      {hasMounted && (
        <>
          <BackgroundWithBeams />
          <TopBar />
          <SectionTitle
            className={cn("z-10", "mb-8", "xs:mb-12", "sm:mb-16", "md:mb-24")}
            description="Nos derniers projets qui illustrent notre approche orientée résultats ✨"
            title="Découvrez nos réalisations"
          />
          {isLargeEnough ? <AchievementsDesktop /> : <AchievementsMobile />}
        </>
      )}
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

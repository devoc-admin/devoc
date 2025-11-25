/** biome-ignore-all lint/style/noMagicNumbers: exception */
"use client";
import { useWindowSize } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import { cn } from "@/lib/utils";
import { ProcessusDesktop } from "./processus/processus-desktop";
import { ProcessusMobile } from "./processus/processus-mobile";
import SectionTitle from "./section-title";

function Processus() {
  const { ref: sectionRef } = useNavTheme({
    sectionName: "processus",
    theme: "light",
  });

  const { width = 0 } = useWindowSize();
  const isLargeEnough = width >= 1200;

  if (width === 0) return null;

  return (
    /* ⚫ Black background  */
    <div
      className="flex min-h-screen flex-col bg-linear-to-b from-black to-zinc-950"
      id="processus"
    >
      {/* ⚪ White background  */}
      <div
        className={cn(
          "flex flex-1 flex-col items-center bg-white",
          "border-t-6 border-t-orange-600",
          "rounded-t-[50px] py-26",
          "sm:rounded-t-[100px] sm:py-26",
          "md:rounded-t-[100px] md:py-36"
        )}
        ref={sectionRef}
      >
        {/* 🆎 Title */}
        <SectionTitle
          className="text-zinc-950"
          description=""
          title="Notre méthode"
        />
        {isLargeEnough ? <ProcessusDesktop /> : <ProcessusMobile />}
      </div>
    </div>
  );
}

export default Processus;

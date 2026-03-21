import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import HeroImage from "./hero.avif";
import { VineLeaf } from "./vine-leaf";

const Hero: FC = () => {
  return (
    <div
      className={cn(
        "relative",
        "h-[calc(100dvh-65px)]",
        // When navbar appears reduce hero height to fit the whole screen
        "lg:h-[calc(100dvh-105px)]",
        "min-h-100",
        "lg:max-h-175",
        "min-w-full",
        "overflow-hidden"
      )}
    >
      <div
        className={cn(
          "absolute top-[calc(50%-20px)] left-1/2 z-1",
          "-translate-x-1/2 -translate-y-1/2",
          "flex flex-col gap-y-6",
          "w-[90%]",
          "max-w-[100ch]",
          "text-center"
        )}
      >
        <LExcellenceDuTerroir />
        <DecouvrezNotreSelection />
      </div>
      <Landscape />
    </div>
  );
};

// ================
// 🆎
function LExcellenceDuTerroir() {
  return (
    <h2
      className={cn(
        "text-white",
        "text-balance",
        "text-center",
        "text-shadow-lg",
        "font-light",
        "text-4xl xs:text-5xl sm:text-6xl lg:text-7xl"
      )}
    >
      L'excellence du terroir de l'Aude chez vous
    </h2>
  );
}

// ================
// 🖼️
function Landscape() {
  return (
    <Image
      alt=""
      className={cn(
        "min-w-full",
        "max-w-none",
        "h-full",
        "object-cover",
        "brightness-60"
      )}
      src={HeroImage}
      width={2200}
    />
  );
}

// ================
//🆕
function DecouvrezNotreSelection() {
  return (
    <button
      className={cn(
        "text-black",
        "flex items-center gap-1.5",
        "bg-secondary",
        "w-fit",
        "mx-auto",
        "px-4 py-2.5",
        "rounded-md",
        "font-extrabold",
        "text-sm",
        "cursor-pointer",
        "hover:bg-secondary/90",
        "transition-colors"
      )}
      type="button"
    >
      <VineLeaf className="size-4.5" />
      <div className="mr-1.5">Découvrez notre sélection</div>
    </button>
  );
}

export default Hero;

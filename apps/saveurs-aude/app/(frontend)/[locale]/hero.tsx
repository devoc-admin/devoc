import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import HeroImage from "./hero.avif";

const Hero: FC = () => {
  return (
    <div className="relative h-fit w-full">
      <div
        className={cn(
          "absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col gap-y-6",
          "w-[70ch]",
          "text-center"
        )}
      >
        <LExcellenceDuTerroir />
        <DecouvrezNotreSelection />
      </div>
      <Image
        alt="Hero"
        className={cn("w-full", "object-none", "brightness-75")}
        src={HeroImage}
        width={1200}
      />
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
        "text-center",
        "text-shadow-lg",
        "font-light",
        "text-6xl"
      )}
    >
      L'excellence du terroir de l'Aude chez vous
    </h2>
  );
}

// ================
//🆕
function DecouvrezNotreSelection() {
  return (
    <button
      className={cn(
        "bg-secondary",
        "w-fit",
        "mx-auto",
        "px-5 py-2.5",
        "rounded-md",
        "font-extrabold",
        "text-sm",
        "cursor-pointer",
        "hover:bg-secondary/90",
        "transition-colors"
      )}
      type="button"
    >
      Découvrez notre sélection
    </button>
  );
}

export default Hero;

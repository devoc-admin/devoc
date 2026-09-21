"use client";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
import { ContactCard } from "../_components/contact-card";
import { SectionCollectif } from "../section-collectif";
import { SectionPortraitGroupe } from "../section-portrait-groupe";
import { SectionPortraits } from "../section-portraits";
import { SectionReasons } from "../section-reasons";
import { SectionServices } from "../section-services";
import { SectionValues } from "../section-values";
import TextureImage from "./assets/texture.webp";

export function Main() {
  return (
    <Container>
      <TopLine />
      <SectionCollectif />
      <SectionPortraits />
      <SectionPortraitGroupe />
      <SectionServices />
      <SectionValues />
      <SectionReasons />
      <ContactCard />
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative z-1",
        "overflow-hidden",
        "bg-background-dark text-white",
        "min-h-400"
      )}
    >
      <TexturedBackground />
      <div
        className={cn(
          "max-w-430",
          "mx-auto",
          // ↔️
          "space-y-24 lg:space-y-28 xl:space-y-44 2xl:space-y-52",
          "px-5 md:px-8 lg:px-10 xl:px-14",
          "py-24 sm:py-38 md:py-40 lg:py-48 xl:py-54 2xl:py-62"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TexturedBackground() {
  return (
    <div
      className="absolute inset-0 -z-1 size-full opacity-30"
      style={{ backgroundImage: `url(${TextureImage.src})` }}
    />
  );
}

// ―
function TopLine() {
  return (
    <GlowLine
      className={cn("left-0", "xs:block hidden")}
      color="orange"
      orientation="horizontal"
      position="0px"
    />
  );
}

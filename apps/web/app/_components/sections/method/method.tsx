/** biome-ignore-all lint/style/noMagicNumbers: exception */
"use client";
import { useWindowSize } from "usehooks-ts";
import { cn } from "@/lib/utils.ts";
import Section from "../_components/section.tsx";
import SectionTitle from "../_components/section-title.tsx";
import { MethodDesktop } from "./components/method-desktop.tsx";
import { MethodMobile } from "./components/method-mobile.tsx";

function Method() {
  const { width = 0 } = useWindowSize();
  const isLargeEnough = width >= 1200;

  return (
    /* ⚫ Black background  */
    <div
      className="flex min-h-screen flex-col bg-linear-to-b from-black to-zinc-950"
      id="method"
    >
      {/* ⚪ White background  */}
      <Section
        className={cn(
          "flex-1",
          "border-t-16 border-t-orange-600",
          // Custom padding ↕️
          "pt-12!",
          "sm:pt-22!",
          "md:pt-36!",
          // ⭕ Rounded
          "rounded-t-[50px]",
          "sm:rounded-t-[100px]",
          "md:rounded-t-[100px]"
        )}
        id="method"
        theme="light"
      >
        {/* 🆎 Title */}
        <SectionTitle
          className={cn("mt-10 mb-10", "sm:mt-22 sm:mb-22", "text-zinc-950")}
          title="Notre méthode"
        />
        {isLargeEnough ? <MethodDesktop /> : <MethodMobile />}
      </Section>
    </div>
  );
}

export default Method;

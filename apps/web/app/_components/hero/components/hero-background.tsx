"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useIdle } from "@/hooks/use-idle";
import { useMatchMedia } from "@/hooks/use-match-media";
import { cn } from "@/lib/utils.ts";
import mobileBackground from "../assets/mobile_hero_background.webp";
import s from "./styles.module.css";

const SpecularBandsBackground = dynamic(
  () =>
    import(
      "@/components/motion-core/specular-band/specular-band-background.tsx"
    ),
  { ssr: false }
);

export function HeroBackground() {
  // 🎞️ Animated WebGL only on desktop, and never when motion is reduced
  const shouldAnimate = useMatchMedia(
    "(width >= 64rem) and (prefers-reduced-motion: no-preference)"
  );
  // ⏳ Load Three.js once the page is loaded and the browser is idle
  const isIdle = useIdle();

  return (
    <div
      className={cn(
        s.backgroundEntry,
        "absolute inset-0 z-0",
        "size-full",
        "bg-white",
        maskLeft
      )}
    >
      <div className={cn("relative size-full", maskBottom)}>
        <Image
          alt=""
          // Static image also serves desktop users who reduce motion
          className="object-cover motion-safe:lg:hidden"
          fill
          sizes="100vw"
          src={mobileBackground}
        />
        {shouldAnimate && isIdle && (
          <SpecularBandsBackground
            backgroundColor="#ffffff"
            className="size-full"
            speed={0.5}
          />
        )}
      </div>
    </div>
  );
}

// ↔️
const maskLeft = cn(
  "",
  "",
  "sm:mask-linear-225 sm:mask-linear-from-50% sm:mask-linear-to-60%",
  "md:mask-linear-225 md:mask-linear-from-50% md:mask-linear-to-60%",
  "lg:mask-linear-225 lg:mask-linear-from-20% lg:mask-linear-to-40%",
  "xl:mask-linear-225 xl:mask-linear-from-50% xl:mask-linear-to-60%"
);
const maskBottom = cn("mask-b-from-90%", "sm:mask-b-from-50%");

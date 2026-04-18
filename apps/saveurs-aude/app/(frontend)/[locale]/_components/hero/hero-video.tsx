"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import heroPhoto from "./hero-photo.webp";

function HeroVideo() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero photo */}
      <Image
        alt=""
        className={cn(
          "absolute inset-0",
          "h-full w-full",
          "object-cover",
          "brightness-60"
        )}
        fill
        loading="eager"
        src={heroPhoto}
      />
      {/* Video plays on top (hidden for reduced motion) */}
      {!reduced && (
        <video
          autoPlay
          className={cn(
            "min-w-full",
            "max-w-none",
            "h-full",
            "object-cover",
            "brightness-60"
          )}
          loop
          muted
          playsInline
          poster="/videos/video-poster.webp"
        >
          <source
            src="/videos/video-hero-av1.mp4"
            type='video/mp4; codecs="av01.0.05M.08"'
          />
          <source src="/videos/video-hero.webm" type="video/webm" />
          <source src="/videos/video-hero.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}

export { HeroVideo };

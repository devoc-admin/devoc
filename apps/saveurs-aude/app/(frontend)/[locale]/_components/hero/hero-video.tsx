"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import heroPhoto from "./hero-photo.webp";

const HERO_LQIP =
  "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADQAwCdASoUAAUAPpE4l0eloyIhMAgAsBIJZgCdMoAC/w6kd9oJIyAA/Nl9+6+0PZg3UzBKEKU6l295ltGYsT8qZ+PZ9PHCOfLiuC4COaDPsby9Y25Kdw2dGba2mIGP+DL4nxy/Q1YbXcd4Vgw7wqjcAAA=";

function HeroVideo() {
  const reduced = useReducedMotion();
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <>
      {/* Layer 1: LQIP blurred placeholder (instant) */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-center bg-cover",
          "brightness-60",
          "transition-[filter] duration-1000 ease-out",
          photoLoaded ? "blur-0" : "blur-xl"
        )}
        style={{ backgroundImage: `url(${HERO_LQIP})` }}
      />
      {/* Layer 2: Full photo fades in over the blur */}
      <Image
        alt=""
        className={cn(
          "absolute inset-0",
          "h-full w-full",
          "object-cover",
          "brightness-60",
          "transition-opacity duration-1000 ease-out",
          photoLoaded ? "opacity-100" : "opacity-0"
        )}
        fill
        onLoad={() => setPhotoLoaded(true)}
        src={heroPhoto}
      />
      {/* Layer 3: Video plays on top once ready (hidden for reduced motion) */}
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

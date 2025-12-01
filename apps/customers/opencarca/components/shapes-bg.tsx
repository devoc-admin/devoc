"use client";
import { motion } from "motion/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import CubeShape from "@/assets/shapes/cube.png";
import DiamondShape from "@/assets/shapes/diamond.png";
import DonutShape from "@/assets/shapes/donut.png";
import SphereShape from "@/assets/shapes/sphere.png";
import { cn } from "@/lib/utils";

export function Shapes() {
  const { effectiveParallaxOffset } = useShapesParallaxEffect();
  return (
    <div
      className={cn(
        "-z-1 absolute",
        "max-w h-full w-full",
        "pointer-events-none",
        "opacity-60"
      )}
    >
      <Shape
        className={cn(
          "-translate-x-1/2 -translate-y-1/2",
          "top-[25%] left-[28%]",
          "xs:top-[13%] xs:left-[28%]",
          "sm:top-[13%] sm:left-[16%]",
          "md:top-[17%] md:left-[15%]",
          "lg:top-[19%] lg:left-[19%]",
          "lg:left-[19%] xl:top-[25%]"
        )}
        parallaxCoeff={4}
        parallaxOffset={effectiveParallaxOffset}
        src={CubeShape}
      />
      <Shape
        className={cn(
          "-translate-y-1/2 translate-x-1/2",
          "top-[12%] right-[23%]",
          "xs:top-[22%] xs:right-[18%]",
          "sm:top-[28%] sm:right-[15%]",
          "md:top-[28%] md:right-[16%]",
          "lg:top-[33%] lg:right-[16%]",
          "xl:top-[36%] xl:right-[19%]"
        )}
        parallaxCoeff={3}
        parallaxOffset={effectiveParallaxOffset}
        src={DiamondShape}
      />
      <Shape
        className={cn(
          "-translate-x-1/2 translate-y-1/2",
          "bottom-[20%] left-[22%]",
          "xs:bottom-[17%] xs:left-[24%]",
          "sm:bottom-[13%] sm:left-[20%]",
          "md:bottom-[16%] md:left-[22%]",
          "lg:bottom-[16%] lg:left-[22%]",
          "xl:bottom-[24%] xl:left-[19%]"
        )}
        parallaxCoeff={2}
        parallaxOffset={effectiveParallaxOffset}
        src={DonutShape}
      />
      <Shape
        className={cn(
          "translate-x-1/2 translate-y-1/2",
          "right-[16%] bottom-[27%]",
          "xs:right-[22%] xs:bottom-[20%]",
          "sm:right-[24%] sm:bottom-[18%]",
          "md:right-[24%] md:bottom-[22%]",
          "lg:right-[14%] lg:bottom-[22%]",
          "xl:right-[20%] xl:bottom-[18%]"
        )}
        parallaxCoeff={1}
        parallaxOffset={effectiveParallaxOffset}
        src={SphereShape}
      />
    </div>
  );
}

function Shape({
  src,
  className,
  parallaxOffset,
  parallaxCoeff,
}: {
  src: StaticImageData;
  parallaxOffset: number;
  parallaxCoeff: number;
  className?: string;
}) {
  const { isMobile } = useMobile();
  const parallaxValue = parallaxOffset * parallaxCoeff;
  return (
    <motion.div
      animate={{
        opacity: 1,
        // Simplified animation on mobile: only 3 keyframes instead of 7
        x: isMobile ? [0, 2, 0] : [0, 3, -2, 4, 0, -1, 0],
        y: isMobile
          ? [parallaxValue, parallaxValue - 5, parallaxValue]
          : [
              parallaxValue,
              parallaxValue - 8,
              parallaxValue - 5,
              parallaxValue - 10,
              parallaxValue - 15,
              parallaxValue - 8,
              parallaxValue,
            ],
      }}
      className={cn(
        className,
        "absolute",
        "w-60",
        "xs:w-[275px]",
        "sm:w-[300px]",
        "md:w-[300px]",
        "lg:w-[350px]",
        "xl:w-[400px]"
      )}
      initial={{ opacity: 0 }}
      style={{ y: parallaxValue }}
      transition={{
        delay: Math.random(),
        // Slower animation on mobile (12-18s instead of 9-12s)
        duration: isMobile ? 12 + Math.random() * 6 : 9 + Math.random() * 3,
        ease: "easeInOut",
        opacity: {
          duration: 1,
          ease: "easeInOut",
        },
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <Image alt="shape" height={400} src={src} width={400} />
    </motion.div>
  );
}

function useShapesParallaxEffect() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const effectiveParallaxOffset = parallaxOffset * 0.5;

  const isMobile = useMediaQuery("(max-width: 768px)");

  // ⇅ Parallax effect (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const displacement = scrollY * -0.3;
          setParallaxOffset(displacement);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return {
    effectiveParallaxOffset,
  };
}

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    let timeoutId: NodeJS.Timeout;
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedCheckMobile);
    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
      clearTimeout(timeoutId);
    };
  }, []);
  return { isMobile };
}

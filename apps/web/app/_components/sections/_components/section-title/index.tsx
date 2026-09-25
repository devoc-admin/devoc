"use client";

import {
  type MotionStyle,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { cn } from "@/lib/utils";

// 📏 Stripes drift distance (px) while the title crosses the viewport
const STRIPES_DRIFT = 120;

// 🦓 One big transparent gap followed by several thin, evenly spaced stripes
const STRIPE_COLOR = "var(--color-orange-red)";
// ↔️ Stripe thickness follows the viewport width: 1px on mobile → 2px from ~1430px
const STRIPE_SIZE = "clamp(1px, 0.14vw, 2px)";
const STRIPES_COUNT = 20;
// ↕️ Big gap from sm up; below sm it equals a normal gap so all stripes are uniform
const BIG_GAP = 4;

// 🌫️ Static faint fill under the stripes so the letter shape never flickers
const FILL_OPACITY = 12;
const FILL_COLOR = `color-mix(in oklab, ${STRIPE_COLOR} ${FILL_OPACITY}%, transparent)`;
const FILL_GRADIENT = `linear-gradient(${FILL_COLOR}, ${FILL_COLOR})`;

const STRIPES_GRADIENT = `repeating-linear-gradient(0deg, transparent 0 var(--big-gap), ${Array.from(
  { length: STRIPES_COUNT },
  (_, i) => {
    // Stop positions in units of --stripe-size, offset by the big gap
    const at = (units: number) =>
      `calc(var(--big-gap) + ${units} * var(--stripe-size))`;
    const stripe = `${STRIPE_COLOR} ${at(i * 2)} ${at(i * 2 + 1)}`;
    const gap = `transparent ${at(i * 2 + 1)} ${at(i * 2 + 2)}`;
    return i < STRIPES_COUNT - 1 ? `${stripe}, ${gap}` : stripe;
  }
).join(", ")})`;

// 🆎
export function SectionTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: ref,
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : STRIPES_DRIFT]
  );
  const backgroundPosition = useMotionTemplate`0px ${y}px, 0px 0px`;

  return (
    <FadeUp delay={0.1} dir="down" disableOnMobile>
      <motion.h2
        className={cn(
          "font-audiowide",
          "italic",
          "leading-none",
          "bg-clip-text",
          "font-bold text-transparent",
          "uppercase leading-none",
          // ↔️
          "text-[3rem] xs:text-[3.5rem] sm:text-[5.5rem] md:text-8xl lg:text-[7.6rem] xl:text-[7rem] 2xl:text-[9.2rem]",
          "leading-none",
          "max-sm:mb-0",
          // 🦓 --big-gap-sm is set in style from BIG_GAP
          "[--big-gap:var(--stripe-size)] sm:[--big-gap:var(--big-gap-sm)]"
        )}
        ref={ref}
        style={
          {
            "--big-gap-sm": `${BIG_GAP}px`,
            "--stripe-size": STRIPE_SIZE,
            backgroundImage: `${STRIPES_GRADIENT}, ${FILL_GRADIENT}`,
            backgroundPosition,
          } as MotionStyle
        }
      >
        {children}
      </motion.h2>
    </FadeUp>
  );
}

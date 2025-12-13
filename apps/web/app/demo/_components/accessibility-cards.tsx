"use client";
import { motion } from "motion/react";
import AnimatedGradient from "@/components/fancy/background/animated-gradient-with-svg";
import { cn } from "@/lib/utils";
import { useSlidesContext } from "../_context";
import {
  variantAccessibilityQuestion,
  variantsAccessibilityCard,
  variantsAccessibilityInnerCard,
} from "../_step-animations";
import cardTexture from "./egg-shell.png";

const cardGradientColors = ["#FF9900", "#FF4500", "#FF9900"];

export function AccessibilityCards() {
  const { animations } = useSlidesContext();
  const { accessibilityQuestion: accessiblityQuestionAnimations } = animations;
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex flex-col items-center justify-center gap-y-12">
      <motion.div
        animate={accessiblityQuestionAnimations}
        className="z-10 mb-12 max-w-[900px] bg-white text-center font-bold font-montserrat text-5xl leading-[1.2]"
        initial={variantAccessibilityQuestion.initial}
        variants={variantAccessibilityQuestion}
      >
        Quelle est la part des sites de commune non conformes en France ?
      </motion.div>
      <div className="flex gap-x-18">
        <AccessibilityCard delay={0} letter="A" value={35} />
        <AccessibilityCard delay={0.2} letter="B" value={64} />
        <AccessibilityCard delay={0.4} letter="C" value={82} />
      </div>
    </div>
  );
}

function AccessibilityCard({
  value,
  delay,
  letter,
}: {
  value: number;
  delay: number;
  letter: string;
}) {
  const { animations } = useSlidesContext();
  const {
    accessiblityCard: accessiblityCardAnimations,
    accessiblityCardInner: accessiblityCardInnerAnimations,
  } = animations;

  return (
    <motion.div
      animate={accessiblityCardAnimations}
      className="perspective-midrange relative h-[400px] w-[300px]"
      custom={{ delay }}
      initial={false}
      variants={variantsAccessibilityCard}
    >
      <motion.div
        animate={accessiblityCardInnerAnimations}
        className={cn("transform-3d backface-visible h-full w-full rounded-xl")}
        custom={{ delay }}
        initial={false}
        variants={variantsAccessibilityInnerCard}
      >
        <div className="pointer-events-none absolute h-full w-full overflow-hidden rounded-xl bg-linear-to-br from-[#FF5709] to-[#FFC731]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${cardTexture.src})`,
              backgroundSize: "80px",
            }}
          >
            <AnimatedGradient
              blur="medium"
              colors={cardGradientColors}
              speed={10}
            />
          </div>
        </div>
        {/* ⬆️ Front */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 h-full w-full rounded-xl p-4 font-bold font-montserrat text-8xl"
          )}
        >
          <div className="grid h-[92%] place-items-center rounded-lg bg-white shadow-xl">
            <span>{value}%</span>
            <div className="-translate-y-1/3 absolute bottom-0">
              <div className="-translate-y-[16%] -translate-x-1/2 mask-b-from-65% mask-b-to-65% absolute left-1/2 h-[35%] w-[130%] rounded-t-full border-4 border-primary-strong pt-8" />
              <div className="grid aspect-square w-12 place-items-center rounded-full bg-primary-strong font-dancing-script text-2xl text-white leading-none shadow-xl">
                {letter}
              </div>
            </div>
          </div>
        </div>
        {/* ⬇️ Back */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 h-full w-full rotate-y-180 rounded-xl bg-linear-to-br from-[#FF5709] to-[#FFC731] p-4 font-kanit text-6xl"
          )}
        >
          <div className="flex h-[92%] flex-col items-center justify-center gap-y-2 rounded-lg bg-white">
            <span className="font-dancing-script">Perdu !</span>
            <span className="text-5xls">🤷‍♂️</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

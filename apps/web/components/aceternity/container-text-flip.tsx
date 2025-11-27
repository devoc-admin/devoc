"use client";

import React, { useState, useEffect, useId } from "react";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <div className={cn(
      "w-full",
      "font-kanit tracking-tight text-zinc-900",
      "flex justify-center items-baseline",
      "text-2xl flex",
      "xs:text-3xl xs:flex",
      "sm:text-3xl sm:flex",
      "md:text-4xl md:flex",
    )}>
      <motion.span layout
        className={cn(
          "relative w-fit",
          "px-2 py-1",
          "xs:px-3 xs:py-1",
          "sm:px-3 sm:py-1.5",
          "sm:px-5 md:py-2",
          "md:px-5 md:py-2",
          "overflow-hidden rounded-md ring  drop-shadow-lg shadow-black/10 ring-black/10 ",
          "font-semibold",
          "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        )}
          >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentWordIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  )
}

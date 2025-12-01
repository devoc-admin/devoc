"use client";
// @ts-nocheck

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ContainerTextFlipProps {
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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <div
      className={cn(
        "w-full",
        "font-kanit text-zinc-900 tracking-tight",
        "flex items-baseline justify-center",
        "flex text-2xl",
        "xs:flex xs:text-3xl",
        "sm:flex sm:text-3xl",
        "md:flex md:text-4xl"
      )}
    >
      <motion.span
        className={cn(
          "relative w-fit",
          "px-2 py-1",
          "xs:px-3 xs:py-1",
          "sm:px-3 sm:py-1.5",
          "sm:px-5 md:py-2",
          "md:px-5 md:py-2",
          "overflow-hidden rounded-md shadow-black/10 ring ring-black/10 drop-shadow-lg",
          "font-semibold",
          "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]"
        )}
        layout
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            animate={{
              filter: "blur(0px)",
              y: 0,
            }}
            className={cn("inline-block whitespace-nowrap")}
            exit={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            initial={{ filter: "blur(10px)", y: -40 }}
            key={currentWordIndex}
            transition={{
              duration: 0.5,
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
}

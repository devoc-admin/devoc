"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type ContainerTextFlipProps = {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
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
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <div className={cn(
      "w-full",
      "font-kanit tracking-tight text-zinc-900",
      "flex justify-center items-baseline",
      // Responsive size
      "text-2xl flex",
      "xs:text-3xl xs:flex",
      "sm:text-3xl sm:flex",
      "md:text-4xl md:flex",
    )}>
      <motion.span layout
        className={cn(
          "relative w-fit",
          "overflow-hidden rounded-md ring  drop-shadow-lg shadow-black/10 ring-black/10 ",
          "font-semibold",
          "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
          // Responsive size
          "px-2 py-1",
          "xs:px-3 xs:py-1",
          "sm:px-3 sm:py-1.5",
          "sm:px-5 md:py-2",
          "md:px-5 md:py-2",
        )}
          >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentWordIndex}
            initial={{ y: -40,  filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  )
}

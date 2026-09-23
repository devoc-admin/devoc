"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useMatchMedia } from "@/hooks/use-match-media";
import { cn } from "@/lib/utils";

const RubiksCube = dynamic(
  () => import("@/components/motion-core/rubiks-cube/rubiks-cube"),
  { ssr: false }
);

export function CustomCube() {
  const shouldDisplayCube = useMatchMedia("(width >= 64rem)");
  return (
    <motion.div
      className={cn(
        "mx-auto",
        "max-lg:hidden",
        "lg:mt-6 xl:mt-10 2xl:mt-14",
        "lg:size-100 xl:size-110 2xl:size-120"
      )}
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.7, 0, 0.84, 0],
      }}
      viewport={{ margin: "-100px", once: true }}
      whileInView={{ opacity: 1 }}
    >
      {shouldDisplayCube && <RubiksCube />}
    </motion.div>
  );
}

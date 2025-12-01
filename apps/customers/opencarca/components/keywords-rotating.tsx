"use client";
import { motion } from "motion/react";
import { ContainerTextFlip } from "@/components/container-text-flip";
import { cn } from "@/lib/utils";

const keywords = [
  "🔒 Sécurité",
  "👁️ Accessibilité",
  "⚡ Performance",
  "🎨 Design",
];

export function KeywordsRotating() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className={cn("flex flex-col gap-y-1")}>
        <div className="text-center font-kanit font-normal text-base">
          Votre expert de proximité en
        </div>
        <ContainerTextFlip words={keywords} />
      </div>
    </motion.div>
  );
}

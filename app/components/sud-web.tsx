"use client";

import { motion } from "motion/react";
import { AuroraText } from "@/components/magicui/aurora-text";

function SudWeb() {
  return (
    <div className="flex flex-col items-center gap-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-9xl flex gap-2"
      >
        <AuroraText
          colors={["#a67de8", "#8951e1", "#6b26d9", "#561eae", "#401782"]}
          className="font-bold"
          speed={3}
        >
          Sud
        </AuroraText>
        <span className="font-light text-foreground">Web</span>
      </motion.h1>
    </div>
  );
}

export default SudWeb;

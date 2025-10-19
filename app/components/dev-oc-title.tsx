"use client";
import { motion } from "motion/react";
import Doodle from "@/app/components/doodle";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";

const baseDelay = 0.5;

type Props = {
  showDoodle?: boolean;
};

export default function DevOcTitle({ showDoodle = true }: Props) {
  return (
    <motion.h1
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative flex select-none items-center gap-2",
        "text-8xl",
        "xs:text-8xl",
        "sm:text-9xl"
      )}
      initial={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: baseDelay }}
    >
      <motion.div
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={cn(
          "-z-1 absolute top-1/2 left-1/2 w-full translate-x-[-75%] translate-y-[-50%]",
          "sm:translate-x-[-50%]"
        )}
        initial={{ opacity: 0, x: -350, y: -350 }}
        transition={{ duration: 2.5, delay: baseDelay * 2 }}
      >
        {showDoodle && <Doodle color="var(--primary)" />}
      </motion.div>
      <div className="relative font-bold tracking-tighter">
        <span className="white-letters-border absolute text-transparent">
          Dev'
        </span>
        <AuroraText
          colors={["#FFD166", "#fbbf24", "#f59e0b", "#F48C06"]}
          speed={3}
        >
          Dev'
        </AuroraText>
      </div>
      <div className="white-letters-border relative font-bold text-foreground tracking-tighter">
        Oc
      </div>
    </motion.h1>
  );
}

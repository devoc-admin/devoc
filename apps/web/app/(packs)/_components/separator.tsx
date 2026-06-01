import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        width: "100%",
      }}
      className={cn(
        "mx-auto h-px bg-linear-to-r",
        "from-transparent",
        "via-foreground/10",
        "to-transparent",
        className
      )}
      initial={{
        width: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 2,
      }}
    />
  );
}

"use client";
import { motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export function FadeUp({
  children,
  delay = 0,
  amount = 0.8,
  className,
  disableOnMobile = false,
  duration = 0.9,
  dir = "up",
}: {
  children: React.ReactNode;
  disableOnMobile?: boolean;
  amount?: number;
  duration?: number;
  delay?: number;
  className?: string;
  dir?: "up" | "down";
}) {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false,
  });
  if (isMobile && disableOnMobile) return children;

  return (
    <motion.div
      className={cn(
        "w-fit",
        // ↔️
        className
      )}
      initial={{ opacity: 0, y: dir === "up" ? 35 : -35 }}
      transition={{
        delay,
        duration,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ amount, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

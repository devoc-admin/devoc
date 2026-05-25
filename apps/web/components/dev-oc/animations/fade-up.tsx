"use client";
import { motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export function FadeUp({
  children,
  delay = 0,
  className,
  disableOnMobile = false,
  dir = "up",
}: {
  children: React.ReactNode;
  disableOnMobile?: boolean;
  delay?: number;
  className?: string;
  dir?: "up" | "down";
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
        duration: 0.9,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

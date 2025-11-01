"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function Loader({
  title = "Configuring your account...",
  subtitle = "Please wait while we prepare everything for you",
  size = "md",
  color = "#000000",
  className,
  ...props
}: LoaderProps) {
  const sizeConfig = {
    lg: {
      container: "size-40",
      maxWidth: "max-w-64",
      spacing: "space-y-4",
      subtitleClass: "text-base/relaxed",
      titleClass: "text-lg/tight font-semibold",
    },
    md: {
      container: "size-32",
      maxWidth: "max-w-56",
      spacing: "space-y-3",
      subtitleClass: "text-sm/relaxed",
      titleClass: "text-base/snug font-medium",
    },
    sm: {
      container: "size-20",
      maxWidth: "max-w-48",
      spacing: "space-y-2",
      subtitleClass: "text-xs/relaxed",
      titleClass: "text-sm/tight font-medium",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-8",
        className
      )}
      {...props}
    >
      <motion.div exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
        {/* Enhanced Monochrome Loader */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          className={cn("relative", config.container)}
          transition={{
            duration: 4,
            ease: [0.4, 0, 0.6, 1],
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {/* Outer elegant ring with shimmer */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${color} 90deg, transparent 180deg)`,
              opacity: 0.8,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)",
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Primary animated ring with gradient */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${color} 120deg, ${color}80 240deg, transparent 360deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)",
              opacity: 0.9,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)",
            }}
            transition={{
              duration: 2.5,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Secondary elegant ring - counter rotation */}
          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 180deg, transparent 0deg, ${color}99 45deg, transparent 90deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)",
              opacity: 0.35,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)",
            }}
            transition={{
              duration: 4,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Accent particles */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 270deg, transparent 0deg, ${color}66 20deg, transparent 40deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)",
              opacity: 0.5,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)",
            }}
            transition={{
              duration: 3.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          {/* Dark mode variants */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 hidden rounded-full dark:block"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${color} 90deg, transparent 180deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)",
              opacity: 0.8,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)",
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 hidden rounded-full dark:block"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${color} 120deg, ${color}80 240deg, transparent 360deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)",
              opacity: 0.9,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)",
            }}
            transition={{
              duration: 2.5,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            className="absolute inset-0 hidden rounded-full dark:block"
            style={{
              background: `conic-gradient(from 180deg, transparent 0deg, ${color}99 45deg, transparent 90deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)",
              opacity: 0.35,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)",
            }}
            transition={{
              duration: 4,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            className="absolute inset-0 hidden rounded-full dark:block"
            style={{
              background: `conic-gradient(from 270deg, transparent 0deg, ${color}66 20deg, transparent 40deg)`,
              mask: "radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)",
              opacity: 0.5,
              WebkitMask:
                "radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)",
            }}
            transition={{
              duration: 3.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Typography with Breathing Animation */}
      <motion.div
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={cn("text-center", config.spacing, config.maxWidth)}
        exit={{ opacity: 0, y: -10 }}
        initial={{ opacity: 0, y: 12 }}
        transition={{
          delay: 0,
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Clean title with subtle animation */}
        <motion.h1
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={cn(
            config.titleClass,
            "font-kanit font-medium text-black text-xl leading-[1.15] tracking-[-0.02em] antialiased dark:text-white/90"
          )}
          initial={{ opacity: 0, y: 12 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.span
            animate={{
              opacity: [0.9, 0.7, 0.9],
            }}
            transition={{
              duration: 3,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {title}
          </motion.span>
        </motion.h1>

        {/* Clean subtitle with subtle animation */}
        <motion.p
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={cn(
            config.subtitleClass,
            "font-normal text-black leading-[1.45] tracking-[-0.01em] antialiased dark:text-white/60"
          )}
          initial={{ opacity: 0, y: 8 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.span
            animate={{
              opacity: [0.6, 0.4, 0.6],
            }}
            transition={{
              duration: 4,
              ease: [0.4, 0, 0.6, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {subtitle}
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}

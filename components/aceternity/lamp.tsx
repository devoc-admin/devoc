"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Lamp({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute top-0 z-0 flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-md",
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          className="absolute inset-auto right-1/2 h-56 w-[25rem] overflow-visible bg-gradient-conic from--primary via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          initial={{ opacity: 0.5, width: "15rem" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          whileInView={{ opacity: 1, width: "25rem" }}
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          className="absolute inset-auto left-1/2 h-56 w-[25rem] bg-gradient-conic from-transparent via-transparent to-primary/20 text-white [--conic-position:from_290deg_at_center_top]"
          initial={{ opacity: 0.5, width: "15rem" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          whileInView={{ opacity: 1, width: "25rem" }}
        >
          <div className="absolute right-0 bottom-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute right-0 bottom-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="-translate-y-1/2 absolute inset-auto z-50 h-36 w-[28rem] rounded-full bg-primary opacity-50 blur-3xl" />
        <motion.div
          className="-translate-y-[6rem] absolute inset-auto z-30 h-36 w-64 rounded-full bg-primary/80 blur-2xl"
          initial={{ width: "8rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          whileInView={{ width: "16rem" }}
        />
        {/* ▬ Bar */}
        <motion.div
          className="-translate-y-[7rem] absolute inset-auto z-50 h-0.5 w-[25rem] bg-primary"
          initial={{ width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          whileInView={{ width: "25rem" }}
        />

        <div className="-translate-y-[12.5rem] absolute inset-auto z-40 h-44 w-full" />
      </div>
    </div>
  );
}

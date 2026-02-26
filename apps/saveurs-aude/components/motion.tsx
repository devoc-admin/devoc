"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: AnimationProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

export function FadeInUp({ children, className, delay = 0 }: AnimationProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

export function FadeInUpOnScroll({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ margin: "-50px", once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

export function StaggerContainerOnScroll({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  return (
    <motion.div
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.1,
          },
        },
      }}
      viewport={{ margin: "-50px", once: true }}
      whileInView="visible"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

export function StaggerItem({ children, className }: AnimationProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

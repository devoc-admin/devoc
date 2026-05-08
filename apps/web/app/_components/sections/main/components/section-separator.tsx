import { motion } from "motion/react";

export function SectionSeparator() {
  return (
    <motion.div
      className="mx-auto h-px w-full origin-center bg-linear-to-r from-transparent via-foreground-dark/20 to-transparent"
      initial={{ opacity: 0, width: 0 }}
      transition={{
        duration: 3,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ margin: "-200px", once: true }}
      whileInView={{ opacity: 1, width: "100%" }}
    />
  );
}

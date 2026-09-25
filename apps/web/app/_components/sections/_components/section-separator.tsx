import { motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

const commonClasses =
  "mx-auto h-px w-full origin-center bg-linear-to-r from-transparent via-foreground-dark/20 to-transparent";

export function SectionSeparator() {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false,
  });
  if (isMobile) return <div className={commonClasses} />;

  return (
    <motion.div
      className={commonClasses}
      initial={{ opacity: 0, width: 0 }}
      transition={{
        duration: 3,
        ease: [0.32, 0.72, 0, 1],
      }}
      viewport={{ margin: "-100px", once: true }}
      whileInView={{ opacity: 1, width: "100%" }}
    />
  );
}

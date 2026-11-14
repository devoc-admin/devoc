import { cn } from "cn";
import { motion } from "motion/react";

export function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn("absolute inline-block", className)}>
      {children}
    </motion.div>
  );
}

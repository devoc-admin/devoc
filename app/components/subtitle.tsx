"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
};

function Subtitle({ children }: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-2xl text-center text-xl leading-tight text-gray-400"
    >
      {children}
    </motion.p>
  );
}

export default Subtitle;

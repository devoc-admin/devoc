import { motion } from 'motion/react';

export function Fade({children}: {children: React.ReactNode}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}

      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {children}    </motion.div>
  );
}

import { motion } from 'motion/react';

export function FadeDown({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="mx-auto mb-10 w-[1000px] text-center font-sarina text-8xl"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

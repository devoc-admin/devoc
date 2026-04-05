import { motion } from "motion/react";
import { DevOc } from "./dev-oc";
export function OfferedBy() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="-bottom-2 fixed right-6 w-[200px] text-center text-gray-950"
      initial={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="font-faustina text-lg">Ce bilan vous est offert par</div>
      <DevOc />
    </motion.div>
  );
}

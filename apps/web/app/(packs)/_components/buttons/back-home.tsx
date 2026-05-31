"use client";
import { ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
// ⬅️
export function RetourAccueil() {
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <Link
        className={cn(
          "group",
          "inline-flex items-center",
          "cursor-pointer",
          "rounded-full",
          "border border-foreground/5",
          "bg-linear-to-r from-foreground/1 to-foreground/7",
          "font-geist-mono text-foreground/90 uppercase tracking-widest",
          "transition",
          "hover:scale-102",
          "opacity-80 hover:opacity-100",
          //↔️
          "gap-x-3 py-0.5 pr-3 pl-3 text-[0.65rem]",
          "xs:gap-x-3 xs:py-0.5 xs:pr-3 xs:pl-3 xs:text-[0.65rem]",
          "xl:gap-x-3 xl:py-2 xl:pr-5 xl:pl-4 xl:text-xs",
          "2xl:gap-x-3 2xl:py-2 2xl:pr-5 2xl:pl-4 2xl:text-xs"
        )}
        href="/"
      >
        <ArrowLeftIcon
          className={cn(
            "transition-transform group-hover:-translate-x-px",
            // ↔️
            "w-3.5",
            "xs:w-3.5",
            "xl:w-4",
            "2xl:w-4"
          )}
        />
        <span className="font-bold">Retour à l'accueil</span>
      </Link>
    </motion.div>
  );
}

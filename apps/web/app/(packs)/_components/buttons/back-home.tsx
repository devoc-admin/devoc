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
          "gap-x-3",
          "cursor-pointer",
          "rounded-full",
          "border border-foreground/5",
          "bg-linear-to-r from-foreground/1 to-foreground/7",
          "py-2",
          "pr-5 pl-4",
          "font-geist-mono text-foreground/90 text-xs uppercase tracking-widest",
          "transition",
          "hover:scale-102",
          "opacity-80 hover:opacity-100"
        )}
        href="/"
      >
        <ArrowLeftIcon
          className="transition-transform group-hover:-translate-x-px"
          size={16}
        />
        <span className="font-bold">Retour à l'accueil</span>
      </Link>
    </motion.div>
  );
}

"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

export function LegalHeader() {
  return (
    <div
      className={cn(
        "fixed z-5000",
        "bg-white/10",
        "top-0 left-1/2 -translate-x-1/2",
        "max-w-350",
        "w-[90vw]",
        "p-3",
        "backdrop-blur-xs"
      )}
    >
      <DevOc />
    </div>
  );
}

// ---------------------------------
// 🆕 Logo button
function LogoButton({
  children,
  logoSize = 22,
}: {
  children?: React.ReactNode;
  logoSize?: number;
}) {
  const backToTop = useCallback(
    () => window.scrollTo({ behavior: "smooth", top: 0 }),
    []
  );
  const enterBackToTop = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        backToTop();
      }
    },
    [backToTop]
  );
  return (
    <button
      aria-label="Retour en haut de la page"
      className={cn(
        "group",
        "flex items-center gap-2",
        "cursor-pointer",
        "text-2xl",
        "outline-offset-4"
      )}
      onClick={backToTop}
      onKeyDown={(e) => enterBackToTop(e)}
      title="Retour en haut"
      type="button"
    >
      <motion.div
        transition={{
          damping: 10,
          duration: 1,
          mass: 1,
          stiffness: 100,
          type: "spring",
        }}
        whileHover={{ rotate: 360 }}
      >
        <Image
          alt=""
          aria-hidden="true"
          height={logoSize}
          priority
          src={Icon}
          width={logoSize}
        />
      </motion.div>
      {children}
    </button>
  );
}
function DevOc() {
  return (
    <LogoButton>
      <Link href="/">
        <span
          className={cn(
            "font-bold tracking-tighter",
            "transition-colors duration-300",
            "text-secondary" // ☀️ Light
          )}
        >
          Dev'
        </span>
        <span
          className={cn(
            "bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text",
            "font-black text-transparent tracking-tighter"
          )}
        >
          Oc
        </span>
      </Link>
    </LogoButton>
  );
}

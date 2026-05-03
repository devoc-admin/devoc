"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

export function DevOcNavbar({ logoSize }: { logoSize?: number }) {
  return (
    <LogoButtonNavbar logoSize={logoSize}>
      <div className="relative">
        {/* 🌫️ Blurry copy */}
        <div
          className={cn(
            "absolute opacity-70",
            "blur-sm",
            "hidden",
            "[html[data-nav-theme='dark']_&]:block" // ☀️ Light
          )}
        >
          <DevOc />
        </div>
        {/* 🔠 Real text */}
        <DevOc />
      </div>
    </LogoButtonNavbar>
  );
}

function DevOc() {
  return (
    <Link href="/">
      <span
        className={cn(
          "font-bold tracking-tighter",
          "transition-colors duration-300",
          "text-secondary", // ☀️ Light
          "[html[data-nav-theme='dark']_&]:text-white" // 🌙 Dark
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
  );
}

function LogoButtonNavbar({
  children,
  logoSize = 22,
}: {
  children?: React.ReactNode;
  logoSize?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

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
        "text-xl",
        "lg:text-2xl",
        "outline-offset-4"
      )}
      onClick={backToTop}
      onKeyDown={(e) => enterBackToTop(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Retour en haut"
      type="button"
    >
      <DevOcFlower isHovered={isHovered} logoSize={logoSize} />
      {children}
    </button>
  );
}

function DevOcFlower({
  logoSize,
  isHovered,
}: {
  logoSize?: number;
  isHovered?: boolean;
}) {
  return (
    <motion.div
      animate={isHovered ? { rotate: 360 } : undefined}
      transition={{
        damping: 10,
        duration: 100,
        mass: 1,
        stiffness: 100,
        type: "spring",
      }}
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
  );
}

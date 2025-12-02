"use client";
import { motion } from "motion/react";

// Petits éclairs/brisures orangés animés pour les slides dark
// - SVG plein écran, non interactif
// - Traînées fines animées via strokeDashoffset
// - Couleur basée sur la palette: var(--accent)
export function DarkAccents({
  opacity = 0.8,
  color,
}: {
  opacity?: number;
  color?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <svg
        aria-hidden
        className="h-full w-full"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 100 100"
      >
        {/* Cône de lumière (remplissage doux) */}
        <defs>
          <radialGradient cx="100%" cy="0%" id="lightningCone" r="50%">
            <stop
              offset="0%"
              stopColor={color ?? "var(--primary-strong)"}
              stopOpacity={0.3}
            />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect fill="url(#lightningCone)" height="100%" width="100%" />

        {/* Éclair 1: forte rupture (haut-droit) */}
        <motion.path
          animate={{ pathLength: 1 }}
          d="M 100 0 L 85 10 L 90 20 L 75 30 L 80 40"
          fill="none"
          initial={{ pathLength: 0 }}
          opacity={opacity}
          stroke={color ?? "var(--primary-strong)"}
          strokeLinecap="round"
          strokeWidth={1.5}
          style={{ filter: "drop-shadow(0 0 6px rgba(255,110,0,1))" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        {/* Éclair 2: fissure soutenue (bas-gauche) */}
        <motion.path
          animate={{ pathLength: 1 }}
          d="M 0 100 L 10 95 L 5 80 L 20 85 L 15 70"
          fill="none"
          initial={{ pathLength: 0 }}
          opacity={opacity}
          stroke={color ?? "var(--primary-strong)"}
          strokeLinecap="round"
          strokeWidth={1.5}
          style={{ filter: "drop-shadow(0 0 6px rgba(255,110,0,1))" }}
          transition={{
            delay: 0.5,
            duration: 3.0,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
}

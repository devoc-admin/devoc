"use client";

// Grille subtile (blueprint/circuit) pour les slides clairs
// - Couleur basée sur la palette: var(--border)
// - Opacité très légère pour ne pas distraire
export function LightGrid({
  opacity = 0.7,
  gap = 40,
  color,
}: {
  opacity?: number;
  gap?: number;
  color?: string;
}) {
  const sz = Math.max(16, Math.min(80, gap));
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{ opacity }}
    >
      <svg
        aria-hidden
        className="h-full w-full"
        preserveAspectRatio="none"
        role="presentation"
        viewBox={`0 0 ${sz} ${sz}`}
      >
        <defs>
          <pattern
            height={sz}
            id="gridPattern"
            patternUnits="userSpaceOnUse"
            width={sz}
          >
            {/* Lignes principales bien visibles */}
            <path
              d={`M ${sz} 0 L 0 0 0 ${sz}`}
              fill="none"
              stroke={color ?? "var(--primary-strong)"}
              strokeWidth={1.5}
            />
          </pattern>
          {/* Dégradé radial d'accent lumière */}
          <radialGradient cx="50%" cy="50%" id="lightSpot" r="75%">
            <stop
              offset="0%"
              stopColor={color ?? "var(--primary-strong)"}
              stopOpacity={0.15}
            />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect fill="url(#gridPattern)" height="100%" width="100%" />
        <rect fill="url(#lightSpot)" height="100%" opacity={0.6} width="100%" />
      </svg>
    </div>
  );
}

import { motion } from "motion/react";
import { useId } from "react";

export function BubbleCluster({ className }: { className?: string }) {
  const titleId = useId();
  const centerR = 70; // ~170px diamètre pour plus de présence
  const satelliteR = 33; // ~86px diamètre (réduit de ~10%)
  const orbitR = 100; // rayon d’orbite centre→centre (plus large)
  const cx = 150;
  const cy = 150;
  const satellites = [
    { angle: -90, color: "#c524c5", label: "AeroSpatial" },
    { angle: -18, color: "#3c3ffb", label: "Sondage" },
    { angle: 54, color: "#fb593c", label: "Cyber" },
    { angle: 126, color: "#881a1a", label: "Défense" },
    { angle: 198, color: "#3cfbc2", label: "Presse" },
  ];

  return (
    <motion.svg
      aria-labelledby={titleId}
      className={["h-auto w-full", className].filter(Boolean).join(" ")}
      initial={{ opacity: 0 }}
      role="img"
      transition={{ duration: 0.4 }}
      viewBox="0 0 300 300"
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <title id={titleId}>Secteurs autour du noyau — 10+</title>
      {/* Centre */}
      <g
        style={{
          filter: "drop-shadow(0 0 6px #fb923c) drop-shadow(0 0 14px #fb923c)",
        }}
      >
        <circle
          cx={cx}
          cy={cy}
          fill="var(--card)"
          r={centerR}
          stroke="var(--border)"
        />
        <text
          className="fill-current font-kanit"
          dominantBaseline="middle"
          fontSize={50}
          fontWeight={800}
          textAnchor="middle"
          x={cx}
          y={cy}
        >
          10+
        </text>
      </g>
      {/* Satellites */}
      {satellites.map((s, i) => {
        const strokeColor = s.color ?? "var(--border)";
        const rad = (s.angle * Math.PI) / 180;
        const sx = cx + orbitR * Math.cos(rad);
        const sy = cy + orbitR * Math.sin(rad);
        return (
          <g key={s.label}>
            <motion.circle
              cx={sx}
              cy={sy}
              fill="var(--card)"
              initial={{ opacity: 0, scale: 0.9 }}
              r={satelliteR}
              stroke={strokeColor}
              strokeWidth={3}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
            />
            <text
              className="fill-current font-kanit"
              dominantBaseline="middle"
              fontSize={12}
              textAnchor="middle"
              x={sx}
              y={sy}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </motion.svg>
  );
}

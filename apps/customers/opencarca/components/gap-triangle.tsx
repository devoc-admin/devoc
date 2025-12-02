import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

export function GapTriangle() {
  const titleId = useId();
  const pathD = "M110 40 L180 180 L40 180 Z";
  const measureRef = useRef<SVGPathElement | null>(null);
  const [length, setLength] = useState(360);
  useEffect(() => {
    if (measureRef.current) {
      try {
        const l = measureRef.current.getTotalLength();
        if (Number.isFinite(l) && l > 0) setLength(l);
      } catch {
        // ignore
      }
    }
  }, []);
  return (
    <div className="xs:max-auto mx-auto w-full">
      <svg aria-labelledby={titleId} role="img" viewBox="0 0 220 220">
        <title id={titleId}>
          Triangle GAP — Gouvernance, Accompagnement, Protection
        </title>
        <polygon
          fill="none"
          points="110,20 200,190 20,190"
          stroke="var(--border)"
          strokeWidth={4}
        />
        <polygon
          className="neon-glow"
          fill="none"
          points="110,40 180,180 40,180"
          stroke="var(--primary)"
          strokeWidth={4}
        />
        {/* Mesure de longueur du périmètre intérieur */}
        <path d={pathD} fill="none" ref={measureRef} stroke="transparent" />
        {/* Traînée animée qui parcourt le triangle */}
        <motion.path
          animate={{ strokeDashoffset: [0, -length] }}
          d={pathD}
          fill="none"
          stroke="var(--primary)"
          strokeDasharray={`${Math.max(24, Math.round(length * 0.15))} ${length}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))" }}
          transition={{
            duration: 4.2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <circle cx={110} cy={28} fill="var(--primary)" r={6} />
        <circle cx={188} cy={186} fill="var(--primary)" r={6} />
        <circle cx={32} cy={186} fill="var(--primary)" r={6} />
        <text
          className="fill-current"
          fontSize={12}
          textAnchor="middle"
          x={110}
          y={16}
        >
          Gouvernance
        </text>
        <text
          className="fill-current"
          fontSize={12}
          textAnchor="end"
          x={196}
          y={200}
        >
          Protection
        </text>
        <text
          className="fill-current"
          fontSize={12}
          textAnchor="start"
          x={24}
          y={200}
        >
          Accompagnement
        </text>
      </svg>
    </div>
  );
}

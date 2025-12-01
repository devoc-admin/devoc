import { useId } from "react";

export function GapTriangle() {
  const titleId = useId();
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

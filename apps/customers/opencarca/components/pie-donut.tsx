import { useId } from "react";

export function PieDonut({
  value,
  color = "#dc2626",
  label,
  className,
}: {
  value: number;
  color?: string;
  label?: string;
  className?: string;
}) {
  const titleId = useId();
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 48;
  const circ = 2 * Math.PI * radius;
  const filled = (clamped / 100) * circ;
  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <svg
        aria-labelledby={titleId}
        className="h-auto w-full"
        role="img"
        viewBox="0 0 120 120"
      >
        <title
          id={titleId}
        >{`${label ?? "Diagramme donut"} : ${clamped}%`}</title>
        <circle
          cx="60"
          cy="60"
          fill="none"
          r={radius}
          stroke="var(--border)"
          strokeWidth="16"
        />
        <circle
          cx="60"
          cy="60"
          fill="none"
          r={radius}
          stroke={color}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeWidth="16"
          transform="rotate(-90 60 60)"
        />
        <circle cx="60" cy="60" fill="var(--background)" r="32" />
        <text
          dominantBaseline="middle"
          fill="var(--foreground)"
          fontSize={20}
          fontWeight={800}
          textAnchor="middle"
          x={60}
          y={60}
        >
          {clamped}%
        </text>
      </svg>
      {label ? (
        <div className="mt-2 text-center text-muted-foreground">{label}</div>
      ) : null}
    </div>
  );
}

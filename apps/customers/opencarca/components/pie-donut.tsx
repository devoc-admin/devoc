import { useId } from "react";

export function PieDonut({
  value,
  color = "#dc2626",
  label,
}: {
  value: number;
  color?: string;
  label?: string;
}) {
  const titleId = useId();
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 48;
  const circ = 2 * Math.PI * radius;
  const filled = (clamped / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg
        aria-labelledby={titleId}
        className="h-48 w-48"
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
      </svg>
      {label ? <div className="mt-2 text-muted-foreground">{label}</div> : null}
      <div className="mt-1 font-bold font-kanit text-3xl text-foreground">
        {clamped}%
      </div>
    </div>
  );
}

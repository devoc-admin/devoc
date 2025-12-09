import { useId, useMemo } from "react";

export function Gauge({
  value,
  max = 100,
  label,
  color = "var(--primary)",
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  className?: string;
}) {
  const titleId = useId();
  const pct = useMemo(
    () => Math.max(0, Math.min(100, (value / max) * 100)),
    [value, max]
  );
  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <svg
        aria-labelledby={titleId}
        className="h-auto w-full"
        role="img"
        viewBox="0 0 100 60"
      >
        <title
          id={titleId}
        >{`${label ?? "Jauge"} : ${Math.round(pct)}%`}</title>
        <path
          className="text-zinc-300 dark:text-zinc-700"
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke={color}
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (125.6 * pct) / 100}
          strokeWidth="8"
        />
        <circle cx={10 + (80 * pct) / 100} cy={50} fill={color} r={3.5} />
        <text
          dominantBaseline="middle"
          fill="var(--foreground)"
          fontSize={14}
          fontWeight={800}
          textAnchor="middle"
          x={50}
          y={34}
        >
          {Math.round(pct)}%
        </text>
      </svg>
      {label ? (
        <div className="mt-2 text-center text-zinc-600 dark:text-zinc-300">
          {label}
        </div>
      ) : null}
    </div>
  );
}

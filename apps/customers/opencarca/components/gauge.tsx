import { useId, useMemo } from "react";

export function Gauge({
  value,
  max = 100,
  label,
}: {
  value: number;
  max?: number;
  label?: string;
}) {
  const titleId = useId();
  const pct = useMemo(
    () => Math.max(0, Math.min(100, (value / max) * 100)),
    [value, max]
  );
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4">
      <svg
        aria-labelledby={titleId}
        className="w-full"
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
          className="text-primary"
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="currentColor"
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (125.6 * pct) / 100}
          strokeWidth="8"
        />
        <circle
          className="fill-primary"
          cx={10 + (80 * pct) / 100}
          cy={50}
          r={3.5}
        />
      </svg>
      <div className="text-center">
        <div className="font-bold font-kanit text-4xl text-zinc-900 dark:text-zinc-50">
          {Math.round(pct)}%
        </div>
        {label ? (
          <div className="text-zinc-600 dark:text-zinc-300">{label}</div>
        ) : null}
      </div>
    </div>
  );
}

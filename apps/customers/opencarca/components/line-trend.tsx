import { useId } from "react";

export function LineTrend({
  points,
  color = "var(--primary)",
}: {
  points: number[];
  color?: string;
}) {
  const titleId = useId();
  const w = 240;
  const h = 120;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const scaleX = (i: number) =>
    (i / Math.max(1, points.length - 1)) * (w - 20) + 10;
  const scaleY = (v: number) =>
    h - 10 - ((v - min) / (max - min || 1)) * (h - 20);
  const d = points
    .map((v, i) => `${i ? "L" : "M"} ${scaleX(i)} ${scaleY(v)}`)
    .join(" ");
  return (
    <svg
      aria-labelledby={titleId}
      className="h-32 w-64"
      role="img"
      viewBox={`0 0 ${w} ${h}`}
    >
      <title id={titleId}>Courbe de tendance (évolution des valeurs)</title>
      <path d={d} fill="none" stroke={color} strokeWidth={4} />
    </svg>
  );
}

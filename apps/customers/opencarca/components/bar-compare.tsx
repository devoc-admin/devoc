export function BarCompare({
  baseline,
  improved,
  labelBaseline,
  labelImproved,
}: {
  baseline: number;
  improved: number;
  labelBaseline: string;
  labelImproved: string;
}) {
  const max = Math.max(baseline, improved);
  const wb = (baseline / (max || 1)) * 100;
  const wi = (improved / (max || 1)) * 100;
  const reduction = Math.max(
    0,
    Math.round((1 - improved / (baseline || 1)) * 100)
  );
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <div className="mb-1 text-muted-foreground text-sm">
          {labelBaseline}
        </div>
        <div className="h-6 w-full rounded bg-muted">
          <div className="h-6 rounded bg-primary" style={{ width: `${wb}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-1 text-muted-foreground text-sm">
          {labelImproved}
        </div>
        <div className="h-6 w-full rounded bg-muted">
          <div
            className="h-6 rounded bg-primary/70"
            style={{ width: `${wi}%` }}
          />
        </div>
      </div>
      <div className="text-center text-muted-foreground text-sm">
        Réduction: ~{reduction}%
      </div>
    </div>
  );
}

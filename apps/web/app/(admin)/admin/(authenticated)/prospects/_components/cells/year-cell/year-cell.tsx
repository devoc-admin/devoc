export function YearCell({ n }: { n?: number | null }) {
  if (n === null || n === undefined) {
    return <span className="text-muted-foreground">—</span>;
  }
  return <span>{n}</span>;
}

export function MapPlaceholder({ title }: { title?: string }) {
  return (
    <div className="flex h-[60vh] w-full max-w-5xl items-center justify-center rounded-xl border border-border bg-card/70 backdrop-blur-sm">
      <div className="p-8 text-center">
        <div className="font-bold text-2xl text-foreground">
          {title ?? "Carte (placeholder)"}
        </div>
        <div className="mt-2 text-muted-foreground">
          Zone pour carte interactive ou heatmap (département Aude / agglo).
        </div>
      </div>
    </div>
  );
}

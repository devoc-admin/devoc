export function Quote({
  source,
  author,
  children,
}: {
  source: string;
  author: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className="border-primary-lighter border-l-2 pl-3">
      <span className="font-bold font-geist italic">« {children} »</span>
      <footer className="font-geist-mono font-semibold text-[0.7rem] text-foreground/40 uppercase tracking-widest">
        {author} — {source}
      </footer>
    </blockquote>
  );
}

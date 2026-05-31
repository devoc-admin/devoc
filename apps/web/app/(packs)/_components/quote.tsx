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
    <figure className="space-y-1 border-primary-lighter border-l-2 pl-3">
      <blockquote className="w-[90%] font-bold font-geist italic">
        <p>« {children} »</p>
      </blockquote>
      <figcaption className="font-geist-mono font-semibold text-[0.75rem] text-foreground/40 uppercase tracking-wide">
        {author} — {source}
      </figcaption>
    </figure>
  );
}

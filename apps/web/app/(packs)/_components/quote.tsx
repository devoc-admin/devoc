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
    <figure className="border-orange-red space-y-1 border-l-3 pl-3">
      <blockquote className="font-geist w-[90%] font-bold italic">
        <p>« {children} »</p>
      </blockquote>
      <figcaption className="font-geist-mono text-foreground/40 text-[0.75rem] font-semibold tracking-wide uppercase">
        {author} — {source}
      </figcaption>
    </figure>
  );
}

export function HighlightedText({ children }: { children: React.ReactNode }) {
  return (
    <span className="from-orange-red to-primary-lighter overflow-visible bg-linear-to-r bg-clip-text font-medium text-transparent italic">
      {" "}
      {children}{" "}
    </span>
  );
}

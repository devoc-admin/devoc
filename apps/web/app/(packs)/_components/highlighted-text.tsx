export function HighlightedText({ children }: { children: React.ReactNode }) {
  return (
    <span className="overflow-visible bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text font-medium text-transparent italic">
      {" "}
      {children}{" "}
    </span>
  );
}

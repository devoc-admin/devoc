export function PContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[60ch] font-geist text-foreground-dark/60">
      {children}
    </p>
  );
}

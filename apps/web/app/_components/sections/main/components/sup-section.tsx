import { SupNumber } from "./sup-number";
export function SupSection({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <SupNumber className="bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text font-semibold text-transparent">
        {number}
      </SupNumber>
      <div className="h-px w-8 bg-foreground-dark/30" />
      <span className="font-geist-mono text-[0.7rem] text-foreground-dark/60 uppercase tracking-[0.15rem]">
        {children}
      </span>
    </div>
  );
}

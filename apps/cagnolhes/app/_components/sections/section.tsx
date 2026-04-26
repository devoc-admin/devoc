import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export function Section({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SectionTitle({
  children,
  Icon,
}: {
  children: string;
  Icon: IconSvgElement;
}) {
  return (
    <div className="relative w-fit text-7xl text-emerald-800">
      <h3 className="font-bold font-montserrat">{children}</h3>
      <HugeiconsIcon
        className="absolute top-0 right-0 size-[1em] translate-x-[calc(100%+10px)] -translate-y-1/3"
        icon={Icon}
        strokeWidth={2}
      />
      <div className="absolute bottom-0 h-[0.6em] w-[35%] -translate-x-[40%] bg-emerald-800/20" />
    </div>
  );
}

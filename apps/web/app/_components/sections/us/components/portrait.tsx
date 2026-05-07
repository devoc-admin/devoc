import DitheredImage from "@/components/motion-core/dithered-image/dithered-image";
import { cn } from "@/lib/utils";

export function Portrait({
  color,
  name,
  description,
  src,
}: {
  color: string;
  name: string;
  description: string;
  src: string;
}) {
  return (
    <div
      className={cn(
        "grow",
        "relative",
        "rounded-4xl",
        "flex flex-col gap-y-6",
        "p-9",
        "min-h-260",
        "border",
        "bg-surface-dark",
        "border-foreground-dark/10",
        "hover:border-foreground-dark/15",
        "transition-colors"
      )}
    >
      <PortraitImage color={color} name={name} src={src} />
      <p className="text-foreground-dark/60 text-lg">{description}</p>
    </div>
  );
}

function PortraitImage({
  color,
  name,
  src,
}: {
  color: string;
  name: string;
  src: string;
}) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="grow overflow-hidden rounded-3xl bg-black">
        <DitheredImage
          backgroundColor="#000" // background-dark
          className={cn(
            "ease-out",
            "mask-b-from-70% mask-b-to-100%",
            "duration-500",
            "transition-transform"
          )}
          color={color}
          ditherMap="bayer4x4"
          pixelSize={1}
          src={src}
          threshold={0.05}
        />
      </div>
      <span className="absolute bottom-4 left-6 flex flex-col gap-y-1.5">
        <span className="font-geist-mono text-[0.7rem] text-foreground-dark/50 uppercase">
          Co-fondateur • Backend & infrastructure
        </span>
        <span
          className="bg-clip-text! font-fraunces text-4xl text-transparent"
          style={{
            background: `linear-gradient(to right, ${color}, ${color}20`,
          }}
        >
          {name}
        </span>
      </span>
    </div>
  );
}

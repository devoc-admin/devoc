import DitheredImage from "@/components/motion-core/dithered-image/dithered-image";
import { cn } from "@/lib/utils";
export function Portrait({
  color,
  name,
  title,
  description,
  src,
}: {
  color: string;
  name: string;
  title: string;
  description: string;
  src: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        "border",
        "h-full",
        "bg-surface-dark",
        "border-foreground-dark/10",
        "hover:border-foreground-dark/15",
        "transition-colors",
        "flex flex-col",
        // ↔️
        "gap-y-4 rounded-2xl p-1",
        "xs:gap-y-4 xs:rounded-2xl xs:p-1",
        "sm:gap-y-4 sm:rounded-2xl sm:p-1",
        "md:gap-y-4 md:rounded-2xl md:p-1.5",
        "lg:gap-y-4 lg:rounded-2xl lg:p-2",
        "2xl:gap-y-6 2xl:rounded-4xl 2xl:p-4"
      )}
    >
      <PortraitImage color={color} name={name} src={src} title={title} />
      <p
        className={cn(
          "text-foreground-dark/60",
          "text-base",
          // ↔️
          "mb-1.5 px-2.5 text-base",
          "xs:mb-1.5 xs:px-2.5 text-base",
          "sm:mb-1.5 sm:px-2.5 sm:text-base",
          "md:mb-1.5 md:px-2.5 md:text-base",
          "lg:mb-1.5 lg:px-2.5 lg:text-base",
          "xl:mb-1.5 xl:px-2.5 xl:text-lg",
          "2xl:mb-2 2xl:px-2.5 2xl:text-xl"
        )}
      >
        {description}
      </p>
    </div>
  );
}

function PortraitImage({
  color,
  name,
  title,
  src,
}: {
  color: string;
  title: string;
  name: string;
  src: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        "flex flex-col gap-y-2",
        // ↔️
        "h-80",
        "xs:h-80",
        "sm:h-80",
        "md:h-90",
        "lg:h-100",
        "xl:h-140",
        "2xl:h-220"
      )}
    >
      {/* 🖼️ */}
      <div
        className={cn(
          "grow overflow-hidden",
          "bg-black",
          // ↔️
          "rounded-[0.8rem]",
          "xs:rounded-[0.8rem]",
          "sm:rounded-[0.8rem]",
          "md:rounded-[0.7rem]",
          "lg:rounded-[0.7rem]",
          "2xl:rounded-3xl"
        )}
      >
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
      {/* 🔤 */}
      <span className="absolute bottom-4 left-6 flex flex-col gap-y-1.5">
        <span
          className={cn(
            "font-geist-mono text-foreground-dark/50 uppercase",
            // ↔️
            "text-[0.7rem]",
            "xs:text-[0.7rem]",
            "sm:text-[0.7rem]",
            "md:text-[0.7rem]",
            "lg:text-[0.7rem]",
            "xl:text-[0.7rem]",
            "2xl:text-xs"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "bg-clip-text! font-fraunces text-transparent",
            // ↔️
            "text-4xl",
            "xs:text-4xl",
            "sm:text-4xl",
            "md:text-4xl",
            "lg:text-4xl",
            "xl:text-4xl",
            "2xl:text-5xl"
          )}
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

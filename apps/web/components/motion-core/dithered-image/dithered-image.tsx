import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import DitherImage from "./dithered-image-scene";

type DitherImageProps = ComponentProps<typeof DitherImage>;

interface DitheredImageProps {
  /**
   * Background color.
   * @default "#111113"
   */
  backgroundColor?: DitherImageProps["backgroundColor"];
  /** Additional CSS classes for the container. */
  className?: string;
  /**
   * Foreground color (dots).
   * @default "#ff6900"
   */
  color?: DitherImageProps["color"];
  /**
   * Type of dithering map to use.
   * @default "bayer4x4"
   */
  ditherMap?: DitherImageProps["ditherMap"];
  /**
   * Pixel size of the dithering effect.
   * @default 1
   */
  pixelSize?: DitherImageProps["pixelSize"];
  /** The image source URL. */
  src: DitherImageProps["image"];
  /**
   * Threshold for the dithering effect.
   * @default 0.0
   */
  threshold?: DitherImageProps["threshold"];
  [key: string]: unknown;
}

export default function DitheredImage({
  src,
  className,
  ditherMap = "bayer4x4",
  pixelSize = 1,
  color = "#f48c06",
  backgroundColor = "#111113",
  threshold = 0.0,
  ...rest
}: DitheredImageProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...rest}
    >
      <div className="absolute inset-0 z-0">
        <DitherImage
          backgroundColor={backgroundColor}
          color={color}
          ditherMap={ditherMap}
          image={src}
          pixelSize={pixelSize}
          threshold={threshold}
        />
      </div>
    </div>
  );
}

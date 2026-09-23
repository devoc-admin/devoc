import Image from "next/image";
import PurpleCircleImage from "@/assets/purple-circle.webp";
import { cn } from "@/lib/utils";

export function OrangeDecorativeStone() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={cn(
        "absolute right-0 bottom-0",
        "z-0",
        "translate-x-[60%]",
        "opacity-100",
        "hue-rotate-125",
        "mask-radial-[135%_117%] mask-radial-at-bottom-right mask-radial-from-0% mask-radial-to-92%"
      )}
      height={300}
      src={PurpleCircleImage}
      width={300}
    />
  );
}

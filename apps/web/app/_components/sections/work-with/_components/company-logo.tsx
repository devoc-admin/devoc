import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export function CompanyLogo({
  logo,
  name,
  className,
}: {
  logo: StaticImageData;
  name: string;
  className?: string;
}) {
  return (
    <Image
      alt={`Logo ${name}`}
      className={cn(
        "w-auto",
        "max-h-[80%]",
        "brightness-100 grayscale-100 invert-0",
        "transition-all duration-500",
        "group-hover:brightness-0 group-hover:grayscale-0 group-hover:invert-100",
        className
      )}
      height={20}
      src={logo}
      width={20}
    />
  );
}

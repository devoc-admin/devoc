declare module "*.svg" {
  import type { StaticImageData } from "next/image";

  const value: StaticImageData;
  export = value;
}

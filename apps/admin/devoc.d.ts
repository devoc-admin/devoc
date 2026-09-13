declare module "*.svg" {
  import { StaticImageData } from "next/image";

  const value: StaticImageData;
  export = value;
}

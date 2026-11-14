import type { StaticImageData } from "next/image";

export interface Actualite {
  category: {
    color: string;
    label: string;
  };
  date: string;
  excerpt: string;
  img: StaticImageData;
  slug: string;
  title: string;
}

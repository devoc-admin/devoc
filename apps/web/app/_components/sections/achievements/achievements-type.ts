import type { StaticImageData } from "next/image";

export type Achievement = {
  title: string;
  id: string;
  slug: string;
  description: string;
  technologies: string[];
  companyLogo: React.ReactNode;
  companyLink: string;
  accomplishments?: string[];
  snapshots: StaticImageData[];
  showcase: StaticImageData;
  video?: string;
};

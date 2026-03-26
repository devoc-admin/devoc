import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const Pages: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug"],
    description: "Éditez les pages statiques du site (CGV, À propos...)",
    group: "Contenu",
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Titre",
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    slugField,
    {
      label: "Contenu",
      localized: true,
      name: "content",
      type: "richText",
    },
    seoFields,
  ],
  labels: {
    plural: "📄 Pages",
    singular: "📄 Page",
  },
  slug: "pages",
};

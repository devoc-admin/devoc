import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const Categories: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "order"],
    description: "Organisez vos produits par catégorie",
    group: "Boutique",
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
      label: "Description",
      localized: true,
      name: "description",
      type: "richText",
    },
    {
      label: "Image",
      name: "image",
      relationTo: "media",
      type: "upload",
    },
    {
      admin: {
        description:
          "Plus le nombre est petit, plus la catégorie apparaît en premier",
        position: "sidebar",
      },
      defaultValue: 0,
      label: "Ordre d'affichage",
      name: "order",
      type: "number",
    },
  ],
  labels: {
    plural: "📂 Catégories",
    singular: "📂 Catégorie",
  },
  slug: "categories",
};

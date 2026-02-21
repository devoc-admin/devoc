import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const Categories: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "order"],
    useAsTitle: "title",
  },
  fields: [
    {
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    slugField,
    {
      localized: true,
      name: "description",
      type: "richText",
    },
    {
      name: "image",
      relationTo: "media",
      type: "upload",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
      name: "order",
      type: "number",
    },
  ],
  slug: "categories",
};

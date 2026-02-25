import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  admin: {
    defaultColumns: ["customerName", "rating", "approved"],
    useAsTitle: "customerName",
  },
  fields: [
    {
      name: "customerName",
      required: true,
      type: "text",
    },
    {
      max: 5,
      min: 1,
      name: "rating",
      required: true,
      type: "number",
    },
    {
      localized: true,
      name: "comment",
      type: "textarea",
    },
    {
      name: "product",
      relationTo: "products",
      type: "relationship",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
      name: "approved",
      type: "checkbox",
    },
  ],
  slug: "reviews",
};

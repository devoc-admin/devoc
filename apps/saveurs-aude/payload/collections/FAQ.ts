import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  admin: {
    defaultColumns: ["question", "category", "order"],
    useAsTitle: "question",
  },
  fields: [
    {
      localized: true,
      name: "question",
      required: true,
      type: "text",
    },
    {
      localized: true,
      name: "answer",
      required: true,
      type: "richText",
    },
    {
      localized: true,
      name: "category",
      type: "text",
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
  slug: "faq",
};

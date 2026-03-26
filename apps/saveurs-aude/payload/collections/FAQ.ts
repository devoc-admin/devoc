import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  admin: {
    defaultColumns: ["question", "category", "order"],
    useAsTitle: "question",
  },
  fields: [
    {
      label: "Question",
      localized: true,
      name: "question",
      required: true,
      type: "text",
    },
    {
      label: "Réponse",
      localized: true,
      name: "answer",
      required: true,
      type: "richText",
    },
    {
      label: "Catégorie",
      localized: true,
      name: "category",
      type: "text",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
      label: "Ordre d'affichage",
      name: "order",
      type: "number",
    },
  ],
  labels: {
    plural: "❓ FAQ",
    singular: "❓ FAQ",
  },
  slug: "faq",
};

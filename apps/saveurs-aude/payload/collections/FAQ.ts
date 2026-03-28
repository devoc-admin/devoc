import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  access: {
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    defaultColumns: ["question", "category", "order"],
    description: "Gérez les questions fréquemment posées",
    group: "Contenu",
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
      admin: {
        description: "Permet de regrouper les questions par thème sur le site",
      },
      label: "Catégorie",
      localized: true,
      name: "category",
      type: "text",
    },
    {
      admin: {
        description:
          "Plus le nombre est petit, plus la question apparaît en premier",
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

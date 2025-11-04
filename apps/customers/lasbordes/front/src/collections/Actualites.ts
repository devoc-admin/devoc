import type { CollectionConfig } from "payload";

export const Actualites: CollectionConfig = {
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },

  fields: [
    {
      label: "Titre",
      name: "title",
      required: true,
      type: "text",
    },
    {
      label: "Contenu",
      name: "content",
      required: true,
      type: "richText",
    },
    {
      label: "Date",
      name: "date",
      required: true,
      type: "date",
    },
    {
      label: "Image",
      name: "image",
      relationTo: "media",
      required: false,
      type: "upload",
    },
    {
      defaultValue: "Lasbordes",
      label: "Lieu",
      name: "place",
      required: false,
      type: "text",
    },
  ],
  labels: {
    plural: "Actualités",
    singular: "Actualité",
  },
  slug: "actualites",
};

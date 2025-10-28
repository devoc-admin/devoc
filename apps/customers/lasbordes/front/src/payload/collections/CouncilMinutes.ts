import type { CollectionConfig } from "payload";

export const CouncilMinutes: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "date"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Titre",
      name: "title",
      required: true,
      type: "text",
    },
    {
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
      label: "Date du conseil",
      name: "date",
      required: true,
      type: "date",
    },
    {
      filterOptions: {
        mimeType: { equals: "application/pdf" },
      },
      label: "Fichier PDF",
      name: "pdf",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      admin: {
        description: "Court résumé du compte rendu",
      },
      label: "Résumé",
      name: "summary",
      type: "textarea",
    },
    {
      fields: [
        {
          name: "tag",
          required: true,
          type: "text",
        },
      ],
      label: "Étiquettes",
      name: "tags",
      type: "array",
    },
  ],
  slug: "council-minutes",
};

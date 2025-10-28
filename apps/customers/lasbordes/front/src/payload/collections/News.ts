import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "status", "createdAt"],
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
        description: "URL de l'actualité",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
      label: "Slug",
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      label: "Description",
      name: "description",
      required: true,
      type: "richText",
    },
    {
      label: "Lieu",
      name: "location",
      type: "text",
    },
    {
      label: "Image",
      name: "image",
      relationTo: "media",
      type: "upload",
    },
    {
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
      label: "Date de l'événement",
      name: "eventDate",
      type: "date",
    },
    {
      admin: {
        condition: (data) => Boolean(data.eventDate),
        description: "Format: HH:MM",
      },
      label: "Heure de début",
      name: "eventTime",
      type: "text",
    },
    {
      admin: {
        condition: (data) => Boolean(data.eventDate),
        date: {
          pickerAppearance: "dayOnly",
        },
      },
      label: "Date de fin (événements sur plusieurs jours)",
      name: "eventEndDate",
      type: "date",
    },
    {
      admin: {
        condition: (data) => Boolean(data.eventDate),
        description: "Format: HH:MM",
      },
      label: "Heure de fin",
      name: "eventEndTime",
      type: "text",
    },
    {
      admin: {
        condition: (data) => Boolean(data.eventDate),
      },
      defaultValue: true,
      label: "Activer l'export calendrier (.ics)",
      name: "calendarExport",
      type: "checkbox",
    },
    {
      defaultValue: "draft",
      label: "Statut",
      name: "status",
      options: [
        {
          label: "Brouillon",
          value: "draft",
        },
        {
          label: "Publié",
          value: "published",
        },
      ],
      required: true,
      type: "select",
    },
  ],
  slug: "news",
  timestamps: true,
};

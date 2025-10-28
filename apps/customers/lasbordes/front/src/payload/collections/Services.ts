import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "category"],
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
      label: "Catégorie",
      name: "category",
      options: [
        {
          label: "Loisirs & Culture",
          value: "loisirs_culture",
        },
        {
          label: "Jeunesse",
          value: "jeunesse",
        },
        {
          label: "Médical",
          value: "medical",
        },
      ],
      required: true,
      type: "select",
    },
    {
      label: "Description",
      name: "description",
      required: true,
      type: "richText",
    },
    {
      admin: {
        description: "Nom de l'icône Lucide (ex: Palette, Users, Heart)",
      },
      label: "Icône",
      name: "icon",
      type: "text",
    },
  ],
  slug: "services",
};

import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "slug"],
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
        description: "URL de la page",
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
      label: "Contenu",
      name: "content",
      required: true,
      type: "richText",
    },
  ],
  slug: "pages",
};

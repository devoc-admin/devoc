import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: "editor",
      name: "role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Éditeur", value: "editor" },
      ],
      required: true,
      type: "select",
    },
  ],
  slug: "users",
};

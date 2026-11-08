import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  access: {
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    description: "Gérez les comptes administrateurs du CMS",
    group: "Paramètres",
    useAsTitle: "name",
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      label: "Nom",
      name: "name",
      required: true,
      type: "text",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: "editor",
      label: "Rôle",
      name: "role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Éditeur", value: "editor" },
      ],
      required: true,
      type: "select",
    },
  ],
  labels: {
    plural: "🔑 Utilisateurs",
    singular: "🔑 Utilisateur",
  },
  slug: "users",
};

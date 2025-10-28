import type { CollectionConfig } from "payload";

export const MunicipalTeam: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["name", "role", "order"],
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Nom complet",
      name: "name",
      required: true,
      type: "text",
    },
    {
      label: "Fonction",
      name: "role",
      required: true,
      type: "text",
    },
    {
      label: "Photo",
      name: "photo",
      relationTo: "media",
      type: "upload",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      admin: {
        description: "Ordre d'affichage (0 = premier)",
      },
      defaultValue: 0,
      label: "Ordre d'affichage",
      name: "order",
      required: true,
      type: "number",
    },
  ],
  slug: "municipal-team",
};

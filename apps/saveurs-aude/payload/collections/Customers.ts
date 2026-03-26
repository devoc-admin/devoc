import type { CollectionConfig } from "payload";

import { sendWelcomeEmailHook } from "@/payload/hooks/sendWelcomeEmailHook";

export const Customers: CollectionConfig = {
  access: {
    create: () => true,
    delete: ({ req }) => req.user?.collection === "users",
    read: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "customers")
        return { id: { equals: req.user.id } };
      return false;
    },
    update: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "customers")
        return { id: { equals: req.user.id } };
      return false;
    },
  },
  admin: {
    defaultColumns: ["email", "firstName", "lastName", "createdAt"],
    useAsTitle: "email",
  },
  auth: {
    tokenExpiration: 604_800, // 7 days
  },
  fields: [
    {
      label: "Prénom",
      name: "firstName",
      required: true,
      type: "text",
    },
    {
      label: "Nom",
      name: "lastName",
      required: true,
      type: "text",
    },
    {
      label: "Téléphone",
      name: "phone",
      type: "text",
    },
    {
      fields: [
        { label: "Libellé", name: "label", required: true, type: "text" },
        { label: "Rue", name: "street", required: true, type: "text" },
        { label: "Ville", name: "city", required: true, type: "text" },
        { label: "Code postal", name: "zipCode", required: true, type: "text" },
        {
          defaultValue: "France",
          label: "Pays",
          name: "country",
          required: true,
          type: "text",
        },
        {
          defaultValue: false,
          label: "Adresse par défaut",
          name: "isDefault",
          type: "checkbox",
        },
      ],
      label: "Adresses",
      name: "addresses",
      type: "array",
    },
    {
      defaultValue: false,
      label: "Inscrit à la newsletter",
      name: "newsletter",
      type: "checkbox",
    },
  ],
  hooks: {
    afterChange: [sendWelcomeEmailHook],
  },
  labels: {
    plural: "👥 Clients",
    singular: "👥 Client",
  },
  slug: "customers",
};

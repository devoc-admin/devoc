import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  access: {
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    defaultColumns: ["customerName", "rating", "approved"],
    description: "Modérez les avis clients sur vos produits",
    group: "Boutique",
    useAsTitle: "customerName",
  },
  fields: [
    {
      label: "Nom du client",
      name: "customerName",
      required: true,
      type: "text",
    },
    {
      label: "Note",
      max: 5,
      min: 1,
      name: "rating",
      required: true,
      type: "number",
    },
    {
      label: "Commentaire",
      localized: true,
      name: "comment",
      type: "textarea",
    },
    {
      label: "Produit",
      name: "product",
      relationTo: "products",
      type: "relationship",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
      label: "Approuvé",
      name: "approved",
      type: "checkbox",
    },
  ],
  labels: {
    plural: "⭐ Avis",
    singular: "⭐ Avis",
  },
  slug: "reviews",
};

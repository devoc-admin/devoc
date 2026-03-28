import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      fields: [
        {
          label: "Titre",
          localized: true,
          name: "title",
          required: true,
          type: "text",
        },
        {
          label: "Sous-titre",
          localized: true,
          name: "subtitle",
          type: "text",
        },
        {
          label: "Image de fond",
          name: "backgroundImage",
          relationTo: "media",
          type: "upload",
        },
        {
          fields: [
            { label: "Libellé", localized: true, name: "label", type: "text" },
            { label: "Lien", name: "link", type: "text" },
          ],
          label: "Bouton d'action",
          name: "cta",
          type: "group",
        },
      ],
      label: "Bannière héro",
      name: "hero",
      type: "group",
    },
    {
      hasMany: true,
      label: "Catégories mises en avant",
      name: "featuredCategories",
      relationTo: "categories",
      type: "relationship",
    },
    {
      fields: [
        { label: "Texte", localized: true, name: "text", type: "text" },
        { label: "Lien", name: "link", type: "text" },
        {
          defaultValue: false,
          label: "Active",
          name: "active",
          type: "checkbox",
        },
      ],
      label: "Bandeau promotionnel",
      name: "promotionBanner",
      type: "group",
    },
  ],
  label: "🏠 Page d'accueil",
  slug: "homepage",
};

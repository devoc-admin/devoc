import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  fields: [
    {
      fields: [
        {
          localized: true,
          name: "title",
          required: true,
          type: "text",
        },
        {
          localized: true,
          name: "subtitle",
          type: "text",
        },
        {
          name: "backgroundImage",
          relationTo: "media",
          type: "upload",
        },
        {
          fields: [
            { localized: true, name: "label", type: "text" },
            { name: "link", type: "text" },
          ],
          name: "cta",
          type: "group",
        },
      ],
      name: "hero",
      type: "group",
    },
    {
      hasMany: true,
      name: "featuredCategories",
      relationTo: "categories",
      type: "relationship",
    },
    {
      fields: [
        { localized: true, name: "text", type: "text" },
        { name: "link", type: "text" },
        {
          defaultValue: false,
          name: "active",
          type: "checkbox",
        },
      ],
      name: "promotionBanner",
      type: "group",
    },
  ],
  label: "Page d'accueil",
  slug: "homepage",
};

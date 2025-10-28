import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      admin: {
        description: "Description de l'image pour l'accessibilité",
      },
      label: "Texte alternatif",
      name: "alt",
      required: true,
      type: "text",
    },
    {
      label: "Légende",
      name: "caption",
      type: "text",
    },
    {
      admin: {
        description: "Photographe ou source de l'image",
      },
      label: "Crédits",
      name: "credits",
      type: "text",
    },
  ],
  slug: "media",
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        height: 300,
        name: "thumbnail",
        position: "centre",
        width: 400,
      },
      {
        height: 512,
        name: "card",
        position: "centre",
        width: 768,
      },
      {
        height: 1080,
        name: "hero",
        position: "centre",
        width: 1920,
      },
    ],
    mimeTypes: ["image/*", "application/pdf"],
  },
};

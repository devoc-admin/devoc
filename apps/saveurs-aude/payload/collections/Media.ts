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
      label: "Texte alternatif",
      localized: true,
      name: "alt",
      required: true,
      type: "text",
    },
    {
      label: "Légende",
      localized: true,
      name: "caption",
      type: "text",
    },
  ],
  folders: true,
  labels: {
    plural: "🖼️ Médias",
    singular: "🖼️ Média",
  },
  slug: "media",
  upload: {
    adminThumbnail: "thumbnail",
    displayPreview: true,
    imageSizes: [
      {
        height: 300,
        name: "thumbnail",
        position: "centre",
        width: 400,
      },
    ],
    mimeTypes: ["image/*"],
  },
};

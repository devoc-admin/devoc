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
      localized: true,
      name: "alt",
      required: true,
      type: "text",
    },
    {
      localized: true,
      name: "caption",
      type: "text",
    },
  ],
  slug: "media",
  upload: {
    mimeTypes: ["image/*"],
  },
};

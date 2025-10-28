import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
  slug: "users",
};

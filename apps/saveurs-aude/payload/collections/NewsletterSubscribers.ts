import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  access: {
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ["email", "subscribedAt"],
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      required: true,
      type: "email",
      unique: true,
    },
    {
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      name: "subscribedAt",
      type: "date",
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create") {
          return { ...data, subscribedAt: new Date().toISOString() };
        }
        return data;
      },
    ],
  },
  slug: "newsletter-subscribers",
};

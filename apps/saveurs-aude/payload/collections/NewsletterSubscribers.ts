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
    description: "Consultez les inscrits à votre newsletter",
    group: "Paramètres",
    useAsTitle: "email",
  },
  fields: [
    {
      label: "E-mail",
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
      label: "Date d'inscription",
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
  labels: {
    plural: "📬 Abonnés newsletter",
    singular: "📬 Abonné newsletter",
  },
  slug: "newsletter-subscribers",
};

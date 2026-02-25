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
      name: "firstName",
      required: true,
      type: "text",
    },
    {
      name: "lastName",
      required: true,
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      fields: [
        { name: "label", required: true, type: "text" },
        { name: "street", required: true, type: "text" },
        { name: "city", required: true, type: "text" },
        { name: "zipCode", required: true, type: "text" },
        {
          defaultValue: "France",
          name: "country",
          required: true,
          type: "text",
        },
        { defaultValue: false, name: "isDefault", type: "checkbox" },
      ],
      name: "addresses",
      type: "array",
    },
    {
      defaultValue: false,
      name: "newsletter",
      type: "checkbox",
    },
  ],
  hooks: {
    afterChange: [sendWelcomeEmailHook],
  },
  slug: "customers",
};

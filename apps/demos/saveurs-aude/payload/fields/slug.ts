import type { Field } from "payload";

export const slugField: Field = {
  admin: {
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (!value && siblingData?.title) {
          return (siblingData.title as string)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/gu, "")
            .replace(/[^a-z0-9]+/gu, "-")
            .replace(/(^-|-$)/gu, "");
        }
        return value;
      },
    ],
  },
  label: "Identifiant URL",
  name: "slug",
  required: true,
  type: "text",
  unique: true,
};

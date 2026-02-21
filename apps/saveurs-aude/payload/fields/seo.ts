import type { Field } from "payload";

export const seoFields: Field = {
  fields: [
    {
      localized: true,
      name: "title",
      type: "text",
    },
    {
      localized: true,
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      relationTo: "media",
      type: "upload",
    },
  ],
  name: "seo",
  type: "group",
};

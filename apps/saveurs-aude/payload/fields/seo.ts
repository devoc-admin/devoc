import type { Field } from "payload";

export const seoFields: Field = {
  fields: [
    {
      label: "Titre SEO",
      localized: true,
      name: "title",
      type: "text",
    },
    {
      label: "Description SEO",
      localized: true,
      name: "description",
      type: "textarea",
    },
    {
      label: "Image SEO",
      name: "image",
      relationTo: "media",
      type: "upload",
    },
  ],
  label: "Référencement (SEO)",
  name: "seo",
  type: "group",
};

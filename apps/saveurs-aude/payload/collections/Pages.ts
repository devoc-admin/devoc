import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const Pages: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug"],
    useAsTitle: "title",
  },
  fields: [
    {
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    slugField,
    {
      localized: true,
      name: "content",
      type: "richText",
    },
    seoFields,
  ],
  slug: "pages",
};

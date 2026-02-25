import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const BlogPosts: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "status", "publishedAt"],
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
      name: "excerpt",
      type: "text",
    },
    {
      localized: true,
      name: "content",
      type: "richText",
    },
    {
      name: "coverImage",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "author",
      type: "text",
    },
    {
      fields: [
        {
          name: "tag",
          required: true,
          type: "text",
        },
      ],
      name: "tags",
      type: "array",
    },
    {
      name: "publishedAt",
      required: true,
      type: "date",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: "draft",
      name: "status",
      options: [
        { label: "Brouillon", value: "draft" },
        { label: "Publié", value: "published" },
      ],
      required: true,
      type: "select",
    },
    seoFields,
  ],
  slug: "blog-posts",
};

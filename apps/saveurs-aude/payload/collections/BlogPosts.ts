import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const BlogPosts: CollectionConfig = {
  access: {
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  admin: {
    defaultColumns: ["title", "status", "publishedAt"],
    description: "Rédigez et publiez des articles sur votre blog",
    group: "Contenu",
    listSearchableFields: ["title", "author"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Titre",
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    slugField,
    {
      label: "Extrait",
      localized: true,
      name: "excerpt",
      type: "text",
    },
    {
      label: "Contenu",
      localized: true,
      name: "content",
      type: "richText",
    },
    {
      label: "Image de couverture",
      name: "coverImage",
      relationTo: "media",
      type: "upload",
    },
    {
      label: "Auteur",
      name: "author",
      type: "text",
    },
    {
      fields: [
        {
          label: "Tag",
          name: "tag",
          required: true,
          type: "text",
        },
      ],
      label: "Tags",
      labels: { plural: "Tags", singular: "Tag" },
      name: "tags",
      type: "array",
    },
    {
      admin: {
        description:
          "Date affichée sur l'article — les articles en brouillon ne sont pas visibles",
      },
      label: "Date de publication",
      name: "publishedAt",
      required: true,
      type: "date",
    },
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: "draft",
      label: "Statut",
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
  labels: {
    plural: "📝 Articles de blog",
    singular: "📝 Article de blog",
  },
  slug: "blog-posts",
};

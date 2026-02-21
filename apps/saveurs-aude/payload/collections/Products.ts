import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const Products: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "category", "status", "featured"],
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
      name: "shortDescription",
      type: "text",
    },
    {
      localized: true,
      name: "description",
      type: "richText",
    },
    {
      name: "category",
      relationTo: "categories",
      required: true,
      type: "relationship",
    },
    {
      fields: [
        {
          name: "image",
          relationTo: "media",
          required: true,
          type: "upload",
        },
      ],
      minRows: 1,
      name: "images",
      type: "array",
    },
    {
      fields: [
        {
          localized: true,
          name: "label",
          required: true,
          type: "text",
        },
        {
          admin: {
            description: "Prix en centimes (ex: 1250 = 12,50€)",
          },
          min: 0,
          name: "price",
          required: true,
          type: "number",
        },
        {
          name: "sku",
          required: true,
          type: "text",
          unique: true,
        },
        {
          defaultValue: 0,
          min: 0,
          name: "stock",
          required: true,
          type: "number",
        },
        {
          admin: {
            description: "Poids en grammes (pour calcul livraison)",
          },
          min: 0,
          name: "weight",
          type: "number",
        },
      ],
      minRows: 1,
      name: "variants",
      type: "array",
    },
    {
      admin: {
        description: "Mettre en avant sur la page d'accueil",
        position: "sidebar",
      },
      defaultValue: false,
      name: "featured",
      type: "checkbox",
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
        { label: "Archivé", value: "archived" },
      ],
      required: true,
      type: "select",
    },
    {
      fields: [
        {
          name: "type",
          options: [
            { label: "Pourcentage", value: "percentage" },
            { label: "Montant fixe", value: "fixed" },
          ],
          type: "select",
        },
        {
          min: 0,
          name: "value",
          type: "number",
        },
        {
          name: "startDate",
          type: "date",
        },
        {
          name: "endDate",
          type: "date",
        },
      ],
      name: "promotion",
      type: "group",
    },
    seoFields,
  ],
  slug: "products",
};

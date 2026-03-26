import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const Products: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "category", "status", "featured"],
    description: "Gérez vos produits, variantes, prix et promotions",
    group: "Boutique",
    listSearchableFields: ["title", "shortDescription"],
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
      admin: {
        description: "Affiché sur les cartes produit (max ~150 caractères)",
      },
      label: "Description courte",
      localized: true,
      name: "shortDescription",
      type: "text",
    },
    {
      label: "Description",
      localized: true,
      name: "description",
      type: "richText",
    },
    {
      label: "Catégorie",
      name: "category",
      relationTo: "categories",
      required: true,
      type: "relationship",
    },
    {
      fields: [
        {
          label: "Image",
          name: "image",
          relationTo: "media",
          required: true,
          type: "upload",
        },
      ],
      label: "Images",
      labels: { plural: "Images", singular: "Image" },
      minRows: 1,
      name: "images",
      type: "array",
    },
    {
      fields: [
        {
          label: "Libellé",
          localized: true,
          name: "label",
          required: true,
          type: "text",
        },
        {
          admin: {
            description: "Prix en centimes (ex: 1250 = 12,50€)",
          },
          label: "Prix",
          min: 0,
          name: "price",
          required: true,
          type: "number",
        },
        {
          label: "Référence (SKU)",
          name: "sku",
          required: true,
          type: "text",
          unique: true,
        },
        {
          defaultValue: 0,
          label: "Stock",
          min: 0,
          name: "stock",
          required: true,
          type: "number",
        },
        {
          admin: {
            description: "Poids en grammes (pour calcul livraison)",
          },
          label: "Poids",
          min: 0,
          name: "weight",
          type: "number",
        },
      ],
      label: "Variantes",
      labels: { plural: "Variantes", singular: "Variante" },
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
      label: "Mis en avant",
      name: "featured",
      type: "checkbox",
    },
    {
      admin: {
        description:
          "Brouillon = invisible sur le site, Publié = visible, Archivé = retiré",
        position: "sidebar",
      },
      defaultValue: "draft",
      label: "Statut",
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
          label: "Type",
          name: "type",
          options: [
            { label: "Pourcentage", value: "percentage" },
            { label: "Montant fixe", value: "fixed" },
          ],
          type: "select",
        },
        {
          admin: {
            description:
              "Pourcentage (ex: 20 pour -20%) ou montant fixe en centimes",
          },
          label: "Valeur",
          min: 0,
          name: "value",
          type: "number",
        },
        {
          label: "Date de début",
          name: "startDate",
          type: "date",
        },
        {
          label: "Date de fin",
          name: "endDate",
          type: "date",
        },
      ],
      label: "Promotion",
      name: "promotion",
      type: "group",
    },
    seoFields,
  ],
  labels: {
    plural: "🛍️ Produits",
    singular: "🛍️ Produit",
  },
  slug: "products",
};

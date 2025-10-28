import type { CollectionConfig } from "payload";

export const Businesses: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["name", "category", "address"],
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Nom du commerce",
      name: "name",
      required: true,
      type: "text",
    },
    {
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.name && !value) {
              return data.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
      label: "Slug",
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      label: "Description",
      name: "description",
      required: true,
      type: "richText",
    },
    {
      label: "Catégorie",
      name: "category",
      options: [
        {
          label: "Alimentation",
          value: "alimentation",
        },
        {
          label: "Restauration",
          value: "restauration",
        },
        {
          label: "Artisanat",
          value: "artisanat",
        },
        {
          label: "Services",
          value: "services",
        },
        {
          label: "Autres",
          value: "autres",
        },
      ],
      required: true,
      type: "select",
    },
    {
      fields: [
        {
          label: "Email",
          name: "email",
          type: "email",
        },
        {
          label: "Téléphone",
          name: "phone",
          type: "text",
        },
        {
          label: "Site web",
          name: "website",
          type: "text",
        },
      ],
      label: "Contact",
      name: "contact",
      type: "group",
    },
    {
      label: "Adresse",
      name: "address",
      required: true,
      type: "text",
    },
    {
      fields: [
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Lundi",
          name: "monday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Mardi",
          name: "tuesday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Mercredi",
          name: "wednesday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Jeudi",
          name: "thursday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Vendredi",
          name: "friday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Samedi",
          name: "saturday",
          type: "group",
        },
        {
          fields: [
            { label: "Ouverture", name: "open", type: "text" },
            { label: "Fermeture", name: "close", type: "text" },
          ],
          label: "Dimanche",
          name: "sunday",
          type: "group",
        },
      ],
      label: "Horaires d'ouverture",
      name: "openingHours",
      type: "group",
    },
    {
      label: "Propriétaire",
      name: "owner",
      type: "text",
    },
    {
      label: "Logo",
      name: "logo",
      relationTo: "media",
      type: "upload",
    },
    {
      label: "Services proposés",
      name: "services",
      type: "richText",
    },
    {
      fields: [
        {
          name: "speciality",
          required: true,
          type: "text",
        },
      ],
      label: "Spécialités",
      name: "specialities",
      type: "array",
    },
  ],
  slug: "businesses",
};

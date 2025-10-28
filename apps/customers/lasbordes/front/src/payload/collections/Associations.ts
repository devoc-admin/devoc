import type { CollectionConfig } from "payload";

export const Associations: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["name", "category", "president"],
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Nom de l'association",
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
          label: "Culture",
          value: "culture",
        },
        {
          label: "Sport",
          value: "sport",
        },
        {
          label: "Social",
          value: "social",
        },
        {
          label: "Environnement",
          value: "environnement",
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
      label: "Président(e)",
      name: "president",
      type: "text",
    },
    {
      admin: {
        description: "Année de création de l'association",
      },
      label: "Année de création",
      name: "foundedYear",
      type: "number",
    },
    {
      label: "Logo",
      name: "logo",
      relationTo: "media",
      type: "upload",
    },
    {
      label: "Activités",
      name: "activities",
      type: "richText",
    },
    {
      label: "Horaires des réunions",
      name: "meetingSchedule",
      type: "textarea",
    },
  ],
  slug: "associations",
};

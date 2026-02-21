import type { GlobalConfig } from "payload";

export const SiteConfig: GlobalConfig = {
  fields: [
    {
      defaultValue: "Saveurs d'Aude",
      name: "siteName",
      required: true,
      type: "text",
    },
    {
      name: "logo",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "favicon",
      relationTo: "media",
      type: "upload",
    },
    {
      fields: [
        { name: "instagram", type: "text" },
        { name: "facebook", type: "text" },
      ],
      name: "socialLinks",
      type: "group",
    },
    {
      fields: [
        { name: "email", required: true, type: "email" },
        { name: "phone", required: true, type: "text" },
        { name: "address", required: true, type: "text" },
      ],
      name: "contactInfo",
      type: "group",
    },
    {
      fields: [
        {
          name: "day",
          options: [
            { label: "Lundi", value: "lundi" },
            { label: "Mardi", value: "mardi" },
            { label: "Mercredi", value: "mercredi" },
            { label: "Jeudi", value: "jeudi" },
            { label: "Vendredi", value: "vendredi" },
            { label: "Samedi", value: "samedi" },
            { label: "Dimanche", value: "dimanche" },
          ],
          required: true,
          type: "select",
        },
        { name: "openMorning", type: "text" },
        { name: "closeMorning", type: "text" },
        { name: "openAfternoon", type: "text" },
        { name: "closeAfternoon", type: "text" },
        {
          defaultValue: false,
          name: "closed",
          type: "checkbox",
        },
      ],
      name: "openingHours",
      type: "array",
    },
    {
      fields: [
        { name: "date", required: true, type: "date" },
        { localized: true, name: "reason", type: "text" },
      ],
      name: "exceptionalClosures",
      type: "array",
    },
  ],
  label: "Configuration du site",
  slug: "site-config",
};

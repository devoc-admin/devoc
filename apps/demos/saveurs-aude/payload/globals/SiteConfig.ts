import type { GlobalConfig } from "payload";

export const SiteConfig: GlobalConfig = {
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      defaultValue: "Saveurs d'Aude",
      label: "Nom du site",
      name: "siteName",
      required: true,
      type: "text",
    },
    {
      label: "Logo",
      name: "logo",
      relationTo: "media",
      type: "upload",
    },
    {
      label: "Favicon",
      name: "favicon",
      relationTo: "media",
      type: "upload",
    },
    {
      fields: [
        { label: "Instagram", name: "instagram", type: "text" },
        { label: "Facebook", name: "facebook", type: "text" },
      ],
      label: "Réseaux sociaux",
      name: "socialLinks",
      type: "group",
    },
    {
      fields: [
        { label: "E-mail", name: "email", required: true, type: "email" },
        { label: "Téléphone", name: "phone", required: true, type: "text" },
        { label: "Adresse", name: "address", required: true, type: "text" },
      ],
      label: "Coordonnées",
      name: "contactInfo",
      type: "group",
    },
    {
      fields: [
        {
          label: "Jour",
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
        { label: "Ouverture matin", name: "openMorning", type: "text" },
        { label: "Fermeture matin", name: "closeMorning", type: "text" },
        { label: "Ouverture après-midi", name: "openAfternoon", type: "text" },
        { label: "Fermeture après-midi", name: "closeAfternoon", type: "text" },
        {
          defaultValue: false,
          label: "Fermé",
          name: "closed",
          type: "checkbox",
        },
      ],
      label: "Horaires d'ouverture",
      labels: { plural: "Horaires", singular: "Horaire" },
      name: "openingHours",
      type: "array",
    },
    {
      fields: [
        { label: "Date", name: "date", required: true, type: "date" },
        { label: "Motif", localized: true, name: "reason", type: "text" },
      ],
      label: "Fermetures exceptionnelles",
      labels: { plural: "Fermetures", singular: "Fermeture" },
      name: "exceptionalClosures",
      type: "array",
    },
  ],
  label: "⚙️ Configuration du site",
  slug: "site-config",
};

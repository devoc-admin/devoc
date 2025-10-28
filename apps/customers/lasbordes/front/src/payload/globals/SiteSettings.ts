import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      tabs: [
        {
          fields: [
            {
              fields: [
                {
                  label: "Email",
                  name: "email",
                  required: true,
                  type: "email",
                },
                {
                  label: "Téléphone",
                  name: "phone",
                  required: true,
                  type: "text",
                },
                {
                  label: "Adresse",
                  name: "address",
                  required: true,
                  type: "textarea",
                },
              ],
              label: "Informations de contact",
              name: "contact",
              type: "group",
            },
            {
              fields: [
                {
                  defaultValue: "112",
                  label: "Téléphone d'urgence",
                  name: "phone",
                  required: true,
                  type: "text",
                },
                {
                  label: "Email d'urgence",
                  name: "email",
                  type: "email",
                },
              ],
              label: "Contacts d'urgence",
              name: "emergency",
              type: "group",
            },
          ],
          label: "Contact",
        },
        {
          fields: [
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
          ],
          label: "Horaires",
        },
        {
          fields: [
            {
              fields: [
                {
                  defaultValue: false,
                  label: "Activer la bannière",
                  name: "enabled",
                  type: "checkbox",
                },
                {
                  admin: {
                    condition: (data) => data.banner?.enabled,
                  },
                  label: "Message",
                  name: "message",
                  required: true,
                  type: "textarea",
                },
                {
                  admin: {
                    condition: (data) => data.banner?.enabled,
                  },
                  defaultValue: "info",
                  label: "Niveau",
                  name: "severity",
                  options: [
                    {
                      label: "Information",
                      value: "info",
                    },
                    {
                      label: "Avertissement",
                      value: "warning",
                    },
                    {
                      label: "Alerte",
                      value: "alert",
                    },
                  ],
                  required: true,
                  type: "select",
                },
              ],
              label: "Bannière d'information",
              name: "banner",
              type: "group",
            },
          ],
          label: "Bannière",
        },
        {
          fields: [
            {
              fields: [
                {
                  defaultValue: "Bienvenue à Lasbordes",
                  label: "Titre",
                  name: "title",
                  required: true,
                  type: "text",
                },
                {
                  label: "Sous-titre",
                  name: "subtitle",
                  required: true,
                  type: "textarea",
                },
                {
                  label: "Image de fond",
                  name: "image",
                  relationTo: "media",
                  type: "upload",
                },
              ],
              label: "Section Hero",
              name: "hero",
              type: "group",
            },
          ],
          label: "Hero",
        },
        {
          fields: [
            {
              fields: [
                {
                  fields: [
                    {
                      label: "Libellé",
                      name: "label",
                      required: true,
                      type: "text",
                    },
                    {
                      label: "URL",
                      name: "href",
                      required: true,
                      type: "text",
                    },
                  ],
                  label: "Liens",
                  name: "links",
                  type: "array",
                },
                {
                  fields: [
                    {
                      label: "Plateforme",
                      name: "platform",
                      options: [
                        { label: "Facebook", value: "facebook" },
                        { label: "Twitter", value: "twitter" },
                        { label: "Instagram", value: "instagram" },
                        { label: "YouTube", value: "youtube" },
                      ],
                      required: true,
                      type: "select",
                    },
                    {
                      label: "URL",
                      name: "url",
                      required: true,
                      type: "text",
                    },
                  ],
                  label: "Réseaux sociaux",
                  name: "socials",
                  type: "array",
                },
              ],
              label: "Pied de page",
              name: "footer",
              type: "group",
            },
          ],
          label: "Footer",
        },
        {
          fields: [
            {
              fields: [
                {
                  defaultValue: "Lasbordes",
                  label: "Nom de la commune",
                  name: "name",
                  required: true,
                  type: "text",
                },
                {
                  defaultValue: 600,
                  label: "Population",
                  name: "population",
                  required: true,
                  type: "number",
                },
                {
                  label: "Maire",
                  name: "mayor",
                  required: true,
                  type: "text",
                },
                {
                  admin: {
                    description: "Année de création de la commune",
                  },
                  label: "Année de fondation",
                  name: "foundedYear",
                  type: "number",
                },
              ],
              label: "Informations de la commune",
              name: "municipality",
              type: "group",
            },
          ],
          label: "Municipalité",
        },
      ],
      type: "tabs",
    },
  ],
  label: "Paramètres du site",
  slug: "site-settings",
};

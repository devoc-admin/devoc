import type { GlobalConfig } from "payload";

export const CookieConsent: GlobalConfig = {
  fields: [
    {
      defaultValue:
        "Ce site utilise des cookies pour améliorer votre expérience.",
      localized: true,
      name: "message",
      required: true,
      type: "text",
    },
    {
      defaultValue: "Accepter",
      localized: true,
      name: "acceptLabel",
      required: true,
      type: "text",
    },
    {
      defaultValue: "Refuser",
      localized: true,
      name: "rejectLabel",
      required: true,
      type: "text",
    },
    {
      defaultValue: "/politique-confidentialite",
      name: "privacyPolicyLink",
      required: true,
      type: "text",
    },
  ],
  label: "Bannière cookies",
  slug: "cookie-consent",
};

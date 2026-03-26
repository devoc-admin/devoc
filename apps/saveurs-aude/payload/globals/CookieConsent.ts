import type { GlobalConfig } from "payload";

export const CookieConsent: GlobalConfig = {
  fields: [
    {
      defaultValue:
        "Ce site utilise des cookies pour améliorer votre expérience.",
      label: "Message",
      localized: true,
      name: "message",
      required: true,
      type: "text",
    },
    {
      defaultValue: "Accepter",
      label: "Libellé du bouton accepter",
      localized: true,
      name: "acceptLabel",
      required: true,
      type: "text",
    },
    {
      defaultValue: "Refuser",
      label: "Libellé du bouton refuser",
      localized: true,
      name: "rejectLabel",
      required: true,
      type: "text",
    },
    {
      defaultValue: "/politique-confidentialite",
      label: "Lien politique de confidentialité",
      name: "privacyPolicyLink",
      required: true,
      type: "text",
    },
  ],
  label: "🍪 Bannière cookies",
  slug: "cookie-consent",
};

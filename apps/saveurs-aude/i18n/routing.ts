import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "fr",
  localePrefix: "always",
  locales: ["fr", "en"],
  pathnames: {
    "/": "/",
    "/a-propos": {
      en: "/about",
      fr: "/a-propos",
    },
    "/avis": {
      en: "/reviews",
      fr: "/avis",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/boutique": {
      en: "/shop",
      fr: "/boutique",
    },
    "/boutique/[slug]": {
      en: "/shop/[slug]",
      fr: "/boutique/[slug]",
    },
    "/cgv": {
      en: "/terms",
      fr: "/cgv",
    },
    "/commande": {
      en: "/checkout",
      fr: "/commande",
    },
    "/commande/confirmation": {
      en: "/checkout/confirmation",
      fr: "/commande/confirmation",
    },
    "/contact": "/contact",
    "/faq": "/faq",
    "/mentions-legales": {
      en: "/legal-notice",
      fr: "/mentions-legales",
    },
    "/panier": {
      en: "/cart",
      fr: "/panier",
    },
    "/politique-confidentialite": {
      en: "/privacy-policy",
      fr: "/politique-confidentialite",
    },
  },
});

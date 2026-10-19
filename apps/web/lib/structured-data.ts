import { MAIL_DEVOC, TEL_CLEMENT, TEL_THIBAUT } from "@/constants";
import { SITE_URL } from "@/lib/metadata";

const BUSINESS_ID = `${SITE_URL}/#business`;
// Google Business Profile (stable CID link)
const GOOGLE_BUSINESS_URL = "https://maps.google.com/?cid=1305753829678968031";

const founders = [
  {
    name: "Thibaut Izard",
    sameAs: "https://www.linkedin.com/in/thibaut-izard/",
    telephone: TEL_THIBAUT,
  },
  {
    name: "Clément Dubos",
    sameAs: "https://www.linkedin.com/in/clement-dubos-707747a5/",
    telephone: TEL_CLEMENT,
  },
];

// Schema.org graph: the local business (Carcassonne, serving Occitanie) + the website.
export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": BUSINESS_ID,
      "@type": "ProfessionalService",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
        addressLocality: "Carcassonne",
        addressRegion: "Occitanie",
        postalCode: "11000",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Occitanie" },
        { "@type": "AdministrativeArea", name: "Aude" },
      ],
      contactPoint: founders.map(({ telephone }) => ({
        "@type": "ContactPoint",
        areaServed: "FR",
        availableLanguage: "French",
        contactType: "customer service",
        email: MAIL_DEVOC,
        telephone,
      })),
      description:
        "Collectif de développeurs en Occitanie : création de sites internet, applications web, accessibilité (RGAA), référencement et automatisation avec l'IA, pour les entreprises et les collectivités.",
      email: MAIL_DEVOC,
      founder: founders.map(({ name, sameAs }) => ({
        "@type": "Person",
        name,
        sameAs,
      })),
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.213,
        longitude: 2.349,
      },
      hasMap: GOOGLE_BUSINESS_URL,
      image: `${SITE_URL}/og-image.jpg`,
      knowsAbout: [
        "Développement web",
        "Création de sites internet",
        "Applications web",
        "Accessibilité numérique",
        "RGAA",
        "Référencement",
        "UX/UI",
        "Automatisation IA",
      ],
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      name: "Dev'Oc",
      sameAs: [GOOGLE_BUSINESS_URL],
      telephone: TEL_THIBAUT,
      url: SITE_URL,
    },
    {
      "@id": `${SITE_URL}/#website`,
      "@type": "WebSite",
      inLanguage: "fr-FR",
      name: "Dev'Oc",
      publisher: { "@id": BUSINESS_ID },
      url: SITE_URL,
    },
  ],
};

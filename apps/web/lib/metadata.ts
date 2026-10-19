import type { Metadata } from "next";

export const SITE_URL = "https://dev-oc.fr";
export const SITE_NAME = "Dev'Oc";

const OG_IMAGE = {
  alt: "Dev'Oc - Création de sites & applications",
  height: 630,
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
};

type PageMetadataInput = {
  description: string;
  /** Route path, starting with "/" */
  path: string;
  title: string;
};

/**
 * Metadata for a public page. Next.js replaces `openGraph` and `twitter`
 * as whole objects, so each page must redefine them (image included),
 * otherwise shares would show the home page title and description.
 */
export function pageMetadata({
  description,
  path,
  title,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    alternates: { canonical: path },
    description,
    openGraph: {
      description,
      images: [OG_IMAGE],
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: fullTitle,
      type: "website",
      url: `${SITE_URL}${path}`,
    },
    // Rendered as "<title> | Dev'Oc" by the root layout's title template
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@devoc",
      description,
      images: [OG_IMAGE.url],
      site: "@devoc",
      title: fullTitle,
    },
  };
}

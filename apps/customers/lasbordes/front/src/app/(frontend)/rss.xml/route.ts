import { NextResponse } from "next/server";

// Mock data - in production this would come from CMS
const newsData = [
  {
    createdAt: new Date("2024-10-20"),
    description:
      "La commune de Lasbordes est fière d'annoncer l'inauguration de sa nouvelle salle polyvalente le 15 novembre 2024.",
    slug: "inauguration-salle-polyvalente",
    title: "Inauguration de la nouvelle salle polyvalente",
  },
  {
    createdAt: new Date("2024-10-15"),
    description:
      "La prochaine collecte des déchets verts aura lieu le samedi 2 novembre.",
    slug: "collecte-dechets-verts",
    title: "Collecte des déchets verts",
  },
  {
    createdAt: new Date("2024-10-10"),
    description:
      "Réservez votre samedi 14 décembre pour le traditionnel marché de Noël de Lasbordes.",
    slug: "marche-noel-2024",
    title: "Marché de Noël 2024",
  },
];

export function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lasbordes11400.fr";

  const rssItems = newsData
    .map(
      (news) => `
    <item>
      <title><![CDATA[${news.title}]]></title>
      <description><![CDATA[${news.description}]]></description>
      <link>${baseUrl}/actualites/${news.slug}</link>
      <guid isPermaLink="true">${baseUrl}/actualites/${news.slug}</guid>
      <pubDate>${news.createdAt.toUTCString()}</pubDate>
    </item>
  `
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Actualités de Lasbordes</title>
    <description>Les dernières actualités de la commune de Lasbordes (11400)</description>
    <link>${baseUrl}</link>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml",
    },
  });
}

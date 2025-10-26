import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fira_Code, Geist, Geist_Mono, Kanit, Lobster } from "next/font/google";
import SkipLink from "@/components/navigation/skip-link";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: ["400"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400"],
});

export const metadata: Metadata = {
  authors: [{ name: "Dev'Oc", url: "https://dev-oc.fr" }],
  creator: "Dev'Oc",
  description:
    "Dev'Oc est une collectif de développeurs en Occitanie spécialisée dans la création de sites internet, applications web, solutions digitales sur-mesure et automatisation des tâches avec l'IA. Expertise en UX/UI, référencement, accompagnement digital et innovation.",
  keywords: [
    "Occitanie",
    "développement web",
    "création site internet",
    "application web",
    "référencement",
    "UX/UI",
    "solutions digitales",
    "automatisation IA",
    "intelligence artificielle",
    "Dev'Oc",
  ],
  metadataBase: new URL("https://dev-oc.fr"),
  openGraph: {
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    images: [
      {
        alt: "Dev'Oc - Création de sites & applications",
        height: 630,
        url: "https://dev-oc.fr/og-image.jpg",
        width: 1200,
      },
    ],
    locale: "fr_FR",
    siteName: "Dev'Oc",
    title: "Dev'Oc | Création de sites & applications",
    type: "website",
    url: "https://dev-oc.fr",
  },
  publisher: "Dev'Oc",
  robots: {
    follow: true,
    index: true,
    nocache: false,
  },
  title: "Dev'Oc | Création de sites & applications",
  twitter: {
    card: "summary_large_image",
    creator: "@devoc",
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    images: ["https://dev-oc.fr/og-image.jpg"],
    site: "@devoc",
    title: "Dev'Oc | Création de sites & applications",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lobster.variable} ${kanit.variable} ${firaCode.variable} font-sans`}
      >
        <SkipLink />
        <main id="main-content">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

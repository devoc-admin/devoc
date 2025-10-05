import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import SkipLink from "@/components/navigation/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev'Oc | Création de sites & applications",
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
  authors: [{ name: "Dev'Oc", url: "https://dev-oc.fr" }],
  creator: "Dev'Oc",
  publisher: "Dev'Oc",
  openGraph: {
    title: "Dev'Oc | Création de sites & applications",
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    url: "https://dev-oc.fr",
    siteName: "Dev'Oc",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://dev-oc.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dev'Oc - Création de sites & applications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev'Oc | Création de sites & applications",
    description:
      "Collectif de développeurs en Occitanie spécialisés en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    site: "@devoc",
    creator: "@devoc",
    images: ["https://dev-oc.fr/og-image.jpg"],
  },
  metadataBase: new URL("https://dev-oc.fr"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SkipLink />
        <BackgroundBeams className="hidden lg:block" />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

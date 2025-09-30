import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
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
  title: "Sud Web | Agence Web en Occitanie - Création de sites & applications",
  description:
    "Sud Web est une agence de développement web en Occitanie spécialisée dans la création de sites internet, applications web, solutions digitales sur-mesure et automatisation des tâches avec l'IA. Expertise en UX/UI, référencement, accompagnement digital et innovation.",
  keywords: [
    "agence web",
    "Occitanie",
    "développement web",
    "création site internet",
    "application web",
    "référencement",
    "UX/UI",
    "solutions digitales",
    "automatisation IA",
    "intelligence artificielle",
    "Sud Web",
  ],
  authors: [{ name: "Sud Web", url: "https://sudweb.fr" }],
  creator: "Sud Web",
  publisher: "Sud Web",
  openGraph: {
    title:
      "Sud Web | Agence Web en Occitanie - Création de sites & applications",
    description:
      "Agence web en Occitanie spécialisée en développement de sites internet, applications web, UX/UI, référencement et automatisation des tâches avec l'IA. Découvrez nos réalisations et contactez-nous pour votre projet digital.",
    url: "https://sudweb.fr",
    siteName: "Sud Web",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://sudweb.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sud Web - Agence Web en Occitanie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sud Web | Agence Web en Occitanie",
    description:
      "Agence web en Occitanie spécialisée en développement web, création de sites internet, applications, référencement et automatisation des tâches avec l'IA.",
    site: "@sudweb",
    creator: "@sudweb",
    images: ["https://sudweb.fr/og-image.jpg"],
  },
  metadataBase: new URL("https://sudweb.fr"),
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
        <BackgroundBeams className="hidden lg:block" />
        {children}
      </body>
    </html>
  );
}

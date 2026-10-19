import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  Audiowide,
  Fraunces,
  Geist,
  Geist_Mono,
  Style_Script,
} from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TailwindLandmark } from "../components/tailwind-landmark/tailwind-landmark";
import "./globals.css";
import SkipLink from "@/components/ui/skip-link";
import { FontsReadyGate } from "./_components/fonts-ready-gate";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: "variable",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "variable",
});

const styleScript = Style_Script({
  subsets: ["latin"],
  variable: "--font-style-script",
  weight: ["400"],
});

const fraunces = Fraunces({
  axes: ["opsz", "SOFT", "WONK"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
});

const audiowide = Audiowide({
  preload: false,
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-audiowide",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styleScript.variable} ${fraunces.variable} ${audiowide.variable} mx-auto flex min-h-screen flex-col font-sans`}
      >
        {/* 🔌 */}
        <Adapters>
          <main className="grow" id="main-content">
            {children}
          </main>
        </Adapters>

        {/* ♿➡️ */}
        <SkipLink />

        {/* 🖊️ */}
        <FontsReadyGate />

        {/* 🔧 */}
        <Helpers />
      </body>
    </html>
  );
}

// 🔌
// =======================
function Adapters({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

// 🔧
// =======================
function Helpers() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <TailwindLandmark />
    </>
  );
}

// ℹ️
// =======================

export const metadata: Metadata = {
  authors: [{ name: "Dev'Oc", url: "https://dev-oc.fr" }],
  creator: "Dev'Oc",
  description:
    "Dev'Oc est un collectif de développeurs en Occitanie spécialisé dans la création de sites internet, applications web, solutions digitales sur-mesure et automatisation des tâches avec l'IA. Expertise en UX/UI, référencement, accompagnement digital et innovation.",
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
  title: {
    default: "Dev'Oc | Création de sites & applications",
    template: "%s | Dev'Oc",
  },
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

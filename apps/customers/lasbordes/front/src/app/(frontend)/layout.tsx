import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Banner } from "@/components/layout/banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": [
        { title: "Actualités de Lasbordes", url: "/rss.xml" },
      ],
    },
  },
  authors: [{ name: "Mairie de Lasbordes" }],
  creator: "Mairie de Lasbordes",
  description:
    "Site officiel de la commune de Lasbordes (11400). Retrouvez toutes les actualités, services municipaux, informations pratiques et démarches administratives.",
  keywords: [
    "Lasbordes",
    "mairie",
    "commune",
    "Aude",
    "11400",
    "municipal",
    "services",
    "actualités",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lasbordes11400.fr"
  ),
  openGraph: {
    description:
      "Site officiel de la commune de Lasbordes (11400). Actualités, services municipaux et informations pratiques.",
    locale: "fr_FR",
    siteName: "Commune de Lasbordes",
    title: "Commune de Lasbordes | Site officiel",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://lasbordes11400.fr",
  },
  publisher: "Mairie de Lasbordes",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "Commune de Lasbordes | Site officiel",
    template: "%s | Commune de Lasbordes",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Site officiel de la commune de Lasbordes (11400). Actualités, services municipaux et informations pratiques.",
    title: "Commune de Lasbordes | Site officiel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="fr">
      <body className="flex min-h-screen flex-col antialiased">
        <a className="skip-link" href="#main-content">
          Aller au contenu principal
        </a>
        <TopBar />
        <Banner />
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Playfair_Display } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

const cormorant = Cormorant_Garamond({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  description:
    "Boutique de spécialités audoises et occitanes artisanales. Cassoulet, vins, miels, confits et douceurs du Sud. Livraison et retrait en boutique à Carcassonne.",
  title: {
    default: "Saveurs d'Aude — Spécialités artisanales de Carcassonne",
    template: "%s | Saveurs d'Aude",
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

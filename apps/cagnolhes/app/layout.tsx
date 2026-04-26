import type { Metadata } from "next";
import { Birthstone_Bounce, Geist, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const birthstoneBounce = Birthstone_Bounce({
  subsets: ["latin"],
  variable: "--font-birthstone-bounce",
  weight: "500",
});

export const metadata: Metadata = {
  description: "Site de la commune fictive de Cagnolhess",
  robots: {
    follow: false,
    index: false,
  },
  title: "Commune de Cagnolhes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "h-full",
        "antialiased",
        montserrat.variable,
        birthstoneBounce.variable,
        "font-sans",
        geist.variable
      )}
      lang="fr"
    >
      <body className="flex min-h-full flex-col bg-green-50">{children}</body>
    </html>
  );
}

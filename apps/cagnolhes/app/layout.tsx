import type { Metadata } from "next";
import { Birthstone_Bounce, Montserrat } from "next/font/google";
import "./globals.css";

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
      className={`${montserrat.variable} ${birthstoneBounce.variable} h-full antialiased`}
      lang="en"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

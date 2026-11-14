import type { Metadata } from "next";
import { Birthstone_Bounce, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HTML>
      <BODY>{children}</BODY>
    </HTML>
  );
}

// 📦 ===================================================
function HTML({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn("h-full", fonts)} lang="fr">
      {children}
    </html>
  );
}

// 📦 ===================================================
function BODY({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="font-body flex min-h-full flex-col">{children}</body>;
}

// 🔠 ===================================================
export const metadata: Metadata = {
  description: "Site de la commune fictive de Cagnolhess",
  robots: {
    follow: false,
    index: false,
  },
  title: "Commune de Cagnolhes",
};

// 🖊️ ===================================================
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const birthstoneBounce = Birthstone_Bounce({
  subsets: ["latin"],
  variable: "--font-birthstone-bounce",
  weight: "500",
});

const fonts = cn(
  "font-sans antialiased",
  montserrat.variable,
  birthstoneBounce.variable
);

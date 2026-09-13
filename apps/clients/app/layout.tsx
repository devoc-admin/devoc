import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  description: "Espace clients Dev'Oc",
  robots: {
    follow: false,
    index: false,
  },
  title: "Clients | Dev'Oc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}

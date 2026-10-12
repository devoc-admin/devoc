import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  description: "Outils d'administration de Dev'Oc",
  icons: { icon: "/icon.svg" },
  robots: {
    follow: false,
    index: false,
  },
  title: "Admin | Dev'Oc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${kanit.variable} min-h-screen font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Kanit } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${kanit.variable} min-h-screen font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

// 🖊️
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "500", "600", "700"],
});

// 🔠
export const metadata: Metadata = {
  description: "Espace clients Dev'Oc",
  icons: { icon: "/icon.svg" },
  robots: {
    follow: false,
    index: false,
  },
  title: "Clients | Dev'Oc",
};

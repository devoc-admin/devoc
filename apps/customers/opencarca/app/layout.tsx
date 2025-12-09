import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit, Style_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
});

const styleScript = Style_Script({
  subsets: ["latin"],
  variable: "--font-style-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  description: "Présentation projet pour la compétition OpenCarca 2025",
  title: "OpenCarca 2025 — Présentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} ${styleScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

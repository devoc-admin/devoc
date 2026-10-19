import type { Metadata } from "next";
import {
  Dancing_Script,
  Faustina,
  Kanit,
  Montserrat,
  Sarina,
} from "next/font/google";
import { cn } from "@/lib/utils";

// Fonts only used on customer pages, so public pages don't ship their CSS
const dancingScript = Dancing_Script({
  preload: false,
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});

const faustina = Faustina({
  preload: false,
  subsets: ["latin"],
  variable: "--font-faustina",
  weight: ["400"],
});

const kanit = Kanit({
  preload: false,
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  preload: false,
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

const sarina = Sarina({
  preload: false,
  subsets: ["latin"],
  variable: "--font-sarina",
  weight: ["400"],
});

// Customer pages are private: keep them out of search results.
export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

export default function CustomersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        "contents",
        dancingScript.variable,
        faustina.variable,
        kanit.variable,
        montserrat.variable,
        sarina.variable
      )}
    >
      {children}
    </div>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AnalyticsWrapper } from "@/components/Analytics";
import {
  CookieConsent,
  type CookieConsentConfig,
} from "@/components/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/lib/auth";
import { getCurrentCustomer } from "@/lib/auth-actions";
import { CartProvider } from "@/lib/cart";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import "../../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getBaseUrl();
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
      },
    },
    description: t("homeDescription"),
    metadataBase: new URL(baseUrl),
    openGraph: {
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      siteName: "Saveurs d'Aude",
      type: "website",
    },
    robots: {
      follow: true,
      index: true,
    },
    title: {
      default: "Saveurs d'Aude — Spécialités artisanales de Carcassonne",
      template: "%s | Saveurs d'Aude",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [customer, cookieConsentData] = await Promise.all([
    getCurrentCustomer(),
    getCookieConsentConfig(locale),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <meta content="Saveurs d'Aude" name="apple-mobile-web-app-title" />
      <body
        className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}
      >
        <NuqsAdapter>
          <NextIntlClientProvider>
            <AuthProvider initialCustomer={customer}>
              <CartProvider>
                <Header />
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <CookieConsent config={cookieConsentData} />
                <AnalyticsWrapper />
              </CartProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

// ================================
// 🍪
async function getCookieConsentConfig(
  locale: string
): Promise<CookieConsentConfig> {
  const payload = await getPayloadClient();
  const data = await payload.findGlobal({
    locale: locale as "fr" | "en",
    slug: "cookie-consent",
  });

  return {
    acceptLabel: data.acceptLabel,
    message: data.message,
    privacyPolicyLink: data.privacyPolicyLink ?? undefined,
    rejectLabel: data.rejectLabel,
  };
}

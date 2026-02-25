"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export type CookieConsentConfig = {
  message?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  privacyPolicyLink?: string;
};

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not widely supported, document.cookie is the reliable fallback
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

export function CookieConsent({ config }: { config?: CookieConsentConfig }) {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("cookies");

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function handleAccept() {
    setCookie("cookie-consent", "accepted", 365);
    setVisible(false);
  }

  function handleReject() {
    setCookie("cookie-consent", "rejected", 365);
    setVisible(false);
  }

  if (!visible) return null;

  const message = config?.message || t("message");
  const acceptLabel = config?.acceptLabel || t("accept");
  const rejectLabel = config?.rejectLabel || t("reject");
  const privacyLink = config?.privacyPolicyLink || "/politique-confidentialite";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-border/50 border-t bg-background/95 p-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {message}{" "}
          <Link
            className="text-primary underline hover:text-primary/80"
            href={privacyLink}
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-border px-4 py-2 text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
            onClick={handleReject}
            type="button"
          >
            {rejectLabel}
          </button>
          <button
            className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            onClick={handleAccept}
            type="button"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

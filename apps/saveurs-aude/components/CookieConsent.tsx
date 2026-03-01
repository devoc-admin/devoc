"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
  // 🌐
  const t = useTranslations("cookies");

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  // 🍪
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
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "border-border/50 border-t",
        "bg-background/95 backdrop-blur-sm",
        "p-4"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-4xl",
          "flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
        )}
      >
        {/* 📝 */}
        <ConsentMessage message={message} privacyLink={privacyLink} t={t} />

        {/* 🔘 */}
        <ConsentActions
          acceptLabel={acceptLabel}
          onAccept={handleAccept}
          onReject={handleReject}
          rejectLabel={rejectLabel}
        />
      </div>
    </div>
  );
}

// ==============================================
// 📝
function ConsentMessage({
  message,
  privacyLink,
  t,
}: {
  message: string;
  privacyLink: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <p className="text-muted-foreground text-sm">
      {message}{" "}
      <Link
        className="text-primary underline hover:text-primary/80"
        href={privacyLink}
      >
        {t("learnMore")}
      </Link>
    </p>
  );
}

// ==============================================
// 🔘
function ConsentActions({
  acceptLabel,
  onAccept,
  onReject,
  rejectLabel,
}: {
  acceptLabel: string;
  onAccept: () => void;
  onReject: () => void;
  rejectLabel: string;
}) {
  return (
    <div className="flex gap-2">
      <button
        className={cn(
          "rounded-lg",
          "border border-border",
          "px-4 py-2",
          "text-muted-foreground text-sm",
          "transition-colors hover:border-primary hover:text-primary"
        )}
        onClick={onReject}
        type="button"
      >
        {rejectLabel}
      </button>
      <button
        className={cn(
          "rounded-lg",
          "bg-primary",
          "px-4 py-2",
          "font-medium text-primary-foreground text-sm",
          "transition-colors hover:bg-primary/90"
        )}
        onClick={onAccept}
        type="button"
      >
        {acceptLabel}
      </button>
    </div>
  );
}

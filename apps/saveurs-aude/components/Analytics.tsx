"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AnalyticsWrapper() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (consent === "accepted") setAccepted(true);
  }, []);

  if (!accepted) return null;

  return <Analytics />;
}

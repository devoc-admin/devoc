"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

export function CartAnnouncer() {
  const t = useTranslations("cart");
  const { totalItems } = useCart();
  const [message, setMessage] = useState("");
  const prevItems = useRef(totalItems);

  useEffect(() => {
    if (prevItems.current === totalItems) return;
    prevItems.current = totalItems;
    setMessage(t("announcement", { count: totalItems }));
  }, [totalItems, t]);

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className="sr-only"
      role="status"
    >
      {message}
    </div>
  );
}

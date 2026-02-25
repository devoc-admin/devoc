"use client";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth";

export function UserMenu() {
  const t = useTranslations("nav");
  const { customer } = useAuth();

  if (customer) {
    return (
      <Link
        className="flex items-center gap-1.5 p-2 text-foreground/70 transition-colors hover:text-primary"
        href="/compte/commandes"
        title={t("account")}
      >
        <User className="size-5" />
        <span className="hidden text-sm lg:inline">{customer.firstName}</span>
      </Link>
    );
  }

  return (
    <Link
      className="p-2 text-foreground/70 transition-colors hover:text-primary"
      href="/compte/connexion"
      title={t("login")}
    >
      <User className="size-5" />
    </Link>
  );
}

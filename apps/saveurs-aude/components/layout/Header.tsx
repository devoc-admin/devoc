import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CartBadge } from "./CartBadge";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/contact" as const, tKey: "contact" as const },
];

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-border/50 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          className="flex items-center gap-2 font-heading text-2xl text-primary tracking-tight"
          href="/"
        >
          <Image
            alt=""
            height={36}
            src="/saveurs_aude_no_margin_no_title.svg"
            width={36}
          />
          Saveurs d&apos;Aude
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map(({ href, tKey }) => (
            <Link
              className="font-medium text-foreground/80 text-sm tracking-wide transition-colors hover:text-primary"
              href={href}
              key={href}
            >
              {t(tKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <CartBadge label={t("cart")} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

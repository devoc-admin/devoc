import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CartBadge } from "./cart-badge";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./user-menu";

const navLinks = [
  { href: "/boutique" as const, tKey: "shop" as const },
  { href: "/a-propos" as const, tKey: "about" as const },
  { href: "/blog" as const, tKey: "blog" as const },
  { href: "/contact" as const, tKey: "contact" as const },
];

export async function Header() {
  // 🌐
  const t = await getTranslations("nav");

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "border-border/50 border-b",
        "bg-background/95 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "flex items-center justify-between",
          "h-16",
          "px-4 sm:px-6"
        )}
      >
        {/* 🏠 */}
        <Logo />

        {/* 🧭 */}
        <DesktopNav t={t} />

        {/* 🔧 */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <UserMenu />
          <CartBadge label={t("cart")} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

// ==============================================
// 🏠
function Logo() {
  return (
    <Link
      className={cn(
        "flex items-center gap-2",
        "font-heading text-2xl",
        "text-primary",
        "tracking-tight"
      )}
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
  );
}

// ==============================================
// 🧭
function DesktopNav({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="hidden items-center gap-8 md:flex"
    >
      {navLinks.map(({ href, tKey }) => (
        <Link
          className={cn(
            "font-medium text-sm",
            "text-foreground/80",
            "tracking-wide",
            "transition-colors hover:text-primary"
          )}
          href={href}
          key={href}
        >
          {t(tKey)}
        </Link>
      ))}
    </nav>
  );
}

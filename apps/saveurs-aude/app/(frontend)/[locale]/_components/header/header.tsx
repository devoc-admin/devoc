import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CartBadge } from "./_components/cart-badge";
import { LanguageSwitcher } from "./_components/language-switcher";
import { UserMenu } from "./_components/user-menu";

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
        "sticky",
        "top-0",
        "z-40",
        "bg-background/90",
        "backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "max-w-6xl",
          "h-16",
          "mx-auto",
          "px-4 sm:px-6"
        )}
      >
        {/* 🏠 */}
        <Logo />

        {/* 🧭 */}
        <DesktopNav />

        {/* 🔧 */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <UserMenu />
          <CartBadge label={t("cart")} />
          {/*<MobileMenu />*/}
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
      <h2 className={cn("text-lg")}>Saveurs d&apos;Aude</h2>
    </Link>
  );
}

// ==============================================
// 🧭
async function DesktopNav() {
  // 🌐
  const t = await getTranslations("nav");

  return (
    <nav
      aria-label="Navigation principale"
      className={cn("hidden md:flex", "md:items-center", "gap-8")}
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

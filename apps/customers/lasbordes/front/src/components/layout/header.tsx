"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", name: "Accueil" },
  { href: "/actualites", name: "Actualités" },
  { href: "/mairie", name: "Mairie" },
  { href: "/services", name: "Services" },
  { href: "/vie-culturelle-associative", name: "Vie culturelle" },
  { href: "/commerces", name: "Commerces" },
  { href: "/histoire", name: "Histoire" },
  { href: "/contact", name: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-border border-b bg-white shadow-xs">
      <nav
        aria-label="Navigation principale"
        className="container mx-auto flex items-center justify-between px-4 py-4"
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link
            className="rounded-sm font-bold text-primary text-xl focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href="/"
          >
            Lasbordes
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-sm px-2 py-1 font-medium text-sm transition-colors hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isActive ? "text-primary" : "text-foreground"
                )}
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-sm p-2 text-foreground hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="border-border border-t bg-white lg:hidden"
          id="mobile-menu"
        >
          <div className="container mx-auto space-y-2 px-4 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2 font-medium text-base focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                  href={item.href}
                  key={item.name}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

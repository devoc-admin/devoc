"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MailIcon, MapPinIcon, Smartphone as PhoneIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ContactLink, type ContactLinkType } from "./components/contact-link";
import { Copyright } from "./components/copyright";
import { Logo } from "./components/logo";
import { OrangeDecorativeStone } from "./components/orange-decorative-stone";

export function Footer({
  animate = true,
  className,
}: {
  animate?: boolean;
  className?: string;
}) {
  // ✨ Fade in animation
  useFooterAnimation({ animate });

  return (
    <footer
      className={cn(
        "bottom-0",
        "overflow-hidden",
        "bg-background-dark",
        "text-muted-foreground",
        className
      )}
    >
      {/* 📦 OUTER */}
      <OuterContainer>
        {/* 📦 INNER */}
        <Content>
          {/* 🪨 */}
          <OrangeDecorativeStone />
          {/* 1️⃣⬆️ 🌼🔤🔗*/}
          <Top>
            {/* 🌼 */}
            <Logo />
            {/* 🔤 */}
            <p>
              Entreprises, artisans, collectivités : nous accompagnons votre
              transformation numérique en Occitanie.
            </p>
            {/* 📞📨 */}
            <ContactLinks />
          </Top>

          {/* 2️⃣⬇️ 📝🔗 */}
          <Bottom>
            {/* 📝 */}
            <Copyright />
            {/* 🔗 */}
            <LegalLinks />
          </Bottom>
        </Content>
      </OuterContainer>
    </footer>
  );
}

// ------------------------
// ✨ Scroll animation
gsap.registerPlugin(ScrollTrigger);
function useFooterAnimation({ animate = true }: { animate: boolean }) {
  useGSAP(() => {
    if (!animate) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        end: () => ScrollTrigger.maxScroll(window),
        invalidateOnRefresh: true,
        scrub: 1.5,
        start: () => ScrollTrigger.maxScroll(window) - 500,
        trigger: document.body,
      },
    });

    tl.from(`.${FOOTER_CONTENT_CLASS}`, {
      ease: "power4.in",
      opacity: 0,
    });
  });
}

const FOOTER_CONTENT_CLASS = "footer-content";

// 📦 OUTER
// =======================
function OuterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-linear-to-br from-primary/5 via-transparent to-primary/5",
        "rounded-t-4xl",
        "border-t border-t-foreground-dark/5",
        "px-4 xs:px-6 sm:px-8 md:px-10",
        "py-12 xl:py-24"
      )}
    >
      {children}
    </div>
  );
}

// 📦 INNER
// =======================
function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        FOOTER_CONTENT_CLASS,
        "relative mx-auto max-w-300 space-y-8"
      )}
    >
      {children}
    </div>
  );
}

//📦 TOP
// =======================
function Top({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2 flex max-w-175 flex-col gap-5">{children}</div>
  );
}

// 📦 BOTTOM
// =======================
function Bottom({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative",
        "flex items-center justify-between gap-y-3",
        "flex-col md:flex-row"
      )}
    >
      {children}
    </div>
  );
}

// 📞📩📍
// =======================

const ICON_CLASS = "transition-colors duration-300";
const contactLinks: ContactLinkType[] = [
  {
    href: "mailto:contact@dev-oc.fr",
    icon: <MailIcon className={ICON_CLASS} size={16} />,
    id: "email",
    label: "contact@dev-oc.fr",
    newPage: false,
  },
  {
    href: "tel:+33620239838",
    icon: <PhoneIcon className={ICON_CLASS} size={16} />,
    id: "phone1",
    label: "+33 6 20 23 98 38",
    newPage: false,
  },
  {
    href: "tel:+33658889701",
    icon: <PhoneIcon className={ICON_CLASS} size={16} />,
    id: "phone2",
    label: "+33 6 58 88 97 01",
  },
  {
    href: "https://maps.app.goo.gl/u8M4QDvL5pA4o4Xt6",
    icon: <MapPinIcon className={ICON_CLASS} size={16} />,
    id: "address",
    label: "Carcassonne, France",
    newPage: true,
  },
];

function ContactLinks() {
  return (
    <div className={cn("flex flex-col gap-2")}>
      {contactLinks.map((link) => (
        <ContactLink key={link.id} {...link} />
      ))}
    </div>
  );
}

//🔗🔗🔗
// =======================
function LegalLinks() {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        "flex-col sm:flex-row",
        "text-base text-muted-foreground"
      )}
    >
      {legalLinks.map((link) => (
        <Link
          className="transition-colors hover:text-primary"
          href={link.href}
          key={link.key}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

interface LegalLinkType {
  href: string;
  key: string;
  name: string;
}

const legalLinks: LegalLinkType[] = [
  {
    href: "/mentions-legales",
    key: "mentions-legales",
    name: "Mentions légales",
  },
  {
    href: "/politique-de-confidentialite",
    key: "politique-de-confidentialite",
    name: "Politique de confidentialité",
  },
];

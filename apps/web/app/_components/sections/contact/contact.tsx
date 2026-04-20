"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";
import { type ContactItem, contactItems } from "./contact-data";
import ContactForm from "./contact-form";

// Lazy load WebGL LaserFlow component to reduce initial bundle
const LaserFlow = dynamic(() => import("@/components/react-bits/laser-flow"), {
  ssr: false,
});

export default function Contact() {
  return (
    <Section
      className={cn(
        // Margin top for separator
        "-mt-8",
        "sm:-mt-16",
        "md:-mt-22",
        "lg:-mt-38",
        "xl:-mt-48",
        // Gap 🕳️
        "gap-y-8",
        "xs:gap-y-14",
        "lg:gap-y-36",
        // Padding ↕️
        "lg:pb-48",
        "2xl:pb-60",
      )}
      id="contact"
      theme="dark"
    >
      {/* 🆎 Title */}
      <SectionTitle
        className="z-10"
        description="Prêt à démarrer votre projet ? Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé."
        title="Contact"
      />
      {/* 📱🟢📝 Contact and guaranteed response */}
      <div
        className={cn(
          "z-1",
          "w-full max-w-350",
          "flex justify-center gap-6",
          "flex-col",
          "lg:flex-row lg:items-start",
        )}
      >
        {/* 📱🟢 */}
        <div
          className={cn(
            "flex",
            "flex-row order-2",
            "lg:flex-col lg:order-1 lg:grow-[0.5]  lg:max-w-100",
            "gap-6",
          )}
        >
          {/* 📱 */}
          <div className={cn("hidden", "sm:block", "space-y-6 grow")}>
            {contactItems.map((item) => (
              <InfoContact key={item.id} {...item} />
            ))}
          </div>
          {/* 🟢 */}
          <ResponseGuaranteed />
        </div>

        {/* 📝 Contact form */}
        <Card
          animation={false}
          className={cn(
            "relative",
            "grow",
            "order-1",
            "lg:order-2",
            "overflow-visible",
            "bg-dotted-zinc",
            "py-4",
            "md:py-5",
            "lg:py-6",
          )}
        >
          {/* ⚡ Laser */}
          <div
            className={cn(
              "absolute top-0 right-0 -translate-y-[50%]",
              "mask-t-from-50% mask-t-to-90%",
              "cursor-auto",
              "w-[80%] max-w-[800]",
              "h-160",

              "hidden",
              "lg:block",
            )}
          >
            <LaserFlow
              color="#f59e0b"
              fogIntensity={0.1}
              horizontalSizing={2}
            />
          </div>
          {/* 📝 Contact form */}
          <CardContent
            className={cn(
              "z-10",
              "pl-2 pr-2.5",
              "@sm:pl-3 @sm:pr-3.5",
              "@md:pl-4 @md:pr-4.5",
              "@lg:pl-5 @lg:pr-5.5",
            )}
          >
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

// ----------------------------------
// 🟢 Response guaranteed
function ResponseGuaranteed() {
  return (
    <Card
      animation={false}
      className="gap-y-2 grow border-primary/30 bg-primary/5"
    >
      <CardHeader>
        <CardTitle className="text-wrap font-kanit font-semibold text-2xl">
          Réponse rapide garantie
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Nous nous engageons à répondre à tous les messages dans les 24 heures
        ouvrées.
      </CardContent>
      <CardFooter className="font-bold mt-auto text-primary text-sm">
        {/* 🟢 Équipe disponible */}
        <div className="mr-2 size-2 rounded-full bg-green-500" />
        <span>Équipe disponible</span>
      </CardFooter>
    </Card>
  );
}

// ----------------------------------
// 📱 Contact card
function InfoContact({ icon, content, title, href }: ContactItem) {
  return (
    <Card
      className={cn(
        "p-0 pr-14",
        "bg-dotted-zinc",
        "hover:laser-shadow",
        "focus-within:laser-shadow",
        "transition!",
      )}
    >
      <a className="flex items-start gap-6 p-6 outline-none" href={href}>
        <div
          className={cn(
            "mt-1",
            "grid w-fit items-center rounded-lg p-2.5 text-primary",
            "bg-[#392413]",
            "group-hover:brightness-120",
            "transition",
          )}
        >
          {icon}
        </div>
        <CardContent className="m-0 p-0">
          <CardTitle className="font-kanit font-semibold">{title}</CardTitle>
          <div>{content}</div>
        </CardContent>
      </a>
    </Card>
  );
}

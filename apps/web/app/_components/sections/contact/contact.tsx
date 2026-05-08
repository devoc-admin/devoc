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
import { type ContactItem, contactItems } from "./contact-data";
import ContactForm from "./contact-form";

// Lazy load WebGL LaserFlow component to reduce initial bundle
const LaserFlow = dynamic(() => import("@/components/react-bits/laser-flow"), {
  ssr: false,
});

export default function Contact() {
  return (
    <div
      className={cn(
        "z-1",
        "w-full max-w-350",
        "flex justify-center gap-6",
        "flex-col",
        "lg:flex-row lg:items-start"
      )}
    >
      {/* 📱🟢 */}
      <div
        className={cn(
          "flex",
          "order-2 flex-row",
          "lg:order-1 lg:max-w-100 lg:grow-[0.5] lg:flex-col",
          "gap-6"
        )}
      >
        {/* 📱 */}
        <div className={cn("hidden", "sm:block", "grow space-y-6")}>
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
          "lg:py-6"
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
            "lg:block"
          )}
        >
          <LaserFlow color="#f59e0b" fogIntensity={0.1} horizontalSizing={2} />
        </div>
        {/* 📝 Contact form */}
        <CardContent
          className={cn(
            "z-10",
            "pr-2.5 pl-2",
            "@sm:pr-3.5 @sm:pl-3",
            "@md:pr-4.5 @md:pl-4",
            "@lg:pr-5.5 @lg:pl-5"
          )}
        >
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}

// ----------------------------------
// 🟢 Response guaranteed
function ResponseGuaranteed() {
  return (
    <Card
      animation={false}
      className="grow gap-y-2 border-primary/30 bg-primary/5"
    >
      <CardHeader>
        <CardTitle className="text-wrap font-italic font-kanit font-semibold text-2xl">
          Réponse rapide garantie
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Nous nous engageons à répondre à tous les messages dans les 24 heures
        ouvrées.
      </CardContent>
      <CardFooter className="mt-auto font-bold text-primary text-sm">
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
        "transition!"
      )}
    >
      <a className="flex items-start gap-6 p-6 outline-none" href={href}>
        <div
          className={cn(
            "mt-1",
            "grid w-fit items-center rounded-lg p-2.5 text-primary",
            "bg-[#392413]",
            "group-hover:brightness-120",
            "transition"
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

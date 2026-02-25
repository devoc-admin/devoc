import { getTranslations } from "next-intl/server";
import { ContactForm } from "./_components/ContactForm";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}

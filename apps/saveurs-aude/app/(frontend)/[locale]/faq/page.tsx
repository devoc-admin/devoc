import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { FadeInUp } from "@/components/motion";
import { RichText } from "@/components/RichText";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import type { Faq } from "@/payload-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  return {
    description: t("faqDescription"),
    title: tFaq("title"),
  };
}

export default async function FAQPage() {
  const t = await getTranslations("faq");
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "faq",
    limit: 100,
    sort: "order",
  });

  const entries = result.docs as Faq[];

  // Group by category
  const grouped = new Map<string, Faq[]>();
  for (const entry of entries) {
    const cat = entry.category || "";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)?.push(entry);
  }

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <JsonLd
        data={[
          buildFAQPage(entries),
          buildBreadcrumbList([
            { name: "Accueil", url: baseUrl },
            { name: "FAQ", url: `${baseUrl}/fr/faq` },
          ]),
        ]}
      />
      <FadeInUp>
        <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      </FadeInUp>

      <div className="mt-8 flex flex-col gap-8">
        {[...grouped.entries()].map(([category, items], index) => (
          <FadeInUp delay={index * 0.1} key={category}>
            <section>
              {category && (
                <h2 className="mb-4 font-heading text-foreground text-xl">
                  {category}
                </h2>
              )}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <details
                    className="group rounded-lg border border-border/50 bg-card"
                    key={item.id}
                  >
                    <summary className="cursor-pointer px-5 py-4 font-medium text-foreground text-sm transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between">
                        {item.question}
                        <svg
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-border/50 border-t px-5 py-4">
                      <RichText
                        data={item.answer as unknown as SerializedEditorState}
                      />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}

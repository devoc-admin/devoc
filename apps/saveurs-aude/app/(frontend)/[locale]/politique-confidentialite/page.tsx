import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { FadeInUp, FadeInUpOnScroll } from "@/components/motion";
import { RichText } from "@/components/RichText";
import { buildBreadcrumbList } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { buildOgImage, getBaseUrl } from "@/lib/seo";
import type { Page } from "@/payload-types";

async function getPage(): Promise<Page | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    limit: 1,
    where: { slug: { equals: "politique-confidentialite" } },
  });
  return (result.docs[0] as Page) ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  if (!page) return {};
  const ogImage = buildOgImage(page.seo?.image);
  return {
    description: page.seo?.description ?? undefined,
    openGraph: {
      images: ogImage ? [ogImage] : undefined,
    },
    title: page.seo?.title ?? page.title,
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPage();

  if (!page) {
    notFound();
  }

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", url: baseUrl },
          { name: page.title, url: `${baseUrl}/fr/politique-confidentialite` },
        ])}
      />
      <FadeInUp>
        <h1 className="font-heading text-2xl text-primary sm:text-3xl">
          {page.title}
        </h1>
      </FadeInUp>
      {page.content && (
        <FadeInUpOnScroll delay={0.1}>
          <div className="mt-8">
            <RichText data={page.content as unknown as SerializedEditorState} />
          </div>
        </FadeInUpOnScroll>
      )}
    </div>
  );
}

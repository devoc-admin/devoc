import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";
import type { Page } from "@/payload-types";

async function getPage(): Promise<Page | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    limit: 1,
    where: { slug: { equals: "cgv" } },
  });
  return (result.docs[0] as Page) ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  if (!page) return {};
  return {
    description: page.seo?.description ?? undefined,
    title: page.seo?.title ?? page.title,
  };
}

export default async function CGVPage() {
  const page = await getPage();

  if (!page) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{page.title}</h1>
      {page.content && (
        <div className="mt-8">
          <RichText data={page.content as unknown as SerializedEditorState} />
        </div>
      )}
    </div>
  );
}

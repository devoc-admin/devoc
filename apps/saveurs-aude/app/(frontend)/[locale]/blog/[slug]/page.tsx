import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";
import type { BlogPost, Media } from "@/payload-types";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getPost(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blog-posts",
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
  });
  return (result.docs[0] as BlogPost) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    description: post.excerpt ?? undefined,
    title: post.seo?.title ?? post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const cover =
    typeof post.coverImage === "object" ? (post.coverImage as Media) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Header */}
      <header>
        {post.tags && post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                className="rounded-full bg-secondary/50 px-2 py-0.5 text-muted-foreground text-xs"
                key={tag.tag}
              >
                {tag.tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
          <span>
            {t("publishedOn", {
              date: new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            })}
          </span>
          {post.author && (
            <>
              <span>&middot;</span>
              <span>{t("byAuthor", { author: post.author })}</span>
            </>
          )}
        </div>
      </header>

      {/* Cover image */}
      {cover?.url && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            alt={cover.alt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            src={cover.url}
          />
        </div>
      )}

      {/* Content */}
      {post.content && (
        <div className="mt-8">
          <RichText data={post.content as unknown as SerializedEditorState} />
        </div>
      )}
    </div>
  );
}

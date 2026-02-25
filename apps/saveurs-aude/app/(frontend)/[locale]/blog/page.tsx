import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Where } from "payload";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { buildBreadcrumbList } from "@/lib/json-ld";
import { getPayloadClient } from "@/lib/payload";
import { getBaseUrl } from "@/lib/seo";
import type { BlogPost, Media } from "@/payload-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  return {
    description: t("blogDescription"),
    title: tBlog("title"),
  };
}

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const tagFilter = typeof params.tag === "string" ? params.tag : undefined;

  const t = await getTranslations("blog");
  const payload = await getPayloadClient();

  const where: Where = {
    status: { equals: "published" },
  };

  if (tagFilter) {
    where["tags.tag"] = { equals: tagFilter };
  }

  const result = await payload.find({
    collection: "blog-posts",
    depth: 1,
    limit: POSTS_PER_PAGE,
    page,
    sort: "-publishedAt",
    where,
  });

  const posts = result.docs as BlogPost[];
  const { totalPages } = result;

  // Collect all unique tags
  const allTagsResult = await payload.find({
    collection: "blog-posts",
    depth: 0,
    limit: 100,
    where: { status: { equals: "published" } },
  });
  const allTags = [
    ...new Set(
      (allTagsResult.docs as BlogPost[]).flatMap(
        (p) => p.tags?.map((t) => t.tag) ?? []
      )
    ),
  ];

  const baseUrl = getBaseUrl();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/fr/blog` },
        ])}
      />
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            className={
              tagFilter
                ? "rounded-full border border-border px-3 py-1 text-muted-foreground text-xs transition-colors hover:border-primary hover:text-primary"
                : "rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-xs"
            }
            href="/blog"
          >
            {t("allTags")}
          </a>
          {allTags.map((tag) => (
            <a
              className={
                tagFilter === tag
                  ? "rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground text-xs"
                  : "rounded-full border border-border px-3 py-1 text-muted-foreground text-xs transition-colors hover:border-primary hover:text-primary"
              }
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </a>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const cover =
              typeof post.coverImage === "object"
                ? (post.coverImage as Media)
                : null;
            return (
              <Link
                className="group overflow-hidden rounded-lg border border-border/50 bg-card transition-colors hover:border-primary/30"
                href={{ params: { slug: post.slug }, pathname: "/blog/[slug]" }}
                key={post.id}
              >
                {cover?.url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      alt={cover.alt}
                      className="object-cover transition-transform group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={cover.url}
                    />
                  </div>
                )}
                <div className="p-4">
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
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
                  <h2 className="font-heading text-foreground text-lg">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="mt-3 text-muted-foreground/70 text-xs">
                    {t("publishedOn", {
                      date: new Date(post.publishedAt).toLocaleDateString(
                        "fr-FR",
                        { day: "numeric", month: "long", year: "numeric" }
                      ),
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("noPosts")}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          tag={tagFilter}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  tag,
  totalPages,
}: {
  currentPage: number;
  tag?: string;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {pages.map((p) => {
        const params = new URLSearchParams();
        if (p > 1) params.set("page", String(p));
        if (tag) params.set("tag", tag);
        const qs = params.toString();

        return (
          <a
            className={
              p === currentPage
                ? "rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm"
                : "rounded-lg border border-border px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
            }
            href={`/blog${qs ? `?${qs}` : ""}`}
            key={p}
          >
            {p}
          </a>
        );
      })}
    </nav>
  );
}

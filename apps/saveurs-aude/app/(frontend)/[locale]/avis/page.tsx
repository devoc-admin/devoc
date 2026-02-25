import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPayloadClient } from "@/lib/payload";
import type { Review } from "@/payload-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const tReviews = await getTranslations({ locale, namespace: "reviews" });
  return {
    description: t("reviewsDescription"),
    title: tReviews("title"),
  };
}

const REVIEWS_PER_PAGE = 20;

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const t = await getTranslations("reviews");
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "reviews",
    depth: 1,
    limit: REVIEWS_PER_PAGE,
    page,
    sort: "-createdAt",
    where: {
      approved: { equals: true },
    },
  });

  const reviews = result.docs as Review[];
  const { totalPages } = result;

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>

      {/* Average rating */}
      {reviews.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Stars rating={Math.round(avgRating)} />
          </div>
          <span className="font-heading text-foreground text-lg">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-muted-foreground text-sm">
            {t("outOf")} ({reviews.length})
          </span>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              className="rounded-lg border border-border/50 bg-card p-5"
              key={review.id}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">
                  {review.customerName}
                </span>
                <div className="flex items-center gap-0.5">
                  <Stars rating={review.rating} small />
                </div>
              </div>
              {review.comment && (
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t("noReviews")}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function Stars({ rating, small }: { rating: number; small?: boolean }) {
  return (
    <>
      {STAR_KEYS.map((key, i) => (
        <svg
          aria-hidden="true"
          className={i < rating ? "text-amber-400" : "text-border"}
          fill={i < rating ? "currentColor" : "none"}
          height={small ? 14 : 18}
          key={key}
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          width={small ? 14 : 18}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {pages.map((p) => (
        <a
          className={
            p === currentPage
              ? "rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm"
              : "rounded-lg border border-border px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
          }
          href={p > 1 ? `?page=${p}` : "?"}
          key={p}
        >
          {p}
        </a>
      ))}
    </nav>
  );
}

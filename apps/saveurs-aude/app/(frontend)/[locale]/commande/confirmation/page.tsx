import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type Stripe from "stripe";
import { Link } from "@/i18n/navigation";
import { getPayloadClient } from "@/lib/payload";
import { getStripe } from "@/lib/stripe";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "checkout.confirmation",
  });
  return {
    robots: { index: false },
    title: t("title"),
  };
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const t = await getTranslations("checkout.confirmation");

  if (!session_id) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-muted-foreground">{t("error")}</p>
        <Link
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/boutique"
        >
          {t("backToShop")}
        </Link>
      </div>
    );
  }

  let session: Stripe.Response<Stripe.Checkout.Session> | null = null;
  let orderNumber: string | null = null;

  try {
    session = await getStripe().checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const payload = await getPayloadClient();
      const orders = await payload.find({
        collection: "orders",
        limit: 1,
        where: { stripeSessionId: { equals: session_id } },
      });

      if (orders.docs.length > 0) {
        orderNumber = orders.docs[0].orderNumber;
      }
    }
  } catch {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-muted-foreground">{t("error")}</p>
        <Link
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/boutique"
        >
          {t("backToShop")}
        </Link>
      </div>
    );
  }

  const customerEmail =
    session?.customer_details?.email ?? session?.metadata?.customerEmail;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-3xl text-primary">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>

      {orderNumber ? (
        <div className="mt-8 rounded-lg border border-border/50 bg-card p-6">
          <p className="text-muted-foreground text-sm">{t("orderNumber")}</p>
          <p className="mt-1 font-heading text-2xl text-foreground">
            {orderNumber}
          </p>
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground text-sm">{t("processing")}</p>
      )}

      {customerEmail && (
        <p className="mt-4 text-muted-foreground text-sm">
          {t("emailSent", { email: customerEmail })}
        </p>
      )}

      <Link
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        href="/boutique"
      >
        {t("backToShop")}
      </Link>
    </div>
  );
}

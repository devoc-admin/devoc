import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentCustomer, getCustomerOrders } from "@/lib/auth-actions";
import { formatPrice } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("account.orders");
  return { robots: { index: false }, title: t("title") };
}

export default async function OrdersPage() {
  const customer = await getCurrentCustomer();
  const t = await getTranslations("account");
  const orders = await getCustomerOrders();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl">
        {t("welcome", { name: customer?.firstName ?? "" })}
      </h1>
      <h2 className="mb-8 font-heading text-muted-foreground text-xl">
        {t("orders.title")}
      </h2>

      {orders.length === 0 ? (
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 size-12 text-muted-foreground/30" />
          <p className="mb-4 text-muted-foreground">{t("orders.empty")}</p>
          <Link
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            href="/boutique"
          >
            {t("orders.shopNow")}
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border/50 border-b bg-secondary/30">
                <th className="px-4 py-3 text-left font-medium">
                  {t("orders.number")}
                </th>
                <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">
                  {t("orders.date")}
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  {t("orders.status")}
                </th>
                <th className="px-4 py-3 text-right font-medium">
                  {t("orders.amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  className="border-border/50 border-b last:border-0"
                  key={order.id}
                >
                  <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-secondary/50 px-2.5 py-0.5 text-xs">
                      {t(
                        `status.${order.status as "pending" | "confirmed" | "preparing" | "shipped" | "ready" | "delivered" | "collected" | "cancelled"}`
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-accent font-semibold">
                    {formatPrice(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link
          className="text-primary text-sm hover:underline"
          href="/compte/profil"
        >
          {t("profile.title")}
        </Link>
      </div>
    </div>
  );
}

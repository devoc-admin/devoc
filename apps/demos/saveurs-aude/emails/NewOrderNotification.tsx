import { Section } from "@react-email/components";
import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type NotificationItem = {
  name: string;
  price: number;
  quantity: number;
  variant: string;
};

type NewOrderNotificationProps = {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: "shipping" | "clickAndCollect";
  items: NotificationItem[];
  orderNumber: string;
  total: number;
};

function formatEur(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    currency: "EUR",
    style: "currency",
  }).format(cents / 100);
}

export default function NewOrderNotification({
  customerEmail,
  customerName,
  customerPhone,
  deliveryMethod,
  items,
  orderNumber,
  total,
}: NewOrderNotificationProps) {
  return (
    <EmailLayout preview={`Nouvelle commande ${orderNumber}`}>
      <EmailHeading>Nouvelle commande</EmailHeading>

      <EmailText>
        Commande{" "}
        <strong style={{ color: colors.primary }}>{orderNumber}</strong>
      </EmailText>

      <EmailDivider />

      {/* Customer info */}
      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        Client
      </EmailText>
      <EmailText muted>
        {customerName}
        <br />
        {customerEmail}
        <br />
        {customerPhone}
      </EmailText>

      <EmailDivider />

      {/* Items */}
      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        Articles
      </EmailText>
      <Section>
        {items.map((item) => (
          <EmailText
            key={`${item.name}-${item.variant}`}
            muted
            style={{ margin: "0 0 4px" }}
          >
            {item.quantity} &times; {item.name} ({item.variant}) &mdash;{" "}
            {formatEur(item.price * item.quantity)}
          </EmailText>
        ))}
      </Section>

      <EmailDivider />

      {/* Total + delivery */}
      <EmailText>
        <strong>Total :</strong> {formatEur(total)}
      </EmailText>
      <EmailText>
        <strong>Livraison :</strong>{" "}
        {deliveryMethod === "shipping" ? "Expédition" : "Retrait en boutique"}
      </EmailText>
    </EmailLayout>
  );
}

export type { NewOrderNotificationProps, NotificationItem };

import { Column, Row, Section } from "@react-email/components";
import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  variant: string;
};

type ShippingAddress = {
  city: string;
  country: string;
  street: string;
  zipCode: string;
};

type OrderConfirmationProps = {
  customerName: string;
  deliveryMethod: "shipping" | "clickAndCollect";
  items: OrderItem[];
  orderNumber: string;
  shippingAddress?: ShippingAddress;
  shippingCost: number;
  subtotal: number;
  total: number;
};

function formatEur(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    currency: "EUR",
    style: "currency",
  }).format(cents / 100);
}

export default function OrderConfirmation({
  customerName,
  deliveryMethod,
  items,
  orderNumber,
  shippingAddress,
  shippingCost,
  subtotal,
  total,
}: OrderConfirmationProps) {
  return (
    <EmailLayout preview={`Confirmation de commande ${orderNumber}`}>
      <EmailText
        style={{
          color: colors.accent,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          margin: "0 0 8px",
          textTransform: "uppercase",
        }}
      >
        Saveurs d&apos;Aude
      </EmailText>

      <EmailHeading>Merci pour votre commande</EmailHeading>

      <EmailText>
        Bonjour {customerName}, votre commande{" "}
        <strong style={{ color: colors.primary }}>{orderNumber}</strong> a bien
        été enregistrée.
      </EmailText>

      <EmailDivider />

      {/* Items table */}
      <Section>
        {items.map((item) => (
          <Row key={`${item.name}-${item.variant}`} style={{ marginBottom: 8 }}>
            <Column style={{ width: "60%" }}>
              <EmailText style={{ margin: 0 }}>
                <strong>{item.name}</strong>
                <br />
                <span style={{ color: colors.muted, fontSize: 13 }}>
                  {item.variant} &times; {item.quantity}
                </span>
              </EmailText>
            </Column>
            <Column style={{ textAlign: "right", width: "40%" }}>
              <EmailText style={{ margin: 0 }}>
                {formatEur(item.price * item.quantity)}
              </EmailText>
            </Column>
          </Row>
        ))}
      </Section>

      <EmailDivider />

      {/* Totals */}
      <Section>
        <Row>
          <Column>
            <EmailText muted style={{ margin: "0 0 4px" }}>
              Sous-total
            </EmailText>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <EmailText style={{ margin: "0 0 4px" }}>
              {formatEur(subtotal)}
            </EmailText>
          </Column>
        </Row>
        <Row>
          <Column>
            <EmailText muted style={{ margin: "0 0 4px" }}>
              Livraison
            </EmailText>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <EmailText style={{ margin: "0 0 4px" }}>
              {shippingCost === 0 ? "Gratuit" : formatEur(shippingCost)}
            </EmailText>
          </Column>
        </Row>
        <Row>
          <Column>
            <EmailText
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: 700,
                margin: "8px 0 0",
              }}
            >
              Total
            </EmailText>
          </Column>
          <Column style={{ textAlign: "right" }}>
            <EmailText
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: 700,
                margin: "8px 0 0",
              }}
            >
              {formatEur(total)}
            </EmailText>
          </Column>
        </Row>
      </Section>

      <EmailDivider />

      {/* Delivery info */}
      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        {deliveryMethod === "shipping"
          ? "Adresse de livraison"
          : "Retrait en boutique"}
      </EmailText>

      {deliveryMethod === "shipping" && shippingAddress ? (
        <EmailText muted>
          {shippingAddress.street}
          <br />
          {shippingAddress.zipCode} {shippingAddress.city}
          <br />
          {shippingAddress.country}
        </EmailText>
      ) : (
        <EmailText muted>
          Vous recevrez un email lorsque votre commande sera prête à être
          récupérée.
        </EmailText>
      )}
    </EmailLayout>
  );
}

export type { OrderConfirmationProps, OrderItem, ShippingAddress };

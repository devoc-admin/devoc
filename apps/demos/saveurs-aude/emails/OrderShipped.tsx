import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type OrderShippedProps = {
  customerName: string;
  orderNumber: string;
  trackingNumber: string;
};

export default function OrderShipped({
  customerName,
  orderNumber,
  trackingNumber,
}: OrderShippedProps) {
  return (
    <EmailLayout preview={`Commande ${orderNumber} expédiée`}>
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

      <EmailHeading>Votre commande a été expédiée</EmailHeading>

      <EmailText>
        Bonjour {customerName}, votre commande{" "}
        <strong style={{ color: colors.primary }}>{orderNumber}</strong> est en
        route.
      </EmailText>

      <EmailDivider />

      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        Numéro de suivi
      </EmailText>
      <EmailText
        style={{
          backgroundColor: colors.bg,
          borderRadius: 4,
          color: colors.primary,
          display: "inline-block",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 1,
          margin: "0 0 12px",
          padding: "8px 16px",
        }}
      >
        {trackingNumber}
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Vous pouvez suivre votre colis grâce à ce numéro sur le site du
        transporteur.
      </EmailText>
    </EmailLayout>
  );
}

export type { OrderShippedProps };

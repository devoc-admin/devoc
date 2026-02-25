import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

const STATUS_LABELS: Record<string, string> = {
  cancelled: "Annulée",
  collected: "Récupérée",
  confirmed: "Confirmée",
  delivered: "Livrée",
  pending: "En attente",
  preparing: "En préparation",
  ready: "Prête",
  shipped: "Expédiée",
};

type OrderStatusUpdateProps = {
  customerName: string;
  newStatus: string;
  orderNumber: string;
};

export default function OrderStatusUpdate({
  customerName,
  newStatus,
  orderNumber,
}: OrderStatusUpdateProps) {
  const statusLabel = STATUS_LABELS[newStatus] ?? newStatus;

  return (
    <EmailLayout preview={`Commande ${orderNumber} — ${statusLabel}`}>
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

      <EmailHeading>Mise à jour de votre commande</EmailHeading>

      <EmailText>
        Bonjour {customerName}, votre commande{" "}
        <strong style={{ color: colors.primary }}>{orderNumber}</strong> a
        changé de statut.
      </EmailText>

      <EmailDivider />

      <EmailText>
        <strong>Nouveau statut :</strong>{" "}
        <span style={{ color: colors.accent, fontWeight: 600 }}>
          {statusLabel}
        </span>
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Si vous avez des questions, n&apos;hésitez pas à nous contacter.
      </EmailText>
    </EmailLayout>
  );
}

export type { OrderStatusUpdateProps };

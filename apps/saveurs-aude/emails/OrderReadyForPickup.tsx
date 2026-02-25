import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type OrderReadyForPickupProps = {
  customerName: string;
  orderNumber: string;
};

export default function OrderReadyForPickup({
  customerName,
  orderNumber,
}: OrderReadyForPickupProps) {
  return (
    <EmailLayout preview={`Commande ${orderNumber} prête à retirer`}>
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

      <EmailHeading>Votre commande est prête</EmailHeading>

      <EmailText>
        Bonjour {customerName}, votre commande{" "}
        <strong style={{ color: colors.primary }}>{orderNumber}</strong> est
        prête à être récupérée en boutique.
      </EmailText>

      <EmailDivider />

      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        Informations de retrait
      </EmailText>
      <EmailText muted>
        Présentez-vous en boutique avec votre numéro de commande. Nous vous
        attendons aux horaires d&apos;ouverture habituels.
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Si vous avez des questions, n&apos;hésitez pas à nous contacter.
      </EmailText>
    </EmailLayout>
  );
}

export type { OrderReadyForPickupProps };

import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type ContactConfirmationProps = {
  name: string;
};

export default function ContactConfirmation({
  name,
}: ContactConfirmationProps) {
  return (
    <EmailLayout preview="Nous avons bien reçu votre message">
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

      <EmailHeading>Message bien reçu</EmailHeading>

      <EmailText>
        Bonjour {name}, nous avons bien reçu votre message et nous vous
        répondrons dans les meilleurs délais.
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Merci de votre confiance. Notre équipe s&apos;engage à vous répondre
        sous 48 heures.
      </EmailText>
    </EmailLayout>
  );
}

export type { ContactConfirmationProps };

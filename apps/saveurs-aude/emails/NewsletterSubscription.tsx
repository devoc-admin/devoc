import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type NewsletterSubscriptionProps = {
  email: string;
};

export default function NewsletterSubscription({
  email,
}: NewsletterSubscriptionProps) {
  return (
    <EmailLayout preview="Inscription à la newsletter confirmée">
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

      <EmailHeading>Inscription à la newsletter</EmailHeading>

      <EmailText>
        Votre adresse <strong style={{ color: colors.primary }}>{email}</strong>{" "}
        a bien été inscrite à notre newsletter.
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Vous recevrez nos dernières actualités, promotions et nouveautés
        directement dans votre boîte mail.
      </EmailText>
    </EmailLayout>
  );
}

export type { NewsletterSubscriptionProps };

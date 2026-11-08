import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type ContactMessageProps = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export default function ContactMessage({
  email,
  message,
  name,
  subject,
}: ContactMessageProps) {
  return (
    <EmailLayout preview={`Nouveau message de ${name}`}>
      <EmailHeading>Nouveau message de contact</EmailHeading>

      <EmailText>
        <strong>De :</strong> {name} ({email})
      </EmailText>

      <EmailText>
        <strong>Objet :</strong> {subject}
      </EmailText>

      <EmailDivider />

      <EmailText
        style={{
          backgroundColor: colors.bg,
          borderLeft: `3px solid ${colors.accent}`,
          borderRadius: 4,
          margin: "0 0 12px",
          padding: "12px 16px",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </EmailText>
    </EmailLayout>
  );
}

export type { ContactMessageProps };

import {
  colors,
  EmailDivider,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./components";

type WelcomeProps = {
  firstName: string;
};

export default function Welcome({ firstName }: WelcomeProps) {
  return (
    <EmailLayout preview="Bienvenue chez Saveurs d'Aude">
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

      <EmailHeading>Bienvenue chez Saveurs d&apos;Aude</EmailHeading>

      <EmailText>
        Bonjour {firstName}, merci d&apos;avoir créé votre compte. Nous sommes
        ravis de vous compter parmi nos clients.
      </EmailText>

      <EmailDivider />

      <EmailText style={{ fontWeight: 600, margin: "0 0 8px" }}>
        Votre compte vous permet de :
      </EmailText>
      <EmailText muted>
        &bull; Suivre vos commandes en temps réel
        <br />
        &bull; Accéder à votre historique d&apos;achats
        <br />
        &bull; Enregistrer vos informations de livraison
      </EmailText>

      <EmailDivider />

      <EmailText muted>
        Bonne découverte de nos produits du terroir audois !
      </EmailText>
    </EmailLayout>
  );
}

export type { WelcomeProps };

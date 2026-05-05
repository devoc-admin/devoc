import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type React from "react";

type TemplateEmailProps = {
  closingData: string;
  gdprData?: string;
  headingData: string;
  paragraphs?: React.ReactNode[];
  previewData: string;
  cta?: {
    text: string;
    href: string;
    icon?: string;
  };
};

export const TemplateEmail = ({
  previewData,
  headingData,
  closingData,
  paragraphs,
  gdprData = "Conformément au RGPD, vous pouvez demander la suppression de vos données à tout moment sur simple réponse à ce mail.",
  cta,
}: TemplateEmailProps) => (
  <Html dir="ltr" lang="fr">
    <Head />
    <Preview>{previewData}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* 🌊 */}
        <Img
          alt="Des lignes ondulées orange incandescent flottent sur un fond noir."
          src="https://resend-attachments.s3.amazonaws.com/c44cab47-0447-4300-84fb-1e5cd213400d"
          style={heroImage}
          width="100%"
        />
        <Section style={content}>
          {/* 🆎 */}
          <Heading style={heading}>{headingData}</Heading>

          {paragraphs?.map((paragraphNode, index) => (
            <Text key={index} style={paragraph}>
              {paragraphNode}
            </Text>
          ))}

          <Text style={closingText}>
            <strong>{closingData}</strong>
          </Text>

          {cta && (
            <Section style={buttonContainer}>
              <Button href={cta.href} style={button}>
                <span
                  style={{
                    display: "inline-block",
                    marginRight: 10,
                  }}
                >
                  {cta.icon || "📥"}
                </span>
                <span>{cta.text}</span>
              </Button>
            </Section>
          )}

          <Section style={signatureSection}>
            <Row>
              <Column align="center">
                <Img
                  alt="Nom du collectif, Dev&#x27;Oc"
                  height="44"
                  src="https://resend-attachments.s3.amazonaws.com/28cb7555-7a96-4739-adb6-3b48e2636524"
                  width="124"
                />
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Text style={expertText}>
                  <strong>Votre expert numérique</strong>
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Img
                  alt="Logo Dev&#x27;Oc avec un symbole orange en forme de fleur à quatre pétales."
                  height="50"
                  src="https://resend-attachments.s3.amazonaws.com/9af1cee6-9471-4f0e-bede-8614d64d0ec8"
                  width="50"
                />
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Link href="mailto:contact@dev-oc.fr" style={contactLink}>
                  <span style={contactIcon}>✉️</span>
                  <span style={contactText}>contact@dev-oc.fr</span>
                </Link>
              </Column>
              <Column style={{ padding: "0 10px" }} />
              <Column align="center">
                <Link href="https://www.dev-oc.fr/" style={contactLink}>
                  <span style={contactIcon}>🌐</span>
                  <span style={contactText}>www.dev-oc.fr</span>
                </Link>
              </Column>
              <Column style={{ padding: "0 10px" }} />
              <Column align="right">
                <Link
                  href="https://www.linkedin.com/company/110846046"
                  style={contactLink}
                >
                  <span style={contactIcon}>🔗</span>
                  <span style={contactText}>LinkedIn</span>
                </Link>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link href="https://cal.com/dev-oc/30min" style={contactLink}>
                  <span style={contactIcon}>🗓️</span>
                  <span style={contactText}>Prendre un rendez-vous</span>
                </Link>
              </Column>
            </Row>

            <Row style={{ marginTop: "25px" }}>
              <Column style={partnerColumn}>
                <Text style={partnerName}>Clément</Text>
                <Img
                  alt="Clément"
                  src="/static/clement.png"
                  style={partnerPhoto}
                />
                <Text style={partnerDescription}>
                  L'architecte de l'invisible
                </Text>
                <Link href="tel:+33658889701" style={contactLink}>
                  <span style={contactIcon}>📱</span>
                  <span style={contactText}>+33 6 58 88 97 01</span>
                </Link>
              </Column>
              <Column style={{ width: "15px" }} />
              <Column style={partnerColumn}>
                <Text style={partnerName}>Thibaut</Text>
                <Img
                  alt="Thibaut"
                  src="/static/thibaut.png"
                  style={partnerPhoto}
                />
                <Text style={partnerDescription}>L'architecte du visuel</Text>
                <Link href="tel:+33620239838" style={contactLink}>
                  <span style={contactIcon}>📱</span>
                  <span style={contactText}>+33 6 20 23 98 38</span>
                </Link>
              </Column>
            </Row>
          </Section>
        </Section>

        <Section style={reviewSection}>
          <Link
            href="https://share.google/J2qlkZIWaWiHflcet"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{ ...reviewText, display: "block", marginBottom: "8px" }}
            >
              Laissez-nous votre avis !
            </span>
            <span aria-label="Note de 5 sur 5" role="img" style={starIcon}>
              ⭐⭐⭐⭐⭐
            </span>
          </Link>
        </Section>
        <Section style={footerSection}>
          <Text style={bookingText}>
            👉 Vous souhaitez aller plus loin dans votre stratégie numérique ?
            Réservez un échange de 30 minutes avec l'un de nos membres :{" "}
            <Link href="https://cal.com/dev-oc/30min" style={bookingLink}>
              https://cal.com/dev-oc/30min
            </Link>
          </Text>

          <Text style={gdprText}>{gdprData}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif";

const main = {
  backgroundColor: "#fffcfc",
  color: "#ffffff",
  fontFamily,
};

const container = {
  backgroundColor: "#000000",
  fontFamily,
  lineHeight: "155%",
  margin: "0 auto",
  maxWidth: "600px",
};

const heroImage = {
  borderRadius: "8px",
  display: "block" as const,
  maxWidth: "100%",
};

const content = {
  padding: "0 10px",
};

const heading = {
  fontSize: "36px",
  fontWeight: "600",
  lineHeight: "1.44",
  margin: "0",
  marginBottom: "25px",
  paddingTop: "14px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "130%",
  margin: "0 0 20px 0",
  padding: "8px 10px",
  textAlign: "center" as const,
};

const buttonContainer = {
  padding: "16px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#F48C06",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  padding: "12px 24px 12px 20px",
  textDecoration: "none",
};

const closingText = {
  fontSize: "16px",
  lineHeight: "120%",
  margin: "30px 0",
  padding: "0 20px",
  textAlign: "center" as const,
};

const signatureSection = {
  padding: "16px 0",
  textAlign: "center" as const,
  width: "auto",
};

const expertText = {
  fontSize: "15px",
  lineHeight: "125%",
  margin: "0",
  padding: "8px 0",
  textAlign: "center" as const,
};

const contactLink = {
  color: "white",
  fontSize: "14px",
  textDecoration: "underline" as const,
};

const contactIcon = {
  display: "inline-block" as const,
  marginRight: "7px",
  verticalAlign: "middle" as const,
};

const contactText = {
  color: "white",
  display: "inline-block" as const,
  verticalAlign: "middle" as const,
};

const reviewSection = {
  margin: "15px 0",
  textAlign: "center" as const,
};

const reviewText = {
  color: "white",
  fontSize: "16px",
  fontWeight: 500,
};

const starIcon = {
  display: "inline-block" as const,
  fontSize: "32px",
  margin: "0 2px",
  verticalAlign: "middle" as const,
};

const footerSection = {
  padding: "15px",
};

const bookingText = {
  fontSize: "15px",
  lineHeight: "120%",
  margin: "0",
  padding: "8px 0",
};

const bookingLink = {
  color: "#ffffff",
  textDecoration: "underline" as const,
};

const gdprText = {
  fontSize: "11px",
  lineHeight: "110%",
  margin: "0",
  padding: "8px 0",
};

const partnerColumn = {
  width: "48%",
};

const partnerPhoto = {
  borderRadius: "50%",
  display: "inline-block",
  filter: "grayscale(100%)", // Optionnel : pour un look très "collectif de dev" sobre
  width: "150px",
};

const partnerName = {
  color: "#888",
  fontSize: "12px",
  letterSpacing: "1px",
  margin: "4px 0 0 0",
  textTransform: "uppercase" as const,
};
const partnerDescription = {
  color: "#888",
  display: "block",
  fontSize: "12px",
  lineHeight: "1.4",
  margin: "4px 0 0px 0",
};

TemplateEmail.PreviewProps = {
  closingData:
    "En vous souhaitant le meilleur dans vos projets entrepreneuriaux !",
  cta: {
    href: "https://drive.google.com/file/d/1tFSGJ-wunNxSBuv1UsKHhVRVWcJtVcmh/view?usp=sharing",
    icon: "🎤",
    text: "Lien de la présentation",
  },
  gdprData:
    "Vous recevez ce message car vous avez participé à une présentation « Réussir sa transformation numérique en 2026 » du 30 mars 2026 à Alpha'R. Conformément au RGPD, vous pouvez demander la suppression de vos données à tout moment sur simple réponse à ce mail.",
  headingData: "Bonjour,",
  paragraphs: [
    <strong>
      Vous avez assisté lundi dernier à une masterclass intitulée «{" "}
      <u>Réussir sa transformation numérique en 2026</u> » et animée par{" "}
      <u>
        <Link
          href="https://www.dev-oc.fr/"
          style={{ color: "#e5e7eb", textDecoration: "underline" }}
        >
          notre collectif Dev'Oc
        </Link>
      </u>
      .
    </strong>,
    <strong>
      Nous espérons que cette présentation vous a plu et que vous avez pu en
      ressortir avec des idées plus claires sur les sujets que nous avons
      abordés à cette occasion ! 😊
    </strong>,
    <strong>
      Vos questions et échanges ont rendu ce moment particulièrement
      enrichissant, et c'est exactement ce type de dialogue que nous souhaitons
      encourager 🙌
    </strong>,
    <strong>
      Vous pouvez dès à présent retrouver le support de cette présentation au
      format pdf en cliquant sur le lien ci-dessous 👇
    </strong>,
  ],
  previewData: "Merci pour votre participation à notre masterclass !",
} as TemplateEmailProps;

export default TemplateEmail;

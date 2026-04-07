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

export const DefaultEmail = () => (
  <Html dir="ltr" lang="fr">
    <Head />
    <Preview>Merci pour votre participation à la masterclass Dev'Oc</Preview>
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
          <Heading style={heading}>Bonjour,</Heading>

          <Text style={paragraph}>
            <strong>
              Vous avez assisté lundi dernier à une masterclass intitulée «{" "}
              <u>Réussir sa transformation numérique en 2026</u> » et animée par{" "}
              <u>
                <Link href="https://www.dev-oc.fr/" style={linkInline}>
                  notre collectif Dev'Oc
                </Link>
              </u>
              .
            </strong>
          </Text>

          <Text style={paragraph}>
            <strong>
              Nous espérons que cette présentation vous a plu et que vous avez
              pu en ressortir avec des idées plus claires sur les sujets que
              nous avons abordés à cette occasion !
            </strong>{" "}
            😊
          </Text>

          <Text style={paragraph}>
            <strong>
              Vos questions et échanges ont rendu ce moment particulièrement
              enrichissant, et c'est exactement ce type de dialogue que nous
              souhaitons encourager
            </strong>{" "}
            🙌
          </Text>

          <Text style={paragraph}>
            <strong>
              Vous pouvez dès à présent retrouver le support de cette
              présentation au format pdf en cliquant sur le lien ci-dessous
            </strong>{" "}
            👇
          </Text>

          <Section style={buttonContainer}>
            <Button
              href="https://drive.google.com/file/d/1tFSGJ-wunNxSBuv1UsKHhVRVWcJtVcmh/view?usp=sharing"
              style={button}
            >
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                🎤
              </span>
              <span>Lien présentation</span>
            </Button>
          </Section>

          <Text style={closingText}>
            <strong>
              En vous souhaitant le meilleur dans vos projets entrepreneuriaux !
            </strong>
          </Text>

          <Text style={closingText}>
            <strong>L'équipe Dev'Oc</strong>
          </Text>
          <Img
            alt="Logo Dev&#x27;Oc avec un symbole orange en forme de fleur à quatre pétales."
            height="50"
            src="https://resend-attachments.s3.amazonaws.com/9af1cee6-9471-4f0e-bede-8614d64d0ec8"
            style={{ display: "block", margin: "0 auto 20px auto" }}
            width="50"
          />
        </Section>
        <Section style={signatureSection}>
          <Row>
            <Column style={photoColumn}>
              <Link href="https://www.dev-oc.fr/">
                <Img
                  alt="Deux hommes en sweat à capuche orange et noir travaillent ensemble sur un ordinateur dans un bureau."
                  height="133"
                  src="https://resend-attachments.s3.amazonaws.com/bba25591-2e5d-4a10-a375-aa3dcf48af8c"
                  style={teamPhoto}
                  width="133"
                />
              </Link>
            </Column>
            <Column style={infoColumn}>
              <Img
                alt="Logo Dev'Oc avec un symbole orange en forme de fleur à quatre pétales."
                height="44"
                src="https://resend-attachments.s3.amazonaws.com/28cb7555-7a96-4739-adb6-3b48e2636524"
                style={logo}
                width="124"
              />
              <Text style={expertText}>
                <strong>Votre expert numérique</strong>
              </Text>
              <table
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <tr>
                  <td style={contactRow}>
                    <Link href="mailto:contact@dev-oc.fr" style={contactLink}>
                      <Img
                        alt="Email"
                        height="11"
                        src="https://resend-attachments.s3.amazonaws.com/ede71469-e316-449b-92ac-df778cbb67af"
                        style={contactIcon}
                        width="11"
                      />
                      <span style={contactText}>contact@dev-oc.fr</span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={contactRow}>
                    <Link href="tel:+33620239838" style={contactLink}>
                      <Img
                        alt="Téléphone"
                        height="14"
                        src="https://resend-attachments.s3.amazonaws.com/a6023ae9-14ea-4974-91cc-86b9d084a4b5"
                        style={contactIcon}
                        width="11"
                      />
                      <span style={contactText}>+33 6 20 23 98 38</span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={contactRow}>
                    <Link href="https://www.dev-oc.fr/" style={contactLink}>
                      <Img
                        alt="Site web"
                        height="12"
                        src="https://resend-attachments.s3.amazonaws.com/7ec220ef-16b9-4c8b-ad44-f11121bc72fe"
                        style={contactIcon}
                        width="12"
                      />
                      <span style={contactText}>www.dev-oc.fr</span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={contactRow}>
                    <Link
                      href="https://www.linkedin.com/company/110846046"
                      style={contactLink}
                    >
                      <Img
                        alt="LinkedIn"
                        height="11"
                        src="https://resend-attachments.s3.amazonaws.com/f2117033-d44e-4b2d-8592-2c46b023526f"
                        style={contactIcon}
                        width="11"
                      />
                      <span style={contactText}>LinkedIn</span>
                    </Link>
                  </td>
                </tr>
              </table>
            </Column>
          </Row>
        </Section>
        <Section style={reviewSection}>
          <Link href="https://share.google/J2qlkZIWaWiHflcet">
            <Text style={reviewText}>Laissez-nous votre avis !</Text>
            <Img
              alt="Star"
              height="32"
              src="https://resend-attachments.s3.amazonaws.com/fa0b118a-90a7-4845-a41e-f8cbd1021b64"
              style={starIcon}
              width="32"
            />
            <Img
              alt="Star"
              height="32"
              src="https://resend-attachments.s3.amazonaws.com/fa0b118a-90a7-4845-a41e-f8cbd1021b64"
              style={starIcon}
              width="32"
            />
            <Img
              alt="Star"
              height="32"
              src="https://resend-attachments.s3.amazonaws.com/fa0b118a-90a7-4845-a41e-f8cbd1021b64"
              style={starIcon}
              width="32"
            />
            <Img
              alt="Star"
              height="32"
              src="https://resend-attachments.s3.amazonaws.com/fa0b118a-90a7-4845-a41e-f8cbd1021b64"
              style={starIcon}
              width="32"
            />
            <Img
              alt="Star"
              height="32"
              src="https://resend-attachments.s3.amazonaws.com/fa0b118a-90a7-4845-a41e-f8cbd1021b64"
              style={starIcon}
              width="32"
            />
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

          <Text style={gdprText}>
            Vous recevez ce message car vous avez participé à une présentation «
            Réussir sa transformation numérique en 2026 » du 30 mars 2026 à
            Alpha'R. Conformément au RGPD, vous pouvez demander la suppression
            de vos données à tout moment sur simple réponse à ce mail.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default DefaultEmail;

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

const linkInline = {
  color: "#e5e7eb",
  textDecoration: "underline" as const,
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
};

const photoColumn = {
  textAlign: "center" as const,
  verticalAlign: "top" as const,
  width: "50%",
};

const teamPhoto = {
  borderRadius: "8px",
  display: "block" as const,
  margin: "0 auto",
};

const infoColumn = {
  paddingRight: "20px",
  verticalAlign: "top" as const,
};

const logo = {
  borderRadius: "8px",
  display: "block" as const,
};

const expertText = {
  fontSize: "15px",
  lineHeight: "125%",
  margin: "0",
  padding: "8px 0",
};

const contactRow = {
  paddingBottom: "0px",
};

const contactLink = {
  color: "#067df7",
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

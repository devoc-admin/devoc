import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const CommunicationEmail = () => (
  <Html>
    <Head />
    <Preview>Email de test pour Dev'Oc</Preview>
    <Body style={main}>
      <Container>
        <Section style={container}>
          <Img
            alt="Stripe"
            height="41"
            src={`${baseUrl}/static/upper-devoc-mail.png`}
            style={imgBorder}
            width="450px"
          />
          <Text>Dev'Oc</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#FFFFF0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: "0 !important",
  padding: 0,
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "460px",
  padding: "0",
};

const imgBorder = {
  width: "100%",
};

export default CommunicationEmail;

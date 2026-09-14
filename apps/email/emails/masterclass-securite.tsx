import { Body, Container, Head, Html } from "@react-email/components";

const MasterClassSecurityEmail = () => (
  <Html dir="ltr" lang="fr">
    <Head />
    <Body style={main}>
      <Container style={container}>
        Initialize masterclass security email template
      </Container>
    </Body>
  </Html>
);

// 🎨
const fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif";

const main = {
  backgroundColor: "#fff",
  color: "#000",
  fontFamily,
};

const container = {
  backgroundColor: "#fff",
  fontFamily,
  margin: "0 auto",
  maxWidth: "600px",
};

MasterClassSecurityEmail.PreviewProps = {};

// ⬅️
export default MasterClassSecurityEmail;

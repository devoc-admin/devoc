import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Fragment } from "react";

const MunicipalitySecurityEmail = () => (
  <Html dir="ltr" lang="fr">
    <CustomTailwind>
      <Head>
        <FontLink />
      </Head>
      <Preview>Cybersécurité - Testez votre niveau de sécurité !</Preview>
      <Body className="m-0 bg-white font-sans text-black">
        <Container className="mx-auto max-w-[600px] bg-white font-sans">
          <Adornments />
          <Spacer height={16} />
          <Hero />
          <Spacer height={42} />
          <PourFaireFaceACetteRecrudescence />
          <Spacer height={72} />
          <NousAvonsAinsiCree />
          <Spacer height={22} />
          <ComputeYourScore />
          <Spacer height={84} />
          <VousTrouverezEgalement />
        </Container>
      </Body>
    </CustomTailwind>
  </Html>
);

// ⚜ ==============================================
function Adornments() {
  return (
    <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
      <tbody>
        {[0, 1, 2].map((i) => (
          <Fragment key={i}>
            {i > 0 && (
              <tr>
                <td className="text-[0px] leading-[0px]" height={3}>
                  &nbsp;
                </td>
              </tr>
            )}
            <tr>
              <td
                className="bg-brand text-[0px] leading-[0px]"
                // biome-ignore lint/style/noNestedTernary: exception
                height={i === 0 ? 16 : i === 1 ? 7 : 3}
              >
                &nbsp;
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

// 🦸‍♂️ =============================================
const testUrl = "#";

function Hero() {
  return (
    <Link href={testUrl}>
      <Img
        alt="Votre commune est-elle bien protégée ? Chaque année, des centaines de communes sont victimes d'actes de cybermalveillance (rapport ANSSI 2026), menant à des interruptions de service ou au vol et à la destruction de données sensibles. Faites le test."
        className="bg-brand block h-auto w-full font-bold text-white"
        height={293}
        src={`${assetsUrl}/hero-v1.png`}
        width={600}
      />
    </Link>
  );
}

// 🔠 =============================================
function PourFaireFaceACetteRecrudescence() {
  return (
    <Section>
      <Row>
        {/* Spacing as cell padding: Outlook ignores margin/padding on tables */}
        <Column className="w-[103px] pl-6 align-middle">
          <Img
            alt=""
            className="block"
            height={120}
            src={`${assetsUrl}/shield.png`}
            width={103}
          />
        </Column>
        <Column className="pr-6 pl-8 align-middle">
          <Text className="m-0 text-xl leading-6 font-medium">
            Pour faire face à cette recrudescence, le collectif Dev’Oc mène des
            actions de prévention et d’éducation numérique auprès des équipes
            municipales
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

// 🔠 =============================================
function NousAvonsAinsiCree() {
  return (
    <Text className="mx-auto max-w-[35ch] text-center text-xl leading-6 font-medium">
      Nous avons ainsi créé un <span className="font-bold">test gratuit</span>{" "}
      et en ligne pour identifier les points à améliorer dans votre stratégie
      numérique
    </Text>
  );
}

// 🆕 =============================================
function ComputeYourScore() {
  return (
    <Link
      className="bg-brand font-display mx-auto block w-fit cursor-pointer rounded-full px-8 py-0.5 text-white"
      href="#"
      target="_blank"
    >
      <Text className="mx-auto max-w-[35ch] text-center text-2xl font-bold font-medium">
        Calculer votre score
      </Text>
    </Link>
  );
}

// 🔠 =============================================
function VousTrouverezEgalement() {
  return (
    <Section>
      <Row>
        {/* Spacing as cell padding: Outlook ignores margin/padding on tables */}
        <Column className="pr-6 pl-8 align-middle">
          <Text className="m-0 text-xl leading-6 font-medium">
            Vous y trouverez également des conseils pour adopter les bons
            réflexes et apprendre à réagir en cas de cyberattaque
          </Text>
        </Column>
        <Column className="w-[128px] pl-6 align-middle">
          <Img
            alt=""
            className="block"
            height={120}
            src={`${assetsUrl}/hand.png`}
            width={128}
          />
        </Column>
      </Row>
    </Section>
  );
}

// ↕️ =============================================
// Vertical space that also works in Outlook desktop (ignores margin on tables)
function Spacer({ height }: { height: number }) {
  return (
    <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
      <tbody>
        <tr>
          <td className="text-[0px] leading-[0px]" height={height}>
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// 🖼️ =============================================
const assetsUrl =
  process.env.NODE_ENV === "development"
    ? "/static/municipalities-security"
    : "https://dev-oc.fr/emails/municipalities-security";

// 🖊️ =============================================

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500;700&family=Racing+Sans+One&display=swap"
    rel="stylesheet"
  />
);

// Used by clients that don't load web fonts (Gmail, Outlook desktop)
const fallbackFonts = [
  "-apple-system",
  "BlinkMacSystemFont",
  "'Segoe UI'",
  "Roboto",
  "'Helvetica Neue'",
  "Ubuntu",
  "sans-serif",
];

function CustomTailwind({ children }: { children: React.ReactNode }) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: { brand: "#FF5709" },
            fontFamily: {
              display: ["'Racing Sans One'", ...fallbackFonts],
              sans: ["Oxanium", ...fallbackFonts],
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
}

export default MunicipalitySecurityEmail;

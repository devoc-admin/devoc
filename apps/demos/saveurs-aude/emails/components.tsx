import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

const colors = {
  accent: "#B87333",
  bg: "#FAF3E8",
  border: "#E8DDD0",
  muted: "#6B6B6B",
  primary: "#6B3A2A",
  text: "#1A1A1A",
} as const;

const fontFamily = "'Georgia', 'Times New Roman', 'Palatino', serif" as const;

type EmailLayoutProps = {
  children: ReactNode;
  preview: string;
};

export function EmailLayout({ children, preview }: EmailLayoutProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.bg,
          fontFamily,
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            margin: "40px auto",
            maxWidth: 560,
            padding: "32px 40px",
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
}

type EmailHeadingProps = {
  children: ReactNode;
};

export function EmailHeading({ children }: EmailHeadingProps) {
  return (
    <Heading
      style={{
        color: colors.primary,
        fontFamily,
        fontSize: 24,
        fontWeight: 700,
        lineHeight: "32px",
        margin: "0 0 16px",
      }}
    >
      {children}
    </Heading>
  );
}

type EmailTextProps = {
  children: ReactNode;
  muted?: boolean;
  style?: React.CSSProperties;
};

export function EmailText({ children, muted, style }: EmailTextProps) {
  return (
    <Text
      style={{
        color: muted ? colors.muted : colors.text,
        fontFamily,
        fontSize: 14,
        lineHeight: "22px",
        margin: "0 0 12px",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}

export function EmailDivider() {
  return (
    <Hr
      style={{
        borderColor: colors.border,
        borderTop: `1px solid ${colors.border}`,
        margin: "24px 0",
      }}
    />
  );
}

export { colors, fontFamily };

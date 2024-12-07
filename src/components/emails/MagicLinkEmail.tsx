import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { env } from "@/env";

interface MagicLinkEmailProps {
  userFirstname: string;
  magicLink: string;
}

export const MagicLinkEmail = ({
  userFirstname,
  magicLink,
}: MagicLinkEmailProps) => {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  return (
    <Html>
      <Head />
      <Preview>Sign in to CVisionary with your magic link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/cvisionary-logo.png`}
            width="40"
            height="40"
            alt="CVisionary"
            style={logo}
          />
          <Section>
            <Text style={text}>Hello {userFirstname},</Text>
            <Text style={text}>
              Click the button below to securely sign in to your CVisionary
              account. This link will expire in 15 minutes.
            </Text>
            <Section style={{ textAlign: "center", marginTop: "20px" }}>
              <Button href={magicLink} style={button}>
                Sign In to CVisionary
              </Button>
            </Section>
            <Text style={text}>
              If you didn’t request this email, you can safely ignore it.
            </Text>
            <Text style={text}>
              For assistance, visit our{" "}
              <Link style={anchor} href={`${baseUrl}/help`}>
                Help Center
              </Link>
              .
            </Text>
            <Text style={text}>The CVisionary Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MagicLinkEmail;

const main = {
  backgroundColor: "#f8fafc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "40px",
  borderRadius: "8px",
};

const text = {
  fontSize: "16px",
  fontFamily: "'Arial', sans-serif",
  color: "#374151",
  lineHeight: "24px",
};

const button = {
  backgroundColor: "#09090b",
  borderRadius: "6px",
  color: "#ffffff",
  fontFamily: "'Arial', sans-serif",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  padding: "12px",
  margin: "20px auto",
};

const anchor = {
  color: "#1d4ed8",
  textDecoration: "underline",
};

const logo = {
  display: "block",
  margin: "0 auto 20px",
};

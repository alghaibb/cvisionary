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

interface CVisionaryResetPasswordEmailProps {
  firstName?: string;
  resetPasswordLink?: string;
}

export const ResetPasswordEmail = ({
  firstName,
  resetPasswordLink,
}: CVisionaryResetPasswordEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Html>
      <Head />
      <Preview>Reset Your CVisionary Password</Preview>
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
            <Text style={text}>Hello {firstName},</Text>
            <Text style={text}>
              We received a request to reset the password for your CVisionary
              account. If this was you, please click the button below to set a
              new password:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset Password
            </Button>
            <Text style={text}>
              If you didn&apos;t request a password reset, you can safely ignore
              this email. Rest assured, your account is secure.
            </Text>
            <Text style={text}>
              For tips on keeping your account safe, visit our{" "}
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

export default ResetPasswordEmail;

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

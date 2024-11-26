import {
  Body,
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

interface CVisionaryVerifyAccountEmailProps {
  userFirstname: string;
  otp: string; 
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000"; 

export const VerifyAccountEmail = ({
  userFirstname,
  otp,
}: CVisionaryVerifyAccountEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify Your CVisionary Account</Preview>
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
              Welcome to CVisionary! To complete your registration and activate
              your account, please verify your email using the OTP below:
            </Text>
            <Text
              style={{
                ...text,
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {otp}
            </Text>
            <Text style={text}>
              If you did not sign up for a CVisionary account, you can safely
              ignore this email.
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

export default VerifyAccountEmail;

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

const anchor = {
  color: "#1d4ed8",
  textDecoration: "underline",
};

const logo = {
  display: "block",
  margin: "0 auto 20px",
};

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

interface ResendOTPEmailProps {
  userFirstname: string;
  otp: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const ResendOTPEmail = ({ userFirstname, otp }: ResendOTPEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Resend OTP from CVisionary</Preview>
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
              Here&apos;s your new OTP for verifying your CVisionary account:
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
              Please use this OTP within the next 15 minutes. If you did not
              request this, you can safely ignore it.
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

export default ResendOTPEmail;

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

import LoginPage from "./LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function page() {
  return <LoginPage />;
}

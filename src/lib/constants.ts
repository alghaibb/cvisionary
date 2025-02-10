import aiIcon from "@/assets/brain-cog.svg";
import customTheme from "@/assets/custom-theme.svg";
import pdfIcon from "@/assets/file-text.svg";
import mobileIcon from "@/assets/monitor-smartphone.svg";
import preview from "@/assets/preview.svg";
import { FaDownload, FaFileAlt, FaMagic, FaUserPlus } from "react-icons/fa";

export const NO_HEADER_FOOTER_ROUTES = [
  "/create-account",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/magic-link",
  "/magic-link/verify",
  "/create-resume"
];

export const DESKTOP_NAVIGATION_LINKS = [
  { href: "/resumes", label: "My Resumes" },
];

export const MOBILE_NAVIGATION_LINKS = [
  { href: "/resumes", label: "My Resumes" },
  { href: "/account", label: "Manage Account" },
  { href: "/billing", label: "Billing" },
];

export const FOOTER_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/help", label: "Help / FAQ" },
];

export const FEATURES = [
  {
    title: "AI-Generated Resume Sections",
    description: "Let AI craft your professional summary and fill out your work experience, including job titles, dates, and descriptions, with minimal input. You can even chat with the AI in plain, casual English.",
    icon: aiIcon,
    isFirst: true,
    isPremium: true,
  },
  {
    title: "Instant PDF Downloads",
    description: "Download your resume in seconds with a single click.",
    icon: pdfIcon,
  },
  {
    title: "Live Preview",
    description: "See your resume update in real-time as you make changes.",
    icon: preview,
  },
  {
    title: "Customizable Design",
    description: "Choose the theme for your resume, adjust how rounded your images are, your skills, and separators to make your resume truly yours.",
    icon: customTheme,
    isPremium: true,
  },
  {
    title: "Mobile Friendly",
    description: "Create resumes anytime, anywhere on any device.",
    icon: mobileIcon,
  },
];

// Pricing section
export const FREE_TIER_FEATURES = [
  {
    title: "Instant PDF Downloads",
    description: "Download your resume in seconds with a single click.",
    icon: pdfIcon,
  },
  {
    title: "Live Preview",
    description: "See your resume update in real-time as you make changes.",
    icon: preview,
  },
  {
    title: "Mobile Friendly",
    description: "Create resumes anytime, anywhere on any device.",
    icon: mobileIcon,
  },
];

export const PREMIUM_TIER_FEATURES = [
  {
    title: "Customizable Design",
    description:
      "Choose the theme for your resume, adjust how rounded your images are, your skills, and separators to make your resume truly yours.",
    icon: customTheme,
    isPremium: true,
  },
];

export const PREMIUM_PLUS_FEATURES = [
  {
    title: "AI-Generated Resume Sections",
    description:
      "Let AI craft your professional summary and fill out your work experience, including job titles, dates, and descriptions, with minimal input. You can even chat with the AI in plain, casual English.",
    icon: aiIcon,
    isPremium: true,
  },
];

export const HOW_IT_WORKS = [
  {
    title: "Create an Account",
    description:
      "Sign up for a free account to get started. No credit card required.",
    icon: FaUserPlus,
  },
  {
    title: "AI Generates Resume Content",
    description:
      "Let AI suggest work experience descriptions, and summaries",
    icon: FaMagic,
  },
  {
    title: "Create Your Resume",
    description:
      "Fill out your resume with our easy-to-use resume builder.",
    icon: FaFileAlt,
  },
  {
    title: "Download Your Resume",
    description: "Download your resume in PDF format and start applying.",
    icon: FaDownload,
  },
];


"use client";

import { LoadingButton } from "@/components/ui/button";
import { RiFacebookFill, RiGoogleFill } from "@remixicon/react";
import { facebookLogin, googleLogin } from "../actions";
import { useState } from "react";

interface SocialLoginButtonConfig {
  googleText?: string;
  facebookText?: string;
  provider?: "google" | "facebook";
  googleLoadingText?: string;
  facebookLoadingText?: string;
}

export default function SocialLoginButtons({
  buttonConfig,
}: {
  buttonConfig?: SocialLoginButtonConfig;
}) {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "facebook" | null
  >(null);

  const socialLogin = async (provider: "google" | "facebook") => {
    setLoadingProvider(provider);
    try {
      if (provider === "google") {
        await googleLogin();
      } else if (provider === "facebook") {
        await facebookLogin();
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Google Login Button */}
      <LoadingButton
        className="after:flex-1"
        type="button"
        onClick={() => socialLogin("google")}
        loading={loadingProvider === "google"}
        variant="shine"
      >
        <span className="flex-1 pointer-events-none me-2">
          <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        {loadingProvider === "google"
          ? buttonConfig?.googleLoadingText || "Logging in with Google..."
          : buttonConfig?.googleText || "Login with Google"}
      </LoadingButton>

      {/* Facebook Login Button */}
      <LoadingButton
        className="after:flex-1"
        type="button"
        onClick={() => socialLogin("facebook")}
        loading={loadingProvider === "facebook"}
        variant="shine"
      >
        <span className="flex-1 pointer-events-none me-2">
          <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        {loadingProvider === "facebook"
          ? buttonConfig?.facebookLoadingText || "Logging in with Facebook..."
          : buttonConfig?.facebookText || "Login with Facebook"}
      </LoadingButton>
    </div>
  );
}

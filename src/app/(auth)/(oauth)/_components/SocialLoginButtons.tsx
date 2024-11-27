"use client";

import { LoadingButton } from "@/components/ui/button";
import { RiFacebookFill, RiGoogleFill } from "@remixicon/react";
import { facebookLogin, googleLogin } from "../actions";
import { useState } from "react";

interface SocialLoginButtonConfig {
  googleText?: string;
  facebookText?: string;
  provider?: "google" | "facebook";
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
      setLoadingProvider(null); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Google Login Button */}
      <LoadingButton
        className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90"
        type="button"
        onClick={() => socialLogin("google")}
        loading={loadingProvider === "google"} // Show loading only for Google
      >
        <span className="pointer-events-none me-2 flex-1">
          <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        {loadingProvider === "google"
          ? "Logging in with Google..."
          : buttonConfig?.googleText || "Login with Google"}
      </LoadingButton>

      {/* Facebook Login Button */}
      <LoadingButton
        className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90"
        type="button"
        onClick={() => socialLogin("facebook")}
        loading={loadingProvider === "facebook"} // Show loading only for Facebook
      >
        <span className="pointer-events-none me-2 flex-1">
          <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        {loadingProvider === "facebook"
          ? "Logging in with Facebook..."
          : buttonConfig?.facebookText || "Login with Facebook"}
      </LoadingButton>
    </div>
  );
}

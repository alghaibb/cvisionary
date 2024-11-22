"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState, useMemo } from "react";
import { passwordSchema } from "@/schemas/index";

export default function InputWithConfirmPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const validatePassword = (password: string) => {
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      return result.error.errors[0].message;
    }
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordError = validatePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError,
    }));

    const confirmPasswordError = validateConfirmPassword(
      value,
      confirmPassword
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const confirmPasswordError = validateConfirmPassword(password, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError,
    }));
  };

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            className="pe-9"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Password strength indicator */}
      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      <p className="mb-2 text-sm font-medium text-foreground">
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Confirm Password Input */}
      <div className="mt-4 space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          className="pe-9"
          placeholder="Confirm Password"
          type={isVisible ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirm-password-error"
        />
        {errors.confirmPassword && (
          <p id="confirm-password-error" className="text-sm text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordValues, resetPasswordSchema } from "@/schemas";
import { useState, useMemo } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
  };

  const passwordStrength = useMemo(() => {
    const password = form.watch("newPassword");
    const strength = checkStrength(password || "");
    const score = strength.filter((req) => req.met).length;

    return {
      score,
      strength,
      color:
        score === 0
          ? "bg-border"
          : score <= 1
            ? "bg-red-500"
            : score <= 2
              ? "bg-orange-500"
              : score === 3
                ? "bg-amber-500"
                : "bg-emerald-500",
      text:
        score === 0
          ? "Enter a password"
          : score <= 2
            ? "Weak password"
            : score === 3
              ? "Medium password"
              : "Strong password",
    };
  }, [form.watch("newPassword")]);

  async function onSubmit(data: ResetPasswordValues) {
    console.log("Submitted Values:", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:px-4 md:py-6"
      >
        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={isVisible ? "text" : "password"} {...field} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>

              {/* Smooth Progress Bar */}
              <div
                className="relative mt-2 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={passwordStrength.score}
                aria-valuemin={0}
                aria-valuemax={4}
              >
                <div
                  className={`h-full ${passwordStrength.color} transition-all duration-500 ease-out`}
                  style={{
                    width: `${(passwordStrength.score / 4) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-sm">
                {passwordStrength.text}. Must contain:
              </p>
              <ul className="mt-2 space-y-1.5">
                {passwordStrength.strength.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {req.met ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <X size={16} className="text-muted-foreground" />
                    )}
                    <span
                      className={`text-xs ${
                        req.met ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                    >
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password */}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col justify-between space-y-4 pt-4 md:flex-row md:space-y-0">
          <LoadingButton
            type="submit"
            className="w-full md:w-auto"
            variant="gooeyLeft"
          >
            Reset Password
          </LoadingButton>
          <Button type="button" asChild variant="linkHover2">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <Separator />
      </form>
    </Form>
  );
}

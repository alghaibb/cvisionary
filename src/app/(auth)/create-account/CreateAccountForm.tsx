"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { CreateAccountValues, createAccountSchema } from "@/schemas";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createAccount } from "./actions";
import { useTransition } from "react";

export default function CreateAccountForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const password = form.watch("password");
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
  }, [form.watch("password")]);

  async function onSubmit(data: z.infer<typeof createAccountSchema>) {
    setError(null);
    startTransition(() => {
      createAccount(data)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          }
        })
        .catch((error) => {
          console.error("Failed to create account:", error);
          setError("Failed to create account. Please try again.");
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:px-4 md:py-6"
      >
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
          <div className="md:col-span-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name{" "}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
                className="relative w-full h-1 mt-2 overflow-hidden rounded-full bg-border"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between w-full pt-4 space-y-4 md:flex-row md:space-y-0">
          <LoadingButton
            type="submit"
            className="w-full md:w-auto"
            variant="gooeyLeft"
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? "Creating Account" : "Create Account"}
          </LoadingButton>

          <Button type="button" asChild variant="linkHover2" className="w">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        <Separator />
      </form>
    </Form>
  );
}

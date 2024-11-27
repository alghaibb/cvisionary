"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, OTPValues } from "@/schemas";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import React, { useState, useTransition } from "react";
import { verifyAccount } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ResendOTPModal from "@/app/(auth)/(resend-otp)/_components/ResendOTPModal";

export default function VerifyEmailForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof otpSchema>) {
    setError(null);
    startTransition(async () => {
      const result = await verifyAccount(data);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:px-4 md:py-6"
      >
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {/* OTP Input */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} disabled={isPending}>
                  <InputOTPGroup className="mx-auto mt-4">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? "Verifying Account" : "Verify Your Account"}
          </LoadingButton>
          <Button type="button" asChild variant="linkHover2">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <Separator />

        <div className="mt-4 flex flex-col items-center justify-center text-sm md:mt-0 md:flex-row">
          <p className="text-muted-foreground">Need to send another OTP?</p>
          <div className="-ml-3">
            <ResendOTPModal />
          </div>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button, LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResendOTPSchema, ResendOTPValues } from "@/schemas";
import React, { useState, useTransition } from "react";
import { resendOTP } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ResponsiveModal from "@/components/ResponsiveModal";

export default function ResendOTPModal() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ResendOTPValues>({
    resolver: zodResolver(ResendOTPSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ResendOTPSchema>) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await resendOTP(data);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
      form.reset();
    });
  }

  return (
    <ResponsiveModal
      title="Resend OTP"
      description="Enter your email to receive a new OTP for account verification."
      triggerText="Resend OTP"
    >
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
          {success && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="gooeyLeft"
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? "Resending..." : "Resend OTP"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
}

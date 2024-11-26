"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { forgotPasswordSchema, ForgotPasswordValues } from "@/schemas";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState, useTransition } from "react";
import { forgotPassword } from "./actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await forgotPassword(data);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
      form.reset();
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
        {success && (
          <Alert>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
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
        <div className="flex w-full flex-col justify-between space-y-4 pt-4 md:flex-row md:space-y-0">
          <LoadingButton
            type="submit"
            className="w-full md:w-auto"
            variant="gooeyLeft"
            loading={isPending}
            disabled={isPending}
          >
            Send Reset Link
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

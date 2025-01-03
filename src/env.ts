import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    FACEBOOK_CLIENT_ID: z.string().min(1),
    FACEBOOK_CLIENT_SECRET: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASS: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_FROM: z.string().min(1),

  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});

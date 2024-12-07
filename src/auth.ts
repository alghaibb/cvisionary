import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { User } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";
import { getUserFromDb } from "./utils/db/user";
import prisma from "./lib/prisma";
import { env } from "./env";
import EmailProvider from "next-auth/providers/resend";

const adapter = PrismaAdapter(prisma) as Adapter;

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASS,
        },
      },
      from: env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Fetch the user by email
        const res = await getUserFromDb(email as string, password as string);
        if (res) {
          return res as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) {
        return true;
      }

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      // If the user doesn't exist, create a new one
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email ?? "",
            firstName: profile?.given_name ?? "",
            lastName: profile?.family_name ?? "",
            emailVerified: new Date(),
          },
        });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      if (account?.provider === "email") {
        token.sub = account.userId;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const userId = params.token.sub;
        if (!adapter.createSession) {
          throw new Error("createSession method is not defined on the adapter");
        }
        const createdSession = await adapter.createSession({
          sessionToken: sessionToken,
          userId: userId,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  secret: env.AUTH_SECRET,
  experimental: { enableWebAuthn: true },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

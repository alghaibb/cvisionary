import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { encode as defaultEncode } from "next-auth/jwt";
import Crendentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";
import prisma from "./lib/prisma";
import { getUserFromDb } from "./utils/db/user";

const adapter = PrismaAdapter(prisma) as Adapter;

const authConfig: NextAuthConfig = {
  adapter,
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Crendentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const res = await getUserFromDb(email as string, password as string);
        if (res) {
          return res as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true
      }
      return token
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid()

        if (!params.token.sub) {
          throw new Error("No user ID found in token")
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error("Failed to create session")
        }

        return sessionToken
      }
      return defaultEncode(params)
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  secret: process.env.AUTH_SECRET!,
  experimental: { enableWebAuthn: true },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
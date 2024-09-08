import { User, Account, Profile } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(params: {
      user: User ;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      console.log("hi signin");
      const { user, account } = params;

      if (!user.email) {
        return false;
      }

      if (account) {
        await db.merchant.upsert({
          select: {
            id: true,
          },
          where: {
            email: user.email,
          },
          create: {
            email: user.email,
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
          },
          update: {
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
          },
        });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};

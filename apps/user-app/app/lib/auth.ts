import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
// import { Account } from "next-auth";

// Define a Zod schema to validate incoming credentials
const credentialsSchema = z.object({
  phone: z.string().min(10),
  password: z.string(),
});

// Updated NextAuth configuration with a redirect callback for smooth post-signup login
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined
      ) {
        // Ensure credentials are provided
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        // Validate credentials using Zod
        const result = credentialsSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid credentials");
        }

        // Look up the user using the phone number
        const existingUser = await db.user.findUnique({
          where: { number: credentials.phone },
        });

        if (!existingUser) {
          throw new Error("User not found. Please sign up first.");
        }

        // Compare provided password with stored hash
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        // Return an object that NextAuth can use to build a session.
        // Since NextAuth requires an email field, we use the phone number as a stand-in.
        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.number,
        };
      },
    }),
  ],
  // Use a secret for signing JWT tokens
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // signIn callback: additional check after authentication
    signIn({ user }: { user: User;}) {
      if (!user.email) {
        return false; // Block sign-in if email (our proxy for phone) is missing
      }
      return true;
    },
    // session callback: ensure that the session object includes the user's ID
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    // redirect callback: ensure smooth redirection after sign-in
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // If a callbackUrl was provided (by signIn on the client), use it,
      // otherwise default to the dashboard page.
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
  pages: {
    // Custom sign-in page route (if needed)
    signIn: "/signin",
  },
};

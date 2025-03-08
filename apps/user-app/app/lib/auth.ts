import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { z } from "zod";
import { JWT } from "next-auth/jwt"
import { Session, User } from "next-auth";
import { Account } from "next-auth";

interface credentials {
    phone : string,
    password : string 
}

const credentialsSchema = z.object({
    phone: z.string().min(10),
    password: z.string(),
})

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-auth
          async authorize(credentials: Record<"phone" | "password", string> | undefined) {
            if (!credentials) {
              throw new Error("No credentials provided");
            }
          
            // Validate user input using Zod
            const result = credentialsSchema.safeParse(credentials);
            if (!result.success) {
              throw new Error("Invalid credentials");
            }
          
            // Find existing user
            const existingUser = await db.user.findUnique({
              where: { number: credentials.phone },
            });
          
            if (!existingUser) {
              throw new Error("User not found. Please sign up first.");
            }
          
            // Compare passwords
            const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
            if (!passwordMatch) {
              throw new Error("Incorrect password");
            }
          
            // Return authenticated user
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number, // Use number as email since NextAuth requires an email field
            };
          }
          ,
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        signIn({ user, account }: {
          user: User,
          account: Account | null
        }) {
          if (!user.email) {
            return false; // Prevent sign-in if email is undefined
          }
          return true; // Allow sign-in
        },
        async session({ token, session }: {
          token: JWT,
          session: Session
        }) {
          if (token?.sub) {
            session.user.id = token.sub; // Make sure `id` is added to session.user
          }
          return session;
        }
      } ,
      pages: {
        signIn: '/signin',
      },
  }
  
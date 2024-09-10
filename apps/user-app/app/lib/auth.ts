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
          async authorize(credentials : Record<"phone" | "password", string> | undefined) {

            // Do zod validation, OTP validation here
            if(!credentials){
                throw new Error('no Credentials provided ')
            }


            // check zod validation
            const result = credentialsSchema.safeParse(credentials);
            if (!result.success) {
               throw new Error('Invalid Credentials')
            }

            // hash the password 
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            // check for existing user 
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

               // match the pasword with the existing user 
            if (existingUser) {

                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);

                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {

                //create the user 
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            

                //return the user details
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }

                // error catching
            } catch(e) {
                console.error(e);
                throw new Error('new user creation failed ')
            }

            return null
          },
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
  
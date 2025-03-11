import { NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { z } from "zod";

// Define a schema for validating user input
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
});

export async function POST(req: Request) {
  try {
    console.log('signup endpoint')
    // Read the incoming form data
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({ error: "Invalid FormData" }, { status: 400 });
    }

    // Convert formData entries to an object
    const body = Object.fromEntries(formData.entries());
    console.log(body);

    // Validate the input using Zod
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { name, email, phone, password } = parsed.data;

    // // Check if the user already exists (using phone as unique identifier)
    const existingUser = await db.user.findUnique({
      where: { number: phone },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // // Create the new user in the database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        number: phone,
        password: hashedPassword,
      },
    });

    // Return a success response without setting any cookie.
    // The client will use NextAuth's signIn (Credentials) afterwards.
    return NextResponse.json(
      { message: "User registered successfully" , user : newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({ error: "Invalid FormData" }, { status: 400 });
    }

    const body = Object.fromEntries(formData.entries());
    console.log(body);

    // Validate input using Zod
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, phone, password } = parsed.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { number: phone },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await db.user.create({
      data: {
        name,
        email,
        number: phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

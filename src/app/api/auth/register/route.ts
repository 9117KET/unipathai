import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, getUserByEmail } from "@/lib/auth";
import { db } from "@/lib/db";

// Define schema for validation
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z
    .enum(["STUDENT", "COUNSELOR", "PARENT", "UNIVERSITY", "ADMIN"])
    .optional(),
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate body against schema
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, role = "STUDENT" } = result.data;

    // Check if user already exists
    const existingUser = await getUserByEmail(db, email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Create new user
    const user = await createUser(db, {
      name,
      email,
      password,
      role,
    });

    // Return success response without sensitive data
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { UserRole } from "@/types/user";

// Define schema for validation
const professionalRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  role: z.enum([UserRole.COUNSELOR, UserRole.UNIVERSITY], {
    required_error: "Please select your professional role",
  }),
  organization: z.string().min(2, { message: "Organization name is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate body against schema
    const result = professionalRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, role, organization, position, message } = result.data;

    // Check if an account with this email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // TODO: Fix Prisma model typing issues
    // The 'professionalRequest' model needs to be defined in the Prisma schema
    // and then run 'npx prisma generate' to update the TypeScript types

    // Check if a request with this email already exists
    const existingRequest = await (db as any).professionalRequest.findUnique({
      where: { email },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "A request with this email is already being processed" },
        { status: 409 }
      );
    }

    // Create a new professional request
    await (db as any).professionalRequest.create({
      data: {
        name,
        email,
        role,
        organization,
        position,
        message: message || "",
        status: "PENDING", // Default status
      },
    });

    // TODO: Send notification to admins about the new request
    // sendAdminNotification({
    //   type: 'NEW_PROFESSIONAL_REQUEST',
    //   email,
    //   role,
    //   organization,
    // });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Professional registration request submitted successfully",
    });
  } catch (error) {
    console.error("Professional registration request error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

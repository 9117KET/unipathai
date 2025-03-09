import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "FCM token is required" },
        { status: 400 }
      );
    }

    // Store the token in the database using Prisma
    // We'll add a new model for FCM tokens
    await db.userNotificationToken.upsert({
      where: {
        token,
      },
      update: {
        userId: session.user.id,
        updatedAt: new Date(),
      },
      create: {
        token,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Token stored successfully",
    });
  } catch (error) {
    console.error("Error storing FCM token:", error);
    return NextResponse.json(
      { error: "Failed to store FCM token" },
      { status: 500 }
    );
  }
}

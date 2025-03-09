import { NextRequest, NextResponse } from "next/server";
import { adminMessaging } from "@/lib/firebase/firebase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { UserRole } from "@/types/user";

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and authorized
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only allow counselors, admins, and university staff to send notifications
    const authorizedRoles = [
      UserRole.COUNSELOR,
      UserRole.ADMIN,
      UserRole.UNIVERSITY,
    ];
    if (!authorizedRoles.includes(session.user.role as UserRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse the request body
    const { title, body, tokens, data } = await request.json();

    if (
      !title ||
      !body ||
      !tokens ||
      !Array.isArray(tokens) ||
      tokens.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Create the message
    const message = {
      notification: {
        title,
        body,
      },
      data: data || {},
      tokens,
      // Set time-to-live to 1 day
      android: {
        ttl: 86400 * 1000, // 1 day in milliseconds
      },
      apns: {
        headers: {
          "apns-expiration": Math.floor(Date.now() / 1000) + 86400, // 1 day in seconds
        },
      },
    };

    // Send the message
    const response = await adminMessaging.sendMulticast(message);

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

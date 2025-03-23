import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
// Import will be needed when the model is implemented
// import { db } from "@/lib/db";
import { UserRole } from "@/types/user";

// GET handler to fetch all professional requests
export async function GET() {
  try {
    // Verify session and admin role
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be signed in to access this resource" },
        { status: 401 }
      );
    }

    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "You do not have permission to access this resource" },
        { status: 403 }
      );
    }

    // TODO: Implement professionalRequest model in Prisma schema
    // For now, return an empty array to avoid the linter error
    // const requests = await db.professionalRequest.findMany({
    //   orderBy: { createdAt: "desc" },
    // });

    // Placeholder response until the model is implemented
    const requests: any[] = [];

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching professional requests:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching professional requests" },
      { status: 500 }
    );
  }
}

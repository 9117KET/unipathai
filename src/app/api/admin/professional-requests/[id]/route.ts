import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { UserRole } from "@/types/user";
import { z } from "zod";
import crypto from "crypto";

const updateRequestSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

// Define interfaces for the Prisma models that are not yet implemented
// TODO: Remove these interfaces once the proper Prisma models are defined
interface ProfessionalRequest {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: string;
  organization: string;
  position: string;
}

interface Invitation {
  token: string;
  email: string;
  name: string;
  role: UserRole;
  expiresAt: Date;
  metadata: {
    organization: string;
    position: string;
  };
}

// Type-safe access to the db with the temporary interfaces
const professionalRequestModel = db as unknown as {
  professionalRequest: {
    findUnique: (args: {
      where: { id: string };
    }) => Promise<ProfessionalRequest | null>;
    update: (args: {
      where: { id: string };
      data: { status: string };
    }) => Promise<ProfessionalRequest>;
  };
  invitation: {
    create: (args: { data: Omit<Invitation, "id"> }) => Promise<Invitation>;
  };
};

// Handler to update a professional request status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    // Parse and validate the request body
    const body = await req.json();
    const result = updateRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { status } = result.data;

    // Find the request
    // TODO: Fix Prisma model typing issues by properly defining 'professionalRequest' and 'invitation'
    // models in the Prisma schema and then running 'npx prisma generate'
    const request =
      await professionalRequestModel.professionalRequest.findUnique({
        where: { id },
      });

    if (!request) {
      return NextResponse.json(
        { error: "Professional request not found" },
        { status: 404 }
      );
    }

    // Update the request status
    const updatedRequest =
      await professionalRequestModel.professionalRequest.update({
        where: { id },
        data: { status },
      });

    // If approved, create a user account with an invitation token
    if (status === "APPROVED" && request.status !== "APPROVED") {
      // Generate a secure random token
      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Token expires in 7 days

      // Create an invitation
      await professionalRequestModel.invitation.create({
        data: {
          token,
          email: request.email,
          name: request.name,
          role: request.role,
          expiresAt,
          metadata: {
            organization: request.organization,
            position: request.position,
          },
        },
      });

      // TODO: Implement email notification service
      // TODO: Send invitation email with the token
      /**
       * Example implementation once email service is ready:
       * await emailService.sendInvitationEmail({
       *   email: request.email,
       *   name: request.name,
       *   token,
       *   role: request.role,
       * });
       */
    }

    return NextResponse.json({ success: true, request: updatedRequest });
  } catch (error) {
    console.error("Error updating professional request:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the professional request" },
      { status: 500 }
    );
  }
}

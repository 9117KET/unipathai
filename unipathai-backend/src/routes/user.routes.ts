import express from "express";
import { Request, Response } from "express";
import { prisma } from "../index";
import { authenticate, authorize } from "../middlewares/auth.middleware";

// TODO: Fix Express type mismatch issue. We're using Express 4.x with @types/express 5.0.0,
// which causes type incompatibility errors in the route handlers.
// The proper fix is to:
// 1. Downgrade @types/express to match Express 4.x version (recommended)
//    - Run: npm uninstall @types/express && npm install @types/express@4.17.17 --save-dev
// 2. OR upgrade Express to match the @types/express 5.0.0
//    - Run: npm uninstall express && npm install express@5.0.0-beta.1

const router = express.Router();

// Get all users (admin only)
// @ts-expect-error - Express route handler return type issue
router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          subscriptionTier: true,
          createdAt: true,
          profileCompleted: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  }
);

// Get user profile
// @ts-expect-error - Express route handler return type issue
router.get("/profile", authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Error retrieving profile" });
  }
});

// Create or update user profile
// @ts-expect-error - Express route handler return type issue
router.post("/profile", authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { bio, location, educationLevel, interests, testScores } = req.body;

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
    });

    let profile;

    if (existingProfile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId: req.user.id },
        data: {
          bio,
          location,
          educationLevel,
          interests,
          testScores,
        },
      });

      // Update user's profileCompleted status
      await prisma.user.update({
        where: { id: req.user.id },
        data: { profileCompleted: true },
      });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          userId: req.user.id,
          bio,
          location,
          educationLevel,
          interests,
          testScores,
        },
      });

      // Update user's profileCompleted status
      await prisma.user.update({
        where: { id: req.user.id },
        data: { profileCompleted: true },
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Get mentors (for students)
// @ts-expect-error - Express route handler return type issue
router.get(
  "/mentors",
  authenticate,
  authorize(["STUDENT"]),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Get all active mentor relationships for this student
      const mentorRelations = await prisma.mentorRelation.findMany({
        where: {
          studentId: req.user.id,
          status: "Active",
        },
        include: {
          mentor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profile: true,
            },
          },
        },
      });

      // TODO: Add proper type for mentorRelations
      const mentors = mentorRelations.map((relation: any) => relation.mentor);

      res.status(200).json(mentors);
    } catch (error) {
      console.error("Get mentors error:", error);
      res.status(500).json({ message: "Error retrieving mentors" });
    }
  }
);

// Get students (for counselors)
// @ts-expect-error - Express route handler return type issue
router.get(
  "/students",
  authenticate,
  authorize(["COUNSELOR"]),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Get all active mentor relationships for this counselor
      const mentorRelations = await prisma.mentorRelation.findMany({
        where: {
          mentorId: req.user.id,
          status: "Active",
        },
        include: {
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profile: true,
            },
          },
        },
      });

      // TODO: Add proper type for mentorRelations
      const students = mentorRelations.map((relation: any) => relation.student);

      res.status(200).json(students);
    } catch (error) {
      console.error("Get students error:", error);
      res.status(500).json({ message: "Error retrieving students" });
    }
  }
);

export default router;

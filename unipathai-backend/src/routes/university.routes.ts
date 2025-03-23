import express from "express";
import { Request, Response } from "express";
import { prisma } from "../index";
import { authenticate } from "../middlewares/auth.middleware";

// TODO: Fix Express type mismatch issue. We're using Express 4.x with @types/express 5.0.0,
// which causes type incompatibility errors in the route handlers.
// The proper fix is to:
// 1. Downgrade @types/express to match Express 4.x version (recommended)
//    - Run: npm uninstall @types/express && npm install @types/express@4.17.17 --save-dev
// 2. OR upgrade Express to match the @types/express 5.0.0
//    - Run: npm uninstall express && npm install express@5.0.0-beta.1

const router = express.Router();

// Define types for our data structures
interface University {
  id: string;
  name: string;
  location: string;
  programs?: Program[];
  admissionRequirements?: AdmissionRequirement;
  // Add other university properties as needed
}

interface Program {
  id: string;
  name: string;
  degreeType: string;
  universityId: string;
  // Add other program properties as needed
}

interface Recommendation {
  universityId: string;
  universityName: string;
  matchScore: number;
  // Add other recommendation properties as needed
}

interface StudentProfile {
  id: string;
  userId: string;
  gpa: number;
  preferredLocations?: string[];
  intendedMajor?: string;
  // Add other student profile properties as needed
}

interface AdmissionRequirement {
  universityId: string;
  gpaMinimum: number;
  satMinimum?: number;
  actMinimum?: number;
  requiredEssays?: number;
  applicationDeadline?: string;
  // Add other admission requirements as needed
}

// Search universities - placed before /:id to avoid routing conflicts
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { query, location, major } = req.query;
    console.log(
      `Searching with query: ${query}, location: ${location}, major: ${major}`
    );

    // Implement searching universities using prisma
    const universities = await prisma.university.findMany({
      where: {
        OR: [
          { name: { contains: query as string, mode: "insensitive" } },
          { location: { contains: location as string, mode: "insensitive" } },
        ],
      },
      include: {
        programs: major
          ? {
              where: {
                name: { contains: major as string, mode: "insensitive" },
              },
            }
          : true,
      },
    });

    res.status(200).json(universities);
  } catch (error) {
    console.error("Search universities error:", error);
    res.status(500).json({ message: "Error searching universities" });
  }
});

// Get recommendations based on student profile (authenticated)
router.get(
  "/recommendations",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Implement getting university recommendations using prisma
      // Fetch user profile data
      const userProfile = await prisma.studentProfile.findUnique({
        where: { userId: req.user.id },
      });

      if (!userProfile) {
        return res.status(404).json({ message: "Student profile not found" });
      }

      // Get matching universities based on profile data
      const universities = await prisma.university.findMany({
        include: {
          admissionRequirements: true,
        },
      });

      // Calculate match scores (simplified implementation)
      const recommendations: Recommendation[] = universities
        .map((uni: University) => ({
          universityId: uni.id,
          universityName: uni.name,
          matchScore: calculateMatchScore(userProfile, uni),
        }))
        .sort(
          (a: Recommendation, b: Recommendation) => b.matchScore - a.matchScore
        );

      res.status(200).json(recommendations);
    } catch (error) {
      console.error("Get university recommendations error:", error);
      res
        .status(500)
        .json({ message: "Error retrieving university recommendations" });
    }
  }
);

// Helper function to calculate match score
function calculateMatchScore(
  studentProfile: StudentProfile,
  university: University
): number {
  // This is a simplified implementation
  // In a real application, you would have a more sophisticated algorithm
  let score = 50; // Base score

  // Add score based on GPA match
  if (
    university.admissionRequirements?.gpaMinimum &&
    studentProfile.gpa >= university.admissionRequirements.gpaMinimum
  ) {
    score += 25;
  }

  // Add score based on location preference match
  if (studentProfile.preferredLocations?.includes(university.location)) {
    score += 15;
  }

  // Add score based on program availability
  if (
    studentProfile.intendedMajor &&
    university.programs?.some((p: Program) =>
      p.name.includes(studentProfile.intendedMajor!)
    )
  ) {
    score += 10;
  }

  return Math.min(100, score); // Cap score at 100
}

// Get all universities
router.get("/", async (req: Request, res: Response) => {
  try {
    const universities = await prisma.university.findMany();
    res.status(200).json(universities);
  } catch (error) {
    console.error("Get universities error:", error);
    res.status(500).json({ message: "Error retrieving universities" });
  }
});

// Get a specific university
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        programs: true,
        admissionRequirements: true,
      },
    });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    res.status(200).json(university);
  } catch (error) {
    console.error("Get university error:", error);
    res.status(500).json({ message: "Error retrieving university" });
  }
});

// Get programs for a university
router.get("/:id/programs", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const programs = await prisma.program.findMany({
      where: { universityId: id },
    });

    res.status(200).json(programs);
  } catch (error) {
    console.error("Get university programs error:", error);
    res.status(500).json({ message: "Error retrieving university programs" });
  }
});

// Get admission requirements for a university
router.get("/:id/requirements", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const requirements = await prisma.admissionRequirement.findUnique({
      where: { universityId: id },
    });

    if (!requirements) {
      return res
        .status(404)
        .json({ message: "Admission requirements not found" });
    }

    res.status(200).json(requirements);
  } catch (error) {
    console.error("Get university requirements error:", error);
    res.status(500).json({
      message: "Error retrieving university admission requirements",
    });
  }
});

export default router;

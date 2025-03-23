"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// TODO: Fix Express type mismatch issue. We're using Express 4.x with @types/express 5.0.0,
// which causes type incompatibility errors in the route handlers.
// The proper fix is to:
// 1. Downgrade @types/express to match Express 4.x version (recommended)
//    - Run: npm uninstall @types/express && npm install @types/express@4.17.17 --save-dev
// 2. OR upgrade Express to match the @types/express 5.0.0
//    - Run: npm uninstall express && npm install express@5.0.0-beta.1
const router = express_1.default.Router();
// Get all users (admin only)
router.get("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN"]), async (req, res) => {
    try {
        const users = await index_1.prisma.user.findMany({
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
    }
    catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Error retrieving users" });
    }
});
// Get user profile
router.get("/profile", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const profile = await index_1.prisma.profile.findUnique({
            where: { userId: req.user.id },
        });
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        res.status(200).json(profile);
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Error retrieving profile" });
    }
});
// Create or update user profile
router.post("/profile", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const { bio, location, educationLevel, interests, testScores } = req.body;
        // Check if profile exists
        const existingProfile = await index_1.prisma.profile.findUnique({
            where: { userId: req.user.id },
        });
        let profile;
        if (existingProfile) {
            // Update existing profile
            profile = await index_1.prisma.profile.update({
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
            await index_1.prisma.user.update({
                where: { id: req.user.id },
                data: { profileCompleted: true },
            });
        }
        else {
            // Create new profile
            profile = await index_1.prisma.profile.create({
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
            await index_1.prisma.user.update({
                where: { id: req.user.id },
                data: { profileCompleted: true },
            });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            profile,
        });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});
// Get mentors (for students)
router.get("/mentors", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["STUDENT"]), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        // Get all active mentor relationships for this student
        const mentorRelations = await index_1.prisma.mentorRelation.findMany({
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
        const mentors = mentorRelations.map((relation) => relation.mentor);
        res.status(200).json(mentors);
    }
    catch (error) {
        console.error("Get mentors error:", error);
        res.status(500).json({ message: "Error retrieving mentors" });
    }
});
// Get students (for counselors)
router.get("/students", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["COUNSELOR"]), async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        // Get all active mentor relationships for this counselor
        const mentorRelations = await index_1.prisma.mentorRelation.findMany({
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
        const students = mentorRelations.map((relation) => relation.student);
        res.status(200).json(students);
    }
    catch (error) {
        console.error("Get students error:", error);
        res.status(500).json({ message: "Error retrieving students" });
    }
});
exports.default = router;

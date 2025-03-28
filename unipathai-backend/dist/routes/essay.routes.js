"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ai_service_1 = require("../services/ai.service");
// Import types from our definition file
require("../types/express");
/*
 * Note: Previous TypeScript errors related to Express route handlers have been addressed
 * by the custom type declaration file at ../types/express.d.ts which properly extends
 * the Express Request interface to include the user property.
 *
 * TODO: Implement user linking for essays when user functionality is complete:
 * - Update essay routes to filter by and link to the requesting user
 * - Uncomment the user permission checks in each route
 */
const router = express_1.default.Router();
// Get all essays for a user
router.get("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const essays = await index_1.prisma.essay.findMany({
            where: {
            // TODO: Implement proper user filtering
            // userId: req.user.id
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.status(200).json(essays);
    }
    catch (error) {
        console.error("Get essays error:", error);
        res.status(500).json({ message: "Error retrieving essays" });
    }
});
// Get a specific essay
router.get("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const essay = await index_1.prisma.essay.findUnique({
            where: { id },
        });
        if (!essay) {
            return res.status(404).json({ message: "Essay not found" });
        }
        // TODO: Check if essay belongs to the user
        // if (essay.userId !== req.user.id) {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }
        res.status(200).json(essay);
    }
    catch (error) {
        console.error("Get essay error:", error);
        res.status(500).json({ message: "Error retrieving essay" });
    }
});
// Create a new essay
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { title, content, aiAssisted } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Title and content are required" });
        }
        const essay = await index_1.prisma.essay.create({
            data: {
                title,
                content,
                aiAssisted: aiAssisted || false,
                // TODO: Implement user linking
                // userId: req.user.id
            },
        });
        res.status(201).json({
            message: "Essay created successfully",
            essay,
        });
    }
    catch (error) {
        console.error("Create essay error:", error);
        res.status(500).json({ message: "Error creating essay" });
    }
});
// Update an essay
router.put("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const { title, content, version } = req.body;
        // Check if essay exists
        const existingEssay = await index_1.prisma.essay.findUnique({
            where: { id },
        });
        if (!existingEssay) {
            return res.status(404).json({ message: "Essay not found" });
        }
        // TODO: Check if essay belongs to the user
        // if (existingEssay.userId !== req.user.id) {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }
        const updatedEssay = await index_1.prisma.essay.update({
            where: { id },
            data: {
                title,
                content,
                version: version || existingEssay.version + 1,
            },
        });
        res.status(200).json({
            message: "Essay updated successfully",
            essay: updatedEssay,
        });
    }
    catch (error) {
        console.error("Update essay error:", error);
        res.status(500).json({ message: "Error updating essay" });
    }
});
// Delete an essay
router.delete("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        // Check if essay exists
        const existingEssay = await index_1.prisma.essay.findUnique({
            where: { id },
        });
        if (!existingEssay) {
            return res.status(404).json({ message: "Essay not found" });
        }
        // TODO: Check if essay belongs to the user
        // if (existingEssay.userId !== req.user.id) {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }
        await index_1.prisma.essay.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Essay deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete essay error:", error);
        res.status(500).json({ message: "Error deleting essay" });
    }
});
// Get AI feedback for an essay
router.post("/:id/feedback", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Essay prompt is required" });
        }
        // Get the essay
        const essay = await index_1.prisma.essay.findUnique({
            where: { id },
        });
        if (!essay) {
            return res.status(404).json({ message: "Essay not found" });
        }
        // TODO: Check if essay belongs to the user
        // if (essay.userId !== req.user.id) {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }
        // Generate feedback
        const feedback = await (0, ai_service_1.generateEssayFeedback)(essay.content, prompt);
        // Update the essay with feedback
        const updatedEssay = await index_1.prisma.essay.update({
            where: { id },
            data: {
                feedback,
                aiAssisted: true,
            },
        });
        res.status(200).json({
            message: "Feedback generated successfully",
            essay: updatedEssay,
        });
    }
    catch (error) {
        console.error("Generate feedback error:", error);
        res.status(500).json({ message: "Error generating feedback" });
    }
});
// Get AI improvement suggestions for an essay (premium feature)
router.post("/:id/improvements", auth_middleware_1.authenticate, auth_middleware_1.requirePremium, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        // Get the essay
        const essay = await index_1.prisma.essay.findUnique({
            where: { id },
        });
        if (!essay) {
            return res.status(404).json({ message: "Essay not found" });
        }
        // TODO: Check if essay belongs to the user
        // if (essay.userId !== req.user.id) {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }
        // Generate improvements
        const improvements = await (0, ai_service_1.generateEssayImprovements)(essay.content);
        res.status(200).json({
            message: "Improvement suggestions generated successfully",
            improvements,
        });
    }
    catch (error) {
        console.error("Generate improvements error:", error);
        res
            .status(500)
            .json({ message: "Error generating improvement suggestions" });
    }
});
// Generate an essay outline (premium feature)
router.post("/outline", auth_middleware_1.authenticate, auth_middleware_1.requirePremium, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { prompt, interests } = req.body;
        if (!prompt || !interests || !Array.isArray(interests)) {
            return res.status(400).json({
                message: "Essay prompt and interests array are required",
            });
        }
        // Generate outline
        const outline = await (0, ai_service_1.generateEssayOutline)(prompt, interests);
        res.status(200).json({
            message: "Essay outline generated successfully",
            outline,
        });
    }
    catch (error) {
        console.error("Generate outline error:", error);
        res.status(500).json({ message: "Error generating essay outline" });
    }
});
exports.default = router;

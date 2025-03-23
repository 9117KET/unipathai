"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Get all applications for the current user
router.get("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const applications = await index_1.prisma.application.findMany({
            where: { userId: req.user.id },
            orderBy: { updatedAt: "desc" },
        });
        res.status(200).json(applications);
    }
    catch (error) {
        console.error("Get applications error:", error);
        res.status(500).json({ message: "Error retrieving applications" });
    }
});
// Get a specific application
router.get("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const application = await index_1.prisma.application.findFirst({
            where: {
                id: id,
                userId: req.user.id,
            },
        });
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json(application);
    }
    catch (error) {
        console.error("Get application error:", error);
        res.status(500).json({ message: "Error retrieving application" });
    }
});
// Create a new application
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const applicationData = {
            userId: req.user.id,
            programId: req.body.programId,
            status: "DRAFT",
            personalInfo: req.body.personalInfo || {},
            educationInfo: req.body.educationInfo || {},
            workExperience: req.body.workExperience || {},
            documents: req.body.documents || {},
        };
        const application = await index_1.prisma.application.create({
            data: applicationData,
        });
        res.status(201).json({
            message: "Application created successfully",
            application,
        });
    }
    catch (error) {
        console.error("Create application error:", error);
        res.status(500).json({ message: "Error creating application" });
    }
});
// Update an application
router.put("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        // Verify the application belongs to the user
        const existingApplication = await index_1.prisma.application.findFirst({
            where: {
                id: id,
                userId: req.user.id,
            },
        });
        if (!existingApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        const applicationData = {
            personalInfo: req.body.personalInfo,
            educationInfo: req.body.educationInfo,
            workExperience: req.body.workExperience,
            documents: req.body.documents,
        };
        const application = await index_1.prisma.application.update({
            where: { id },
            data: applicationData,
        });
        res.status(200).json({
            message: "Application updated successfully",
            application,
        });
    }
    catch (error) {
        console.error("Update application error:", error);
        res.status(500).json({ message: "Error updating application" });
    }
});
// Delete an application
router.delete("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        // Verify the application belongs to the user
        const existingApplication = await index_1.prisma.application.findFirst({
            where: {
                id: id,
                userId: req.user.id,
            },
        });
        if (!existingApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        await index_1.prisma.application.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Application deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete application error:", error);
        res.status(500).json({ message: "Error deleting application" });
    }
});
// Submit an application
router.post("/:id/submit", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        // Verify the application belongs to the user
        const existingApplication = await index_1.prisma.application.findFirst({
            where: {
                id: id,
                userId: req.user.id,
            },
        });
        if (!existingApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        // Update application status to SUBMITTED
        const application = await index_1.prisma.application.update({
            where: { id },
            data: { status: "SUBMITTED" },
        });
        res.status(200).json({
            message: "Application submitted successfully",
            application,
        });
    }
    catch (error) {
        console.error("Submit application error:", error);
        res.status(500).json({ message: "Error submitting application" });
    }
});
exports.default = router;

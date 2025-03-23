"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// NOTE: The previous TODO about Express type mismatch appears to be resolved.
// The '@ts-expect-error' directives are no longer needed as TypeScript is not
// detecting type incompatibility errors. If type errors reappear, consider:
// 1. Ensuring @types/express version matches Express version
// 2. Or upgrading Express to match @types/express
const router = express_1.default.Router();
// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;
        // Validate input
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }
        // Hash password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create user
        const user = await index_1.prisma.user.create({
            data: {
                email,
                hashedPassword,
                firstName,
                lastName,
                role,
            },
        });
        // Create JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: process.env.JWT_EXPIRY || "7d" });
        // Return user info and token (excluding password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                subscriptionTier: user.subscriptionTier,
            },
            token,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});
// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        // Find user
        const user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Check password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Create JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: process.env.JWT_EXPIRY || "7d" });
        // Return user info and token (excluding password)
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                subscriptionTier: user.subscriptionTier,
            },
            token,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});
// Get current user
router.get("/me", auth_middleware_1.authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        // The req.user type is properly defined in auth.middleware.ts via declaration merging
        // with the Express namespace, so we can safely access its properties
        const user = await index_1.prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                profile: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user info (excluding password)
        res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionTier: user.subscriptionTier,
            profile: user.profile,
        });
    }
    catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Error retrieving user information" });
    }
});
exports.default = router;

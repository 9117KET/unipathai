"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePremium = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
// Middleware to validate JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Authorization token is required" });
        }
        // Extract token
        const token = authHeader.split(" ")[1];
        // Verify token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Add user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
// Middleware to check role authorization
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied: Insufficient permissions",
            });
        }
        next();
    };
};
exports.authorize = authorize;
// Middleware for subscription checks
const requirePremium = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        // Check subscription tier
        const user = await index_1.prisma.user.findUnique({
            where: { id: req.user.id },
            select: { subscriptionTier: true },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.subscriptionTier !== "PREMIUM") {
            return res.status(403).json({
                message: "This feature requires a premium subscription",
            });
        }
        next();
    }
    catch (error) {
        console.error("Subscription check error:", error);
        return res
            .status(500)
            .json({ message: "Error checking subscription status" });
    }
};
exports.requirePremium = requirePremium;

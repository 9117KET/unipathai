import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

// Extend Express Request interface to include user info
declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

// Middleware to validate JWT token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      role: string;
    };

    // Add user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check role authorization
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

// Middleware for subscription checks
export const requirePremium = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check subscription tier
    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error("Subscription check error:", error);
    return res
      .status(500)
      .json({ message: "Error checking subscription status" });
  }
};

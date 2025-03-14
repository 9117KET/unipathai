// This file extends the Express Request interface to include user property
import { Role, SubscriptionTier } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
        subscriptionTier?: SubscriptionTier;
      };
    }
  }
}

// This empty export is needed to make the file a module
export {};

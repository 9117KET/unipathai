import { compare, hash } from "bcrypt";
import { type PrismaClient } from "@prisma/client";

/**
 * Hash a password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

/**
 * Get user by email
 */
export async function getUserByEmail(prisma: PrismaClient, email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user
 */
export async function createUser(
  prisma: PrismaClient,
  {
    name,
    email,
    password,
    role = "STUDENT",
  }: {
    name: string;
    email: string;
    password: string;
    role?: "STUDENT" | "COUNSELOR" | "PARENT" | "UNIVERSITY" | "ADMIN";
  }
) {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
}

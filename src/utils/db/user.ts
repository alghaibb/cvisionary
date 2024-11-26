import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Get user from database by email and validate password
export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw new Error("Failed to authenticate user");
  }
}

// Get user from database by email
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email");
  }
}

// Get user from database by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
}

// Get all users from database with pagination
export async function getAllUsers(limit = 10, offset = 0) {
  try {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch all users");
  }
}

// Find user by reset password token
export async function getUserByResetPasswordToken(token: string) {
  try {
    const passwordResetToken = await prisma.resetPasswordToken.findFirst({
      where: { token },
      include: { user: true },
    });

    return passwordResetToken?.user || null;
  } catch (error) {
    console.error("Error fetching user by reset password token:", error);
    throw new Error("Failed to fetch user by reset password token");
  }
};
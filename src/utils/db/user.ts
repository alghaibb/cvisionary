import prisma from "@/lib/prisma";

// Get user from database by email and password
export async function getUserFromDb(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  return user;
}
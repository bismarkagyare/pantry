import { currentUser } from "@clerk/nextjs/server";
//import { prisma } from "@/utils/prisma";
import { db } from "@/server/db";

export async function checkUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    //check if user is in database
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) return loggedInUser;

    //if not in database, create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
      },
    });

    return {
      id: newUser.id,
      clerkUserId: newUser.clerkUserId,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    console.error("Error in checkUser:", error);
    throw error;
  }
}

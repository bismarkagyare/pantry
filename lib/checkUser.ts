import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";

export async function checkUser() {
  try {
    const user = await currentUser();

    // if no user is logged in, return early without throwing an error
    if (!user) {
      return {
        id: null,
        clerkUserId: null,
        email: null,
        role: "guest",
      };
    }

    // ensure user has an email
    if (!user.emailAddresses?.[0]?.emailAddress) {
      throw new Error("User email not found");
    }

    // check if user exists in database
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) return loggedInUser;

    // create new user if not in database
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        role: "customer",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    // return a guest user instead of throwing error
    return {
      id: null,
      clerkUserId: null,
      email: null,
      role: "guest",
    };
  }
}

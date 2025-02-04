import { SignIn } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

export default async function SignInPage() {
  await checkUser();

  return (
    <div className="container flex flex-col items-center justify-center">
      <SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
    </div>
  );
}

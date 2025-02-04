import { SignUp } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

export default async function SignUpPage() {
  await checkUser();

  return (
    <div className="container flex flex-col items-center justify-center">
      <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
    </div>
  );
}

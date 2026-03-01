import { SignInForm } from "@/components/auth/SignInForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata = {
  title: "Sign In - Property Managers",
  description: "Sign in to your Property Managers account",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}

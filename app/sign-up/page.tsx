import { SignUpForm } from "@/components/auth/SignUpForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata = {
  title: "Sign Up - Property Managers",
  description: "Create your Property Managers account",
};

export default function SignUpPage() {
  return (
    <AuthLayout backgroundImage="/Building.png">
      <SignUpForm />
    </AuthLayout>
  );
}

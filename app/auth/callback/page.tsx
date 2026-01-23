"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/auth.service";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const response = await authService.checkAuthStatus();
        if (response.isAuthenticated) {
          // Redirect to dashboard after successful login
          router.push("/Dash/dashboard");
        } else {
          // If not authenticated, go to home
          router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/");
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}

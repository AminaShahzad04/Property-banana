"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/auth.service";
import { userService } from "@/api/user.service";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Completing sign in...");

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        setStatus("Verifying authentication...");
        const response = await authService.checkAuthStatus();

        if (!response.isAuthenticated || !response.user) {
          setStatus("Authentication failed. Redirecting...");
          router.push("/sign-in");
          return;
        }

        setStatus("Checking user role...");

        // Get user role from backend
        const roleStatus = await userService.getRoleStatus();

        if (!roleStatus.role_assigned || roleStatus.roles.length === 0) {
          // No role assigned - redirect to tenant dashboard as default
          setStatus("Redirecting to dashboard...");
          router.push("/Dash/tenant");
          return;
        }

        // Redirect based on user's role (backend has already assigned it)
        const primaryRole = roleStatus.roles[0];
        setStatus(`Redirecting to ${primaryRole.role_name} dashboard...`);

        switch (primaryRole.role_id) {
          case 1: // LANDLORD
            router.push("/Dash/landlord");
            break;
          case 2: // TENANT
            router.push("/Dash/tenant");
            break;
          case 3: // AGENT
            router.push("/Dash/agent");
            break;
          case 4: // MANAGER
            router.push("/Dash/manager");
            break;
          case 5: // OWNER (Brokerage Owner)
            router.push("/Dash/owner");
            break;
          case 6: // ADMIN
            router.push("/Dash/admin");
            break;
          default:
            router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setStatus("Something went wrong. Redirecting...");
        setTimeout(() => router.push("/sign-in"), 2000);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-yellow-500 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">Welcome back!</p>
        <p className="text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
}

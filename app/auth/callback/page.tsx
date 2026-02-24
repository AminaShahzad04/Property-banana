"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/auth.service";
import { userService } from "@/api/user.service";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Completing sign in...");
  const [userName, setUserName] = useState<string>("");

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

        // Store user name for display
        const userFullName =
          response.user.full_name || response.user.email || "User";
        setUserName(userFullName);
        setStatus(`Welcome, ${userFullName.split(" ")[0]}!`);

        // Brief delay to show welcome message
        await new Promise((resolve) => setTimeout(resolve, 500));

        setStatus("Checking user role...");

        // Get user role status from backend
        let roleStatus;
        try {
          roleStatus = await userService.getRoleStatus();
        } catch (error) {
          console.error("Failed to get role status:", error);
          setStatus("Error checking role. Logging out...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          authService.redirectToLogout();
          return;
        }

        // If user has no role assigned, try to assign the saved role from signup
        if (!roleStatus.role_assigned || roleStatus.roles.length === 0) {
          const pendingRoleId = localStorage.getItem("pendingRoleId");

          if (pendingRoleId) {
            setStatus("Assigning your selected role...");
            try {
              await userService.assignRole(parseInt(pendingRoleId));
              localStorage.removeItem("pendingRoleId"); // Clear after successful assignment

              // Redirect based on the assigned role
              const roleId = parseInt(pendingRoleId);
              setStatus("Redirecting to dashboard...");

              switch (roleId) {
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
                  router.push("/Dash");
              }
              return;
            } catch (assignError) {
              console.error("Failed to assign role:", assignError);
              localStorage.removeItem("pendingRoleId");
            }
          }

          // No pending role or assignment failed - assign default tenant role
          setStatus("Assigning default tenant role...");
          try {
            await userService.assignRole(2); // Assign TENANT role (role_id: 2)
            setStatus("Redirecting to dashboard...");
            router.push("/Dash/tenant");
            return;
          } catch (assignError) {
            console.error("Failed to assign tenant role:", assignError);
            setStatus("Error assigning role. Logging out...");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            authService.redirectToLogout();
            return;
          }
        }

        // User has an assigned role - redirect based on it
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
            // Unknown role_id - redirect to home
            router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setStatus("Authentication failed. Logging out...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        authService.redirectToLogout();
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
        <p className="text-lg font-medium text-gray-900 mb-2">
          {userName ? `Welcome, ${userName}!` : "Welcome !"}
        </p>
        <p className="text-sm text-gray-600">{status}</p>
      </div>
    </div>
  );
}

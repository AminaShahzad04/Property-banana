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
        console.log("🔐 [AUTH CALLBACK] Starting authentication check...");
        setStatus("Verifying authentication...");
        const response = await authService.checkAuthStatus();
        console.log("✅ [AUTH CALLBACK] Auth status response:", response);

        if (!response.isAuthenticated || !response.user) {
          console.error(
            "❌ [AUTH CALLBACK] User not authenticated or no user data",
          );
          console.error("isAuthenticated:", response.isAuthenticated);
          console.error("user:", response.user);
          setStatus("Authentication failed. Redirecting...");
          router.push("/sign-in");
          return;
        }

        // Store user name for display
        const userFullName =
          response.user.full_name || response.user.email || "User";
        setUserName(userFullName);
        setStatus(`Welcome, ${userFullName.split(" ")[0]}!`);
        console.log("👤 [AUTH CALLBACK] User authenticated:", userFullName);

        // Brief delay to show welcome message
        await new Promise((resolve) => setTimeout(resolve, 500));

        setStatus("Checking user role...");
        console.log("🔍 [AUTH CALLBACK] Calling getRoleStatus API...");

        // Get user role status from backend
        let roleStatus;
        try {
          roleStatus = await userService.getRoleStatus();
          console.log(
            "✅ [AUTH CALLBACK] Role status received:",
            JSON.stringify(roleStatus, null, 2),
          );
          console.log(
            "✅ [AUTH CALLBACK] Role status received:",
            JSON.stringify(roleStatus, null, 2),
          );
        } catch (error) {
          console.error(
            "❌ [AUTH CALLBACK] FAILED TO GET ROLE STATUS - Redirecting to select role page",
          );
          console.error("Error details:", error);
          console.error(
            "Error type:",
            error instanceof Error ? error.message : String(error),
          );
          setStatus("Error checking role. Please select a role...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          router.push("/auth/select-role");
          return;
        }

        // If user has no role assigned, redirect to role selection
        // Check role_assigned at root level (actual API response structure)
        const roleStatusAny = roleStatus as any;
        const isRoleAssigned =
          roleStatusAny.role_assigned || roleStatusAny.user?.role_assigned;

        if (!isRoleAssigned) {
          console.log(
            "⚠️ [AUTH CALLBACK] No role assigned. role_assigned:",
            isRoleAssigned,
          );
          const pendingRoleId = localStorage.getItem("pendingRoleId");
          console.log(
            "📦 [AUTH CALLBACK] Pending role ID from localStorage:",
            pendingRoleId,
          );

          if (pendingRoleId) {
            console.log(
              "🔄 [AUTH CALLBACK] Assigning pending role:",
              pendingRoleId,
            );
            setStatus("Assigning your selected role...");
            try {
              await userService.assignRole(parseInt(pendingRoleId));
              console.log(
                "✅ [AUTH CALLBACK] Role assigned successfully:",
                pendingRoleId,
              );
              localStorage.removeItem("pendingRoleId"); // Clear after successful assignment

              // Redirect based on the assigned role
              const roleId = parseInt(pendingRoleId);
              setStatus("Redirecting to dashboard...");

              switch (roleId) {
                case 1: // LANDLORD
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to landlord dashboard",
                  );
                  router.push("/Dash/landlord");
                  break;
                case 2: // TENANT
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to tenant dashboard",
                  );
                  router.push("/Dash/tenant");
                  break;
                case 3: // AGENT
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to agent dashboard",
                  );
                  router.push("/Dash/agent");
                  break;
                case 4: // MANAGER
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to manager dashboard",
                  );
                  router.push("/Dash/manager");
                  break;
                case 5: // OWNER (Brokerage Owner)
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to owner dashboard",
                  );
                  router.push("/Dash/owner");
                  break;
                case 6: // ADMIN
                  console.log(
                    "🏠 [AUTH CALLBACK] Redirecting to admin dashboard",
                  );
                  router.push("/Dash/admin");
                  break;
                default:
                  console.log(
                    "🏠 [AUTH CALLBACK] Unknown role, redirecting to home",
                  );
                  router.push("/Dash");
              }
              return;
            } catch (assignError) {
              console.error(
                "❌ [AUTH CALLBACK] Failed to assign pending role:",
                assignError,
              );
              localStorage.removeItem("pendingRoleId");
            }
          }

          // No pending role or assignment failed - redirect to select role page
          console.log(
            "🔄 [AUTH CALLBACK] No pending role. Redirecting to role selection page",
          );
          setStatus("Please select your role...");
          await new Promise((resolve) => setTimeout(resolve, 800));
          router.push("/auth/select-role");
          return;
        }

        // User has an assigned role - fetch profile to get role_id and redirect
        console.log(
          "✅ [AUTH CALLBACK] User has assigned role, fetching profile to get role details...",
        );
        setStatus("Loading your dashboard...");

        try {
          const userProfile = await userService.getMyProfile();
          console.log("✅ [AUTH CALLBACK] User profile:", userProfile);

          // Check for roles array (actual API response structure)
          if (
            (userProfile as any).roles &&
            (userProfile as any).roles.length > 0
          ) {
            const primaryRole = (userProfile as any).roles[0];
            const roleId = primaryRole.role_id;
            const roleName = primaryRole.role_name || "user";
            console.log("✅ [AUTH CALLBACK] Found role:", { roleId, roleName });
            setStatus(`Redirecting to ${roleName} dashboard...`);

            switch (roleId) {
              case 1: // LANDLORD
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to landlord dashboard",
                );
                router.push("/Dash/landlord");
                break;
              case 2: // TENANT
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to tenant dashboard",
                );
                router.push("/Dash/tenant");
                break;
              case 3: // AGENT
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to agent dashboard",
                );
                router.push("/Dash/agent");
                break;
              case 4: // MANAGER
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to manager dashboard",
                );
                router.push("/Dash/manager");
                break;
              case 5: // OWNER (Brokerage Owner)
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to owner dashboard",
                );
                router.push("/Dash/owner");
                break;
              case 6: // ADMIN
                console.log(
                  "🏠 [AUTH CALLBACK] Redirecting to admin dashboard",
                );
                router.push("/Dash/admin");
                break;
              default:
                // Unknown role_id - redirect to home
                console.warn("⚠️ [AUTH CALLBACK] Unknown role_id:", roleId);
                router.push("/");
            }
          } else {
            console.error(
              "❌ [AUTH CALLBACK] No roles in profile:",
              userProfile,
            );
            router.push("/auth/select-role");
          }
        } catch (profileError) {
          console.error(
            "❌ [AUTH CALLBACK] Failed to fetch user profile:",
            profileError,
          );
          router.push("/auth/select-role");
        }
      } catch (error) {
        console.error(
          "❌ [AUTH CALLBACK] CRITICAL ERROR - Redirecting to select role page",
        );
        console.error("Error details:", error);
        console.error(
          "Error type:",
          error instanceof Error ? error.message : String(error),
        );
        console.error(
          "Error stack:",
          error instanceof Error ? error.stack : "No stack trace",
        );
        setStatus("Please select your role...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/auth/select-role");
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

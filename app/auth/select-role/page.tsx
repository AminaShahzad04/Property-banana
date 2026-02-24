"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { userService } from "@/api/user.service";

const roles = [
  {
    id: 1,
    name: "Landlord",
    description: "I own properties and want to rent them out",
  },
  { id: 2, name: "Tenant", description: "I'm looking for a property to rent" },
  { id: 3, name: "Agent", description: "I'm a real estate agent" },
  {
    id: 5,
    name: "Brokerage Owner",
    description: "I own a real estate brokerage",
  },
];

const redirectToDashboard = (roleId: number, router: any) => {
  console.log("🔀 [SELECT ROLE] Redirecting for role_id:", roleId);
  switch (roleId) {
    case 1:
      router.push("/Dash/landlord");
      break;
    case 2:
      router.push("/Dash/tenant");
      break;
    case 3:
      router.push("/Dash/agent");
      break;
    case 4:
      router.push("/Dash/manager");
      break;
    case 5:
      router.push("/Dash/owner");
      break;
    case 6:
      router.push("/Dash/admin");
      break;
    default:
      console.warn("⚠️ [SELECT ROLE] Unknown role_id:", roleId);
      router.push("/");
  }
};

export default function SelectRolePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<number>(2); // Default to Tenant
  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user already has a role assigned on page load
  useEffect(() => {
    const checkExistingRole = async () => {
      try {
        console.log("🔍 [SELECT ROLE] Step 1: Get role status...");
        const roleStatus = await userService.getRoleStatus();
        console.log("✅ [SELECT ROLE] Role status response:", roleStatus);

        // Check if role is assigned (backend returns role_assigned or has_roles)
        const isRoleAssigned =
          roleStatus.role_assigned || (roleStatus as any).has_roles;

        if (isRoleAssigned) {
          console.log(
            "✅ [SELECT ROLE] Role assigned = true, getting role details...",
          );

          // Try to get role_id from roles array first (if backend returns it)
          if (roleStatus.roles && roleStatus.roles.length > 0) {
            const roleId = roleStatus.roles[0].role_id;
            console.log(
              "✅ [SELECT ROLE] Got role_id from roles array:",
              roleId,
            );
            redirectToDashboard(roleId, router);
            return;
          }

          // If roles array not in response, get role_id from user profile
          console.log("🔍 [SELECT ROLE] Getting role from user profile...");
          const userProfile = await userService.getMyProfile();
          console.log("✅ [SELECT ROLE] User profile:", userProfile);

          if (
            (userProfile as any).user_roles &&
            (userProfile as any).user_roles.length > 0
          ) {
            const roleId = (userProfile as any).user_roles[0].role_id;
            console.log("✅ [SELECT ROLE] Got role_id from profile:", roleId);
            redirectToDashboard(roleId, router);
            return;
          }

          // If still can't find role_id, show error
          console.error("❌ [SELECT ROLE] Role assigned but no role_id found");
          setError("Unable to determine your role. Please contact support.");
        } else {
          console.log(
            "ℹ️ [SELECT ROLE] No role assigned yet, user can select role",
          );
        }
      } catch (error) {
        console.error("❌ [SELECT ROLE] Error checking role:", error);
        // Stay on page to allow role selection
      } finally {
        setCheckingRole(false);
      }
    };

    checkExistingRole();
  }, [router]);

  const handleRoleSelection = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔄 [SELECT ROLE] Step 1: Assigning role:", selectedRole);
      const assignResult = await userService.assignRole(selectedRole);
      console.log("✅ [SELECT ROLE] Assignment response:", assignResult);

      if (!assignResult.success) {
        throw new Error(assignResult.message || "Role assignment failed");
      }

      console.log(
        "🔍 [SELECT ROLE] Step 2: Getting role_id from assignment response...",
      );
      // Backend returns: { success, message, user_role: { role_id, ... }, user: {...} }
      const roleId = (assignResult as any).user_role?.role_id;

      if (!roleId) {
        console.error("❌ [SELECT ROLE] No role_id in response:", assignResult);
        throw new Error("Unable to get role_id from assignment");
      }

      console.log("✅ [SELECT ROLE] Got role_id:", roleId);
      console.log("🔀 [SELECT ROLE] Step 3: Redirecting to dashboard...");

      redirectToDashboard(roleId, router);
    } catch (error: any) {
      console.error("❌ [SELECT ROLE] Error:", error);
      setError(error.message || "Failed to assign role. Please try again.");
      setLoading(false);
    }
  };

  // Show loading state while checking for existing role
  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Property Banana!
            </h1>
            <p className="text-gray-600">
              Please select your role to get started
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => !loading && setSelectedRole(role.id)}
                className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${
                    selectedRole === role.id
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          selectedRole === role.id
                            ? "border-yellow-400 bg-yellow-400"
                            : "border-gray-300"
                        }
                      `}
                    >
                      {selectedRole === role.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <Label className="text-base font-semibold text-gray-900 cursor-pointer">
                      {role.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleRoleSelection}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block"></div>
                Setting up your account...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

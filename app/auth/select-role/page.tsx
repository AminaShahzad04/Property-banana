"use client";

import { useState } from "react";
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

export default function SelectRolePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<number>(2); // Default to Tenant
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelection = async () => {
    setLoading(true);
    setError(null);

    try {
      await userService.assignRole(selectedRole);

      // Redirect based on selected role
      switch (selectedRole) {
        case 1: // LANDLORD
          router.push("/Dash/landlord");
          break;
        case 2: // TENANT
          router.push("/Dash/tenant");
          break;
        case 3: // AGENT
          router.push("/Dash/agent");
          break;
        case 5: // OWNER
          router.push("/Dash/owner");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Role assignment failed:", error);
      setError("Failed to assign role. Please try again.");
      setLoading(false);
    }
  };

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

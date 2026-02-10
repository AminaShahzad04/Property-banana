"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { uaePassService } from "@/api/uaepass.service";
import { Users, Home, Building, Briefcase } from "lucide-react";

const roles = [
  { id: 1, name: "Landlord", description: "Property owner", icon: Home },
  { id: 2, name: "Tenant", description: "Looking for property", icon: Users },
  { id: 3, name: "Agent", description: "Real estate agent", icon: Briefcase },
  {
    id: 5,
    name: "Brokerage Owner",
    description: "Company owner",
    icon: Building,
  },
];

export function SignUpForm() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate role selection
    if (!selectedRole) {
      setError("Please select your role before continuing");
      return;
    }

    setLoading(true);

    // Store the selected role in localStorage to assign after Cognito signup
    localStorage.setItem("pendingRole", selectedRole.toString());

    // Redirect to Cognito Hosted UI for signup
    // After signup, the callback will assign the role from localStorage
    window.location.href = `${API_BASE_URL}/api/cognito/login`;
  };

  const handleUAEPassSignUp = () => {
    setLoading(true);
    uaePassService.redirectToLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Create Your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Select your role to get started with Property Banana
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Select your role below, then you'll be directed to AWS Cognito to
          complete your registration
        </p>
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Select Your Role <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setSelectedRole(role.id);
                  setError(null); // Clear error when role is selected
                }}
                disabled={loading}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:border-yellow-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    size={18}
                    className={isSelected ? "text-yellow-600" : "text-gray-600"}
                  />
                  <p className="text-sm font-semibold">{role.name}</p>
                </div>
                <p className="text-xs text-gray-500">{role.description}</p>
              </button>
            );
          })}
        </div>
        {!selectedRole && error && (
          <p className="text-xs text-red-600 mt-1">
            Please select a role to continue
          </p>
        )}
      </div>

      {/* Continue Button */}
      <Button
        type="submit"
        disabled={loading || !selectedRole}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block"></div>
            Redirecting...
          </>
        ) : (
          <>
            {selectedRole ? "Continue to Sign Up" : "Select a Role to Continue"}
          </>
        )}
      </Button>

      {!selectedRole && (
        <p className="text-xs text-center text-gray-500 -mt-2">
          Please select your role above to continue
        </p>
      )}

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* UAE Pass Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full bg-black text-white hover:bg-black/80 border-black font-semibold py-3 h-auto disabled:opacity-50"
        onClick={handleUAEPassSignUp}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2 inline-block"></div>
            Redirecting...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
            Sign Up with UAE Pass
          </>
        )}
      </Button>

      {/* Sign In Link */}
      <div className="text-center text-xs pt-1">
        Already have an account?{" "}
        <Link href="/" className="text-[#008BBC] hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}

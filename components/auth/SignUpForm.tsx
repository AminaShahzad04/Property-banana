"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Eye, EyeOff } from "lucide-react";
import { uaePassService } from "@/api/uaepass.service";

const roles = [
  { id: 1, name: "Landlord" },
  { id: 2, name: "Tenant" },
  { id: 3, name: "Agent" },
  { id: 5, name: "Brokerage Owner" },
];

export function SignUpForm() {
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("2"); // Default to Tenant
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for error in URL params (from backend redirect)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam.includes("duplicate") || errorParam.includes("already exists")) {
        setError("This account already exists. Please sign in instead.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  }, [searchParams]);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleCognitoSignUp = () => {
    setLoading(true);
    setError(null);

    // Validate role selection
    if (!selectedRole) {
      setError("Please select your role");
      setLoading(false);
      return;
    }

    // Store the selected role in localStorage to assign after Cognito signup
    localStorage.setItem("pendingRole", selectedRole);

    // Redirect to Cognito Hosted UI for signup
    // Role selection will be assigned in callback
    window.location.href = `${API_BASE_URL}/api/cognito/login`;
  };

  const handleUAEPassSignUp = () => {
    setLoading(true);
    uaePassService.redirectToLogin();
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Register Account</h1>
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleCognitoSignUp(); }} className="space-y-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Full Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm  pl-4 font-medium text-gray-900"
          >
            Full Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            className="w-full border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm pl-4  font-medium text-gray-900"
          >
            Email Address<span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* Role Selection Dropdown */}
        <div className="space-y-2">
          <Label
            htmlFor="role"
            className="text-sm  pl-4 font-medium text-gray-900"
          >
            I am<span className="text-red-500">*</span>
          </Label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id.toString()}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium  pl-4 text-gray-900"
          >
            Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full border-gray-300 px-4 py-3 pr-10 rounded-md"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0 hover:bg-transparent"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium  pl-4 text-gray-900"
          >
            Confirm Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="w-full border-gray-300 px-4 py-3 pr-10 rounded-md"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0 hover:bg-transparent"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* UAE Pass Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-900">
            Verify UAE Pass(Optional)
          </Label>
          <Button
            type="button"
            onClick={handleUAEPassSignUp}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-black/90 font-semibold py-3 h-auto disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2 inline-block"></div>
                Redirecting...
              </>
            ) : (
              <>
                <img
                  src="/UAEPASS_Logo.png"
                  alt="UAE Pass Logo"
                  className="h-5 w-auto"
                />
                Sign up with UAE PASS
              </>
            )}
          </Button>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block"></div>
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center text-sm">
        <span className="text-gray-600">Already Have An Account ? </span>
        <button
          onClick={() => {
            setLoading(true);
            window.location.href = `${API_BASE_URL}/api/cognito/login`;
          }}
          className="text-[#008BBC] hover:underline font-semibold bg-transparent border-0 cursor-pointer p-0"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

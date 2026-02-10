"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { UAEPassLoginModal } from "@/components/auth/UAEPassLoginModal";
import { uaePassService } from "@/api/uaepass.service";

export function SignInForm() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showUAEPass, setShowUAEPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Redirect to Cognito Hosted UI for authentication
    // The callback will handle role-based routing
    window.location.href = `${API_BASE_URL}/api/cognito/login`;
  };

  const handleUAEPassLogin = () => {
    setLoading(true);
    // Redirect to UAE Pass authorization endpoint
    uaePassService.redirectToLogin();
  };

  return (
    <>
      <div className="space-y-6 mt-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Sign in to continue
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Click below to securely sign in through AWS Cognito
          </p>
        </div>

        {/* Sign In Button */}
        <Button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 h-auto disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block"></div>
              Redirecting...
            </>
          ) : (
            "Sign In with Email"
          )}
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => setShowForgotPassword(true)}
            className="text-[#008BBC] hover:underline text-sm h-auto p-0"
          >
            Forgot Password?
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* UAE Pass Button */}
        <Button
          type="button"
          onClick={handleUAEPassLogin}
          disabled={loading}
          variant="outline"
          className="w-full bg-black text-white hover:bg-black/80 border-black font-semibold py-3 h-auto disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2 inline-block"></div>
              Redirecting to UAE Pass...
            </>
          ) : (
            <>
              <img
                src="/UAEPass_Logo.png"
                alt="UAE Pass Logo"
                className="h-6 w-auto"
              />
              Sign In with UAE Pass
            </>
          )}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#008BBC] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal - COMMENTED OUT */}
      {/* <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      /> */}

      {/* UAE Pass Login Modal */}
      <UAEPassLoginModal
        isOpen={showUAEPass}
        onClose={() => setShowUAEPass(false)}
      />
    </>
  );
}

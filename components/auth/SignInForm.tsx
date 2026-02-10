"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Eye, EyeOff } from "lucide-react";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { UAEPassLoginModal } from "@/components/auth/UAEPassLoginModal";
import { uaePassService } from "@/api/uaepass.service";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        {/* Sign In Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-900"
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
              className="w-full border-gray-300 px-4 py-3 rounded-[1px]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-900"
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
                className="w-full border-gray-300 px-4 py-3 pr-10 rounded-[1px]"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-700 cursor-pointer font-normal"
              >
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              onClick={() => setShowForgotPassword(true)}
              className="text-[#008BBC]  border-none underline text-sm h-auto p-0 font-normal"
            >
              Forgot Password
            </Button>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2 inline-block"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">Or</span>
          </div>
        </div>

        {/* UAE Pass Button */}
        <Button
          type="button"
          onClick={handleUAEPassLogin}
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
                src="/UAEPass_Logo.png"
                alt="UAE Pass Logo"
                className="h-5 w-auto"
              />
              login with UAE PASS
            </>
          )}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't Have An Account ? </span>
          <Link
            href="/sign-up"
            className="text-[#008BBC] hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      {/* UAE Pass Login Modal */}
      <UAEPassLoginModal
        isOpen={showUAEPass}
        onClose={() => setShowUAEPass(false)}
      />
    </>
  );
}

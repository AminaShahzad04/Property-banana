"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { UAEPassLoginModal } from "@/components/auth/UAEPassLoginModal";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showUAEPass, setShowUAEPass] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to AWS Cognito login
    window.location.href = `${API_BASE_URL}/auth/cognito/login`;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Sign In To Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below
          </p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Button
            type="button"
            variant="link"
            onClick={() => setShowForgotPassword(true)}
            className="text-[#008BBC] hover:underline text-xs h-auto p-0"
          >
            Forgot Password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 h-auto"
        >
          Sign In
        </Button>

        {/* UAE Pass Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full bg-black text-white hover:bg-black/80 border-black font-semibold py-2 h-auto"
          onClick={() => setShowUAEPass(true)}
        >
          Login With UAE Pass
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
      </form>

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

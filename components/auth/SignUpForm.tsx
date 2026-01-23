"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Redirect to AWS Cognito login (Cognito handles sign up as well)
    window.location.href = `${API_BASE_URL}/api/auth/cognito/login`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div>
        <h1 className="text-xl font-bold text-foreground mb-0.5">
          Register Your Account
        </h1>
        <p className="text-xs text-muted-foreground">
          Create an account to get started
        </p>
      </div>

      {/* Full Name Field */}
      <div className="space-y-1">
        <Label htmlFor="full-name" className="text-xs font-medium">
          Full Name
        </Label>
        <Input
          id="full-name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full h-8 text-sm"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-8 text-sm"
        />
      </div>

      {/* User Type Dropdown */}
      <div className="space-y-1">
        <Label htmlFor="user-type" className="text-xs font-medium">
          User Type
        </Label>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="property-owner">Property Owner</SelectItem>
            <SelectItem value="property-manager">Property Manager</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-8 text-sm"
        />
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <Label htmlFor="confirm-password" className="text-xs font-medium">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full h-8 text-sm"
        />
      </div>

      {/* Sign Up Button */}
      <Button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold h-8 text-sm"
      >
        Sign Up
      </Button>

      {/* UAE Pass Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full bg-black text-white hover:bg-black/80 border-black font-semibold h-8 text-sm"
        onClick={() => console.log("UAE Pass sign up")}
      >
        Login With UAEPass
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

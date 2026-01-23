"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { X, Eye, EyeOff } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [stage, setStage] = useState<
    "email" | "verification" | "password" | "success"
  >("email");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("verification");
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStage("success");
  };

  const handleClose = () => {
    setStage("email");
    setEmail("");
    setVerificationCode("");
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Close Button */}
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 border-0"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Email Stage */}
        {stage === "email" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password
              </h2>
              <p className="text-sm text-gray-500">
                Enter Your Email To Recover Your Password.
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email adress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-gray-300 px-4 py-3 rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto"
              >
                Continue
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleClose}
                  className="text-[#008BBC] hover:text-[#008BBC]/80 text-sm font-semibold h-auto p-0"
                >
                  Back To Login
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Verification Stage */}
        {stage === "verification" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password
              </h2>
              <p className="text-sm text-gray-500">
                Enter The Verification Code Sent To Your Email.
              </p>
            </div>
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="code"
                  className="text-sm font-medium text-gray-900"
                >
                  Verification Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full border-gray-300 px-4 py-3 rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto"
              >
                Verify
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleClose}
                  className="text-[#008BBC] hover:text-[#008BBC]/80 text-sm font-semibold h-auto p-0"
                >
                  Back To Login
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Password Reset Stage */}
        {stage === "password" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password
              </h2>
              <p className="text-sm text-gray-500">
                Set New Password For Your Account.
              </p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border-gray-300 px-4 py-3 pr-10 rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-gray-900"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border-gray-300 px-4 py-3 pr-10 rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto"
              >
                Update
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleClose}
                  className="text-[#008BBC] hover:text-[#008BBC]/80 text-sm font-semibold h-auto p-0"
                >
                  Back To Login
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Success Stage */}
        {stage === "success" && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Password Updated
            </h2>
            <div className="flex justify-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Your password has been updated successfully.
            </p>

            <Button
              onClick={handleClose}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto"
            >
              Back To Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

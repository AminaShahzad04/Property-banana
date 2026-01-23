"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { X } from "lucide-react";

interface UAEPassLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UAEPassLoginModal({ isOpen, onClose }: UAEPassLoginModalProps) {
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [stage, setStage] = useState<"initial" | "login" | "success">(
    "initial"
  );

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("login");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("success");
    // Redirect after 2 seconds
    setTimeout(() => {
      handleClose();
      // Navigate to dashboard
    }, 2000);
  };

  const handleClose = () => {
    setStage("initial");
    setUsername("");
    setRememberMe(false);
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
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Initial Stage - Enter Credentials */}
        {stage === "initial" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Login With UAE Pass
              </h2>
            </div>
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="uae-id"
                  className="text-xs font-medium text-gray-900"
                >
                  Emirates ID, email, or phone{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="uae-id"
                  type="text"
                  placeholder="Emirates ID, email, or phone eg. 971500000000"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full border-gray-300 px-3 py-2 rounded-md text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black-900 font-bold py-2.5 h-auto rounded-md text-sm"
              >
                Login
              </Button>
            </form>
          </>
        )}

        {/* Login Stage - UAE Pass Login */}
        {stage === "login" && (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Login to UAE PASS
              </p>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Emirates ID, email or phone (e.g. 971XXXXXXXXX)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full border-gray-300 px-4 py-3 rounded-md text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-uae"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember-uae"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto rounded-md"
              >
                Login
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-600">
                  Don't have UAEPASS account?{" "}
                  <a
                    href="#"
                    className="text-[#008BBC] hover:text-[#008BBC]/80 font-semibold"
                  >
                    Create new account
                  </a>
                </p>
              </div>
            </form>
          </>
        )}

        {/* Success Stage - Welcome Back */}
        {stage === "success" && (
          <div className="text-center space-y-4 py-6">
            <div className="flex justify-center mb-4">
              <div className="text-6xl">🎉</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-sm text-gray-600">
              You have successfully signed in using UAE PASS.
            </p>
            <div className="pt-4">
              <p className="text-[#008BBC] font-semibold text-sm animate-pulse">
                Backtracking to your dashboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

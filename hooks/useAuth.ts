"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types";
import { authService } from "@/api/auth.service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.checkAuthStatus();
      if (response.isAuthenticated && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Authentication check failed",
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    // Redirect to AWS Cognito login
    authService.redirectToLogin();
  };

  const logout = () => {
    // Clear user state first
    setUser(null);
    // Redirect to AWS Cognito logout
    authService.redirectToLogout();
  };

  const refreshUser = async () => {
    // Re-check auth status to get latest user data
    await checkAuthStatus();
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
}

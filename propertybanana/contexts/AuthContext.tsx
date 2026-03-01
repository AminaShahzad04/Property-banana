"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types";
import { authService } from "@/api/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    // Redirect to AWS Cognito logout
    authService.redirectToLogout();
  };

  const refreshUser = async () => {
    // Re-check auth status to get latest user data
    await checkAuthStatus();
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

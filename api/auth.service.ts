import type { User } from "@/types";

// AWS Cognito Auth Backend URL - No /api prefix for auth endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface AuthStatusResponse {
  isAuthenticated: boolean;
  user: User | null;
}

interface ProfileResponse {
  user: User;
  isAuthenticated: boolean;
}

export const authService = {
  /**
   * Redirect to AWS Cognito login page
   * No need to call this as a fetch - use window.location.href
   */
  getLoginUrl(): string {
    return `${API_BASE_URL}/api/auth/cognito/login`;
  },

  /**
   * Redirect to AWS Cognito logout
   * No need to call this as a fetch - use window.location.href
   */
  getLogoutUrl(): string {
    return `${API_BASE_URL}/api/auth/cognito/logout`;
  },

  /**
   * Check authentication status
   * Returns user data if authenticated, null otherwise
   */
  async checkAuthStatus(): Promise<AuthStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/cognito/status`, {
      credentials: "include", // REQUIRED: Send session cookies
    });

    if (!response.ok) {
      throw new Error("Failed to check auth status");
    }

    return response.json();
  },

  /**
   * Get user profile (requires authentication)
   * Returns 401 if not authenticated
   */
  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/cognito/profile`, {
      credentials: "include", // REQUIRED: Send session cookies
    });

    if (response.status === 401) {
      throw new Error("Not authenticated");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data: ProfileResponse = await response.json();
    return data.user;
  },

  /**
   * Redirect user to login page
   */
  redirectToLogin(): void {
    if (typeof window !== "undefined") {
      window.location.href = this.getLoginUrl();
    }
  },

  /**
   * Redirect user to logout
   */
  redirectToLogout(): void {
    if (typeof window !== "undefined") {
      window.location.href = this.getLogoutUrl();
    }
  },

  /**
   * Forgot password functionality
   * Note: This may need to be implemented on backend
   */
  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send reset email");
    }
  },

  /**
   * Reset password functionality
   * Note: This may need to be implemented on backend
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }
  },
};

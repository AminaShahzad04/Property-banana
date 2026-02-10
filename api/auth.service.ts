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
    return `${API_BASE_URL}/api/cognito/login`;
  },

  /**
   * Redirect to AWS Cognito logout
   * No need to call this as a fetch - use window.location.href
   * Backend will redirect to AWS Cognito which then redirects to homepage
   */
  getLogoutUrl(): string {
    return `${API_BASE_URL}/api/cognito/logout`;
  },

  /**
   * Check authentication status
   * Returns user data if authenticated, null otherwise
   */
  async checkAuthStatus(): Promise<AuthStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/api/cognito/status`, {
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
    const response = await fetch(`${API_BASE_URL}/api/cognito/profile`, {
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
   * Clears session and redirects to homepage via AWS Cognito
   */
  redirectToLogout(): void {
    if (typeof window !== "undefined") {
      // Clear any local storage or session storage if needed
      localStorage.removeItem("user");
      sessionStorage.clear();

      // Redirect to backend logout endpoint
      // Backend will redirect to AWS Cognito which then redirects to homepage
      window.location.href = this.getLogoutUrl();
    }
  },

  /**
   * Change user password (requires authentication)
   */
  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to change password");
    }

    return response.json();
  },

  /**
   * Initiate forgot password flow
   * Sends reset code to user's email
   */
  async forgotPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to send reset code");
    }

    return response.json();
  },

  /**
   * Confirm forgot password with verification code
   */
  async confirmForgotPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/confirm-forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to reset password");
    }

    return response.json();
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/cognito/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return response.json();
  },

  /**
   * Update user attributes in Cognito
   */
  async updateUserAttributes(attributes: {
    email?: string;
    phone_number?: string;
    name?: string;
  }): Promise<{
    success: boolean;
    message: string;
    verificationRequired?: boolean;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/update-user-attributes`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(attributes),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to update attributes");
    }

    return response.json();
  },

  /**
   * Verify user attribute (email or phone)
   */
  async verifyAttribute(
    attributeName: "email" | "phone_number",
    code: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/verify-attribute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ attributeName, code }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to verify attribute");
    }

    return response.json();
  },

  /**
   * Resend verification code
   */
  async resendVerificationCode(
    attributeName: "email" | "phone_number",
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/cognito/resend-verification-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ attributeName }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error?.message || "Failed to resend verification code",
      );
    }

    return response.json();
  },

  /**
   * Delete user account permanently
   */
  async deleteAccount(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/cognito/delete-account`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to delete account");
    }

    // After successful deletion, clear local data and redirect
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }

    return response.json();
  },
};

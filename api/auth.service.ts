import type { User } from "@/types";

// AWS Cognito Auth Backend URL - No /api prefix for auth endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

export type UserType =
  | "Tenant"
  | "Landlord"
  | "Agent"
  | "Manager"
  | "Owner"
  | "Admin";

interface AuthUserDto {
  user_id: string;
  email: string;
  full_name: string;
  user_type: UserType;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: UserType;
}

export interface RegisterResponseData {
  user: AuthUserDto;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUserDto;
  accessToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponseData {
  accessToken: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface EmailOnlyRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface SendPhoneOtpRequest {
  phoneNo: string;
}

export interface SendPhoneOtpResponseData {
  code: string;
}

export interface VerifyPhoneOtpRequest {
  phoneNo: string;
  code: string;
}

export interface ChangePasswordJwtRequest {
  currentPassword: string;
  newPassword: string;
}

interface LogoutRequest {
  refreshToken: string;
}

function getStoredToken(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
}

function setStoredToken(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

function removeStoredToken(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

async function parseError(response: Response): Promise<never> {
  const fallback = "Request failed";
  try {
    const payload = (await response.json()) as ApiErrorResponse;
    throw new Error(payload.message || response.statusText || fallback);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    // If response body is not JSON, return a generic error.
    throw new Error(response.statusText || fallback);
  }
}

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
   * Register a new user with email/password.
   */
  async register(payload: RegisterRequest): Promise<RegisterResponseData> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<RegisterResponseData>;
    setStoredToken(ACCESS_TOKEN_STORAGE_KEY, result.data.accessToken);
    setStoredToken(REFRESH_TOKEN_STORAGE_KEY, result.data.refreshToken);
    return result.data;
  },

  /**
   * Login and return an access token.
   */
  async login(payload: LoginRequest): Promise<LoginResponseData> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<LoginResponseData>;
    setStoredToken(ACCESS_TOKEN_STORAGE_KEY, result.data.accessToken);
    return result.data;
  },

  /**
   * Exchange a refresh token for a new access token.
   */
  async refreshAccessToken(
    payload?: Partial<RefreshTokenRequest>,
  ): Promise<RefreshTokenResponseData> {
    const refreshToken =
      payload?.refreshToken || getStoredToken(REFRESH_TOKEN_STORAGE_KEY);

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result =
      (await response.json()) as ApiResponse<RefreshTokenResponseData>;
    setStoredToken(ACCESS_TOKEN_STORAGE_KEY, result.data.accessToken);
    return result.data;
  },

  /**
   * Logout and invalidate refresh token.
   */
  async logoutJwt(payload?: Partial<LogoutRequest>): Promise<string> {
    const refreshToken =
      payload?.refreshToken || getStoredToken(REFRESH_TOKEN_STORAGE_KEY) || "";

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    removeStoredToken(ACCESS_TOKEN_STORAGE_KEY);
    removeStoredToken(REFRESH_TOKEN_STORAGE_KEY);
    return result.data;
  },

  /**
   * Verify email using token from query string.
   */
  async verifyEmail(token: string): Promise<string> {
    const encodedToken = encodeURIComponent(token);
    const response = await fetch(
      `${API_BASE_URL}/auth/verify-email?token=${encodedToken}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Verify email using token in request body.
   */
  async verifyEmailWithBody(payload: VerifyEmailRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Resend email verification link.
   */
  async resendVerification(payload: EmailOnlyRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Send password reset email.
   */
  async requestPasswordReset(payload: EmailOnlyRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Reset password using reset token.
   */
  async resetPasswordWithToken(payload: ResetPasswordRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Send phone OTP (authenticated).
   */
  async sendPhoneOtp(
    payload: SendPhoneOtpRequest,
  ): Promise<SendPhoneOtpResponseData> {
    const response = await fetch(`${API_BASE_URL}/auth/phone/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken(ACCESS_TOKEN_STORAGE_KEY) || ""}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result =
      (await response.json()) as ApiResponse<SendPhoneOtpResponseData>;
    return result.data;
  },

  /**
   * Verify phone OTP (authenticated).
   */
  async verifyPhoneOtp(payload: VerifyPhoneOtpRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/phone/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken(ACCESS_TOKEN_STORAGE_KEY) || ""}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  /**
   * Change password (authenticated).
   */
  async changePasswordJwt(payload: ChangePasswordJwtRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken(ACCESS_TOKEN_STORAGE_KEY) || ""}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await parseError(response);
    }

    const result = (await response.json()) as ApiResponse<string>;
    return result.data;
  },

  getAccessToken(): string | null {
    return getStoredToken(ACCESS_TOKEN_STORAGE_KEY);
  },

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

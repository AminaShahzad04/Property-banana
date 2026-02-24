// User API Service
// Handles user profile and role management

import type { User } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const userService = {
  /**
   * Get current user profile
   */
  async getMyProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      credentials: "include",
    });

    if (response.status === 401) {
      throw new Error("Not authenticated");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  },

  /**
   * Update current user profile
   */
  async updateMyProfile(data: {
    full_name?: string;
    phone_no?: string;
    whatsapp_no?: string;
    photo_url?: string;
  }): Promise<{ success: boolean; user: User }> {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to update profile");
    }

    return response.json();
  },

  /**
   * Check if user has been assigned a role
   */
  async getRoleStatus(): Promise<{
    user: {
      user_id: number;
      role_assigned: boolean;
      [key: string]: any;
    };
    roles: Array<{ role_id: number; role_name: string }>;
    auth_methods: {
      cognito: boolean;
      uaepass: boolean;
    };
  }> {
    const response = await fetch(`${API_BASE_URL}/api/users/me/role-status`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch role status");
    }

    return response.json();
  },

  /**
   * Check UAE Pass connection status
   */
  async getUAEPassStatus(): Promise<{
    connected: boolean;
    uaepass_user_id: string | null;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/users/me/uaepass-status`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch UAE Pass status");
    }

    return response.json();
  },

  /**
   * Assign role to current user during onboarding
   * Role IDs: 1=LANDLORD, 2=TENANT, 3=AGENT, 4=MANAGER, 5=OWNER, 6=ADMIN
   */
  async assignRole(roleId: number): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/api/users/assign-role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role_id: roleId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to assign role");
    }

    return response.json();
  },

  /**
   * Get users without assigned roles (Admin only)
   */
  async getUsersWithoutRoles(): Promise<{ users: User[] }> {
    const response = await fetch(`${API_BASE_URL}/api/users/without-roles`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  },
};

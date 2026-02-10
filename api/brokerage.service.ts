// Brokerage API Service
// Handles brokerage registration and staff management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Brokerage {
  brokerage_id: number;
  name: string;
  trade_license_no: string;
  office_registration_no: string;
  email: string;
  phone_no: string;
  owner_user_id: number;
  trade_license_document_url: string;
  logo_url: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export const brokerageService = {
  /**
   * Register a new brokerage company
   */
  async createBrokerage(data: {
    name: string;
    tradeLicenseNo: string;
    email: string;
    phoneNo: string;
    whatsappNo?: string;
    officeRegistrationNo: string;
    tradeLicenseDocument: File;
    logo: File;
  }): Promise<{
    success: boolean;
    message: string;
    brokerage: Brokerage;
  }> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tradeLicenseNo", data.tradeLicenseNo);
    formData.append("email", data.email);
    formData.append("phoneNo", data.phoneNo);
    if (data.whatsappNo) {
      formData.append("whatsappNo", data.whatsappNo);
    }
    formData.append("officeRegistrationNo", data.officeRegistrationNo);
    formData.append("tradeLicenseDocument", data.tradeLicenseDocument);
    formData.append("logo", data.logo);

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/brokerage/create-brokerage`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to create brokerage");
    }

    return response.json();
  },

  /**
   * Create a manager for the brokerage
   * Sends invitation email via AWS Cognito
   */
  async createManager(data: {
    email: string;
    fullName: string;
    phoneNumber?: string;
  }): Promise<{
    success: boolean;
    message: string;
    user: {
      user_id: number;
      email: string;
      full_name: string;
      cognito_user_id: string;
      status: string;
    };
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/brokerage/create-manager`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to create manager");
    }

    return response.json();
  },

  /**
   * Create an agent for the brokerage
   * Sends invitation email via AWS Cognito
   */
  async createAgent(data: {
    email: string;
    fullName: string;
    phoneNumber?: string;
    licenseNumber?: string;
  }): Promise<{
    success: boolean;
    message: string;
    user: {
      user_id: number;
      email: string;
      full_name: string;
      cognito_user_id: string;
    };
    agentProfile: {
      user_id: number;
      brokerage_id: number;
      license_number: string | null;
      is_verified: boolean;
    };
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/brokerage/create-agent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to create agent");
    }

    return response.json();
  },
};

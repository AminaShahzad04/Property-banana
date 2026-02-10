// UAE Pass API Service
// Handles UAE Pass authentication and document signing

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const uaePassService = {
  /**
   * Get UAE Pass login URL
   */
  getAuthorizeUrl(): string {
    return `${API_BASE_URL}/api/uaepass/authorize`;
  },

  /**
   * Redirect to UAE Pass login
   */
  redirectToLogin(): void {
    if (typeof window !== "undefined") {
      window.location.href = this.getAuthorizeUrl();
    }
  },

  /**
   * Get UAE Pass user info
   */
  async getUserInfo(): Promise<{
    sub: string;
    email: string;
    name: string;
    phone_number: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/api/uaepass/userinfo`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch UAE Pass user info");
    }

    return response.json();
  },

  /**
   * Get signature token for document signing
   */
  async getSignatureToken(credentials: {
    username: string;
    password: string;
  }): Promise<{
    access_token: string;
    expires_in: number;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/uaepass/signature/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get signature token");
    }

    return response.json();
  },

  /**
   * Create a signature process for a PDF document
   */
  async createSignatureProcess(document: File): Promise<{
    signature_id: string;
    signer_process_id: string;
    url: string;
  }> {
    const formData = new FormData();
    formData.append("document", document);

    const response = await fetch(
      `${API_BASE_URL}/api/uaepass/signature/create-process`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create signature process");
    }

    return response.json();
  },

  /**
   * Check signature process status
   */
  async getSignatureResult(signatureId: string): Promise<{
    status: "PENDING" | "SIGNED" | "REJECTED" | "EXPIRED";
    document_id: string | null;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/uaepass/signature/${signatureId}/result`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get signature result");
    }

    return response.json();
  },

  /**
   * Download signed PDF document
   */
  async downloadSignedDocument(documentId: string): Promise<Blob> {
    const response = await fetch(
      `${API_BASE_URL}/api/uaepass/signature/document/${documentId}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to download signed document");
    }

    return response.blob();
  },
};

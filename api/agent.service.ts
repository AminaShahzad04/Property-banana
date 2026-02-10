// Agent API Service
// Handles agent dashboard operations

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Bid {
  bid_thread_id: number;
  listing_id: number;
  tenant_user_id: number;
  landlord_user_id: number;
  amount: number;
  frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
  installments: 2 | 4 | 8 | 10 | 12;
  status: "OPEN" | "COUNTER_OFFER" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  created_at: string;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  type: "Landlord" | "Tenant";
  propertiesCount: number;
  toursCount: number;
}

export interface AgentPerformance {
  totalListings: number;
  activeListings: number;
  totalTours: number;
  totalBids: number;
  approvedBids: number;
  conversionRate: string;
  averageRating: number | null;
}

export const agentService = {
  /**
   * Get all bids on properties managed by the agent
   */
  async getBids(): Promise<{ bids: Bid[] }> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/agent/bids`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bids");
    }

    return response.json();
  },

  /**
   * Get agent's clients (landlords and tenants)
   */
  async getClients(): Promise<{ clients: Client[] }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/agent/clients`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    return response.json();
  },

  /**
   * Get agent performance metrics and KPIs
   */
  async getPerformance(): Promise<AgentPerformance> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/agent/performance`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch performance metrics");
    }

    return response.json();
  },
};

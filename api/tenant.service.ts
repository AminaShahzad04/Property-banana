// Tenant API Service
// Handles all tenant dashboard operations

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Tour {
  tour_id: number;
  listing_id: number;
  property_id: number;
  tenant_user_id: number;
  tour_date: string;
  time_slot: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
  created_at: string;
  // Property details (if backend includes them)
  property_image?: string;
  property_title?: string;
  property_location?: string;
}

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

export interface Listing {
  listing_id: number;
  property_id: number;
  landlord_user_id: number;
  agent_user_id: number | null;
  price: number;
  status: "DRAFT" | "PENDING_VERIFICATION" | "ACTIVE" | "RENTED" | "INACTIVE";
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  property_type: string;
  location: string;
  description: string;
  image?: string;
  rating?: number | null;
  reviews?: number;
}

export const tenantService = {
  /**
   * Get all tours booked by the tenant
   */
  async getMyTours(status?: Tour["status"]): Promise<{ tours: Tour[] }> {
    const url = new URL(`${API_BASE_URL}/api/dashboard/tenant/my-tours`);
    if (status) {
      url.searchParams.append("status", status);
    }

    const response = await fetch(url.toString(), {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }

    return response.json();
  },

  /**
   * Book a property tour
   */
  async bookTour(data: {
    propertyId: number;
    date: string;
    timeSlot: string;
  }): Promise<{ success: boolean; tour: Tour }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/tours/book`,
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
      let errorMessage = "Failed to book tour";
      try {
        const error = await response.json();
        errorMessage = error.error?.message || errorMessage;
      } catch (e) {
        // Response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  /**
   * Get specific tour details
   */
  async getTourDetails(tourId: number): Promise<Tour> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/tours/${tourId}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tour details");
    }

    return response.json();
  },

  /**
   * Cancel a scheduled tour
   */
  async cancelTour(
    tourId: number,
    reason: string,
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/tours/${tourId}/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ reason }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to cancel tour");
    }

    return response.json();
  },

  /**
   * Reschedule a tour
   */
  async rescheduleTour(
    tourId: number,
    data: { date: string; timeSlot: string },
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/tours/${tourId}/reschedule`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to reschedule tour");
    }

    return response.json();
  },

  /**
   * Search available rental properties
   */
  async searchListings(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    amenities?: string;
  }): Promise<{ listings: Listing[] }> {
    const url = new URL(`${API_BASE_URL}/api/dashboard/tenant/listings`);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    return response.json();
  },

  /**
   * Get detailed property information
   */
  async getListingDetails(id: number): Promise<Listing> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/listings/${id}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listing details");
    }

    return response.json();
  },

  /**
   * Get available tour time slots for a property
   */
  async getAvailability(
    id: number,
    month?: number,
    year?: number,
  ): Promise<{
    availability: Array<{ date: string; timeSlots: string[] }>;
  }> {
    const url = new URL(
      `${API_BASE_URL}/api/dashboard/tenant/listings/${id}/availability`,
    );

    if (month) url.searchParams.append("month", month.toString());
    if (year) url.searchParams.append("year", year.toString());

    const response = await fetch(url.toString(), {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch availability");
    }

    return response.json();
  },

  /**
   * Place a rental bid on a listing
   */
  async placeBid(data: {
    listing_id: number;
    amount: number;
    frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
    installments: 2 | 4 | 8 | 10 | 12;
  }): Promise<{ success: boolean; bid: Bid }> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/tenant/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to place bid");
    }

    return response.json();
  },

  /**
   * Get all bids placed by the tenant
   */
  async getMyBids(status?: Bid["status"]): Promise<{ bids: Bid[] }> {
    const url = new URL(`${API_BASE_URL}/api/dashboard/tenant/my-bids`);

    if (status) {
      url.searchParams.append("status", status);
    }

    const response = await fetch(url.toString(), {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bids");
    }

    return response.json();
  },

  /**
   * Get full bid negotiation history
   */
  async getBidHistory(bidThreadId: number): Promise<{
    history: Array<{
      event_id: number;
      event_type: string;
      amount: number;
      created_at: string;
    }>;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/bids/${bidThreadId}/history`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bid history");
    }

    return response.json();
  },

  /**
   * Withdraw a previously placed bid
   */
  async withdrawBid(bidThreadId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/bids/${bidThreadId}/withdraw`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to withdraw bid");
    }

    return response.json();
  },

  /**
   * Get suggested bid amounts based on market data
   */
  async getBidSuggestions(listingId: number): Promise<{
    suggestions: Array<{ label: string; amount: number }>;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/tenant/listings/${listingId}/bid-suggestions`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bid suggestions");
    }

    return response.json();
  },
};

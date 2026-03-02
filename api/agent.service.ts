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
  installments: 2 | 4 | 6 | 8 | 10 | 12;
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

export interface Listing {
  listing_id: number;
  property_id: number;
  created_by_user_id: number;
  landlord_user_id: number;
  landlord_name?: string;
  landlord_contact_number?: string;
  landlord_email?: string;
  listing_type: "RENT" | "SALE";
  rera_number: string;
  price_annual: number;
  rent_frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
  beds: number;
  baths: number;
  parking_spaces?: number;
  property_size: number;
  property_type?: string;
  location?: string;
  building_name?: string;
  floor_number?: number;
  unit_number?: string;
  description?: string;
  status: "DRAFT" | "PUBLISHED" | "INACTIVE";
  created_at: string;
}

export interface MultiStepListing {
  listing_id: number;
  current_step: number;
  steps_completed: number[];
  rera_number: string;
  listing_type: "RENT" | "SALE";
  status: string;
}

export interface Amenity {
  amenity_id: number;
  name: string;
}

export interface ListingProgress {
  listing_id: number;
  current_step: number;
  steps_completed: number[];
  total_steps: number;
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

  // ==================
  // PROPERTY LISTINGS
  // ==================

  /**
   * Search properties (agents have access to all listings)
   */
  async searchListings(filters?: {
    location?: string;
    price_min?: number;
    price_max?: number;
    beds_min?: number;
    beds_max?: number;
    listing_type?: "RENT" | "SALE";
    page?: number;
    limit?: number;
  }): Promise<{ listings: Listing[]; pagination: any }> {
    const url = new URL(`${API_BASE_URL}/api/listings`);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
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
   * Create new property listing (simple one-step)
   */
  async createListing(data: {
    property_id: number;
    landlord_user_id: number;
    landlord_name?: string;
    landlord_contact_number?: string;
    landlord_email?: string;
    listing_type: "RENT" | "SALE";
    rera_number: string;
    price_annual: number;
    rent_frequency?: "MONTHLY" | "QUARTERLY" | "YEARLY";
    beds: number;
    baths: number;
    parking_spaces?: number;
    property_size: number;
  }): Promise<{ id: string; message: string; listing: Listing }> {
    const response = await fetch(`${API_BASE_URL}/api/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: { message: "Failed to create listing" },
      }));
      throw new Error(error.error?.message || "Failed to create listing");
    }

    return response.json();
  },

  /**
   * Get property details by ID
   */
  async getListingDetails(id: number): Promise<Listing> {
    const response = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Property not found");
      }
      throw new Error("Failed to fetch property details");
    }

    return response.json();
  },

  /**
   * Update property listing
   */
  async updateListing(
    id: number,
    data: {
      price_annual?: number;
      beds?: number;
      baths?: number;
      parking_spaces?: number;
      property_size?: number;
    },
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update listing");
    }

    return response.json();
  },

  /**
   * Delete property listing (soft delete)
   */
  async deleteListing(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }

    return response.json();
  },

  /**
   * Publish property listing
   */
  async publishListing(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/listings/${id}/publish`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to publish listing");
    }

    return response.json();
  },

  /**
   * Add amenities to property
   */
  async addAmenities(
    id: number,
    amenity_ids: number[],
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/${id}/amenities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amenity_ids }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to add amenities");
    }

    return response.json();
  },

  /**
   * Get all available amenities
   */
  async getAmenities(): Promise<Amenity[]> {
    const response = await fetch(`${API_BASE_URL}/api/listings/amenities`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch amenities");
    }

    return response.json();
  },

  // ==================
  // MULTI-STEP LISTINGS
  // ==================

  /**
   * Get incomplete listings
   */
  async getIncompleteListings(): Promise<{ listings: MultiStepListing[] }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/incomplete`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch incomplete listings");
    }

    return response.json();
  },

  /**
   * Step 1: Initialize with RERA permit
   */
  async createListingStep1(data: {
    rera_number: string;
    listing_type: "RENT" | "SALE";
  }): Promise<{ listing_id: number; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/step1`,
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
      const error = await response.json().catch(() => ({
        error: { message: "Invalid RERA number" },
      }));
      throw new Error(error.error?.message || "Failed to initialize listing");
    }

    return response.json();
  },

  /**
   * Step 2: Upload title deed
   */
  async uploadTitleDeed(
    listingId: number,
    titleDeedDocument: File,
    additionalDocuments?: File[],
  ): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append("titleDeedDocument", titleDeedDocument);

    if (additionalDocuments) {
      additionalDocuments.forEach((doc) => {
        formData.append("additionalDocuments", doc);
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step2`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload documents");
    }

    return response.json();
  },

  /**
   * Step 3: Add property details
   */
  async addPropertyDetails(
    listingId: number,
    data: {
      beds: number;
      baths: number;
      property_size: number;
      property_type: string;
      location: string;
      parking_spaces?: number;
      building_name?: string;
      floor_number?: number;
      unit_number?: string;
    },
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step3`,
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
      throw new Error("Failed to add property details");
    }

    return response.json();
  },

  /**
   * Step 4: Upload property images
   */
  async uploadPropertyImages(
    listingId: number,
    titleImage: File,
    propertyImages: File[],
  ): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append("titleImage", titleImage);

    propertyImages.forEach((image) => {
      formData.append("propertyImages", image);
    });

    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step4`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    return response.json();
  },

  /**
   * Step 5: Set pricing
   */
  async setPricing(
    listingId: number,
    data: {
      price_annual: number;
      rent_frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
      security_deposit?: number;
      agency_fee?: number;
    },
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step5`,
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
      throw new Error("Failed to set pricing");
    }

    return response.json();
  },

  /**
   * Step 6: Add amenities
   */
  async addListingAmenities(
    listingId: number,
    amenity_ids: number[],
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step6`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amenity_ids }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to add amenities");
    }

    return response.json();
  },

  /**
   * Step 7: Add description
   */
  async addDescription(
    listingId: number,
    description: string,
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/step7`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to add description");
    }

    return response.json();
  },

  /**
   * Step 8: Publish listing
   */
  async publishMultiStepListing(listingId: number): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/publish`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: { message: "Not all steps completed" },
      }));
      throw new Error(
        error.error?.message || "Failed to publish listing",
      );
    }

    return response.json();
  },

  /**
   * Get listing progress
   */
  async getListingProgress(listingId: number): Promise<ListingProgress> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}/progress`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listing progress");
    }

    return response.json();
  },

  /**
   * Delete incomplete listing
   */
  async deleteIncompleteListing(listingId: number): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/listings/multi-step/${listingId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }

    return response.json();
  },
};

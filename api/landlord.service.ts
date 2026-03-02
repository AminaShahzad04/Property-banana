// Landlord API Service
// Handles all landlord dashboard operations

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Listing {
  listing_id: number;
  property_id: number;
  landlord_user_id: number;
  agent_user_id: number | null;
  price_annual: number;
  status: "DRAFT" | "PUBLISHED" | "INACTIVE";
  beds: number;
  baths: number;
  property_size: number;
  property_type: string;
  location: string;
  description: string;
}

export interface Tour {
  tour_id: number;
  listing_id: number;
  property_id: number;
  tenant_user_id: number;
  tour_date: string;
  time_slot: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
  created_at: string;
}

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

export const landlordService = {
  /**
   * Step 1: Initialize listing with RERA permit validation
   */
  async createListingStep1(data: {
    rera_number: string;
    listing_type: "RENT" | "SALE";
  }): Promise<{ success: boolean; listing_id: number; next_step: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/step1`,
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
      throw new Error(error.error?.message || "Failed to initialize listing");
    }

    return response.json();
  },

  /**
   * Step 2: Upload title deed documents
   */
  async createListingStep2(
    listingId: number,
    titleDeedDocument: File,
    additionalDocuments?: File[],
  ): Promise<{ success: boolean }> {
    const formData = new FormData();
    formData.append("titleDeedDocument", titleDeedDocument);

    if (additionalDocuments) {
      additionalDocuments.forEach((doc) => {
        formData.append("additionalDocuments", doc);
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step2`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to upload documents");
    }

    return response.json();
  },

  /**
   * Step 3: Add property details
   */
  async createListingStep3(
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
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step3`,
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
      throw new Error(
        error.error?.message || "Failed to save property details",
      );
    }

    return response.json();
  },

  /**
   * Step 4: Upload property images
   */
  async createListingStep4(
    listingId: number,
    files: { titleImage: File; propertyImages: File[] },
  ): Promise<{ success: boolean }> {
    const formData = new FormData();
    formData.append("titleImage", files.titleImage);

    files.propertyImages.forEach((image) => {
      formData.append("propertyImages", image);
    });

    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step4`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to upload images");
    }

    return response.json();
  },

  /**
   * Step 5: Set pricing and payment terms
   */
  async createListingStep5(
    listingId: number,
    data: {
      price_annual: number;
      rent_frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
      security_deposit?: number;
      agency_fee?: number;
    },
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step5`,
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
      throw new Error(error.error?.message || "Failed to save pricing");
    }

    return response.json();
  },

  /**
   * Step 6: Add amenities
   */
  async createListingStep6(
    listingId: number,
    amenity_ids: number[],
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step6`,
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
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to add amenities");
    }

    return response.json();
  },

  /**
   * Step 7: Add description
   */
  async createListingStep7(
    listingId: number,
    description: string,
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/multi-step/${listingId}/step7`,
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
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to add description");
    }

    return response.json();
  },

  /**
   * Publish completed listing
   */
  async publishListing(listingId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}/publish`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to publish listing");
    }

    return response.json();
  },

  /**
   * Get all landlord's listings
   */
  async getListings(): Promise<{ listings: Listing[] }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    return response.json();
  },

  /**
   * Get incomplete/draft listings
   */
  async getIncompleteListings(): Promise<{
    listings: Array<{
      listing_id: number;
      current_step: number;
      created_at: string;
    }>;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/incomplete`,
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
   * Get all tours for landlord's properties
   */
  async getTours(): Promise<{ tours: Tour[] }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/tours`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }

    return response.json();
  },

  /**
   * Get all bids for a specific listing
   */
  async getBidsForListing(
    listingId: number,
    status?: "OPEN" | "ACCEPTED" | "REJECTED" | "WITHDRAWN",
  ): Promise<{ bids: Bid[] }> {
    const url = new URL(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}/bids`,
    );

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
   * Make a counter offer on a tenant's bid
   */
  async counterBid(
    bidThreadId: number,
    data: {
      amount: number;
      frequency: "MONTHLY" | "QUARTERLY" | "YEARLY";
      installments: 2 | 4 | 6 | 8 | 10 | 12;
    },
  ): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/bids/${bidThreadId}/counter`,
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
      throw new Error(error.error?.message || "Failed to counter bid");
    }

    return response.json();
  },

  /**
   * Accept a tenant's bid
   */
  async acceptBid(bidThreadId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/bids/${bidThreadId}/accept`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to accept bid");
    }

    return response.json();
  },

  /**
   * Reject a tenant's bid
   */
  async rejectBid(bidThreadId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/bids/${bidThreadId}/reject`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to reject bid");
    }

    return response.json();
  },

  /**
   * Create a new listing (single-step method)
   */
  async createListing(data: {
    property_id: number;
    price_annual: number;
    beds: number;
    baths: number;
    property_size: number;
    property_type: string;
    location: string;
    description: string;
  }): Promise<{ listing_id: number; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings`,
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
      throw new Error(error.error?.message || "Failed to create listing");
    }

    return response.json();
  },

  /**
   * Update an existing listing
   */
  async updateListing(
    listingId: number,
    data: {
      price_annual?: number;
      beds?: number;
      baths?: number;
      property_size?: number;
      property_type?: string;
      location?: string;
      description?: string;
      status?: string;
    },
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}`,
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
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to update listing");
    }

    return response.json();
  },

  /**
   * Delete a listing (soft delete)
   */
  async deleteListing(listingId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to delete listing");
    }

    return response.json();
  },

  /**
   * Get listing creation progress
   */
  async getListingProgress(listingId: number): Promise<{
    listing_id: number;
    current_step: string;
    completed_steps: string[];
    is_complete: boolean;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}/progress`,
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
   * Get tours for a specific listing
   */
  async getToursForListing(listingId: number): Promise<{ tours: Tour[] }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/listings/${listingId}/tours`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tours for listing");
    }

    return response.json();
  },

  /**
   * Mark a tour as completed
   */
  async completeTour(tourId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/tours/${tourId}/complete`,
      {
        method: "PUT",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to complete tour");
    }

    return response.json();
  },

  /**
   * Mark a tour as no-show
   */
  async markTourNoShow(tourId: number): Promise<{ success: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/landlord/tours/${tourId}/no-show`,
      {
        method: "PUT",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to mark tour as no-show");
    }

    return response.json();
  },
};

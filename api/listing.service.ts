// Public Listing API Service
// Handles public property listing operations (no authentication required)

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
  image?: string;
  rating?: number | null;
  reviews?: number;
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  page: number;
  totalPages: number;
}

export const listingService = {
  /**
   * Search all public property listings (no authentication required)
   * This endpoint is accessible to anyone visiting the website
   */
  async searchListings(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
    minArea?: number;
    maxArea?: number;
    page?: number;
    limit?: number;
  }): Promise<ListingsResponse> {
    const url = new URL(`${API_BASE_URL}/api/listings`);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // No credentials needed - this is a public endpoint
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: { message: "Failed to fetch listings" },
      }));
      throw new Error(error.error?.message || "Failed to fetch listings");
    }

    return response.json();
  },

  /**
   * Get detailed property information by ID (no authentication required)
   * Public endpoint for viewing property details
   */
  async getListingDetails(id: number): Promise<Listing> {
    const response = await fetch(`${API_BASE_URL}/api/listings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // No credentials needed - this is a public endpoint
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Property not found");
      }
      const error = await response.json().catch(() => ({
        error: { message: "Failed to fetch property details" },
      }));
      throw new Error(
        error.error?.message || "Failed to fetch property details",
      );
    }

    return response.json();
  },
};

import type { Apartment, ApartmentFilters } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apartmentService = {
  async getApartments(filters?: ApartmentFilters): Promise<Apartment[]> {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.type) params.append("type", filters.type.join(","));
      if (filters.priceMin)
        params.append("priceMin", filters.priceMin.toString());
      if (filters.priceMax)
        params.append("priceMax", filters.priceMax.toString());
      if (filters.bedrooms)
        params.append("bedrooms", filters.bedrooms.join(","));
      if (filters.bathrooms)
        params.append("bathrooms", filters.bathrooms.join(","));
      if (filters.emirate) params.append("emirate", filters.emirate.join(","));
      if (filters.listingType)
        params.append("listingType", filters.listingType);
    }

    const response = await fetch(`${API_BASE_URL}/apartments?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch apartments");
    }

    return response.json();
  },

  async getApartment(id: string): Promise<Apartment> {
    const response = await fetch(`${API_BASE_URL}/apartments/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch apartment");
    }

    return response.json();
  },

  async createApartment(
    data: Omit<Apartment, "id" | "createdAt" | "updatedAt">,
  ): Promise<Apartment> {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}/apartments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create apartment");
    }

    return response.json();
  },

  async updateApartment(
    id: string,
    data: Partial<Apartment>,
  ): Promise<Apartment> {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}/apartments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update apartment");
    }

    return response.json();
  },

  async deleteApartment(id: string): Promise<void> {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}/apartments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete apartment");
    }
  },
};

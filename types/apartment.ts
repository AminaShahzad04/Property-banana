export interface Apartment {
  id: string;
  title: string;
  description: string;
  type: "villa" | "apartment" | "townhouse" | "penthouse" | "studio";
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  areaUnit: "sqft" | "sqm";
  location: {
    address: string;
    city: string;
    emirate: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  amenities: string[];
  features: string[];
  status: "available" | "sold" | "rented" | "pending";
  listingType: "sale" | "rent";
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApartmentFilters {
  type?: Apartment["type"][];
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  emirate?: string[];
  listingType?: "sale" | "rent";
}

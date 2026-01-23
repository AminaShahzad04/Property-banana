// Apartment type constants
export const APARTMENT_TYPES = {
  VILLA: "villa",
  APARTMENT: "apartment",
  TOWNHOUSE: "townhouse",
  PENTHOUSE: "penthouse",
  STUDIO: "studio",
} as const;

export const APARTMENT_TYPE_LABELS = {
  [APARTMENT_TYPES.VILLA]: "Villa",
  [APARTMENT_TYPES.APARTMENT]: "Apartment",
  [APARTMENT_TYPES.TOWNHOUSE]: "Townhouse",
  [APARTMENT_TYPES.PENTHOUSE]: "Penthouse",
  [APARTMENT_TYPES.STUDIO]: "Studio",
} as const;

// Listing types
export const LISTING_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;

// Apartment status
export const APARTMENT_STATUS = {
  AVAILABLE: "available",
  SOLD: "sold",
  RENTED: "rented",
  PENDING: "pending",
} as const;

// UAE Emirates
export const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

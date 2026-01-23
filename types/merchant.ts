export interface MerchantProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  propertyType: "apartment" | "villa" | "townhouse" | "penthouse";
  images: string[];
  amenities: string[];
  status: "active" | "inactive" | "pending";
  merchantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MerchantDashboardStats {
  totalProperties: number;
  activeBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  viewsCount: number;
}

export interface MerchantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  verified: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  apartmentId: string;
  userId: string;
  tourDate: Date;
  tourTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingRequest {
  apartmentId: string;
  tourDate: Date;
  tourTime: string;
  notes?: string;
}

export interface BookingWithDetails extends Booking {
  apartment: {
    id: string;
    title: string;
    location: string;
    images: string[];
  };
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

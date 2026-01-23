export interface Bid {
  id: string;
  apartmentId: string;
  userId: string;
  amount: number;
  currency: string;
  status: "pending" | "accepted" | "rejected" | "countered" | "withdrawn";
  message?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BidRequest {
  apartmentId: string;
  amount: number;
  message?: string;
}

export interface BidWithDetails extends Bid {
  apartment: {
    id: string;
    title: string;
    price: number;
    images: string[];
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CounterBid {
  bidId: string;
  amount: number;
  message?: string;
}

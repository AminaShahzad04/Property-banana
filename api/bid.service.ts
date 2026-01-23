import type { Bid, BidRequest, BidWithDetails, CounterBid } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const bidService = {
  async getBids(userId?: string): Promise<BidWithDetails[]> {
    const token = localStorage.getItem('auth_token');
    const url = userId ? `${API_BASE_URL}/bids?userId=${userId}` : `${API_BASE_URL}/bids`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bids');
    }

    return response.json();
  },

  async getBid(id: string): Promise<BidWithDetails> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bid');
    }

    return response.json();
  },

  async createBid(data: BidRequest): Promise<Bid> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create bid');
    }

    return response.json();
  },

  async counterBid(data: CounterBid): Promise<Bid> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids/${data.bidId}/counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: data.amount, message: data.message }),
    });

    if (!response.ok) {
      throw new Error('Failed to counter bid');
    }

    return response.json();
  },

  async acceptBid(bidId: string): Promise<Bid> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/accept`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to accept bid');
    }

    return response.json();
  },

  async rejectBid(bidId: string): Promise<Bid> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/reject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to reject bid');
    }

    return response.json();
  },

  async withdrawBid(bidId: string): Promise<void> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/withdraw`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to withdraw bid');
    }
  },
};

import type { Booking, BookingRequest, BookingWithDetails } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const bookingService = {
  async getBookings(userId?: string): Promise<BookingWithDetails[]> {
    const token = localStorage.getItem('auth_token');
    const url = userId ? `${API_BASE_URL}/bookings?userId=${userId}` : `${API_BASE_URL}/bookings`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return response.json();
  },

  async getBooking(id: string): Promise<BookingWithDetails> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }

    return response.json();
  },

  async createBooking(data: BookingRequest): Promise<Booking> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    return response.json();
  },

  async updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking');
    }

    return response.json();
  },

  async cancelBooking(id: string): Promise<void> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  },
};

"use client";

import { useState, useEffect } from 'react';
import type { Apartment, ApartmentFilters } from '@/types';

export function useApartments(filters?: ApartmentFilters) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Implement API call
        // const data = await apartmentService.getApartments(filters);
        // setApartments(data);
        console.log('Fetching apartments with filters:', filters);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch apartments');
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [filters]);

  return { apartments, loading, error };
}

export function useApartment(id: string) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartment = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Implement API call
        // const data = await apartmentService.getApartment(id);
        // setApartment(data);
        console.log('Fetching apartment:', id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch apartment');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApartment();
    }
  }, [id]);

  return { apartment, loading, error };
}

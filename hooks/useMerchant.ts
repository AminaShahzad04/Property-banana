"use client";

import { useState, useEffect } from "react";
import { merchantService } from "@/api/merchant.service";

export function useMerchant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = async (propertyData: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await merchantService.createProperty(propertyData);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create property"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const properties = await merchantService.getProperties();
      return properties;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createProperty,
    getProperties,
  };
}

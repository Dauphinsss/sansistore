import { useState, useCallback } from 'react';

export interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  onlyOffers: boolean;
  onlyAvailable: boolean;
  minRating: number;
}

export const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  priceRange: [0, 10000],
  onlyOffers: false,
  onlyAvailable: false,
  minRating: 0,
};

/**
 * Hook for managing product filters
 */
export function useProductFilter(initialFilters = DEFAULT_FILTERS) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const toggleCategory = useCallback((categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  }, []);

  const setPriceRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: range,
    }));
  }, []);

  const toggleOffers = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      onlyOffers: !prev.onlyOffers,
    }));
  }, []);

  const toggleAvailable = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      onlyAvailable: !prev.onlyAvailable,
    }));
  }, []);

  const setMinRating = useCallback((rating: number) => {
    setFilters((prev) => ({
      ...prev,
      minRating: rating,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.categories.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 10000 ||
      filters.onlyOffers ||
      filters.onlyAvailable ||
      filters.minRating > 0
    );
  }, [filters]);

  return {
    filters,
    toggleCategory,
    setPriceRange,
    toggleOffers,
    toggleAvailable,
    setMinRating,
    clearFilters,
    hasActiveFilters,
  };
}

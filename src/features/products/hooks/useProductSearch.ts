import { useState, useCallback, useEffect } from 'react';

/**
 * Hook for search queries with automatic debounce for realtime suggestions.
 * Updates `debouncedQuery` 300ms after the last input change.
 */
export function useProductSearch(initialValue = '') {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((value: string) => {
    const limitedValue = value.slice(0, 100);
    setSearchQuery(limitedValue);
  }, []);

  // Automatic debounce: when `searchQuery` changes, wait 300ms then set `debouncedQuery`.
  useEffect(() => {
    if (searchQuery === debouncedQuery) return;
    setIsSearching(true);
    const t = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(t);
  }, [searchQuery, debouncedQuery]);

  const executeSearch = useCallback((value?: string) => {
    const queryValue = value !== undefined ? value : searchQuery;
    setDebouncedQuery(queryValue);
    setIsSearching(false);
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    handleSearch,
    executeSearch,
    clearSearch,
  };
}

import { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import ProductResults from './ProductResults';
import Pagination from './Pagination';
import { getAllProducts, filterProducts } from '../services/productService';
import { useProductSearch } from '../hooks/useProductSearch';
import { usePagination } from '../hooks/usePagination';

export default function ProductCatalog() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // Hooks
  const {
    searchQuery,
    debouncedQuery,
    isSearching,
    handleSearch,
    executeSearch,
    clearSearch,
  } = useProductSearch();

  // Load products on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingProducts(true);
      try {
        console.log('Loading products...');
        const products = await getAllProducts();
        console.log('Loaded products:', products);
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadData();
  }, []);

  // Get suggestions based on debounced query (real-time)
  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return filterProducts(allProducts, debouncedQuery, {});
  }, [allProducts, debouncedQuery]);

  // Filter products based on active search (only updates on Enter)
  const filteredProducts = useMemo(() => {
    return filterProducts(allProducts, activeSearchQuery, {});
  }, [allProducts, activeSearchQuery]);

  // Pagination
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    itemsCount,
    reset: resetPagination,
  } = usePagination(filteredProducts, 10);

  // Reset pagination when active search changes
  useEffect(() => {
    resetPagination();
  }, [activeSearchQuery, resetPagination]);

  // Handle search input change (just update the input, don't search)
  const handleSearchInput = (value: string) => {
    handleSearch(value);
    setShowSuggestions(true);
  };

   // Handle search execution (on Enter key)
  const handleExecuteSearch = () => {
    executeSearch();
    setActiveSearchQuery(searchQuery);
    setShowSuggestions(false);
  };

   // Handle clear search
   const handleClearSearch = () => {
     clearSearch();
     setActiveSearchQuery('');
     setShowSuggestions(false);
   };

   // Handle selecting a suggestion
   const handleSelectSuggestion = (product: any) => {
     setShowSuggestions(false);
     setActiveSearchQuery(product.name);
     executeSearch(product.name);
   };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
            }}
            className="text-text-light mb-4"
          >
            Catálogo de Productos
          </h1>
          <p className="text-text-light/60 max-w-2xl">
            Busca nuestros productos para encontrar exactamente lo que necesitas.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchInput}
            onSearch={handleExecuteSearch}
            onClear={handleClearSearch}
            isLoading={isSearching}
            placeholder="Buscar productos..."
          />
          <SearchSuggestions
            suggestions={suggestions}
            isLoading={isSearching}
            isOpen={showSuggestions && searchQuery.length > 0}
            searchQuery={searchQuery}
            onSelectProduct={handleSelectSuggestion}
          />
        </div>

        {/* Main Content - Products */}
        <div className="w-full">
          <div className="space-y-8">
            {/* Results */}
             <ProductResults
               products={currentItems}
               isLoading={isLoadingProducts}
               searchQuery={activeSearchQuery}
               matchCount={itemsCount}
             />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-8 border-t border-border-light">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onNextPage={goToNextPage}
                  onPreviousPage={goToPreviousPage}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

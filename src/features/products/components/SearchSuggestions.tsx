import type { Product } from '../services/productService';
import { Loader2 } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: Product[];
  isLoading: boolean;
  isOpen: boolean;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
}

export default function SearchSuggestions({
  suggestions,
  isLoading,
  isOpen,
  searchQuery,
  onSelectProduct,
}: SearchSuggestionsProps) {
  if (!isOpen || !searchQuery) {
    return null;
  }

  return (
    <>
      <style>{`
        html[data-theme='dark'] .search-suggestions-container {
          background-color: #141518;
          border-color: rgba(255, 255, 255, 0.08);
        }
        html[data-theme='dark'] .search-suggestion-item:hover {
          background-color: #1a1b1e;
        }
        html[data-theme='dark'] .search-suggestion-item {
          color: #f5f3ef;
        }
        html[data-theme='dark'] .search-suggestion-text {
          color: #f5f3ef;
        }
        html[data-theme='dark'] .search-suggestion-price {
          color: rgba(245, 243, 239, 0.6);
        }
        html[data-theme='dark'] .search-suggestion-empty {
          color: rgba(245, 243, 239, 0.6);
        }
        html[data-theme='dark'] .search-suggestion-loading {
          color: rgba(245, 243, 239, 0.6);
        }
      `}</style>
      <div className="search-suggestions-container absolute top-full left-0 right-0 mt-2 bg-white border border-border-light rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-4 h-4 text-primary animate-spin mr-2" />
            <span className="search-suggestion-loading text-sm text-text-light/60">
              Buscando...
            </span>
          </div>
        )}

        {!isLoading && suggestions.length === 0 && (
          <div className="py-4 px-4 text-center">
            <p className="search-suggestion-empty text-sm text-text-light/60">
              No se encontraron productos
            </p>
          </div>
        )}

        {!isLoading && suggestions.length > 0 && (
          <div className="divide-y divide-border-light">
            {suggestions.slice(0, 10).map((product) => (
              <button
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="search-suggestion-item w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-light transition-colors text-left"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                )}
                  <div className="flex-1 min-w-0">
                    <p className="search-suggestion-text text-sm font-medium text-text-light truncate">
                      {product.name}
                    </p>
                    {product.hasOffer && product.offerPrice && product.offerPrice > 0 ? (
                      <>
                        <p className="search-suggestion-price text-xs font-bold text-primary">
                          Bs. {product.offerPrice.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="search-suggestion-price text-xs line-through text-text-light/50">
                          Bs. {product.price.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </>
                    ) : (
                      <p className="search-suggestion-price text-xs text-text-light/60">
                        Bs. {product.price.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

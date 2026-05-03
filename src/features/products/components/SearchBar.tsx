import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  isLoading = false,
  placeholder = 'Buscar productos...',
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClear();
    } else if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-full">
      <style>{`
        html[data-theme='dark'] .search-input {
          background-color: #141518;
          color: #f5f3ef;
          border-color: rgba(255, 255, 255, 0.08);
        }
        html[data-theme='dark'] .search-input::placeholder {
          color: rgba(245, 243, 239, 0.5);
        }
        html[data-theme='dark'] .search-input:focus {
          border-color: rgba(255, 255, 255, 0.08);
        }
        html[data-theme='dark'] .search-icon {
          color: rgba(245, 243, 239, 0.5);
        }
        html[data-theme='dark'] .clear-btn {
          color: rgba(245, 243, 239, 0.7);
        }
        html[data-theme='dark'] .clear-btn:hover {
          background-color: #1a1b1e;
        }
        html[data-theme='dark'] .char-counter {
          color: rgba(245, 243, 239, 0.5);
        }
      `}</style>
      <div className="relative flex items-center">
        <Search className="absolute left-3 search-icon text-text-light/50 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={100}
          className="search-input w-full pl-10 pr-10 py-3 rounded-lg border border-border-light
                     bg-white text-text-light placeholder-text-light/50
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all duration-200"
        />
        {value && (
          <button
            onClick={onClear}
            className="clear-btn absolute right-3 p-1 hover:bg-bg-light rounded-md transition-colors"
            title="Limpiar búsqueda (ESC)"
          >
            <X className="w-5 h-5 text-text-light/70" />
          </button>
        )}
      </div>
      {isLoading && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
      <p className="char-counter text-xs text-text-light/50 mt-1 text-right">
        {value.length}/100
      </p>
    </div>
  );
}

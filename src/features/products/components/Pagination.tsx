import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if near the end
      if (currentPage > totalPages - 2) {
        start = totalPages - 3;
      }
      // Adjust if near the start
      if (currentPage < 3) {
        end = 4;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page Info */}
      <p className="text-sm text-text-light/60">
        Página <span className="font-semibold text-text-light">{currentPage}</span> de{' '}
        <span className="font-semibold text-text-light">{totalPages}</span>
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className="p-2 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={typeof page !== 'number'}
              className={`
                w-10 h-10 rounded-lg font-medium transition-colors
                ${
                  page === currentPage
                    ? 'bg-primary text-white'
                    : page === '...'
                      ? 'cursor-default text-text-light/50'
                      : 'border border-border-light hover:bg-bg-light text-text-light'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="p-2 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

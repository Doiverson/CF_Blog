interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render if there's only one page or less
  if (totalPages <= 1) {
    return null;
  }

  // Normalize currentPage to handle edge cases
  const normalizedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (normalizedCurrentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, normalizedCurrentPage - 1);
      const end = Math.min(totalPages - 1, normalizedCurrentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (normalizedCurrentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page if it's not already included
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center space-x-2"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(normalizedCurrentPage - 1)}
        disabled={normalizedCurrentPage <= 1}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
          ${
            normalizedCurrentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }
        `}
        aria-label="Previous page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === normalizedCurrentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isCurrentPage ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}
              `}
              aria-label={`Page ${pageNum}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(normalizedCurrentPage + 1)}
        disabled={normalizedCurrentPage >= totalPages}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
          ${
            normalizedCurrentPage >= totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }
        `}
        aria-label="Next page"
      >
        <span>Next</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600">
        Page {normalizedCurrentPage} of {totalPages}
      </div>
    </nav>
  );
}

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - maxVisible) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded border flex items-center justify-center text-black bg-white ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500 hover:text-white"
        }`}
      >
        <FaChevronLeft />
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded border ${
            page === currentPage ? "bg-red-500 text-white" : "bg-white hover:bg-gray-100"
          } ${page === "..." ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded border flex items-center justify-center text-black bg-white ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500 hover:text-white"
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

import React, { useState } from "react";

interface PaginationProps {
  totalRows: number;
  rowsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  rowsPerPage = 8,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between p-6 w-full">
      <div className="text-sm text-gray-500">
        Showing data {rowsPerPage * (currentPage - 1) + 1} to{" "}
        {Math.min(rowsPerPage * currentPage, totalRows)} of {totalRows} entries
      </div>
      <div className="flex items-center  gap-2">
        <button
          className="px-3 py-1 border rounded text-sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>
        {pageNumbers.slice(0, 4).map((num) => (
          <button
            key={num}
            className={`px-3 py-1 ${num === currentPage ? "text-white" : ""} text-sm rounded ${num === currentPage ? "bg-yellow-300" : "border"}`}
            style={
              num === currentPage
                ? { backgroundColor: "#FBDE02", color: "black" }
                : {}
            }
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}
        {totalPages > 4 && <span className="px-2">...</span>}
        {totalPages > 4 && (
          <button
            className="px-3 py-1 border rounded text-sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          className="px-3 py-1 border rounded text-sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};

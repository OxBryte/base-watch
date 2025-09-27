import React, { useState, useMemo } from "react";
import { truncateAddress } from "../utils/utils";
import {
  PiCaretLeft,
  PiCaretRight,
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
} from "react-icons/pi";

export default function History({ transactions = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 25;

  // Calculate pagination data
  const paginationData = useMemo(() => {
    const totalTransactions = transactions.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = transactions.slice(startIndex, endIndex);

    return {
      totalTransactions,
      totalPages,
      currentTransactions,
      startIndex,
      endIndex: Math.min(endIndex, totalTransactions),
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [transactions, currentPage, transactionsPerPage]);

  // Reset to first page when transactions change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, paginationData.totalPages));
  const goToLastPage = () => setCurrentPage(paginationData.totalPages);
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-white/50 text-sm border-b uppercase border-white/10">
            <th className="py-3 px-2">ID</th>
            <th className="py-3 px-2">Type</th>
            <th className="py-3 px-2">Hash</th>
            <th className="py-3 px-2">From</th>
            <th className="py-3 px-2">To</th>
            <th className="py-3 px-2">Value</th>
            <th className="py-3 px-2 text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.currentTransactions.map((tx, index) => {
            // Calculate transaction type
            const txType = tx.functionName
              ? "Contract"
              : tx.value > 0
              ? "Transfer"
              : "Other";

            // Format timestamp
            const date = tx.timeStamp
              ? new Date(parseInt(tx.timeStamp) * 1000)
              : new Date();
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            // Format value (convert from Wei to ETH)
            const value = tx.value
              ? (parseInt(tx.value) / 1e18).toFixed(6)
              : "0.000000";

            return (
              <tr
                key={tx.hash + index}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="py-3 px-2 font-mono text-xs">
                  {String(paginationData.startIndex + index + 1).padStart(
                    2,
                    "0"
                  )}
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      txType === "Contract"
                        ? "bg-purple-900/30 text-purple-300"
                        : txType === "Transfer"
                        ? "bg-green-900/30 text-green-300"
                        : "bg-gray-900/30 text-gray-300"
                    }`}
                  >
                    {txType}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono text-xs">
                  <a
                    href={`https://basescan.org/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    {truncateAddress(tx.hash, 6, 4)}
                  </a>
                </td>
                <td className="py-3 px-2 font-mono text-xs">
                  {truncateAddress(tx.from, 4, 4)}
                </td>
                <td className="py-3 px-2 font-mono text-xs">
                  {truncateAddress(tx.to, 4, 4)}
                </td>
                <td className="py-3 px-2">{value} ETH</td>
                <td className="py-3 px-2 text-right text-xs text-white/50">
                  {formattedDate} <br />
                  {formattedTime}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="text-center py-8 text-white/50">
          No transactions found
        </div>
      )}

      {/* Pagination Controls */}
      {paginationData.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          {/* Results Info */}
          <div className="text-sm text-white/60">
            Showing {paginationData.startIndex + 1} to {paginationData.endIndex}{" "}
            of {paginationData.totalTransactions} transactions
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={goToFirstPage}
              disabled={!paginationData.hasPrevPage}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              <PiCaretDoubleLeft size={16} />
            </button>

            {/* Previous Page */}
            <button
              onClick={goToPrevPage}
              disabled={!paginationData.hasPrevPage}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <PiCaretLeft size={16} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {(() => {
                const pages = [];
                const totalPages = paginationData.totalPages;
                const current = currentPage;

                // Always show first page
                if (totalPages > 0) {
                  pages.push(1);
                }

                // Add ellipsis if needed
                if (current > 4) {
                  pages.push("...");
                }

                // Add pages around current
                const start = Math.max(2, current - 1);
                const end = Math.min(totalPages - 1, current + 1);

                for (let i = start; i <= end; i++) {
                  if (!pages.includes(i)) {
                    pages.push(i);
                  }
                }

                // Add ellipsis if needed
                if (current < totalPages - 3) {
                  if (!pages.includes("...")) {
                    pages.push("...");
                  }
                }

                // Always show last page
                if (totalPages > 1 && !pages.includes(totalPages)) {
                  pages.push(totalPages);
                }

                return pages.map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-white/50"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-white/10 hover:bg-white/10 text-white/70"
                      }`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
            </div>

            {/* Next Page */}
            <button
              onClick={goToNextPage}
              disabled={!paginationData.hasNextPage}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <PiCaretRight size={16} />
            </button>

            {/* Last Page */}
            <button
              onClick={goToLastPage}
              disabled={!paginationData.hasNextPage}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              <PiCaretDoubleRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

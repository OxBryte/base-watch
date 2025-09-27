import React, { useState, useMemo } from "react";
import { truncateAddress } from "../utils/utils";
import { PiCaretLeft, PiCaretRight, PiCaretDoubleLeft, PiCaretDoubleRight } from "react-icons/pi";

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
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, paginationData.totalPages));
  const goToLastPage = () => setCurrentPage(paginationData.totalPages);
  const goToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
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
          {transactions.map((tx, index) => {
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
                <td className="py-3 px-2 font-mono text-xs">0{index + 1}</td>
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
    </div>
  );
}

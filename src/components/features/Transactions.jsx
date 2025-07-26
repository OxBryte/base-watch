import React from "react";
import { RiHistoryFill, RiNftFill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";
import { useGetTransactions } from "../hooks/useGetTransactions";
import History from "./History";
import { PiArrowCounterClockwise } from "react-icons/pi";

const Tabs = [
  { name: "Holdings", icon: <TbCoinFilled size={18} /> },
  { name: "NFTs", icon: <RiNftFill size={18} /> },
  { name: "Transactions", icon: <RiHistoryFill size={18} /> },
];

export default function Transactions({ walletAddress }) {
  const [tabs, setTabs] = React.useState(0);
  const {
    transactions: history,
    isLoading: isLoadingHistory,
    refetch,
    isError,
    error,
  } = useGetTransactions({
    chainId: 999,
    address: walletAddress,
    page: 1,
  });

  return (
    <div className="w-full space-y-6">
      <div className="w-full flex gap-1 items-center justify-between">
        <div className="w-full flex gap-1 items-center">
          {Tabs.map((tab, index) => (
            <div
              key={index}
              className={`px-4 py-2.5 flex gap-1 items-center rounded-full text-sm cursor-pointer hover:text-white/80 ${
                tabs === index ? "text-white bg-white/10" : "text-white/50"
              }`}
              onClick={() => setTabs(index)}
            >
              {tab.icon}
              <span className="">{tab.name}</span>
            </div>
          ))}
        </div>
        <div
          className={
            "hidden md:block p-2 border border-white/10 rounded-full cursor-pointer hover:bg-white/20" +
            (isLoadingHistory ? " !animate-spin" : "")
          }
          onClick={() => refetch()}
        >
          <PiArrowCounterClockwise />
        </div>
      </div>

      {tabs === 2 && (
        <div className="w-full min-h-53 relative">
          {history?.length === 0 && (
            <div className="w-full h-52 relative flex flex-col items-center justify-center gap-7">
              <p className="text-white/50 text-sm">No transactions found.</p>
            </div>
          )}
          {isError && (
            <div className="w-full h-52 relative flex flex-col items-center justify-center gap-3">
              <p className="text-red-400">Error loading transactions</p>
              <p className="text-white/50 text-sm">{error}</p>
            </div>
          )}
          {isLoadingHistory && (
            <div className="w-full h-52 relative flex flex-col items-center justify-center gap-3">
              <p className="animate-pulse">Base Watch</p>
              <p className="text-white/50 text-sm">Fetching transactions...</p>
            </div>
          )}

          {/* Show transactions when available */}
          {!isLoadingHistory && !isError && history && history.length > 0 && (
            <History transactions={history} />
          )}
        </div>
      )}
    </div>
  );
}

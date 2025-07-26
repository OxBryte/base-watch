import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { truncateAddress } from "../components/utils/utils";
import { PiCopy, PiStar } from "react-icons/pi";
import Transactions from "../components/features/Transactions";
import BalanceCards from "../components/features/BalanceCards";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  // Get address from either URL params or query params
  const urlAddress = params.address;
  const queryAddress = searchParams.get("address");
  const walletAddress = urlAddress || queryAddress;

  // Add state to force re-renders
  const [key, setKey] = useState(walletAddress);

  // Effect to reset the component when address changes
  useEffect(() => {
    // Update the key to force a remount of child components
    setKey(walletAddress);

    // You could also do other initialization here if needed
    console.log("Address changed, reloading dashboard for:", walletAddress);

    // Optional: scroll to top when address changes
    window.scrollTo(0, 0);
  }, [walletAddress]);

  // Copy address to clipboard
  const copyToClipboard = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address copied successfully!");
  };

  // If no address is provided, show a message
  if (!walletAddress) {
    return (
      <div className="w-full h-52 flex flex-col items-center justify-center">
        <p className="text-lg mb-4">No wallet address provided</p>
        <p className="text-sm text-white/50">
          Enter an address in the search bar above
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-6 w-full">
        <div className="flex gap-4 md:items-center flex-col md:flex-row w-full justify-between">
          <div className="px-3 py-2 w-fit rounded-full border border-white/10 flex items-center gap-2.5">
            <div className="w-2 h-2 relative rounded-full bg-[#0000FF]">
              <div className="w-2 h-2 animate-pulse blur-[5px] absolute top-0 left-0 -z-1 rounded-full bg-blue-300"></div>
            </div>
            <p className="text-[12px] font-semibold">
              {truncateAddress(walletAddress, 6, 4)}
            </p>
            <div className="cursor-pointer" onClick={copyToClipboard}>
              <PiCopy />
            </div>
            <div className="">
              <PiStar />
            </div>
          </div>
        </div>

        {/* Use the key prop to force remounting when address changes */}
        <BalanceCards key={`balance-${key}`} walletAddress={walletAddress} />
        <Transactions
          key={`transactions-${key}`}
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
}

import React from "react";
import { useSearchParams } from "react-router-dom";
import { truncateAddress } from "../components/utils/utils";
import { PiCopy, PiStar } from "react-icons/pi";
import Transactions from "../components/features/Transactions";
import BalanceCards from "../components/features/BalanceCards";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const queryAddress = searchParams.get("address");
  const walletAddress = queryAddress;

  // Copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Address copied to clipboard!");
  };

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
          {/* <div className="flex items-center gap-3">
            <div
              className={
                "p-2 border border-white/10 rounded-full cursor-pointer hover:bg-white/20" +
                (isLoading ? " !animate-spin" : "")
              }
              onClick={refetch}
            >
              <PiArrowCounterClockwise />
            </div>
            <div className="p-2 border border-white/10 rounded-full">
              <PiGear />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search address..."
              className="py-2 px-4 placeholder:text-xs text-sm rounded-full bg-white/10 border-none"
            />
          </div> */}
        </div>
        <BalanceCards walletAddress={walletAddress} />
        <Transactions walletAddress={walletAddress} />
      </div>
    </div>
  );
}

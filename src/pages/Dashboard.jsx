import React from "react";
import { useSearchParams } from "react-router-dom";
import { truncateAddress } from "../components/utils/utils";
import {
  PiArrowCounterClockwise,
  PiCopy,
  PiEye,
  PiEyeSlash,
  PiGear,
  PiStar,
  PiStarFill,
} from "react-icons/pi";
import { CgSwap } from "react-icons/cg";
import Transactions from "../components/features/Transactions";
import { useGetTransactions } from "../components/hooks/useGetTransactions";

export default function Dashboard() {
  const [seeBalance, setSeeBalance] = React.useState(true);
  const [searchParams] = useSearchParams();
  const queryAddress = searchParams.get("address");

  const walletAddress = queryAddress;

  // Now use the extracted address for data fetching
  const { isLoading, refetch } = useGetTransactions({
    chainId: 42161,
    address: walletAddress,
  });

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
          <div className="flex items-center gap-3">
            <div
              className={
                "p-2 border border-white/10 rounded-full cursor-pointer hover:bg-white/20" +
                (isLoading ? " !animate-spin" : "")
              }
              onClick={refetch}
            >
              <PiArrowCounterClockwise />
            </div>
            {/* <div className="p-2 border border-white/10 rounded-full">
              <PiGear />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search address..."
              className="py-2 px-4 placeholder:text-xs text-sm rounded-full bg-white/10 border-none"
            /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-between">
          <div className="h-52 border border-white/5 relative flex flex-col justify-between gap-7 rounded-[14px] bg-gradient-to-br from-transparent to-[#0000FF]/10 p-5">
            <div className="flex items-top justify-between">
              <div className="space-y-2">
                <h1 className="text-white/50 text-sm font-medium">Net Worth</h1>
                <p className="text-white text-2xl font-bold">
                  {seeBalance ? "$12,345.67" : "*****"}
                </p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setSeeBalance(!seeBalance)}
              >
                {seeBalance ? (
                  <PiEye className="text-white/50 hover:text-white" />
                ) : (
                  <PiEyeSlash className="text-white/50 hover:text-white" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 backdrop-blur-[200px] text-[12px] flex items-center gap-1">
                <CgSwap size={23} />
                Swap
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 backdrop-blur-[200px] text-[12px] flex items-center gap-1">
                <CgSwap size={23} />
                Buy/Sell
              </div>
            </div>
            <div className="absolute bottom-0 right-0">
              <img
                src="https://jup.ag/_next/image?url=%2Fimages%2Fportfolio%2Fjupcat-up.png&w=256&q=75"
                alt=""
                className="w-26"
              />
            </div>
          </div>
          <div className="h-52 relative flex flex-col justify-between gap-7 rounded-[14px] bg-none border border-white/20 p-5"></div>
        </div>
        <Transactions walletAddress={walletAddress} />
      </div>
    </div>
  );
}

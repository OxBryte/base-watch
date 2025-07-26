import React from "react";
import { useGetBalance } from "../hooks/useGetaBalance";
import { PiArrowCounterClockwise, PiEye, PiEyeSlash } from "react-icons/pi";
import { CgSwap } from "react-icons/cg";

export default function BalanceCards({ walletAddress }) {
  const [seeBalance, setSeeBalance] = React.useState(true);

  const { balanceInEther, balanceInUsd, isLoading, refetch } = useGetBalance({
    chainId: 999,
    address: walletAddress,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-between">
        <div className="h-52 border border-white/5 relative flex flex-col justify-between gap-7 rounded-[14px] bg-gradient-to-br from-transparent to-[#0000FF]/10 p-5">
          <div className="flex items-top justify-between">
            <div className="space-y-2">
              <h1 className="text-white/50 text-sm font-medium">Net Worth</h1>
              <div className="flex items-center gap-2">
                <p className="text-white text-2xl font-bold">
                  ${seeBalance ? (balanceInUsd ? balanceInUsd : "00") : "*****"}{" "}
                  <span className="text-white/50 font-light text-sm">
                    {seeBalance
                      ? parseFloat(
                          balanceInEther ? balanceInEther : "00"
                        ).toFixed(5)
                      : "*****"}{" "}
                    ETH
                  </span>
                </p>
                <div
                  className={
                    "hidden md:block p-2 border border-white/10 rounded-full cursor-pointer hover:bg-white/20" +
                    (isLoading ? " !animate-spin" : "")
                  }
                  onClick={() => refetch()}
                >
                  <PiArrowCounterClockwise />
                </div>
              </div>
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
    </>
  );
}

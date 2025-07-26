import React from "react";
import { truncateAddress } from "../components/utils/utils";
import {
  PiArrowCounterClockwise,
  PiCopy,
  PiGear,
  PiStar,
  PiStarFill,
} from "react-icons/pi";

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="space-y-3 w-full">
        <div className="flex gap-4 md:items-center flex-col md:flex-row w-full justify-between">
          <div className="px-3 py-2 rounded-full border border-white/10 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <p className="text-[12px] font-semibold">
              {truncateAddress("9oAmAmDbEzHfabwpSVgRAmW3Fm7sy1sNZvoQGAJwQ5r5")}
            </p>
            <div className="">
              <PiCopy />
            </div>
            <div className="">
              <PiStar />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 rounded-full">
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
          </div>
        </div>
      </div>
    </div>
  );
}

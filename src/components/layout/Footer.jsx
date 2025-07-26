import React from "react";
import { PiBug, PiHeartFill } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="w-full mx-auto px-3 md:px-10 border-t border-white/10 flex items-center">
      <div className="w-full items-center flex h-auto mx-auto">
        <div className="flex gap-2 border-r border-r-white/20 text-white/60 cursor-pointer hover:text-white px-3 py-3 items-center">
          <PiBug />
          <p className="text-xs">Feedback</p>
        </div>
        <div className="flex gap-2 border-r border-r-white/20 text-white/60 cursor-pointer hover:text-white px-3 py-3 items-center">
          <p className="text-xs">Built with</p>
          <PiHeartFill className="text-red-600" />
        </div>
      </div>
    </div>
  );
}

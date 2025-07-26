import React from "react";

export default function Navbar() {
  return (
    <div className="w-full mx-auto py-2 px-3 md:py-4 md:px-10 border-b border-white/10 h-[4rem] flex items-center">
      <div className="w-full items-center flex justify-between gap-4 mx-auto">
        <p>Watch</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search address..."
          className="py-2 px-4 placeholder:text-xs w-full max-w-[420px] text-sm rounded-full border border-white/10"
        />
        <p className="text-xs" >Connect wallet</p>
      </div>
    </div>
  );
}

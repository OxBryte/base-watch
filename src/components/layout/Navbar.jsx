import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchAddress, setSearchAddress] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      navigate(`/portfolio?address=${searchAddress}`);
    }
  };

  return (
    <div className="w-full mx-auto py-2 px-3 md:py-4 md:px-10 border-b border-white/10 h-[4rem] flex items-center">
      <div className="w-full items-center flex justify-between gap-4 mx-auto">
        <p>Watch</p>
        <form onSubmit={handleSearch} className="w-full max-w-[420px]">
          <input
            type="text"
            placeholder="Search address..."
            className="py-2 px-4 placeholder:text-xs w-full text-sm rounded-full border border-white/10"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
        </form>
        <p className="text-xs">Connect wallet</p>
      </div>
    </div>
  );
}

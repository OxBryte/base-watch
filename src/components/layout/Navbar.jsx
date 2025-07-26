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
        <div className="flex items-center gap-2">
          <select
            className="py-2 px-4 text-sm rounded-full border border-white/10 bg-transparent"
            onChange={(e) => console.log(`Selected chain: ${e.target.value}`)}
          >
            <option value="base">Base</option>
            <option value="celo">Celo</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="polygon">Polygon</option>
            <option value="optimism">Optimism</option>
          </select>
          <p className="text-xs px-5 py-2 bg-[#0000ff] hover:bg-white/20 rounded-full cursor-pointer">
            Connect wallet
          </p>
        </div>
      </div>
    </div>
  );
}

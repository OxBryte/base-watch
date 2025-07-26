import React from "react";
import { RiHistoryFill, RiNftFill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";

const Tabs = [
  { name: "Holdings", icon: <TbCoinFilled size={18} /> },
  { name: "NFTs", icon: <RiNftFill size={18} /> },
  { name: "Transactions", icon: <RiHistoryFill size={18} /> },
];

export default function Transactions() {
  const [tabs, setTabs] = React.useState(0);

  return (
    <div className="w-full space-y-6">
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
      {/*  */}
      <div className="w-full flex items-center justify-center h-32">
        <p className="text-white/50 text-sm">
          {tabs === 0
            ? "No holdings found."
            : tabs === 1
            ? "No NFTs found."
            : "No transactions found."}
        </p>
      </div>
    </div>
  );
}

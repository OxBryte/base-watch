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
    <div className="w-full space-y-4">
      <div className="w-full flex gap-2 border-b border-b-white/10 items-center">
        {Tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-2 flex gap-1 items-center text-sm cursor-pointer hover:text-white/80 ${
              tabs === index ? "text-white" : "text-white/50"
            }`}
            onClick={() => setTabs(index)}
          >
            {tab.icon}
            <span className="">{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

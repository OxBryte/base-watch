import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from "@reown/appkit/react";
import { truncateAddress } from "../utils/utils";
import { useState, useRef, useEffect } from "react";
import { PiCaretDown, PiCheck } from "react-icons/pi";

// Network configurations matching your supported chains
const SUPPORTED_NETWORKS = [
  { id: 1, name: "Ethereum", shortName: "ETH", color: "bg-blue-500" },
  { id: 137, name: "Polygon", shortName: "MATIC", color: "bg-purple-500" },
  { id: 42161, name: "Arbitrum", shortName: "ARB", color: "bg-blue-400" },
  { id: 10, name: "Optimism", shortName: "OP", color: "bg-red-500" },
  { id: 8453, name: "Base", shortName: "BASE", color: "bg-blue-600" },
  { id: 42220, name: "Celo", shortName: "CELO", color: "bg-green-500" },
];

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const { caipNetwork, chainId, switchNetwork } = useAppKitNetwork();

  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get current network info
  const currentNetwork = SUPPORTED_NETWORKS.find(
    (network) => network.id === chainId
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNetworkDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNetworkSwitch = async (networkId) => {
    try {
      await switchNetwork(networkId);
      setShowNetworkDropdown(false);
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  if (!isConnected) {
    return (
      <div className="">
        <p
          className="text-xs px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={open}
        >
          Connect wallet
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Network Selector */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 bg-gray-300/10 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-300/20 transition-colors"
          onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
        >
          {currentNetwork ? (
            <>
              <div className={`w-2 h-2 rounded-full ${currentNetwork.color}`} />
              <span className="text-xs font-medium">
                {currentNetwork.shortName}
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs font-medium">Unknown</span>
            </>
          )}
          <PiCaretDown
            size={12}
            className={`transition-transform ${
              showNetworkDropdown ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Network Dropdown */}
        {showNetworkDropdown && (
          <div className="absolute top-full mt-2 right-0 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl py-2 min-w-[150px] z-50 shadow-xl">
            {SUPPORTED_NETWORKS.map((network) => (
              <div
                key={network.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"
                onClick={() => handleNetworkSwitch(network.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${network.color}`} />
                  <span className="text-sm font-medium">{network.name}</span>
                </div>
                {currentNetwork?.id === network.id && (
                  <PiCheck size={14} className="text-green-500" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Info */}
      <div
        className="flex items-center gap-2 bg-gray-300/10 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300/20 transition-colors"
        onClick={open}
      >
        <p className="text-sm font-semibold">
          {truncateAddress(address, 6, 4)}
        </p>
        {status === "connected" && (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );
}

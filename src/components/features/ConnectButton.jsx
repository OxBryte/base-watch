import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { truncateAddress } from "../utils/utils";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();

  return (
    <div className="">
      {isConnected ? (
        <div
          className="flex items-center gap-2 bg-gray-300/10 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300/20"
          onClick={open}
        >
          <p className="text-sm font-semibold">
            {truncateAddress(address, 6, 4)}
          </p>
          {status === "connected" && (
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          )}
        </div>
      ) : (
        <p
          className="text-xs px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={open}
        >
          Connect wallet
        </p>
      )}
    </div>
  );
}

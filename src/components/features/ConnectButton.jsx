import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { truncateAddress } from "../utils/utils";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
      useAppKitAccount();
    
    console.log(caipAddress, embeddedWalletInfo, status);
    

  return (
    <div className="">
          {isConnected ? (
              <div className="flex items-center gap-2 bg-gray-300/10 rounded-full px-6 py-2 cursor-pointer" onClick={open}>
        <p>{truncateAddress(address, 6, 4)}</p>
              </div>
      ) : (
        <p
          className="text-xs px-5 py-2 bg-[#0000ff] hover:bg-white/20 rounded-full cursor-pointer"
          onClick={open}
        >
          Connect wallet
        </p>
      )}
    </div>
  );
}

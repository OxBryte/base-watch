import { useAppKitBalance, useAppKitAccount } from "@reown/appkit/react";
import { useState, useEffect } from "react";

export default function BalanceDisplay() {
  const { fetchBalance } = useAppKitBalance();
  const [balance, setBalance] = useState();
  const { isConnected } = useAppKitAccount();

  useEffect(() => {
    if (isConnected) {
      fetchBalance().then(setBalance);
    }
  }, [isConnected, fetchBalance]);

  return (
    <div>
      {balance && (
        <p>
          Balance: {balance.data?.formatted} {balance.data?.symbol}
        </p>
      )}
    </div>
  );
}

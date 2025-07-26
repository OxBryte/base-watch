import { useState, useEffect } from "react";

const SUPPORTED_CHAINS = [1, 137, 42161, 146, 8453, 43114, 10, 42220];
const API_TOKEN = import.meta.env.VITE_ETHERSCAN_API_TOKEN;
const BASE_URL = "https://api.etherscan.io/v2/api";
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// Hook to get balance instead of transactions (based on your original code)
export const useGetBalance = ({ chainId, address }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async (selectedChainId) => {
    if (!SUPPORTED_CHAINS.includes(selectedChainId)) {
      setIsError(true);
      setError(`Unsupported chain ID: ${selectedChainId}`);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Using your original balance API call with V2
      const url = `${BASE_URL}?chainid=${selectedChainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${API_TOKEN}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "0") {
        throw new Error(result.message || "API request failed");
      }

      // Convert Wei to Ether
      const balanceInEther = (
        parseInt(result.result) / Math.pow(10, 18)
      ).toString();
      // Fetch price data from CoinGecko
      const priceResponse = await fetch(
        `${COINGECKO_API_URL}/simple/price?ids=ethereum&vs_currencies=usd`
      );

      if (!priceResponse.ok) {
        throw new Error(`CoinGecko API error! status: ${priceResponse.status}`);
      }

      const priceData = await priceResponse.json();

      // Calculate USD value
      const usdPrice = priceData["ethereum"]?.usd || 0;
      const balanceInUsd = parseFloat(balanceInEther) * usdPrice;

      setData({
        balance: result.result,
        chainId: selectedChainId,
        address: address,
        balanceInEther: (parseInt(result.result) / Math.pow(10, 18)).toString(),
        balanceInUsd: balanceInUsd.toFixed(2),
      });

      console.log("Fetched balance:", result.result);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setIsError(true);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance(chainId);
  }, [chainId]);

  const refetch = async () => {
    await fetchBalance(chainId);
  };

  return {
    balance: data?.balance,
    balanceInEther: data?.balanceInEther,
    balanceInUsd: data?.balanceInUsd,
    chainId: data?.chainId,
    address: data?.address,
    isLoading,
    isError,
    error,
    refetch,
  };
};

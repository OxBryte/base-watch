import { useState, useEffect } from "react";

const SUPPORTED_CHAINS = [
  1, 137, 42161, 146, 8453, 43114, 10, 534352, 42220, 81457,
];
const API_TOKEN = import.meta.env.VITE_ETHERSCAN_API_TOKEN;
const BASE_URL = "https://api.etherscan.io/v2/api";

export const useGetTransactions = ({ chainId, address, page }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const pageNumber = page || 1; // Default to page 1 if not provided

  const fetchTransactions = async (selectedChainId) => {
    if (!SUPPORTED_CHAINS.includes(selectedChainId)) {
      setIsError(true);
      setError(`Unsupported chain ID: ${selectedChainId}`);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Using Etherscan V2 API for transaction history
      const url = `${BASE_URL}?chainid=${selectedChainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${pageNumber}&offset=100&sort=desc&apikey=${API_TOKEN}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Check if API returned an error
      if (result.status === "0" && result.message !== "No transactions found") {
        throw new Error(result.message || "API request failed");
      }

      setData({
        transactions: result.result || [],
        chainId: selectedChainId,
        address: address,
        status: result.status,
        message: result.message,
      });

      console.log(
        "Fetched transactions:",
        result.result?.length || 0,
        "transactions"
      );
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setIsError(true);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(chainId);
  }, [chainId]);

  const refetch = () => {
    setIsLoading(true);
    fetchTransactions(chainId);
    setIsLoading(false);
  };

  return {
    transactions: data?.transactions || [],
    chainId: data?.chainId,
    address: data?.address,
    isLoading,
    isError,
    error,
    refetch,
  };
};

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

      setData({
        balance: result.result,
        chainId: selectedChainId,
        address: address,
        // Convert Wei to Ether for convenience
        balanceInEther: (parseInt(result.result) / Math.pow(10, 18)).toString(),
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

  const refetch = () => {
    fetchBalance(chainId);
  };

  return {
    balance: data?.balance,
    balanceInEther: data?.balanceInEther,
    chainId: data?.chainId,
    address: data?.address,
    isLoading,
    isError,
    error,
    refetch,
  };
};

// Hook to fetch data from multiple chains using V2 API
export const useGetMultiChainTransactions = (address) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchAllChainTransactions = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrors({});

    const results = {};
    const chainErrors = {};

    // Fetch from all supported chains
    const promises = SUPPORTED_CHAINS.map(async (chainId) => {
      try {
        const url = `${BASE_URL}?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${API_TOKEN}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          result.status === "0" &&
          result.message !== "No transactions found"
        ) {
          throw new Error(result.message || "API request failed");
        }

        results[chainId] = {
          transactions: result.result || [],
          chainId,
          address: address,
          status: result.status,
          message: result.message,
        };
      } catch (err) {
        console.error(`Error fetching transactions for chain ${chainId}:`, err);
        chainErrors[chainId] = err.message;
      }
    });

    await Promise.allSettled(promises);

    setData(results);
    setErrors(chainErrors);
    setIsError(Object.keys(chainErrors).length > 0);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllChainTransactions();
  }, []);

  const refetch = () => {
    fetchAllChainTransactions();
  };

  return {
    data,
    isLoading,
    isError,
    errors,
    refetch,
    // Helper to get all transactions across chains
    allTransactions: Object.values(data).flatMap((chain) =>
      (chain.transactions || []).map((tx) => ({
        ...tx,
        chainId: chain.chainId,
      }))
    ),
    // Get transactions by specific chain
    getTransactionsByChain: (chainId) => data[chainId]?.transactions || [],
  };
};

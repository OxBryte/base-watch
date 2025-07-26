import { useState, useEffect } from "react";

const SUPPORTED_CHAINS = [1, 137, 42161, 146, 8453, 43114, 10, 42220];
const API_TOKEN = import.meta.env.VITE_ETHERSCAN_API_TOKEN;
const BASE_URL = "https://api.etherscan.io/v2/api";

// Hook to get ERC-20 token holdings for a wallet
export const useGetTokenHoldings = ({ walletAddress, chainId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchTokenHoldings = async (address, selectedChainId) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    if (!address) {
      setError("Wallet address is required");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!SUPPORTED_CHAINS.includes(selectedChainId)) {
      setError(`Unsupported chain ID: ${selectedChainId}`);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const url = `${BASE_URL}?chainid=${selectedChainId}&module=account&action=addresstokenbalance&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${API_TOKEN}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const result = await response.json();

      if (result.status === "0" && result.message !== "No transactions found") {
        throw new Error(result.message || "Token transfers fetch failed");
      }

      const transfers = result.result || [];

      const uniqueTokens = new Map();

      for (const tx of transfers) {
        if (tx.contractAddress && tx.tokenSymbol) {
          uniqueTokens.set(tx.contractAddress, {
            contractAddress: tx.contractAddress,
            tokenSymbol: tx.tokenSymbol,
            tokenName: tx.tokenName,
            tokenDecimal: tx.tokenDecimal,
          });
        }
      }

      // Placeholder: You can extend this to fetch actual balances via another endpoint
      const tokenBalances = Array.from(uniqueTokens.values());

      setData({
        address,
        chainId: selectedChainId,
        tokenCount: tokenBalances.length,
        tokens: tokenBalances,
        lastUpdated: new Date().toISOString(),
      });

      console.log(
        `Fetched ${tokenBalances.length} tokens for ${address} on chain ${selectedChainId}`
      );
    } catch (err) {
      console.error("Error fetching token holdings:", err);
      setError(err.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress && chainId) {
      fetchTokenHoldings(walletAddress, chainId);
    }
  }, [walletAddress, chainId]);

  const refetch = () => {
    if (walletAddress && chainId) {
      fetchTokenHoldings(walletAddress, chainId);
    }
  };

  return {
    tokens: data?.tokens || [],
    tokenCount: data?.tokenCount || 0,
    address: data?.address || null,
    chainId: data?.chainId || null,
    lastUpdated: data?.lastUpdated || null,
    isLoading,
    isError,
    error,
    refetch,
  };
};

// Hook to get token holdings across multiple chains
export const useGetMultiChainTokenHoldings = ({
  walletAddress,
  chainIds = SUPPORTED_CHAINS,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchMultiChainHoldings = async (address, chains) => {
    if (!address) {
      setIsError(true);
      setErrors({ general: "Wallet address is required" });
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setErrors({});

    const results = {};
    const chainErrors = {};

    // Fetch token holdings for each chain
    const chainPromises = chains.map(async (chainId) => {
      try {
        // Get token transfers
        const transfersUrl = `${BASE_URL}?chainid=${chainId}&module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=500&sort=desc&apikey=${API_TOKEN}`;

        const transfersResponse = await fetch(transfersUrl);
        if (!transfersResponse.ok) {
          throw new Error(`HTTP error! status: ${transfersResponse.status}`);
        }

        const transfersResult = await transfersResponse.json();
        if (
          transfersResult.status === "0" &&
          transfersResult.message !== "No transactions found"
        ) {
          throw new Error(
            transfersResult.message || "Failed to fetch token transfers"
          );
        }

        // Extract unique tokens
        const uniqueTokens = new Map();
        const transfers = transfersResult.result || [];

        transfers.forEach((transfer) => {
          if (
            transfer.contractAddress &&
            transfer.tokenSymbol &&
            transfer.tokenName
          ) {
            uniqueTokens.set(transfer.contractAddress, {
              contractAddress: transfer.contractAddress,
              tokenSymbol: transfer.tokenSymbol,
              tokenName: transfer.tokenName,
              tokenDecimal: transfer.tokenDecimal,
            });
          }
        });

        // Get balances for unique tokens (limited to first 20 to avoid rate limits)
        const tokenArray = Array.from(uniqueTokens.values()).slice(0, 20);
        const tokenBalances = [];

        for (const token of tokenArray) {
          try {
            const balanceUrl = `${BASE_URL}?chainid=${chainId}&module=account&action=tokenbalance&contractaddress=${token.contractAddress}&address=${address}&tag=latest&apikey=${API_TOKEN}`;

            const balanceResponse = await fetch(balanceUrl);
            if (!balanceResponse.ok) continue;

            const balanceResult = await balanceResponse.json();
            if (balanceResult.status === "0") continue;

            const rawBalance = balanceResult.result;
            if (rawBalance > 0) {
              const decimals = parseInt(token.tokenDecimal) || 18;
              const balance = rawBalance / Math.pow(10, decimals);

              tokenBalances.push({
                ...token,
                rawBalance,
                balance: balance.toString(),
                formattedBalance: balance.toFixed(6),
              });
            }

            // Small delay to respect rate limits
            await new Promise((resolve) => setTimeout(resolve, 100));
          } catch (err) {
            console.warn(
              `Error fetching balance for token ${token.tokenSymbol} on chain ${chainId}:`,
              err
            );
          }
        }

        results[chainId] = {
          chainId,
          address,
          tokenCount: tokenBalances.length,
          tokens: tokenBalances.sort(
            (a, b) => parseFloat(b.balance) - parseFloat(a.balance)
          ),
          lastUpdated: new Date().toISOString(),
        };
      } catch (err) {
        console.error(
          `Error fetching token holdings for chain ${chainId}:`,
          err
        );
        chainErrors[chainId] = err.message;
      }
    });

    await Promise.allSettled(chainPromises);

    setData(results);
    setErrors(chainErrors);
    setIsError(Object.keys(chainErrors).length > 0);
    setIsLoading(false);
  };

  useEffect(() => {
    if (walletAddress && chainIds.length > 0) {
      fetchMultiChainHoldings(walletAddress, chainIds);
    }
  }, [walletAddress, JSON.stringify(chainIds)]);

  const refetch = () => {
    if (walletAddress && chainIds.length > 0) {
      fetchMultiChainHoldings(walletAddress, chainIds);
    }
  };

  // Helper functions
  const getAllTokens = () => {
    return Object.values(data).flatMap((chainData) =>
      (chainData.tokens || []).map((token) => ({
        ...token,
        chainId: chainData.chainId,
      }))
    );
  };

  const getTokensByChain = (chainId) => {
    return data[chainId]?.tokens || [];
  };

  const getTotalTokenCount = () => {
    return Object.values(data).reduce(
      (total, chainData) => total + (chainData.tokenCount || 0),
      0
    );
  };

  return {
    data,
    isLoading,
    isError,
    errors,
    refetch,
    // Helper methods
    getAllTokens,
    getTokensByChain,
    getTotalTokenCount,
    // Summary data
    totalTokenCount: getTotalTokenCount(),
    allTokens: getAllTokens(),
  };
};

// Utility function to format token balance
export const formatTokenBalance = (balance, decimals = 6) => {
  const num = parseFloat(balance);
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(2) + "K";
  return num.toFixed(decimals);
};

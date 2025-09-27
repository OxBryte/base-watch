import { useEffect, useState } from "react";
import axios from "axios";

export const useGetHypeNft = ({ address }) => {
  const [items, setItems] = useState([]);
  const [nextPageParams, setNextPageParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNfts = async (isLoadMore = false) => {
    if (!address) return;

    try {
      setLoading(true);

      const baseUrl = `https://www.hyperscan.com/api/v2/addresses/${address}/nft`;
      const typeParam = `type=ERC-721%2CERC-404%2CERC-1155`;

      // If it's loading more, include next page params
      const paramString = nextPageParams
        ? `&token_contract_address_hash=${nextPageParams.token_contract_address_hash}&token_id=${nextPageParams.token_id}&token_type=${nextPageParams.token_type}`
        : "";

      const url = `${baseUrl}?${typeParam}${paramString}`;

      const res = await axios.get(url);
      const newItems = res.data.items || [];

      setItems((prev) => (isLoadMore ? [...prev, ...newItems] : newItems));
      setNextPageParams(res.data.next_page_params || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNfts(false); // initial fetch
  }, [address]);

  const loadMore = () => {
    if (nextPageParams) {
      fetchNfts(true);
    }
  };

  return {
    items,
    loading,
    error,
    hasNextPage: !!nextPageParams,
    loadMore,
  };
};


export const useGetHypeNftCollection = ({ address }) => {
  const [collections, setCollections] = useState([]);
  const [nextPageParams, setNextPageParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNfts = async (isLoadMore = false) => {
    if (!address) return;

    try {
      setLoading(true);

      const baseUrl = `https://www.hyperscan.com/api/v2/addresses/${address}/nft/collections`;
      const typeParam = `type=ERC-721%2CERC-404%2CERC-1155`;

      // If it's loading more, include next page params
      const paramString = nextPageParams
        ? `&token_contract_address_hash=${nextPageParams.token_contract_address_hash}&token_id=${nextPageParams.token_id}&token_type=${nextPageParams.token_type}`
        : "";

      const url = `${baseUrl}?${typeParam}${paramString}`;

      const res = await axios.get(url);
      console.log(res);
      
      const newItems = res.data.items || [];

      setCollections((prev) => (isLoadMore ? [...prev, ...newItems] : newItems));
      setNextPageParams(res.data.next_page_params || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNfts(false); // initial fetch
  }, [address]);

  const loadMore = () => {
    if (nextPageParams) {
      fetchNfts(true);
    }
  };

  return {
    collections,
    loading,
    error,
    hasNextPage: !!nextPageParams,
    loadMore,
  };
};

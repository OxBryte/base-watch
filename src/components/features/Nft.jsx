import React from "react";
import { useGetHypeNft } from "../hooks/useGetHypeNft";

export default function Nft({ address }) {
  const { items, loadMore, loading, hasNextPage, error } = useGetHypeNft({
    address: address,
  });

  console.log(items);

  return (
    <div className="w-full space-y-6">
      {hasNextPage && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

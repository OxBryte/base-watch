import React from "react";
import { useGetHypeNft, useGetHypeNftCollection } from "../hooks/useGetHypeNft";
import { truncateText } from "../utils/utils";

export default function Nft({ address }) {
  const { items, loadMore, loading, hasNextPage, error } = useGetHypeNft({
    address: address,
  });
  const {
    collections,
    loadMore: loadMoreCollection,
    loading: loadingCollection,
    hasNextPage: hasNextPageCollection,
    error: errorCollection,
  } = useGetHypeNftCollection({
    address: address,
  });

  console.log(collections);

  return (
    <div className="w-full space-y-6">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg: grid-cols-6 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border overflow-hidden border-white/20 flex flex-col items-left"
          >
            {(item?.animation_url || "").startsWith("data:text/html") ? (
              <iframe
                src={item.animation_url}
                title={item.metadata?.name}
                className="w-full h-50"
              />
            ) : (
              <img
                src={
                  item?.image_url || item?.media_url || item?.metadata?.image
                }
                alt={item?.metadata?.name}
                className="w-full h-50 object-cover"
              />
            )}
            <div className="space-y-2 w-full p-3">
              <h3 className="text-sm font-semibold">{item?.metadata?.name}</h3>
              <p className="text-xs text-white/70">
                {truncateText(item?.metadata?.description, 40)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

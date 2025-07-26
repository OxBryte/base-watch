// Utility functions for various tasks

// Utility function to truncate text to a specified length with an ellipsis
export const truncateText = (text, maxLength, ellipsis = "...") => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + ellipsis;
};

// Utility function to truncate an address (e.g., Ethereum address) for display
export const truncateAddress = (address, startChars = 5, endChars = 4) => {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;

  const start = address.slice(0, startChars);
  const end = address.slice(-endChars);

  return `${start}...${end}`;
};

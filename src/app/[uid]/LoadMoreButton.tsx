// components/LoadMoreButton.tsx
import React from "react";
import { motion } from "framer-motion";

interface Props {
  loading: boolean;
  fetchMoreRecords: () => void;
  hasMore: boolean; // New prop to track if there are more records
}

const LoadMoreButton: React.FC<Props> = ({
  loading,
  fetchMoreRecords,
  hasMore,
}) => {
  return (
    <motion.div
      className="w-full flex justify-center items-center my-4"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
    >
      {!loading && hasMore && (
        <button
          onClick={fetchMoreRecords}
          className="p-2 bg-black text-white rounded-2xl"
        >
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
      {!hasMore && !loading && <p>No more records to load</p>}
    </motion.div>
  );
};

export default LoadMoreButton;
